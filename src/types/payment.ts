interface Transaction {
  id: string;
  transactionStatus: null;
  bank_status: "Success";
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface TOrder {
  _id: string;
  email: string;
  listing: string;
  quantity: number;
  totalPrice: number;
  status: "Paid" | string; // Assuming there might be other statuses
  createdAt: string; // or Date if you prefer
  updatedAt: string; // or Date if you prefer
  __v: number;
  transaction: Transaction;
}
