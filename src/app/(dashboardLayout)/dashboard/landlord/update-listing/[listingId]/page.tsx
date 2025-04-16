// import UpdateListingForm from "@/components/modules/landlord/UpdateRequestStatusForm ";
import UpdateListingForm from "@/components/modules/landlord/UpdateListingForm";
import { getSingleListing } from "@/services/landlord";

const UpdateListingPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  const { data: listing } = await getSingleListing(listingId);

  return (
    <div className="flex justify-center items-center">
      <UpdateListingForm listing={listing} />
    </div>
  );
};

export default UpdateListingPage;
