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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { TListing } from "@/types/listing";

import { createOrder } from "@/services/payment";

interface CheckoutProps {
  listingData: TListing;
}

export default function Checkout({ listingData }: CheckoutProps) {
  // const router = useRouter();
  const { user } = useUser();
  const form = useForm({
    defaultValues: {
      quantity: "1",
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const quantity = watch("quantity");
  const listing = listingData;

  // Calculate total price
  const totalPrice = (listing?.rentAmount || 0) * (parseInt(quantity) || 0);

  const onSubmit = async (data: { quantity: string }) => {
    try {
      const orderInfo = {
        email: user?.email,
        quantity: parseInt(data.quantity),
        listing: listing?._id,
      };

      //   TODO
      const res = await createOrder(orderInfo);

      if (res.success) {
        toast.success(res.message);
        console.log("res", res);
        if (res?.data) {
          setTimeout(() => {
            window.location.href = res?.data;
          }, 1000);
        }
        // router.push("/dashboard/tenant/requests");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4">
      <Card className="w-full max-w-2xl p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Bike Image */}
              <div className="w-full md:w-2/5 flex justify-center items-center">
                <Image
                  src={listing?.multipleImages[0]}
                  alt={listing?.location}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto"
                  priority
                />
              </div>

              {/* Bike Details and Form */}
              <div className="w-full md:w-3/5 space-y-4">
                <h1 className="text-2xl font-bold">Checkout</h1>

                <div className="space-y-2">
                  <h2 className="">
                    <span className="text-xl font-semibold">Location </span> :{" "}
                    {listing?.location}
                  </h2>
                  <p className="text-lg">
                    <span className="text-xl font-semibold">Description </span>{" "}
                    : {listing?.description}
                  </p>
                  <p className="text-lg">
                    <span className="text-xl font-semibold">Price </span> : $
                    {listing?.rentAmount}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="Enter quantity"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === ""
                                ? ""
                                : Math.max(1, parseInt(value) || 1).toString()
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-xl font-bold pt-4">
                  Total Price: ${totalPrice}
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
