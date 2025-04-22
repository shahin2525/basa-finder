"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { verifyOrder } from "@/services/payment";

interface OrderData {
  order_id?: string;
  currency?: string;
  amount?: number;
  bank_status?: string;
  date_time?: string;
  method?: string;
  bank_trx_id?: string;
  invoice_no?: string;
  sp_code?: string;
  sp_message?: string;
  name?: string;
  email?: string;
  phone_no?: string;
  address?: string;
  city?: string;
  is_verify?: number;
}

const VerifyOrder = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (!orderId) {
          setError("No order ID provided");
          return;
        }

        setIsLoading(true);
        const response = await verifyOrder(orderId);
        setOrderData(response.data?.[0]);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Progress value={33} className="w-[60%]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p>{orderData?.order_id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p>
                {orderData?.currency} {orderData?.amount?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant={
                  orderData?.bank_status === "Success"
                    ? "default"
                    : "destructive"
                }
              >
                {orderData?.bank_status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p>{new Date(orderData?.date_time || "").toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Method</p>
              <p>{orderData?.method}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p>{orderData?.bank_trx_id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Invoice No</p>
              <p>{orderData?.invoice_no}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">SP Code</p>
              <p>{orderData?.sp_code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">SP Message</p>
              <p>{orderData?.sp_message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p>{orderData?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{orderData?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{orderData?.phone_no}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p>{orderData?.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p>{orderData?.city}</p>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2">
              {orderData?.is_verify === 0 ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span>Not Verified</span>
                </>
              )}
            </div>
            <Link href="/orders-view">
              <Button className="w-full">View Orders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOrder;
