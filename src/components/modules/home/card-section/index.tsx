// components/RentalCardSection.tsx
"use client";

import { TListing } from "@/types/listing";
// import { RentalCard } from "./RentalCard";
// import { Property } from "@/types"; // Define your Property type
import { RentalCard } from "./card";

interface RentalCardSectionProps {
  properties: TListing[];
}

export function RentalCardSection({ properties }: RentalCardSectionProps) {
  // Slice to show maximum 6 properties
  const displayedProperties = properties.slice(0, 6);

  return (
    <section className="bg-[#FBF8EF] py-12 md:py-16 lg:py-20 flex justify-center items-center">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Rental House Cards
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg ">
            Discover your perfect rental home
          </p>
        </div>

        {/* Cards Grid */}
        {displayedProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProperties.map((property) => (
              <RentalCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">No properties available</p>
          </div>
        )}
      </div>
    </section>
  );
}
