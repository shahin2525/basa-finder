import ManageRentalListings from "@/components/modules/rental-listings";
import { getAllRentalListingsRequests } from "@/services/landlord";

const ViewRentalListing = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllRentalListingsRequests(page, "3");
  return (
    <div>
      <div>
        <ManageRentalListings request={data} meta={meta} />
      </div>
    </div>
  );
};

export default ViewRentalListing;
