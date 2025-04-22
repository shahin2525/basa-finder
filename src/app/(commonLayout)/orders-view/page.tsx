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
    <div className="bg-[#F6F1DE] flex justify-center items-center h-screen ">
      <div className="border-2 border-gray-300 rounded-xl flex-grow p-5 bg-white sm:max-w-[500px] md:max-w-3xl">
        <ManageOrders listings={data} meta={meta} />
      </div>
    </div>
  );
};

export default OrdersPage;
