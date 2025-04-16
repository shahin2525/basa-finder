// export type TRequest = {
//   _id: string;
//   listingID: string;
//   tenantID: string;
//   //   quantity: number;
//   //   totalPrice: number;
//   status: string;
//   landlordPhoneNumber?: string;
//   //   transaction: {
//   //     id: string;
//   //     transactionStatus: string;
//   //     bank_status: string;
//   //     sp_code: string;
//   //     sp_message: string;
//   //     method: string;
//   //     date_time: string;
//   //   };
//   createdAt: string;
//   updatedAt: string;
// };

type TTenant = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  deactivate: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TRequest = {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  listingID: {
    _id: string;
    description: string;
    landlordID: string;
    location: string;
    multipleImages: string[];
    numberOfBedrooms: number;
    rentAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  tenantID: TTenant; // Changed from string to TTenant
  landlordPhoneNumber?: string;
};
