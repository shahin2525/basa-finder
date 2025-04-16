// import UpdateRequestStatusForm from "@/components/modules/landlord/UpdateRequestStatusForm ";

import UpdateUserRoleForm from "@/components/modules/admin/UpdateUserRoleForm";

const UpdateUserRolePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  return (
    <div className="flex justify-center items-center">
      <UpdateUserRoleForm userId={userId} />
    </div>
  );
};

export default UpdateUserRolePage;
