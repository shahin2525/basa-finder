// import { RentalCard } from "@/components/modules/home/card-section/card";
// import { getAllListingsForTenant } from "@/services/home";
// import { TListing } from "@/types/listing";

// const AllRentalListings = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
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
//               `Price: ${String(searchParams.rentAmount)
//                 .replace("-", " to ")
//                 .replace("+", "+")}`}
//             {searchParams.rentAmount && searchParams.numberOfBedrooms && " • "}
//             {searchParams.numberOfBedrooms &&
//               `Bedrooms: ${String(searchParams.numberOfBedrooms)
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

interface AllRentalListingsProps {
  searchParams: {
    search?: string;
    rentAmount?: string;
    numberOfBedrooms?: string;
    [key: string]: string | string[] | undefined;
  };
}

const AllRentalListings = async ({ searchParams }: AllRentalListingsProps) => {
  // First get the listings using searchParams
  const response = await getAllListingsForTenant(await searchParams);
  const listings = response?.data || [];

  // Extract the search params after awaiting
  const { search, rentAmount, numberOfBedrooms } = await searchParams;

  return (
    <div className="bg-[#FDFBEE] py-10 px-3">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-center py-4">
        {search ? `Rentals in ${search}` : "All Rental Listings"}
      </h1>

      {/* Show search summary if filters are applied */}
      {(rentAmount || numberOfBedrooms) && (
        <div className="text-center mb-6">
          <p className="text-gray-600">
            {rentAmount &&
              `Price: ${String(rentAmount)
                .replace("-", " to ")
                .replace("+", "+")}`}
            {rentAmount && numberOfBedrooms && " • "}
            {numberOfBedrooms &&
              `Bedrooms: ${String(numberOfBedrooms)
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
