import { RentalCard } from "@/components/modules/home/card-section/card";
import { getAllListingsForTenant } from "@/services/home";
import { TListing } from "@/types/listing";
import React from "react";

const AllRentalListings = async () => {
  const { data } = await getAllListingsForTenant();
  return (
    <div className="bg-[#F6F1DE] py-10 px-3">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center py-4">
        All Rental Listing
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-auto">
        {data.map((listing: TListing) => (
          <RentalCard property={listing} key={listing?._id}></RentalCard>
        ))}
      </div>
    </div>
  );
};

export default AllRentalListings;
