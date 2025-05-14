"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// create listing
// export const createListing = async (data: FieldValues) => {
//   try {
//     const res = await fetch(
//       `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: (await cookies()).get("accessToken")!.value,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     revalidateTag("Listing");

//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };

//get all categories
export const getAllUsers = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/admin/users?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["User"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//
export const getAllListingsForAdmin = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/admin/listings?limit=${limit}&page=${page}`,
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
// update product
export const updateListingForAdmin = async (
  listingId: string,
  listingData: FieldValues
): Promise<any> => {
  try {
    console.log();
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/admin/listings/${listingId}`,
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

// delete category
export const deleteUser = async (userId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/admin/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("User");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete category
export const deleteListingForAdmin = async (
  listingId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/admin/listings/${listingId}`,
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
export const updateUserRole = async (
  userId: string,
  userData: FieldValues
): Promise<any> => {
  try {
    console.log();
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/admin/users/${userId}`,
      {
        method: "PUT",

        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    revalidateTag("User");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const userActivate = async (userId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/admin/users/${userId}/unblock`,
      {
        method: "PATCH",

        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("User");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//
export const userDeactivate = async (userId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/admin/users/${userId}/block`,
      {
        method: "PATCH",

        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
      }
    );
    revalidateTag("User");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// orders
export const getAllOrders = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/orders?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: {
          tags: ["Order"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
