"use client";
import { useUser } from "@/context/UserContext";

const TenantDashboardDefault = () => {
  const { user } = useUser();
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">
        {user?.role} dashboard by default page
      </h1>

      {/* Welcome section */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600">
          You are renting at{" "}
          <span className="font-medium">Sunshine Apartments</span>. Here is what
          is happening with your tenancy.
        </p>
      </div>

      {/* Quick stats cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-6">
        <div className="aspect-video rounded-xl bg-white p-4 shadow-sm border">
          <h3 className="text-sm text-gray-500">Next Rent Due</h3>
          <p className="text-2xl font-bold">$1,200</p>
          <p className="text-sm mt-2">Due in 5 days (May 1)</p>
        </div>
        <div className="aspect-video rounded-xl bg-white p-4 shadow-sm border">
          <h3 className="text-sm text-gray-500">Maintenance Requests</h3>
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm mt-2">1 pending, 1 completed</p>
        </div>
        <div className="aspect-video rounded-xl bg-white p-4 shadow-sm border">
          <h3 className="text-sm text-gray-500">Lease End Date</h3>
          <p className="text-2xl font-bold">Oct 15, 2024</p>
          <p className="text-sm mt-2">5 months remaining</p>
        </div>
      </div>

      {/* Recent activity section */}
      <div className="min-h-[50vh] rounded-xl bg-white p-4 shadow-sm border mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="font-medium">Maintenance request submitted</p>
            <p className="text-sm text-gray-500">
              Kitchen faucet leak - April 18
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium">Rent payment received</p>
            <p className="text-sm text-gray-500">$1,200 - April 1</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium">Lease renewal reminder</p>
            <p className="text-sm text-gray-500">Sent March 30</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm">
            Pay Rent
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm">
            Request Maintenance
          </button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md text-sm">
            Message Landlord
          </button>
          <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md text-sm">
            View Lease
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboardDefault;
