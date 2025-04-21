import ManageOrders from "@/components/modules/payment/Orders";
import { getTenantOrders } from "@/services/payment";

import React from "react";

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getTenantOrders(page, "3");
  // const { data:TList } = getTenantOrders();
  return (
    <div className="bg-[#F6F1DE]">
      <ManageOrders listings={data} meta={meta} />
    </div>
  );
};

export default OrdersPage;
