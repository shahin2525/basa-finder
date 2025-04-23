import AllRentalListings from "@/components/modules/tenant/AllRentalListing";
import { Suspense } from "react";

const AllRentalListingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AllRentalListings />
    </Suspense>
  );
};

export default AllRentalListingPage;
