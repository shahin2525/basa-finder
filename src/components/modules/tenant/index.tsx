"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Banknote } from "lucide-react";

import { TRequest } from "@/types/request";
import { IMeta } from "@/types/meta";
import { NMTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import { useRouter } from "next/navigation";

const ManageRequests = ({
  requests,
  meta,
}: {
  requests: TRequest[];
  meta: IMeta;
}) => {
  const router = useRouter();
  const columns: ColumnDef<TRequest>[] = [
    {
      accessorKey: "status",
      header: "Request Status",
      cell: ({ row }) => <span>{row.original?.status}</span>,
    },

    {
      accessorKey: "createdAt",
      header: "Request Created Time",
      cell: ({ row }) => (
        <span>{new Date(row.original.createdAt).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "landlord",
      header: "Landlord Contact",
      cell: ({ row }) => (
        <span>{row.original?.landlordPhoneNumber || "N/A"}</span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        // <div className="flex items-center space-x-3">
        //   {/* <button
        //     className="text-gray-500 hover:text-blue-500"
        //     title="View"
        //     onClick={() => handleView(row.original)}
        //   >
        //     <Eye className="w-5 h-5" />
        //   </button> */}
        //   <button
        //     className="text-gray-500 hover:text-green-500"
        //     title="Edit"
        //     onClick={() =>
        //       router.push(
        //         `/dashboard/landlord/update-request-status/${row.original?._id}`
        //       )
        //     }
        //   >
        //     <Banknote className="w-5 h-5" />
        //   </button>
        // </div>
        <div className="flex items-center space-x-3">
          {row.original?.status?.toLowerCase() === "approve" ? (
            <button
              className="text-gray-500 hover:text-green-500"
              title="payment"
              onClick={() =>
                router.push(`/dashboard/tenant/requests/${row.original?._id}`)
              }
            >
              <div className="flex items-center justify-center">
                {" "}
                <span>Go To Payment</span>{" "}
                <Banknote className="w-5 h-5 ml-0.5" />
              </div>
            </button>
          ) : (
            <div>{`Your request is ${row?.original?.status}`}</div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Request</h1>
        <div className="flex items-center gap-2"></div>
      </div>
      <NMTable columns={columns} data={requests || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageRequests;
