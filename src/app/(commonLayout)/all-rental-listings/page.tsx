// import { RentalCard } from "@/components/modules/home/card-section/card";
// import { getAllListingsForTenant } from "@/services/home";
// import { TListing } from "@/types/listing";
// import React from "react";

// const AllRentalListings = async () => {
//   const { data } = await getAllListingsForTenant();
//   return (
//     <div className="bg-[#FDFBEE] py-10 px-3">
//       <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center py-4">
//         All Rental Listing
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-auto">
//         {data.map((listing: TListing) => (
//           <RentalCard property={listing} key={listing?._id}></RentalCard>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllRentalListings;
// import { RentalCard } from "@/components/modules/home/card-section/card";
// import { getAllListingsForTenant } from "@/services/home";
// import { TListing } from "@/types/listing";

// interface SearchParams {
//   search?: string;
//   rentAmount?: string;
//   numberOfBedrooms?: string;
// }

// const AllRentalListings = async ({
//   searchParams,
// }: {
//   searchParams: SearchParams;
// }) => {
//   const response = await getAllListingsForTenant(searchParams);
//   const listings = response?.data || [];

//   return (
//     <div className="bg-[#FDFBEE] py-10 px-3">
//       <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center py-4">
//         {searchParams?.search
//           ? `Rentals in ${searchParams.search}`
//           : "All Rental Listings"}
//       </h1>

//       {/* Show search summary if filters are applied */}
//       {(searchParams?.rentAmount || searchParams?.numberOfBedrooms) && (
//         <div className="text-center mb-6">
//           <p className="text-gray-600">
//             {searchParams.rentAmount &&
//               `Price: ${searchParams.rentAmount
//                 .replace("-", " to ")
//                 .replace("+", "+")}`}
//             {searchParams.rentAmount && searchParams.numberOfBedrooms && " • "}
//             {searchParams.numberOfBedrooms &&
//               `Bedrooms: ${searchParams.numberOfBedrooms
//                 .replace("-", " to ")
//                 .replace("+", "+")}`}
//           </p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
//         {listings.length > 0 ? (
//           listings.map((listing: TListing) => (
//             <RentalCard property={listing} key={listing?._id} />
//           ))
//         ) : (
//           <div className="col-span-full text-center py-10">
//             <h3 className="text-xl font-medium">No listings found</h3>
//             <p className="text-gray-500 mt-2">
//               Try adjusting your search filters
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllRentalListings;
import { RentalCard } from "@/components/modules/home/card-section/card";
import { getAllListingsForTenant } from "@/services/home";
import { TListing } from "@/types/listing";

const AllRentalListings = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const response = await getAllListingsForTenant(searchParams);
  const listings = response?.data || [];

  return (
    <div className="bg-[#FDFBEE] py-10 px-3">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center py-4">
        {searchParams?.search
          ? `Rentals in ${searchParams.search}`
          : "All Rental Listings"}
      </h1>

      {/* Show search summary if filters are applied */}
      {(searchParams?.rentAmount || searchParams?.numberOfBedrooms) && (
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {searchParams.rentAmount &&
              `Price: ${String(searchParams.rentAmount)
                .replace("-", " to ")
                .replace("+", "+")}`}
            {searchParams.rentAmount && searchParams.numberOfBedrooms && " • "}
            {searchParams.numberOfBedrooms &&
              `Bedrooms: ${String(searchParams.numberOfBedrooms)
                .replace("-", " to ")
                .replace("+", "+")}`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
        {listings.length > 0 ? (
          listings.map((listing: TListing) => (
            <RentalCard property={listing} key={listing?._id} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <h3 className="text-xl font-medium">No listings found</h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRentalListings;
