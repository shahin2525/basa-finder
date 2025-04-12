// import ManageProducts from "@/components/modules/shop/product";
// import { getAllProducts } from "@/services/Product";

import ManageProducts from "@/components/modules/tenant";
import { getAllRentalRequests } from "@/services/tenant";

const RequestsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllRentalRequests(page, "3");
  return (
    <div>
      <ManageProducts products={data} meta={meta} />
    </div>
  );
};

export default RequestsPage;
