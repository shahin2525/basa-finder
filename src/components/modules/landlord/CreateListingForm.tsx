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

import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createListing } from "@/services/landlord";
import { ArrowBigRightIcon, Plus } from "lucide-react";

const CreateListingForm = () => {
  const router = useRouter();
  // const form = useForm({
  //   resolver: zodResolver(createListingValidationSchema),
  // });
  const form = useForm({
    // resolver: zodResolver(createListingValidationSchema),
    defaultValues: {
      location: "",
      description: "",
      rentAmount: "",

      numberOfBedrooms: "",

      multipleImages: [{ value: "" }],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendImages, fields: imageFields } = useFieldArray({
    control: form.control,
    name: "multipleImages",
  });

  const addImages = () => {
    appendImages({ value: "" });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = data.multipleImages.map(
      (image: { value: string }) => image.value
    );
    const modifiedData = {
      ...data,
      multipleImages: images,
      numberOfBedrooms: Number(data?.numberOfBedrooms),
      rentAmount: Number(data?.rentAmount),
    };

    try {
      const res = await createListing(modifiedData);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/dashboard/landlord/all-listing");
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
          <h1 className="text-xl font-semibold">Create Rental House Listing</h1>
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
          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <div className="flex justify-between items-center">
                <p className="text-primary font-bold text-[20px] ">
                  To Add Multiple image click Plus Icon
                </p>
                <ArrowBigRightIcon className="text-primary" />
              </div>
              <Button
                onClick={addImages}
                variant="outline"
                className="size-10"
                type="button"
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            <div className="my-5">
              {imageFields.map((featureField, index) => (
                <div key={featureField.id}>
                  <FormField
                    control={form.control}
                    name={`multipleImages.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>image {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button disabled={isSubmitting} type="submit" className="mt-5 w-full">
            {isSubmitting ? "Creating...." : "Created"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateListingForm;
