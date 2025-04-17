"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { TListing } from "@/types/listing";
import { IMeta } from "@/types/meta";
import { NMTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import { useState } from "react";
import { toast } from "sonner";
import { deleteListingForLandlord } from "@/services/landlord";
import DeleteConfirmationModal from "@/components/ui/core/BFModal/DeleteConfirmationModal";

const ManageListings = ({
  listings,
  meta,
}: {
  listings: TListing[];
  meta: IMeta;
}) => {
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: TListing) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.location);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteListingForLandlord(selectedId);

        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<TListing>[] = [
    {
      accessorKey: "location image",
      header: "Location Image",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.multipleImages[0]}
            alt={row.original.location}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
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
            className="text-gray-500 hover:text-green-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/dashboard/landlord/update-listing/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original)}
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
      <NMTable columns={columns} data={listings || []} />
      <TablePagination totalPage={meta?.totalPage} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageListings;
