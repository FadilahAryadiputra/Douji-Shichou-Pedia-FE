import { z } from "zod";

export const PaginationQueriesSchema = z.object({
  take: z.coerce.number().int().positive().default(10),
  page: z.coerce.number().int().positive().default(1),
  sortBy: z.string().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationQueries = z.input<typeof PaginationQueriesSchema>;
export type ParsedPaginationQueries = z.output<typeof PaginationQueriesSchema>;

export interface PaginationMeta {
  page: number;
  take: number;
  total: number;
}

export interface PageableResponse<T> {
  data: T[];
  meta: PaginationMeta;
}