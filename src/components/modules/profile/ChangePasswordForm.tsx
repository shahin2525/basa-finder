"use client";
import Image from "next/image";
import Logo2 from "@/assets/svgs/logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { changePassword } from "@/services/profile";

type FormValues = {
  oldPassword: string; // Remove optional typing for form values
  newPassword: string;
  passwordConfirm?: string;
};

const ChangePasswordForm = () => {
  const router = useRouter();

  // Initialize with empty strings to ensure controlled inputs
  const form = useForm<FormValues>({});
  const password = form.watch("newPassword");
  const passwordConfirm = form.watch("passwordConfirm");

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await changePassword(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      } else {
        toast.error(res?.message || "Failed to change password");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during change password");
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4">
        <Image
          src={Logo2}
          alt="App Logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <div>
          <h1 className="text-xl font-semibold">Change Password</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="newPassword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>

                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={!!passwordConfirm && password !== passwordConfirm}
          >
            {isSubmitting ? "Changing..." : "Changed Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
