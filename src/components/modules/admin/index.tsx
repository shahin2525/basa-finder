"use client";

// import { NMTable } from "@/components/ui/core/NMTable/index";
// import { IMeta, IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { IMeta } from "@/types/meta";
import { NMTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import { useState } from "react";
import { toast } from "sonner";
import { deleteListingForLandlord } from "@/services/landlord";
import DeleteConfirmationModal from "@/components/ui/core/BFModal/DeleteConfirmationModal";
import { TUser } from "@/types/user";
// import DiscountModal from "./DiscountModal";
// import TablePaginatio from "@/components/ui/core/NMTable/TablePagination";

const ManageUsers = ({ users, meta }: { users: TUser[]; meta: IMeta }) => {
  const router = useRouter();
  // const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

  const handleView = (users: TUser) => {
    console.log("Viewing product:", users);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: TUser) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteListingForLandlord(selectedId);
        console.log(res);
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

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "location image",
      header: "User Name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original?.image || "https://github.com/shadcn.png"}
            alt={row.original?.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original?.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original?.email}</span>,
    },

    {
      accessorKey: "role",
      header: "User Role",
      cell: ({ row }) => <span>{row.original?.role}</span>,
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
      <NMTable columns={columns} data={users || []} />
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

export default ManageUsers;
