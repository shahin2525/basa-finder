"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// update product
export const updateRentalRequestStatus = async (
  listingId: string,
  listingData: FieldValues
): Promise<any> => {
  try {
    console.log();
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/requests/${listingId}`,
      {
        method: "PUT",

        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      }
    );
    revalidateTag("Listing");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
