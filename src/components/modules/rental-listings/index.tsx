"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye } from "lucide-react";

import { useRouter } from "next/navigation";

import { IMeta } from "@/types/meta";
import { NMTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import { TRequest } from "@/types/request";

const ManageRentalListings = ({
  request,
  meta,
}: {
  request: TRequest[];
  meta: IMeta;
}) => {
  const router = useRouter();

  const handleView = (request: TRequest) => {
    console.log("Viewing product:", request);
  };

  const columns: ColumnDef<TRequest>[] = [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span>{row.original.status}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created Time",
      cell: ({ row }) => (
        <span>{new Date(row.original.createdAt).toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "tenant",
      header: "Tenant Email",
      cell: ({ row }) => <span>{row.original?.tenantID?.email || "N/A"}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/dashboard/landlord/update-request-status/${row.original?._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Rental Listings Request</h1>
      </div>
      <NMTable columns={columns} data={request || []} />
      <TablePagination totalPage={meta?.totalPage} />
      {/* <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      /> */}
    </div>
  );
};

export default ManageRentalListings;
