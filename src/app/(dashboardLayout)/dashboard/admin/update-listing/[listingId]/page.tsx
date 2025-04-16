import AdminUpdateListingForm from "@/components/modules/admin/AdminUpdateRentalListingForm";
import { getSingleListing } from "@/services/landlord";

const AdminUpdateRentalListingPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  const { data: listing } = await getSingleListing(listingId);

  return (
    <div className="flex justify-center items-center">
      <AdminUpdateListingForm listing={listing} />
    </div>
  );
};

export default AdminUpdateRentalListingPage;
