// "use client";

// import { RentalCard } from "@/components/modules/home/card-section/card";
// import { getAllListingsForTenant } from "@/services/home";
// import { TListing } from "@/types/listing";
// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import { useUser } from "@/context/UserContext";

// const AllRentalListings = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filters, setFilters] = useState<Record<string, string>>({});
//   const [listings, setListings] = useState<TListing[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const { user } = useUser();

//   // Initialize filters from URL params
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     const initialFilters: Record<string, string> = {};

//     if (params.has("search")) {
//       const searchValue = params.get("search") || "";
//       setSearchTerm(searchValue);
//       initialFilters.search = searchValue;
//     }
//     if (params.has("rentAmount")) {
//       initialFilters.rentAmount = params.get("rentAmount") || "";
//     }
//     if (params.has("numberOfBedrooms")) {
//       initialFilters.numberOfBedrooms = params.get("numberOfBedrooms") || "";
//     }

//     setFilters(initialFilters);
//   }, [searchParams]);

//   // Fetch listings when filters change
//   useEffect(() => {
//     const fetchListings = async () => {
//       setIsLoading(true);
//       try {
//         const response = await getAllListingsForTenant(filters);
//         setListings(response?.data || []);
//       } catch (error) {
//         toast.error("Failed to fetch listings");
//         console.error("Error fetching listings:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchListings();
//   }, [filters]);

//   const handleSearch = () => {
//     if (user?.role !== "tenant") {
//       toast.error("Only tenants can search listings");
//       return;
//     }

//     const trimmedTerm = searchTerm.trim();

//     // Clear previous search filter if input is empty
//     if (!trimmedTerm) {
//       updateFilters("search", "");
//       return;
//     }

//     // Treat the input as location search
//     updateFilters("search", trimmedTerm);
//   };

//   const handlePriceFilter = (value: string) => {
//     if (user?.role !== "tenant") {
//       toast.error("Only tenants can filter by price");
//       return;
//     }
//     updateFilters("rentAmount", value);
//   };

//   const handleBedroomFilter = (value: string) => {
//     if (user?.role !== "tenant") {
//       toast.error("Only tenants can filter by bedrooms");
//       return;
//     }
//     updateFilters("numberOfBedrooms", value);
//   };

//   const updateFilters = (key: string, value: string) => {
//     const newFilters = { ...filters };

//     if (value) {
//       newFilters[key] = value;
//     } else {
//       delete newFilters[key];
//     }

//     setFilters(newFilters);

//     // Update URL without page reload
//     const params = new URLSearchParams();
//     Object.entries(newFilters).forEach(([key, value]) => {
//       if (value) params.set(key, value);
//     });
//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   const clearFilters = () => {
//     if (user?.role !== "tenant") {
//       toast.error("Only tenants can clear filters");
//       return;
//     }
//     setSearchTerm("");
//     setFilters({});
//     router.push("/all-rental-listings", { scroll: false });
//   };

//   const formatFilterDisplay = (key: string, value: string) => {
//     switch (key) {
//       case "rentAmount":
//         if (value.includes("-")) {
//           const [min, max] = value.split("-");
//           return max === "+" ? `Price: $${min}+` : `Price: $${min} - $${max}`;
//         }
//         return `Price: $${value}`;
//       case "numberOfBedrooms":
//         if (value.includes("-")) {
//           const [min, max] = value.split("-");
//           return max === "+" ? `${min}+ Bedrooms` : `${min}-${max} Bedrooms`;
//         }
//         return `${value} Bedroom${value === "1" ? "" : "s"}`;
//       case "search":
//         return `Location: ${value}`;
//       default:
//         return `${key}: ${value}`;
//     }
//   };

//   if (isLoading && listings.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-[calc(100vh-200px)]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FDFBEE] py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold tracking-tight text-center py-4 mb-6">
//           {filters.search
//             ? `Rentals in ${filters.search}`
//             : "All Rental Listings"}
//         </h1>

