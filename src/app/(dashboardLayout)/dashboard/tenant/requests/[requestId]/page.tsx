// import { getSingleListing } from "@/services/landlord";

import { getSingleListing } from "@/services/landlord";
import { getSingRequestForPayment } from "@/services/payment";

const PaymentPage = async ({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) => {
  const { requestId } = await params;

  const { data: request } = await getSingRequestForPayment(requestId);
  console.log("request", request);
  const { data: listing } = await getSingleListing(request?.listingID);
  console.log("listing", listing);
  return (
    <div className="flex justify-center items-center">
      {/* <UpdateListingForm listing={listing} /> */}
      <h1>payment page</h1>
    </div>
  );
};

export default PaymentPage;
