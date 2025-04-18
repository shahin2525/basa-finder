import CreateRentalRequestForm from "@/components/modules/tenant/CreateRentalRequestForm";

// import { getAllListingsForTenant } from "@/services/home";

const CreateRentalRequestPage = async () => {
  // const { data } = await getAllListingsForTenant();
  // console.log("data", data);
  return (
    <div className="flex items-center justify-center">
      <CreateRentalRequestForm />
    </div>
  );
};

export default CreateRentalRequestPage;