//         {/* Search and Filter Section */}
//         <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-8">
//           <div className="w-full lg:w-auto flex-1 max-w-md">
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Search by location (e.g., 'Oval', 'osaka')"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 className="flex-1"
//                 // disabled={user?.role !== "tenant"}
//               />
//               <Button
//                 onClick={handleSearch}
//                 // disabled={user?.role !== "tenant"}
//               >
//                 Search
//               </Button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full lg:w-auto">
//             <Select
//               onValueChange={handlePriceFilter}
//               value={filters.rentAmount || ""}
//               disabled={user?.role !== "tenant"}
//             >
//               <SelectTrigger className="w-full min-w-[180px]">
//                 <SelectValue placeholder="Price Range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="0-2000">$0 - $2000</SelectItem>
//                 <SelectItem value="3000-5000">$3000 - $5000</SelectItem>
//                 <SelectItem value="6000-8000">$6000 - $8000</SelectItem>
//                 <SelectItem value="9000-40000">$9000-40000</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select
//               onValueChange={handleBedroomFilter}
//               value={filters.numberOfBedrooms || ""}
//               disabled={user?.role !== "tenant"}
//             >
//               <SelectTrigger className="w-full min-w-[180px]">
//                 <SelectValue placeholder="Bedrooms" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="1-5">1-5 Bedrooms</SelectItem>
//                 <SelectItem value="6-10">6-10 Bedrooms</SelectItem>
//                 <SelectItem value="11-15">11-15 Bedrooms</SelectItem>
//                 <SelectItem value="16-20">16-20 Bedrooms</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button
//               onClick={clearFilters}
//               className="min-w-[180px] bg-amber-500"
//               disabled={
//                 Object.keys(filters).length === 0 || user?.role !== "tenant"
//               }
//             >
//               Clear Filters
//             </Button>
//           </div>
//         </div>

//         {/* Active Filters Display */}
//         {Object.keys(filters).length > 0 && (
//           <div className="flex flex-wrap justify-center gap-2 mb-6">
//             {Object.entries(filters).map(([key, value]) => (
//               <span
//                 key={key}
//                 className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
//               >
//                 {formatFilterDisplay(key, value)}
//                 <button
//                   onClick={() => updateFilters(key, "")}
//                   className="text-gray-500 hover:text-gray-700"
//                   disabled={user?.role !== "tenant"}
//                 >
//                   ×
//                 </button>
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Listings Grid */}
//         {isLoading && listings.length > 0 ? (
//           <div className="flex justify-center py-4">
//             <Loader2 className="h-6 w-6 animate-spin text-primary" />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {listings.length > 0 ? (
//               listings.map((listing) => (
//                 <RentalCard property={listing} key={listing._id} />
//               ))
//             ) : (
//               <div className="col-span-full text-center py-10">
//                 <h3 className="text-xl font-medium">No listings found</h3>
//                 <p className="text-gray-500 mt-2">
//                   Try adjusting your search filters
//                 </p>
//                 <Button
//                   variant="outline"
//                   className="mt-4"
//                   onClick={clearFilters}
//                   disabled={user?.role !== "tenant"}
//                 >
//                   Clear all filters
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllRentalListings;
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
import { Loader2, X, SlidersHorizontal } from "lucide-react";
import { useUser } from "@/context/UserContext";

