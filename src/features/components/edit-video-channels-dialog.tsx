"use client";

import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import PaginationSection from "@/features/components/pagination-section";
import useGetChannels from "@/features/hooks/use-get-channels";
import useUpdateVideoChannels from "@/features/hooks/use-update-video-channels";
import Link from "next/link";

interface EditVideoChannelsDialogProps {
  slug: string;
  initialChannelIds: string[];
}

export default function EditVideoChannelsDialog({
  slug,
  initialChannelIds,
}: EditVideoChannelsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const [debouncedSearch] = useDebounceValue(search, 1000);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(
    () => new Set(initialChannelIds),
  );

  const {
    data: channels,
    isLoading: isChannelLoading,
    isFetching: isChannelFetching,
    isPlaceholderData,
  } = useGetChannels({
    page,
    take,
    search: debouncedSearch,
  });

  const { mutateAsync: updateVideoChannels, isPending: isUpdatingChannels } =
    useUpdateVideoChannels();

  useEffect(() => {
    setSelectedRows(new Set(initialChannelIds));
  }, [initialChannelIds]);

  const handleOpenChange = (open: boolean) => {
    if (isUpdatingChannels) return;

    if (open) {
      setSelectedRows(new Set(initialChannelIds));
      setSearch("");
      setPage(1);
    }

    setIsOpen(open);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedRows((previous) => {
      const next = new Set(previous);

      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  };

  const handleUpdateVideoChannels = async () => {
    try {
      await updateVideoChannels({
        slug,
        channelIds: Array.from(selectedRows),
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update video channels:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button variant="outline" className={"font-bold"}>Edit channels</Button>}
      />
      <DialogContent className="flex h-[70vh] w-[calc(100%-2rem)] flex-col overflow-hidden sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit channels</DialogTitle>
          <div className="flex items-center justify-between gap-2">
            <DialogDescription className="flex items-center justify-between gap-2">
              <span>This is a list of available channels.</span>
            </DialogDescription>
            <InputGroup className="max-w-xs sm:max-w-sm">
              <InputGroupInput
                placeholder="Search..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                {search !== debouncedSearch || isChannelFetching ? (
                  <InputGroupText>
                    Searching...
                    <Spinner />
                  </InputGroupText>
                ) : (
                  `${channels?.meta?.total ?? 0} results`
                )}
              </InputGroupAddon>
            </InputGroup>
          </div>
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <table className="w-full table-fixed caption-bottom">
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky top-0 z-10 w-16 bg-background">No.</TableHead>
                  <TableHead className="sticky top-0 z-10 bg-background">Name</TableHead>
                  <TableHead className="sticky top-0 z-10 w-24 bg-background text-right">Watched</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isChannelLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Loading channels...
                    </TableCell>
                  </TableRow>
                ) : channels?.data.length ? (
                  channels.data.map((channel, i) => (
                    <TableRow key={channel.id}>
                      <TableCell className="font-medium">
                        {(channels.meta.page - 1) * channels.meta.take + i + 1}
                      </TableCell>
                      <TableCell className="truncate">
                        <Link href={`/dashboard/channel/${channel.slug}`}>{channel.name}</Link>
                      </TableCell>
                      <TableCell className="text-right">
                        <Checkbox
                          className="mr-3 inline-flex"
                          id={`channel-${channel.id}-checkbox`}
                          name={`channel-${channel.id}-checkbox`}
                          checked={selectedRows.has(channel.id)}
                          disabled={isUpdatingChannels}
                          onCheckedChange={(checked) =>
                            handleSelectRow(channel.id, checked === true)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No channels found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </table>
          </ScrollArea>
        </div>
        <Table className="w-full table-fixed">
          <TableFooter>
            <TableRow>
            <TableCell colSpan={2}>
              Selected channels: {selectedRows.size} 
            </TableCell>
            <TableCell className="w-24 text-right">
              Select all
            </TableCell>
            </TableRow> 
          </TableFooter> 
        </Table>
        {channels && (
          <PaginationSection
            page={channels.meta.page}
            take={channels.meta.take}
            totalPages={Math.ceil(channels.meta.total / channels.meta.take)}
            setPage={setPage}
            setTake={setTake}
          />
        )}
        <div className="flex justify-end">
          <Button
            onClick={handleUpdateVideoChannels}
            disabled={isUpdatingChannels}
            className="px-5 py-4 font-bold"
          >
            {isUpdatingChannels ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
