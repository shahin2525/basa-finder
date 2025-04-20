// import { getSingleListing } from "@/services/landlord";

import Checkout from "@/components/modules/payment/PaymentCheckout";
import { getSingleListing } from "@/services/landlord";
import { getSingRequestForPayment } from "@/services/payment";

const PaymentPage = async ({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) => {
  const { requestId } = await params;

  const { data: request } = await getSingRequestForPayment(requestId);

  const { data: listing } = await getSingleListing(request?.listingID);

  return (
    <div className="flex justify-center items-center">
      {/* <UpdateListingForm listing={listing} /> */}
      <Checkout listingData={listing} />
    </div>
  );
};

export default PaymentPage;
