"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useUserRegister from "../hooks/use-user-register";

import {
  UserRegisterInput,
  userRegisterSchema,
} from "../schemas/user-register.schema";

export function UserRegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { registerMutation } = useUserRegister();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<UserRegisterInput>({
    resolver: zodResolver(userRegisterSchema),

    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: UserRegisterInput) {
    registerMutation.mutate(values);
  }

  return (
    // <div
    //   className={cn(
    //     "flex min-h-screen items-center justify-center px-4 py-8",
    //     className,
    //   )}
    //   {...props}
    // >
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an Account</CardTitle>
          <CardDescription>
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  autoComplete="username"
                  disabled={registerMutation.isPending}
                  aria-invalid={!!form.formState.errors.username}
                  {...form.register("username")}
                />
                {form.formState.errors.username && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.username.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  disabled={registerMutation.isPending}
                  aria-invalid={!!form.formState.errors.email}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    autoComplete="new-password"
                    disabled={registerMutation.isPending}
                    aria-invalid={!!form.formState.errors.password}
                    className="pr-11"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={registerMutation.isPending}
                    className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex w-11 items-center justify-center transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    disabled={registerMutation.isPending}
                    aria-invalid={!!form.formState.errors.confirmPassword}
                    className="pr-11"
                    {...form.register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    disabled={registerMutation.isPending}
                    className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex w-11 items-center justify-center transition-colors"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <FieldDescription className="text-destructive">
                    {form.formState.errors.confirmPassword.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    registerMutation.isPending || form.formState.isSubmitting
                  }
                >
                  {registerMutation.isPending ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="underline underline-offset-4 hover:no-underline"
                  >
                    Login
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By continuing, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

export default UserRegisterForm;
