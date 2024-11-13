import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ clientSecret, priceId, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Payment successful
    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Subscribe to {priceId}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border p-4 rounded-md bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#f56565" },
              },
            }}
          />
        </div>

        {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mt-4">Payment Successful!</div>}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
