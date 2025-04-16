// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import Image from "next/image";
// // import Logo2 from "../../../assets/svgs/logo.png";
// //import Logo from "../../assets/svgs/logo.png";
// import Logo2 from "@/assets/svgs/logo.png";

// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { updateRentalRequestStatus } from "@/services/rental-request";

// const UpdateRequestStatusForm = ({ requestId }: { requestId: string }) => {
//   const router = useRouter();

//   const form = useForm({
//     defaultValues: {
//       status: "",
//     },
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     try {
//       const res = await updateRentalRequestStatus(requestId, data);
//       if (res?.success) {
//         toast.success(res?.message);
//         router.push("/dashboard/landlord/view-rental-listings");
//       } else {
//         console.log(res?.message);
//         toast.error(res?.message);
//       }
//     } catch (err: any) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
//       <div className="flex items-center space-x-4 ">
//         <Image
//           src={Logo2}
//           alt="basaFinder Logo"
//           width={60} // 👈 Adjust width/height as needed
//           height={60}
//           className="object-contain" // 👈 Ensures proper scaling
//         />
//         <div>
//           <h1 className="text-xl font-semibold">Update Request Status</h1>
//         </div>
//       </div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem className="mt-2">
//                 <FormLabel>Status</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a Status" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="approve">Approve</SelectItem>
//                     <SelectItem value="reject">Reject</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
//             {isSubmitting ? "Updating...." : "Updated"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default UpdateRequestStatusForm;
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
import { Input } from "@/components/ui/input"; // Add this import
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
import { updateRentalRequestStatus } from "@/services/rental-request";
import { useState } from "react"; // Add this import

const UpdateRequestStatusForm = ({ requestId }: { requestId: string }) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedStatus, setSelectedStatus] = useState(""); // Track selected status

  const form = useForm({
    defaultValues: {
      status: "",
      landlordPhoneNumber: "", // Add phone number field
    },
    // Add validation rules
    mode: "onChange",
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  // Watch the status field value
  const status = watch("status");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Include phone number only if status is "approve"
      const payload =
        data.status === "approve" ? data : { status: data.status };

      const res = await updateRentalRequestStatus(requestId, payload);
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
          width={60}
          height={60}
          className="object-contain"
        />
        <div>
          <h1 className="text-xl font-semibold">Update Request Status</h1>
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
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedStatus(value);
                  }}
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

          {/* Conditionally render phone number input */}
          {status === "approve" && (
            <FormField
              control={form.control}
              name="landlordPhoneNumber"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your phone number"
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              rules={{
                required:
                  status === "approve"
                    ? "Phone number is required for approval"
                    : false,
                pattern: {
                  value:
                    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}$/im,
                  message: "Please enter a valid phone number",
                },
              }}
            />
          )}

          <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
            {isSubmitting ? "Updating...." : "Update Status"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateRequestStatusForm;
