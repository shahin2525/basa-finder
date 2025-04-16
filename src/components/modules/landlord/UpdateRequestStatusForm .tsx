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
// import Logo2 from "../../../assets/svgs/logo.png";
//import Logo from "../../assets/svgs/logo.png";
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
import { updateRentalRequestStatus } from "@/services/rental-request";

const UpdateRequestStatusForm = ({ requestId }: { requestId: string }) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      status: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await updateRentalRequestStatus(requestId, data);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/dashboard/landlord/view-rental-listings");
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
          width={60} // 👈 Adjust width/height as needed
          height={60}
          className="object-contain" // 👈 Ensures proper scaling
        />
        <div>
          <h1 className="text-xl font-semibold">Update Request Status</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="approve">Approve</SelectItem>
                    <SelectItem value="reject">Reject</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
            {isSubmitting ? "Creating...." : "Created"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateRequestStatusForm;
