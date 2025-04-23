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
import { useUser } from "@/context/UserContext";

const AllRentalListings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [listings, setListings] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();
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
    if (user?.role !== "tenant") {
      toast.error("Only tenant can search");
      return;
    }
    if (!searchTerm.trim()) return;

    // Check for bedroom patterns (e.g., "2 beds", "3 bedrooms")
    const bedroomMatch = searchTerm.match(
      /(\d+)\s?(bed|beds|bedroom|bedrooms)/i
    );
    if (bedroomMatch) {
      const bedroomCount = bedroomMatch[1];
      updateFilters("numberOfBedrooms", bedroomCount);
      return;
    }

    // Clean the input by removing non-numeric characters except hyphen and plus
    const cleanedInput = searchTerm.replace(/[^0-9+-]/g, "");

    // Check if it's a rent amount (number or range)
    if (cleanedInput.includes("-")) {
      const [min, max] = cleanedInput.split("-").map(Number);
      if (!isNaN(min) && (max === undefined || !isNaN(max))) {
        updateFilters("rentAmount", cleanedInput);
        return;
      }
    } else if (!isNaN(Number(cleanedInput))) {
      updateFilters("rentAmount", cleanedInput);
      return;
    }

    // Default to location search
    updateFilters("search", searchTerm.trim());
  };

  const updateFilters = (key: string, value: string) => {
    if (user?.role !== "tenant") {
      toast.error("Only tenant can filter");
      return;
    }
    const newFilters = { ...filters };

    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }

    setFilters(newFilters);

    // Update URL without page reload
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({});
    router.push("/all-rental-listings", { scroll: false });
  };

  const formatFilterDisplay = (key: string, value: string) => {
    switch (key) {
      case "rentAmount":
        if (value.includes("-")) {
          const [min, max] = value.split("-");
          return max === "+" ? `Price: $${min}+` : `Price: $${min} - $${max}`;
        }
        return `Price: $${value}`;
      case "numberOfBedrooms":
        if (value.includes("-")) {
          const [min, max] = value.split("-");
          return max === "+" ? `${min}+ Bedrooms` : `${min}-${max} Bedrooms`;
        }
        return `${value} Bedroom${value === "1" ? "" : "s"}`;
      case "search":
        return `Location: ${value}`;
      default:
        return `${key}: ${value}`;
    }
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
                placeholder="Search by location, price (e.g., 1500 or 1000-2000), or bedrooms (e.g., 2 beds)"
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
              value={filters.rentAmount || undefined}
            >
              <SelectTrigger className="w-full min-w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1000">$0 - $1000</SelectItem>
                <SelectItem value="1000-2000">$1000 - $2000</SelectItem>
                <SelectItem value="2000-3000">$2000 - $3000</SelectItem>
                <SelectItem value="3000-">$3000+</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                updateFilters("numberOfBedrooms", value)
              }
              value={filters.numberOfBedrooms || undefined}
            >
              <SelectTrigger className="w-full min-w-[180px]">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 Bedroom</SelectItem>
                <SelectItem value="6-10">6-10 Bedrooms</SelectItem>
                <SelectItem value="11-15">11-15 Bedrooms</SelectItem>
                <SelectItem value="16-30">16 plus Bedrooms</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={clearFilters}
              className="min-w-[180px]"
              disabled={Object.keys(filters).length === 0}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {Object.keys(filters).length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.entries(filters).map(([key, value]) => (
              <span
                key={key}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {formatFilterDisplay(key, value)}
                <button
                  onClick={() => updateFilters(key, "")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Listings Grid */}
        {isLoading && listings.length > 0 ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
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
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRentalListings;
