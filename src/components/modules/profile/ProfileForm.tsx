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
import { updateProfile } from "@/services/profile";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { logout } from "@/services/authServices";

type FormValues = {
  email: string; // Remove optional typing for form values
  name: string;
};

const ProfileForm = () => {
  const router = useRouter();
  const { user } = useUser();

  // Initialize with empty strings to ensure controlled inputs
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      name: "",
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email || "",
        name: user.name || "",
      });
    }
  }, [user, form]);

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await updateProfile(data);
      if (res?.success) {
        toast.success(res?.message);
        await logout();
        router.push("/login");
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during profile update");
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
          <h1 className="text-xl font-semibold">Update Profile</h1>
          <p className="font-extralight text-sm text-gray-600">
            Update your profile information
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
