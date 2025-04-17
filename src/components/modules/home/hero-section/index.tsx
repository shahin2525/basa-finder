"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import heroImage from "@/assets/svgs/hero.jpg";
import { useUser } from "@/context/UserContext";

export default function HeroSection() {
  const router = useRouter();

  // Search state
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const { user } = useUser();

  const handleCreateListing = () => {
    // Check if user exists and is landlord

    if (!user) {
      toast.error("Please login to create a rental house listing");
      return;
    }
    if (user?.role !== "landlord") {
      toast.error("Only landlord role user can create rental house");
      return;
    }
    router.push("/dashboard/landlord/create-listing");
  };

  const handleSearch = () => {
    // Check if user exists and is tenant

    if (!user) {
      toast.error("Please login to search for rentals");
      return;
    }
    if (user.role !== "tenant") {
      toast.error("Only tenants can search listings");
      return;
    }

    // Redirect with query params
    const query = new URLSearchParams();
    if (location) query.append("location", location);
    if (priceRange) query.append("rentAmount", priceRange);
    if (bedrooms) query.append("numberOfBedrooms", bedrooms);

    router.push(`/all-listing-page?${query.toString()}`);
  };

  return (
    <section className="relative h-[750px] md:h-[600px] lg:h-[600px] w-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          alt="hero-img"
          src={heroImage}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full w-full">
        {/* Centered Content */}
        <div className="flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Find Your Perfect Rental House Today!
            </h1>
            <p className="text-lg sm:text-xl">
              Discover the best rental properties in your desired location
            </p>
            {/* CTA Button */}{" "}
            <Button
              onClick={handleCreateListing}
              size="lg"
              className="bg-primary hover:bg-primary/90 cursor-pointer"
            >
              Add Rental House
            </Button>
            {/* Search Form */}
            <div className="mt-8 rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-xl font-semibold">
                Search Rentals House
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {/* Location */}
                <div>
                  <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-white text-gray-900"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <Select onValueChange={setPriceRange}>
                    <SelectTrigger className="bg-white text-gray-900">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="0-1000">$0 - $1000</SelectItem>
                      <SelectItem value="1000-2000">$1000 - $2000</SelectItem>
                      <SelectItem value="2000-3000">$2000 - $3000</SelectItem>
                      <SelectItem value="3000+">$3000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div>
                  <Select onValueChange={setBedrooms}>
                    <SelectTrigger className="bg-white text-gray-900">
                      <SelectValue placeholder="Bedrooms" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="1-3">1-3 Bedroom</SelectItem>
                      <SelectItem value="4-7">4-7 Bedrooms</SelectItem>
                      <SelectItem value="8-11">8-11 Bedrooms</SelectItem>
                      <SelectItem value="12+">12+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
