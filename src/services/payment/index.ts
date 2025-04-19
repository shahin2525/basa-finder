"use server";
import { cookies } from "next/headers";

// get single product
export const getSingRequestForPayment = async (listingId: string) => {
  console.log("listingId", listingId);
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/tenants/requests/payment/${listingId}`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["REQUEST"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
