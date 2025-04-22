import CreateListingForm from "@/components/modules/landlord/CreateListingForm";
import React from "react";

const CreateListingsPage = async () => {
  return (
    <div className="flex items-center justify-center bg-[#F6F1DE] py-5">
      <CreateListingForm />
    </div>
  );
};

export default CreateListingsPage;
