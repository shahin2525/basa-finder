"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create listing
export const createRentalListing = async (data: FormData) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data,
      }
    );

    revalidateTag("Listing");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all listing
// export const getAllListings = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings`,
//       {
//         next: {
//           tags: ["Listing"],
//         },
//       }
//     );

//     return res.json();
//   } catch (error: any) {
//     return Error(error);
//   }
// };
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
