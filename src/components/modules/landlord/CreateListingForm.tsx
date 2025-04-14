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
import { Input } from "@/components/ui/input";

import Image from "next/image";
// import Logo2 from "../../../assets/svgs/logo.png";
//import Logo from "../../assets/svgs/logo.png";
import Logo2 from "@/assets/svgs/logo.png";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListingValidationSchema } from "./createListingValidation";
import { createListing } from "@/services/landlord";

const CreateListingForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(createListingValidationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await createListing(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/dashboard/landlord/all-listing");
      } else {
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
          priority
          className="object-contain" // 👈 Ensures proper scaling
        />
        <div>
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input type="string" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Input type="string" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="multipleImages"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Listings-Images</FormLabel>

                <FormControl>
                  <Input type="string" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfBedrooms"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Bedrooms Number</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rentAmount"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Rent Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} value={field.value || ""} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateListingForm;
