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
          "Content-Type": "application/json",
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
export const getAllListings = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings?limit=${limit}&page=${page}`,
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

// delete category
export const deleteListingForLandlord = async (
  listingId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings/${listingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("Listing");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get single product
export const getSingleListing = async (listingId: string) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings/${listingId}`,
      {
        next: {
          tags: ["Listing"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// update product
export const updateListing = async (
  listingId: string,
  listingData: FieldValues
): Promise<any> => {
  try {
    console.log();
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings/${listingId}`,
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
