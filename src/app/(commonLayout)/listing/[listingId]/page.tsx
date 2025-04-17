// import ProductBanner from "@/components/modules/products/banner";
// import ProductDetails from "@/components/modules/products/productDetails";
// import NMContainer from "@/components/ui/core/NMContainer";
// import { getSingleProduct } from "@/services/Product";

import RentalListingDetails from "@/components/modules/home/rental-listing/RentalListingDetails";
import { getSingleListing } from "@/services/admin";

const RentalListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  const { data: listing } = await getSingleListing(listingId);

  return (
    <div>
      <RentalListingDetails listing={listing} />
    </div>
  );
};

export default RentalListingDetailsPage;
