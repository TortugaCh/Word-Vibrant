import React, { useEffect, useState } from "react";
import Template from "../../components/Template";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Pricing = () => {
  const [pricingplans, setPricingPlans] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const resp = await fetch("/api/plans/get-pricing-plans");
        const data = await resp.json();
        if (data && data.data) {
          setPricingPlans(data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPricingPlans();

    return () => {
      setPricingPlans([]);
    };
  }, []);

  console.log(pricingplans);

  // Define additional static data
  const additionalInfo = {
    "Basic Plan": {
      icon: "⭐",
      color: "green",
      description: "70 stroke orders, 35 coloring pages, 23 stories",
    },
    "Standard Plan": {
      icon: "🌟",
      color: "red",
      description: "200 stroke orders, 100 coloring pages, 67 stories",
    },
    "Premium Plan": {
      icon: "🚀",
      color: "purple",
      description: "500 stroke orders, 250 coloring pages, 150 stories",
    },
  };

  const handleCheckout = async (priceId, planId, userId) => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to initialize");
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, userId, priceId }),
      });

      const session = await response.json();

      if (response.ok) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        console.error("Error creating checkout session:", session.error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  const handleSubscribe = async (plan, userId) => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, userId }),
    });

    const { paymentUrl, formData } = await res.json();
    if (paymentUrl) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentUrl;
      console.log(Object.keys(formData));
      Object.keys(formData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      console.log("Submitting form to:", paymentUrl);
      console.log("Form Data:", formData);
      form.submit();
    }
  };
  const PlanItem = ({ plan }) => {
    const { name, cost, credits, priceId } = plan;
    const additional = additionalInfo[name];

    return (
      <div
        className={`relative bg-gradient-to-b from-${additional.color}-100 to-${additional.color}-200 p-10 rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-visible`}
      >
        <h4 className={`text-3xl font-bold text-${additional.color}-600 mb-4`}>
          {name}
        </h4>
        <p className="text-gray-700 mb-4"> NT${cost}</p>
        <p className="text-gray-700 mb-4">Credits: {credits} </p>
        <p className="text-sm text-gray-500 mb-6">{additional.description}</p>
        <button
          className={`mt-4 bg-${additional.color}-500 text-white px-6 py-3 rounded-full hover:bg-${additional.color}-700 transition`}
          onClick={
            () =>
              handleCheckout(
                plan.priceId,
                plan.planId,
                "eQ0KZTNfoxRrhxagJjvrYvNzsL53"
              )
            // router.push(`/checkout/${plan.planId}`)
          }
        >
          Buy Now
        </button>
        <div
          className={`absolute -top-8 -right-8 w-16 h-16 bg-${additional.color}-400 rounded-full flex items-center justify-center text-4xl shadow-lg`}
        >
          {additional.icon}
        </div>
      </div>
    );
  };

  return (
    <Template>
      <h3 className="text-4xl font-bold text-purple-700 mb-12">
        Choose Your Plan
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {pricingplans.reverse().map((plan) => (
          <PlanItem key={plan.planId} plan={plan} />
        ))}
        {/* {pricingplans.length > 0 && <PlanItem plan={pricingplans[0]} />} */}
      </div>
    </Template>
  );
};

export default Pricing;
