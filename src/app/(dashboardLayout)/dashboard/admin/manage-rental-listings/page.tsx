import AdminManageRentalListings from "@/components/modules/admin/ManageRentalListings";
import { getAllListingsForAdmin } from "@/services/admin";
// import { getAllListings } from "@/services/landlord";
import {} from "@/services/tenant";

const ManageRentalListingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllListingsForAdmin(page, "3");

  return (
    <div>
      <AdminManageRentalListings listings={data} meta={meta} />
    </div>
  );
};

export default ManageRentalListingPage;
