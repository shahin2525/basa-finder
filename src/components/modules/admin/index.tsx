"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { IMeta } from "@/types/meta";
import { NMTable } from "@/components/ui/core/BFTable";
import TablePagination from "@/components/ui/core/BFTable/TablePagination";
import { useState } from "react";
import { toast } from "sonner";

import DeleteConfirmationModal from "@/components/ui/core/BFModal/DeleteConfirmationModal";
import { TUser } from "@/types/user";
import { deleteUser, userActivate, userDeactivate } from "@/services/admin";

const ManageUsers = ({ users, meta }: { users: TUser[]; meta: IMeta }) => {
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: TUser) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };
  const handleDeactivate = async (data: TUser) => {
    try {
      const res = await userDeactivate(data?._id);
      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleActivate = async (data: TUser) => {
    try {
      const res = await userActivate(data?._id);
      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteUser(selectedId);

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
            className="text-gray-500 hover:text-green-500"
            title="Update User role"
            onClick={() =>
              router.push(
                `/dashboard/admin/update-user-role/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          {row?.original?.deactivate ? (
            <button
              className="text-gray-500 hover:text-green-500"
              title="unblock User"
              onClick={() => handleActivate(row?.original)}
            >
              unblock
            </button>
          ) : (
            <button
              className="text-gray-500 hover:text-green-500"
              title="block user"
              onClick={() => handleDeactivate(row?.original)}
            >
              block
            </button>
          )}

          <button
            className="text-gray-500 hover:text-red-500"
            title="Delete User"
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
