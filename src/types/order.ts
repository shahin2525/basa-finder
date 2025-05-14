export type TransactionStatus = "Initiated" | "Pending" | "Success" | "Failed";
export type OrderStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export interface TOrder {
  transaction: {
    id: string;
    transactionStatus: TransactionStatus;
  };
  _id: string;
  email: string;
  listing: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string; // ISO Date string
  updatedAt: string;
  __v: number;
}
