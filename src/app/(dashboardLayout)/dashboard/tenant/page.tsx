// const TenantPage = () => {
//   return (
//     <div>
//       <h1>Tenant Dashboard Page</h1>
//       <div>
//         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//           <div className="aspect-video rounded-xl bg-muted " />
//           <div className="aspect-video rounded-xl bg-muted" />
//           <div className="aspect-video rounded-xl bg-muted" />
//         </div>
//         <div className="min-h-[100vh] rounded-xl bg-muted mt-4" />
//       </div>
//     </div>
//   );
// };

import TenantDashboardDefault from "@/components/modules/tenant/TenantDashboardDefault";

// export default TenantPage;
const TenantPage = () => {
  return (
    <div className="p-4 md:p-8">
      <TenantDashboardDefault />
    </div>
  );
};

export default TenantPage;
