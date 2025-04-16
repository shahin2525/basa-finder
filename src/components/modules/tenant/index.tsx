"use client";

// import { NMTable } from "@/components/ui/core/NMTable/index";
// import { IMeta, IReque } from "@/types";
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
  // const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

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

    // {
    //   accessorKey: "action",
    //   header: "Action",
    //   cell: ({ row }) => (
    //     <div className="flex items-center space-x-3">
    //       <button
    //         className="text-gray-500 hover:text-blue-500"
    //         title="View"
    //         onClick={() => handleView(row.original)}
    //       >
    //         <Eye className="w-5 h-5" />
    //       </button>

    //       <button
    //         className="text-gray-500 hover:text-green-500"
    //         title="Edit"
    //         onClick={() =>
    //           router.push(
    //             `/user/shop/requests/update-product/${row.original._id}`
    //           )
    //         }
    //       >
    //         <Edit className="w-5 h-5" />
    //       </button>

    //       <button
    //         className="text-gray-500 hover:text-red-500"
    //         title="Delete"
    //         onClick={() => handleDelete(row.original._id)}
    //       >
    //         <Trash className="w-5 h-5" />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Request</h1>
        <div className="flex items-center gap-2">
          {/* <Button
            onClick={() => router.push("/user/shop/requests/add-product")}
            size="sm"
          >
            Add Product <Plus />
          </Button> */}
        </div>
      </div>
      <NMTable columns={columns} data={requests || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageRequests;
