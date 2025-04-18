import CreateRentalRequestForm from "@/components/modules/tenant/CreateRentalRequestForm";

import { getAllListingsForTenant } from "@/services/home";

const CreateRentalRequestPage = async () => {
  const { data } = await getAllListingsForTenant();

  return (
    <div className="flex items-center justify-center mt-10">
      <CreateRentalRequestForm listings={data} />
    </div>
  );
};

export default CreateRentalRequestPage;
