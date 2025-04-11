import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create category
export const createRentalRequest = async (data: FormData) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/tenants/requests`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data,
      }
    );

    revalidateTag("REQUEST");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all categories
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
