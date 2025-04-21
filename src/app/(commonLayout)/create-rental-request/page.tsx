import CreateRentalRequestForm from "@/components/modules/tenant/CreateRentalRequestForm";

import { getAllListingsForTenant } from "@/services/home";

const CreateRentalRequestPage = async () => {
  const { data } = await getAllListingsForTenant();

  return (
    <div className="bg-[#F6F1DE] h-screen flex items-center justify-center">
      <div className="">
        <CreateRentalRequestForm listings={data} />
      </div>
    </div>
  );
};

export default CreateRentalRequestPage;
