"use client";

// import { NMTable } from "@/components/ui/core/NMTable/index";
// import { IMeta, IReque } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";

import { useRouter } from "next/navigation";

import { TRequest } from "@/types/request";
import { IMeta } from "@/types/meta";
import { NMTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
// import DiscountModal from "./DiscountModal";
// import TablePagination from "@/components/ui/core/NMTable/TablePagination";

const ManageRequests = ({
  requests,
  meta,
}: {
  requests: TRequest[];
  meta: IMeta;
}) => {
  const router = useRouter();
  // const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

  const handleView = (product: TRequest) => {
    console.log("Viewing product:", product);
  };

  const handleDelete = (productId: string) => {
    console.log("Deleting product with ID:", productId);
  };

  const columns: ColumnDef<TRequest>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => {
    //         if (value) {
    //           setSelectedIds((prev) => [...prev, row.original._id]);
    //         } else {
    //           setSelectedIds(
    //             selectedIds.filter((id) => id !== row.original._id)
    //           );
    //         }
    //         row.toggleSelected(!!value);
    //       }}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },

    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          {/* <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          /> */}
          <span className="truncate">{row.original.status}</span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "ListingID",
      cell: ({ row }) => <span>{row.original.listingID}</span>,
    },
    {
      accessorKey: "brand",
      header: "Status",
      cell: ({ row }) => <span>{row.original.status}</span>,
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
                `/user/shop/requests/update-product/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
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
