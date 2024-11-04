// src/components/CheckoutButton.js
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutButton() {
  const handleClick = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
    });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return <button onClick={handleClick}>Buy Credits</button>;
}
