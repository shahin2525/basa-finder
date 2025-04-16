export type TUser = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: string;
  deactivate?: boolean;
  __v: number;
};
