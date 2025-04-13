"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// update profile
export const updateProfile = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/auth/update-profile`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // revalidateTag("REQUEST");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// change password
// update profile
export const changePassword = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.BASA_FINDER_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // revalidateTag("REQUEST");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