const AllRentalListings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [listings, setListings] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const listingsPerPage = 6;

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
    if (params.has("page")) {
      setCurrentPage(Number(params.get("page")));
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

  // Pagination logic
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  const totalPages = Math.ceil(listings.length / listingsPerPage);

  const handleSearch = () => {
    if (user?.role !== "tenant") {
      toast.error("Only tenants can search listings");
      return;
    }

    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) {
      updateFilters("search", "");
      return;
    }
    updateFilters("search", trimmedTerm);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePriceFilter = (value: string) => {
    if (user?.role !== "tenant") {
      toast.error("Only tenants can filter by price");
      return;
    }
    updateFilters("rentAmount", value);
    setCurrentPage(1);
  };

  const handleBedroomFilter = (value: string) => {
    if (user?.role !== "tenant") {
      toast.error("Only tenants can filter by bedrooms");
      return;
    }
    updateFilters("numberOfBedrooms", value);
    setCurrentPage(1);
  };

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);

    // Update URL with filters and current page
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    params.set("page", currentPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    if (user?.role !== "tenant") {
      toast.error("Only tenants can clear filters");
      return;
    }
    setSearchTerm("");
    setFilters({});
    setCurrentPage(1);
    router.push("/all-rental-listings?page=1", { scroll: false });
  };

  const formatFilterDisplay = (key: string, value: string) => {
    switch (key) {
      case "rentAmount":
        if (value.includes("-")) {
          const [min, max] = value.split("-");
          return max === "+" ? `$${min}+` : `$${min}-$${max}`;
        }
        return `$${value}`;
      case "numberOfBedrooms":
        if (value.includes("-")) {
          const [min, max] = value.split("-");
          return max === "+" ? `${min}+` : `${min}-${max}`;
        }
        return `${value}`;
      case "search":
        return value;
      default:
        return value;
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (isLoading && listings.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBEE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile filter button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {filters.search ? `Rentals in ${filters.search}` : "All Rentals"}
          </h1>
          <Button
            onClick={() => setIsSidebarOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Search
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button onClick={handleSearch}>Go</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price Range
                  </label>
                  <Select
                    onValueChange={handlePriceFilter}
                    value={filters.rentAmount || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2000">$0 - $2000</SelectItem>
                      <SelectItem value="3000-5000">$3000 - $5000</SelectItem>
                      <SelectItem value="6000-8000">$6000 - $8000</SelectItem>
                      <SelectItem value="9000-40000">$9000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bedrooms
                  </label>
                  <Select
                    onValueChange={handleBedroomFilter}
                    value={filters.numberOfBedrooms || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5</SelectItem>
                      <SelectItem value="6-10">6-10</SelectItem>
                      <SelectItem value="11-15">11-15</SelectItem>
                      <SelectItem value="16-20">16-20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full mt-2"
                  disabled={Object.keys(filters).length === 0}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsSidebarOpen(false)}
              />
              <div className="absolute inset-y-0 left-0 w-72 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Search
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                      <Button onClick={handleSearch}>Go</Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price Range
                    </label>
                    <Select
                      onValueChange={handlePriceFilter}
                      value={filters.rentAmount || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2000">$0 - $2000</SelectItem>
                        <SelectItem value="3000-5000">$3000 - $5000</SelectItem>
                        <SelectItem value="6000-8000">$6000 - $8000</SelectItem>
                        <SelectItem value="9000-40000">$9000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Bedrooms
                    </label>
                    <Select
                      onValueChange={handleBedroomFilter}
                      value={filters.numberOfBedrooms || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5</SelectItem>
                        <SelectItem value="6-10">6-10</SelectItem>
                        <SelectItem value="11-15">11-15</SelectItem>
                        <SelectItem value="16-20">16-20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full mt-2"
                    disabled={Object.keys(filters).length === 0}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {Object.keys(filters).length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => (
                    <span
                      key={key}
                      className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm"
                    >
                      <span className="font-medium">
                        {key === "rentAmount"
                          ? "Price"
                          : key === "numberOfBedrooms"
                          ? "Bedrooms"
                          : "Location"}
                        :
                      </span>
                      {formatFilterDisplay(key, value)}
                      <button
                        onClick={() => updateFilters(key, "")}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Listings Grid */}
            {isLoading && listings.length > 0 ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentListings.length > 0 ? (
                    currentListings.map((listing) => (
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <nav className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => paginate(pageNum)}
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          paginate(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRentalListings;
