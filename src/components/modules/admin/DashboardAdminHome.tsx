"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TUser } from "@/types/user";
import { TOrder } from "@/types/order";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { format } from "date-fns";

type DashboardProps = {
  users: TUser[];
  orders: TOrder[];
};

// Helper functions to process data
const processUserGrowthData = (users: TUser[]) => {
  const monthlyCounts: Record<string, number> = {};

  users?.forEach((user) => {
    const month = format(new Date(user.createdAt), "MMM");
    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
  });

  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((month) => ({
    name: month,
    users: monthlyCounts[month] || 0,
  }));
};

// const processOrderStatusData = (orders: TOrder[]) => {
//   const statusCounts = orders?.reduce((acc, order) => {
//     acc[order.status] = (acc[order?.status] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   return Object.entries(statusCounts).map(([name, value]) => ({
//     name,
//     value,
//   }));
// };
const processOrderStatusData = (orders: TOrder[] = []) => {
  if (!Array.isArray(orders)) return [];

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));
};

const processOrderTrendData = (orders: TOrder[]) => {
  const monthlyCounts: Record<string, number> = {};

  orders?.forEach((order) => {
    const month = format(new Date(order.createdAt), "MMM");
    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
  });

  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((month) => ({
    name: month,
    orders: monthlyCounts[month] || 0,
  }));
};

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

export default function DashboardAdminHome({
  users = [],
  orders = [],
}: DashboardProps) {
  // Process the data for charts
  const userGrowthData = processUserGrowthData(users);
  const orderStatusData = processOrderStatusData(orders);
  const orderTrendData = processOrderTrendData(orders);

  // Calculate summary metrics
  const totalUsers = users.length;
  const totalOrders = orders.length;
  console.log("total orders", orders.length);
  const pendingOrders = orders?.filter((o) => o.status === "Pending").length;
  const revenue = orders?.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  // Get recent activity
  const recentActivities = [
    ...orders?.slice(0, 3).map((order) => ({
      id: order._id,
      text: `New order #${order._id.slice(-4)} from ${order.email}`,
      date: order.createdAt,
    })),
    ...users?.slice(0, 2).map((user) => ({
      id: user._id,
      text: `New user registered: ${user.name}`,
      date: user.createdAt,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderTrendData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {orderStatusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentActivities.slice(0, 5).map((activity) => (
                <li key={activity.text} className="flex items-start gap-2">
                  <span className="inline-block h-2 w-2 mt-2 rounded-full bg-primary" />
                  <span className="text-sm">{activity.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
