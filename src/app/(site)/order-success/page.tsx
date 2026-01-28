import { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccessClient";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessFallback />}>
      <OrderSuccessClient />
    </Suspense>
  );
}

function OrderSuccessFallback() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <p>Loading order details…</p>
    </main>
  );
}
