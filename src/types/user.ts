// export type TUser = {
//   _id: string;
//   name: string;
//   email: string;
//   password?: string;
//   image?: string;
//   role: string;
//   deactivate?: boolean;
//   __v: number;
// };
export type UserRole = "admin" | "landlord" | "tenant";

export interface TUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image?: string;
  bio?: string;
  city: string;
  role: UserRole;
  deactivate: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string;
  __v: number;

  // Optional: Include password only if you handle it in frontend forms (not recommended to expose hashed password)
  password?: string;
}
