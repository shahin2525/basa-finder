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
