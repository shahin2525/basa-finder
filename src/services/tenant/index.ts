"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// create
export const createRentalRequest = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/tenants/requests`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("REQUEST");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all
export const getAllRentalRequests = async () => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/category`,
      {
        next: {
          tags: ["REQUEST"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
