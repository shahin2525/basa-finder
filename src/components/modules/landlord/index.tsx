"use client";

// import { NMTable } from "@/components/ui/core/NMTable/index";
// import { IMeta, IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { TListing } from "@/types/listing";
import { IMeta } from "@/types/meta";
import { NMTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
// import DiscountModal from "./DiscountModal";
// import TablePaginatio from "@/components/ui/core/NMTable/TablePagination";

const ManageListings = ({
  products,
  meta,
}: {
  products: TListing[];
  meta: IMeta;
}) => {
  const router = useRouter();
  // const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

  const handleView = (product: TListing) => {
    console.log("Viewing product:", product);
  };

  const handleDelete = (productId: string) => {
    console.log("Deleting product with ID:", productId);
  };

  const columns: ColumnDef<TListing>[] = [
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
      accessorKey: "location image",
      header: "Location Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.multipleImages[0]}
            alt={row.original.location}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.location}</span>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span>{row.original.location}</span>,
    },

    {
      accessorKey: "amount",
      header: "Rent-Amount",
      cell: ({ row }) => <span>$ {row.original.rentAmount.toFixed(2)}</span>,
    },
    {
      accessorKey: "rooms",
      header: "Number Of Bedrooms",
      cell: ({ row }) => <span>$ {row.original.numberOfBedrooms}</span>,
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
                `/user/shop/products/update-product/${row.original._id}`
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
        <h1 className="text-xl font-bold">Manage Listings</h1>
      </div>
      <NMTable columns={columns} data={products || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageListings;
