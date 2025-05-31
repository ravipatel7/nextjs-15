"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";

interface AuthFormType<T> {
  formType: "SIGN_IN" | "SIGN_UP";
  schema: ZodType<T>;
  defaultValue: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
}

const AuthForm = <T extends FieldValues>({
  formType,
  schema,
  defaultValue,
  onSubmit,
}: AuthFormType<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    const result = await onSubmit(form.getValues());
    if (result.success) {
      // Handle successful submission, e.g., redirect or show a success message
      console.log("Form submitted successfully");
    } else {
      // Handle error case, e.g., show an error message
      console.error("Form submission failed");
    }
    form.reset(); // Reset the form after submission
    form.clearErrors(); // Clear any validation errors
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-10">
        {Object.keys(defaultValue).map((key) => {
          return (
            <FormField
              key={key}
              control={form.control}
              name={key as Path<T>}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5 w-full">
                  <FormLabel className="paragraph-medium text-dark200_light800">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="paragraph-regular background-light900_dark300 light-border-2
                    text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
          disabled={!form.formState.isValid || form.formState.isSubmitting}>
          {form.formState.isSubmitting ?
            buttonText === "Sign In" ?
              "Signing In..."
            : "Signing Up..."
          : buttonText}
        </Button>
        {formType === "SIGN_IN" && (
          <p className="paragraph-regular text-dark500_light400">
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient">
              Sign Up
            </Link>
          </p>
        )}
        {formType === "SIGN_UP" && (
          <p className="paragraph-regular text-dark500_light400">
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient">
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};
export default AuthForm;
