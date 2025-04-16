import ManageListings from "@/components/modules/landlord";
import { getAllListings } from "@/services/landlord";
import {} from "@/services/tenant";

const GetAllListingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllListings(page, "3");

  return (
    <div>
      <ManageListings listings={data} meta={meta} />
    </div>
  );
};

export default GetAllListingPage;
