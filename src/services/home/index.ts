//
export const getAllListingsForTenant = async () =>
  // page?: string,
  // limit?: string
  {
    try {
      const res = await fetch(
        `${process.env.BASA_FINDER_PUBLIC_BASE_API}/landlords/listings`,
        {
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

// export const getAllListingsForTenant = async () => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/landlords/listings`,
//       {
//         next: {
//           tags: ["Listing"],
//         },
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     return await res.json();
//   } catch (error: any) {
//     console.error("Failed to fetch listings:", error);
//     throw error; // Re-throw to handle in the component
//   }
// };
