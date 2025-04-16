"use client";

import { ColumnDef } from "@tanstack/react-table";
import {} from "lucide-react";

import { TRequest } from "@/types/request";
import { IMeta } from "@/types/meta";
import { NMTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";

const ManageRequests = ({
  requests,
  meta,
}: {
  requests: TRequest[];
  meta: IMeta;
}) => {
  const columns: ColumnDef<TRequest>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span>{row.original?.status}</span>,
    },
    {
      accessorKey: "category",
      header: "ListingID",
      cell: ({ row }) => <span>{row.original?.listingID?._id}</span>,
    },
    {
      accessorKey: "landlord",
      header: "Landlord Contact",
      cell: ({ row }) => (
        <span>{row.original?.landlordPhoneNumber || "N/A"}</span>
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
