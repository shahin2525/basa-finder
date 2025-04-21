// import { Button } from "@/components/ui/button";
"use client";
import { TListing } from "@/types/listing";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/authServices";

const RentalListingDetails = ({ listing }: { listing: TListing }) => {
  const router = useRouter();
  const { user } = useUser();
  const handleGoToRequestPage = async () => {
    if (!user) {
      toast.error("Please login to create a rental request");
      router.push("/login");
    }
    if (user?.role !== "tenant") {
      toast.error("Only tenant can create rental house");
      await logout();
      router.push("/login");
    }
    router.push("/create-rental-request");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-white p-4 rounded-md my-5 shadow-sm bg-[#F5EEDC]">
      <div>
        <Image
          src={listing?.multipleImages[0] || ""}
          alt="listing image"
          width={500}
          height={500}
          className="rounded-md w-full object-cover h-80"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mx-auto place-items-center">
          {listing?.multipleImages
            ?.slice(0, 3)
            .map((image: string, idx: number) => (
              <Image
                key={idx}
                src={image}
                alt="multiple image"
                width={500}
                height={500}
                className="rounded-md w-full object-cover h-40"
              />
            ))}
        </div>
      </div>
      <div className="bg-white rounded-md p-4 ">
        <h2 className="font-bold text-xl mb-4">
          Location : {listing?.location}
        </h2>
        <p className="font-bold text-justify text-gray-500  text-sm">
          Description : {listing?.description}
        </p>
        <div className="flex items-center justify-between my-5 text-gray-500 text-sm font-bold">
          <p className=" py-1">
            Number of Bedrooms : {listing?.numberOfBedrooms}
          </p>
        </div>
        <hr />
        <p className="my-2 font-bold">
          Price :<span className="font-semibold"> ${listing?.rentAmount}</span>
        </p>
        <hr />
        <Button onClick={handleGoToRequestPage} className="my-4">
          Create Rental Request
        </Button>
      </div>
    </div>
  );
};

export default RentalListingDetails;
