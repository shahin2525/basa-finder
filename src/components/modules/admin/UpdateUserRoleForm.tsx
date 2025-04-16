"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import Logo2 from "@/assets/svgs/logo.png";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateUserRole } from "@/services/admin";

const UpdateUserRoleForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      role: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    try {
      const res = await updateUserRole(userId, payload);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/dashboard/admin/manage-users");
      } else {
        console.log(res?.message);
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        <Image
          src={Logo2}
          alt="basaFinder Logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <div>
          <h1 className="text-xl font-semibold">Update User Role</h1>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="landlord">Landlord</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
            {isSubmitting ? "Updating...." : "Update Role"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateUserRoleForm;
