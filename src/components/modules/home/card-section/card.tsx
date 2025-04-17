// // components/RentalCard.tsx
// "use client";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { TListing } from "@/types/listing";

// export function RentalCard({ property }: { property: TListing }) {
//   return (
//     <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
//       <div className="relative h-48 w-full">
//         <Image
//           src={property.multipleImages[0]}
//           alt={property.location}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//       </div>
//       <CardHeader className="flex-1 px-4 py-3">
//         <h3 className="text-lg font-semibold">{property.title}</h3>
//         <p className="text-sm text-gray-600">
//           <span className="font-medium">Location:</span> {property.location}
//         </p>
//       </CardHeader>
//       <CardContent className="px-4 py-2">
//         <p className="line-clamp-2 text-sm text-gray-700">
//           {property.description}
//         </p>
//         <div className="mt-3 flex items-center justify-between">
//           <span className="text-sm font-medium">
//             {property.numberOfbBedrooms}{" "}
//             {property.numberOfbBedrooms > 1 ? "Bedrooms" : "Bedroom"}
//           </span>
//           <span className="text-lg font-bold text-primary">
//             ${property.rentAmount}/mo
//           </span>
//         </div>
//       </CardContent>
//       <CardFooter className="p-4">
//         <Button className="w-full" asChild>
//           <a href={`/properties/${property.id}`}>View Details</a>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TListing } from "@/types/listing";
import Link from "next/link";

export function RentalCard({ property }: { property: TListing }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      {/* Property Image */}
      <CardHeader className="relative h-48 w-full">
        <Image
          src={property.multipleImages[0]}
          alt={`Property in ${property.location}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </CardHeader>

      {/* Card Content */}

      <CardContent className="px-4">
        <div className="flex-1 mb-2">
          <h3 className="text-lg font-semibold capitalize">
            {property.location.split(",")[0]}{" "}
            {/* Use first part of location as title */}
          </h3>
          <p className="text-sm ">
            <span className="font-medium">Location :</span> {property.location}
          </p>
        </div>
        <p className="line-clamp-2 text-sm">
          <span className="font-medium"> Description : </span>
          {property.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              NumberOfBedrooms : {property.numberOfBedrooms}{" "}
              {property.numberOfBedrooms > 1 ? "Beds" : "Bed"}
            </span>
          </div>
        </div>
        <div className="text-lg font-medium">
          Rent-Amount : ${property.rentAmount.toLocaleString()}/mo
        </div>
      </CardContent>

      <CardFooter className="px-2">
        <Button className="w-full" asChild>
          <Link href={`/listing/${property._id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
