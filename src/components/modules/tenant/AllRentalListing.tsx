"use client";

import { RentalCard } from "@/components/modules/home/card-section/card";
import { getAllListingsForTenant } from "@/services/home";
import { TListing } from "@/types/listing";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const AllRentalListings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [listings, setListings] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialFilters: Record<string, string> = {};

    if (params.has("search")) {
      const searchValue = params.get("search") || "";
      setSearchTerm(searchValue);
      initialFilters.search = searchValue;
    }
    if (params.has("rentAmount")) {
      initialFilters.rentAmount = params.get("rentAmount") || "";
    }
    if (params.has("numberOfBedrooms")) {
      initialFilters.numberOfBedrooms = params.get("numberOfBedrooms") || "";
    }

    setFilters(initialFilters);
  }, [searchParams]);

  // Fetch listings when filters change
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const response = await getAllListingsForTenant(filters);
        setListings(response?.data || []);
      } catch (error) {
        toast.error("Failed to fetch listings");
        console.error("Error fetching listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleSearch = () => {
    updateFilters("search", searchTerm);
  };

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);

    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({});
    router.push("/all-rental-listings", { scroll: false });
  };

  if (isLoading && listings.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBEE] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-center py-4 mb-6">
          {filters.search
            ? `Rentals in ${filters.search}`
            : "All Rental Listings"}
        </h1>

        {/* Search and Filter Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-8">
          <div className="w-full lg:w-auto flex-1 max-w-md">
            <div className="flex gap-2">
              <Input
                placeholder="Search by location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full lg:w-auto">
            <Select
              onValueChange={(value) => updateFilters("rentAmount", value)}
              value={filters.rentAmount || ""}
            >
              <SelectTrigger className="w-full min-w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1000">$0 - $1000</SelectItem>
                <SelectItem value="1000-2000">$1000 - $2000</SelectItem>
                <SelectItem value="2000-3000">$2000 - $3000</SelectItem>
                <SelectItem value="3000+">$3000+</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                updateFilters("numberOfBedrooms", value)
              }
              value={filters.numberOfBedrooms || ""}
            >
              <SelectTrigger className="w-full min-w-[180px]">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4+">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="min-w-[180px]"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.keys(filters).length > 0 && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              {Object.entries(filters).map(([key, value], index) => (
                <span key={key}>
                  {index > 0 && " • "}
                  {key === "rentAmount" &&
                    `Price: ${value.replace("-", " to ").replace("+", "+")}`}
                  {key === "numberOfBedrooms" &&
                    `Bedrooms: ${value.replace("+", "+")}`}
                  {key === "search" && `Location: ${value}`}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <RentalCard property={listing} key={listing._id} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-xl font-medium">No listings found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search filters
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRentalListings;
