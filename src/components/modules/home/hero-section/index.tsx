"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import heroImage from "@/assets/svgs/hero.jpg";
import { useUser } from "@/context/UserContext";

export default function HeroSection() {
  const router = useRouter();

  // Search state
  // const [location, setLocation] = useState("");
  // const [rentAmount, setRentAmount] = useState("");
  // const [numberOfBedrooms, setBedrooms] = useState("");
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
    router.push("/create-listing");
  };

  // // const handleSearch = () => {
  // //   // Check if user exists and is tenant

  // //   if (!user) {
  // //     toast.error("Please login to search for rentals");
  // //     return;
  // //   }
  // //   if (user.role !== "tenant") {
  // //     toast.error("Only tenants can search listings");
  // //     return;
  // //   }

  // //   // Redirect with query params
  // //   const query = new URLSearchParams();
  // //   if (location) query.append("location", location);
  // //   if (rentAmount) query.append("rentAmount", rentAmount);
  // //   if (numberOfBedrooms) query.append("numberOfBedrooms", numberOfBedrooms);

  // //   router.push(`/all-rental-listings?${query.toString()}`);
  // // };
  // // In your handleSearch function:
  // const handleSearch = () => {
  //   if (!user) {
  //     toast.error("Please login to search for rentals");
  //     return;
  //   }
  //   if (user.role !== "tenant") {
  //     toast.error("Only tenants can search listings");
  //     return;
  //   }

  //   const query = new URLSearchParams();
  //   if (location) query.append("search", location);
  //   if (rentAmount) query.append("rentAmount", rentAmount);
  //   if (numberOfBedrooms) query.append("numberOfBedrooms", numberOfBedrooms);

  //   router.push(`/all-rental-listings?${query.toString()}`);
  // };
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
                Hired And Post Your Rentals House
              </h2>
              <p className="mb-4 text-xl font-semibold">
                Agents. Tours. Loans. Homes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
