// pages/Subscribe.js
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/CheckoutForm";
import { useRouter } from "next/router";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Subscribe() {
  const router = useRouter();
  const { planId } = router.query;
  const [clientSecret, setClientSecret] = useState("");
  const [priceId, setPriceId] = useState(null);

  useEffect(() => {
    async function fetchClientSecret() {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, userId: "eQ0KZTNfoxRrhxagJjvrYvNzsL53" }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setPriceId(data.priceId);
    }
    fetchClientSecret();
  }, [planId]);

  return (
    <div>
      <h1>Subscribe to Plan</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} priceId={priceId} />
        </Elements>
      )}
    </div>
  );
}

export default Subscribe;
