// "use server";
// export const getAllListingsForTenant = async (searchParams?: {
//   [key: string]: string | string[] | undefined;
// }) => {
//   try {
//     // Construct query parameters from searchParams
//     const query = new URLSearchParams();
//     if (await searchParams?.search)
//       query.append("search", searchParams!.search as string);
//     if (searchParams?.rentAmount)
//       query.append("rentAmount", searchParams.rentAmount as string);
//     if (searchParams?.numberOfBedrooms)
//       query.append("numberOfBedrooms", searchParams.numberOfBedrooms as string);

//     const res = await fetch(
//       `${
//         process.env.BASA_FINDER_PUBLIC_BASE_API
//       }/landlords/all/listings?${query.toString()}`,
//       {
//         next: {
//           tags: ["Listing"],
//         },
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Failed to fetch listings: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error: any) {
//     console.error("Error fetching listings:", error);
//     throw error;
//   }
// };
"use server";

export const getAllListingsForTenant = async (searchParams?: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const query = new URLSearchParams();

    // Helper to safely get value
    const getValue = (val?: string | string[]) =>
      Array.isArray(val) ? val[0] : val;

    const search = getValue(searchParams?.search);
    const rentAmount = getValue(searchParams?.rentAmount);
    const numberOfBedrooms = getValue(searchParams?.numberOfBedrooms);

    if (search) query.append("search", search);
    if (rentAmount) query.append("rentAmount", rentAmount);
    if (numberOfBedrooms) query.append("numberOfBedrooms", numberOfBedrooms);

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
