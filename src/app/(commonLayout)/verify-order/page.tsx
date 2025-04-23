import VerifyOrder from "@/components/modules/payment/VerifyOrder";
import { Suspense } from "react";

const verifyOrderPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-[#F6F1DE]">
        <VerifyOrder />
      </div>
    </Suspense>
  );
};

export default verifyOrderPage;
