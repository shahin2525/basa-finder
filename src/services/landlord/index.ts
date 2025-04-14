"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// create listing
export const createListing = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("Listing");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all categories
export const getAllListings = async () => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["Listing"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//
export const getAllRentalRequests = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/tenants/requests?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
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
