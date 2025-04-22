"use server";
export const getAllListingsForTenant = async (searchParams?: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    // Construct query parameters from searchParams
    const query = new URLSearchParams();
    if (await searchParams?.search)
      query.append("search", searchParams!.search as string);
    if (searchParams?.rentAmount)
      query.append("rentAmount", searchParams.rentAmount as string);
    if (searchParams?.numberOfBedrooms)
      query.append("numberOfBedrooms", searchParams.numberOfBedrooms as string);

    const res = await fetch(
      `${
        process.env.BASA_FINDER_PUBLIC_BASE_API
      }/landlords/all/listings?${query.toString()}`,
      {
        next: {
          tags: ["Listing"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch listings: ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    throw error;
  }
};
// export const getAllListingsForTenant = async () =>
//   // page?: string,
//   // limit?: string
//   {
//     try {
//       const res = await fetch(
//         `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings`,
//         {
//           next: {
//             tags: ["Listing"],
//           },
//         }
//       );

//       return res.json();
//     } catch (error: any) {
//       return Error(error);
//     }
//   };

//
