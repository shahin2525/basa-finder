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
import Logo2 from "@/assets/svgs/logo.png";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createRentalRequest } from "@/services/tenant";
import { useEffect, useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TListing } from "@/types/listing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getAllListingsForTenant } from "@/services/home";
import { Checkbox } from "@/components/ui/checkbox";
const CreateRentalRequestForm = () => {
  const [listings, setListings] = useState<TListing[] | []>([]);

  const router = useRouter();
  const form = useForm({});

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      const [listingsData] = await Promise.all([getAllListingsForTenant()]);

      setListings(listingsData?.data);
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createRentalRequest(data);

      console.log(res);
      if (res.success) {
        toast.success(res.message);
        // toast.success(res.message);
        router.push("/dashboard/tenant/requests");
        //  router.push("/user/shop/products");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        <Image
          src={Logo2}
          alt="App Logo"
          width={70}
          height={70}
          className="object-contain"
        />

        <h1 className="text-xl font-bold">Create-Rental-Request</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="listingID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Listing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {listings?.map((listing) => (
                        <SelectItem key={listing?._id} value={listing?._id}>
                          {listing?.location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I agree to the terms and conditions</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Product....." : "Add Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRentalRequestForm;

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
// import Logo2 from "@/assets/svgs/logo.png";
// import Image from "next/image";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";

// import { createRentalRequest } from "@/services/tenant";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// // import { TListing } from "@/types/listing";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useState } from "react";
// import { TListing } from "@/types/listing";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface CreateRentalRequestFormProps {
//   listings: TListing[];
// }

// const CreateRentalRequestForm = ({
//   listings,
// }: CreateRentalRequestFormProps) => {
//   const [open, setOpen] = useState(false);
//   const router = useRouter();

//   const form = useForm({
//     defaultValues: {
//       listingID: "",
//       agreeToTerms: false,
//     },
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     try {
//       if (!data.agreeToTerms) {
//         toast.error("You must agree to the terms and conditions");
//         return;
//       }

//       const res = await createRentalRequest(data);

//       if (res.success) {
//         toast.success(res.message);
//         router.push("/dashboard/tenant/requests");
//         setOpen(false);
//       } else {
//         toast.error(res.message);
//       }
//     } catch (err: any) {
//       console.error(err);
//       toast.error("An error occurred while submitting the request");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Create Rental Request</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[625px]">
//         <DialogHeader>
//           <div className="flex items-center space-x-4">
//             <Image
//               src={Logo2}
//               alt="App Logo"
//               width={70}
//               height={70}
//               className="object-contain"
//             />
//             <DialogTitle>Create Rental Request</DialogTitle>
//           </div>
//           <DialogDescription>
//             Fill out the form to submit a rental request
//           </DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <div className="flex justify-between items-center border-t border-b py-3 my-5">
//               <p className="text-primary font-bold text-xl">
//                 Basic Information
//               </p>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <FormField
//                 control={form.control}
//                 name="listingID"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Listing</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Listing" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {listings?.map((listing) => (
//                           <SelectItem key={listing?._id} value={listing?._id}>
//                             {listing?.location}
//                           </SelectItem>
//                         ))}
//                         {/* {listings.length === 0 && (
//                           <SelectItem value="" disabled>
//                             No listings available
//                           </SelectItem>
//                         )} */}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="agreeToTerms"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//                   <FormControl>
//                     <Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>I agree to the terms and conditions</FormLabel>
//                   </div>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Submit Request"}
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateRentalRequestForm;
