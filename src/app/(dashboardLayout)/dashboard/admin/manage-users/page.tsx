import ManageUsers from "@/components/modules/admin";
import { getAllUsers } from "@/services/admin";

const GetAllUserPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllUsers(page, "3");

  return (
    <div>
      <ManageUsers users={data} meta={meta} />
    </div>
  );
};

export default GetAllUserPage;
