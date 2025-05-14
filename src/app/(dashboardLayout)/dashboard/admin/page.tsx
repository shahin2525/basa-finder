// import TenantDashboardDefault from "@/components/modules/tenant/TenantDashboardDefault";

import DashboardAdminHome from "@/components/modules/admin/DashboardAdminHome";
import { getAllUsers } from "@/services/admin";

const AdminPage = async () => {
  const { data: users } = await getAllUsers();
  const { data: orders } = await getAllUsers();
  return (
    <div className="p-4 md:p-8">
      {/* <TenantDashboardDefault /> */}
      <DashboardAdminHome users={users} orders={orders} />
    </div>
  );
};

export default AdminPage;
