import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useUserContext } from "../../context/UserContext";
import { withMessages } from "../../lib/getMessages";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PricingSection({ isSection = false, t }) {
  const [pricingplans, setPricingPlans] = useState([]);
  const { userData } = useUserContext();
  const router = useRouter();
  const { locale } = router;

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

    return () => setPricingPlans([]);
  }, []);

  const additionalInfo = {
    "Basic Plan": { icon: "⭐", color: "green" },
    "Standard Plan": { icon: "🌟", color: "red" },
    "Premium Plan": { icon: "🚀", color: "purple" },
  };

  const handleCheckout = async (priceId, planId, userId) => {
    if (!userId) {
      router.push("/auth");
      return;
    }
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

  const PlanItem = ({ plan }) => {
    const { name, cost, credits, priceId, nameZh, description, descriptionZh } =
      plan;
    const additional = additionalInfo[name];

    return (
      <div
        className={`relative bg-gradient-to-b from-${additional.color}-50 to-${additional.color}-200 p-10 rounded-3xl shadow-2xl hover:shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 ease-in-out`}
      >
        {/* Dynamic Plan Tag */}
        {/* Dynamic Plan Tag */}
        <div
          className={`absolute -top-4 -left-4 ${
            name.includes("Premium")
              ? "bg-yellow-400"
              : name.includes("Standard")
              ? "bg-blue-400"
              : "bg-gray-400"
          } text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`}
          style={{
            transform: "rotate(-15deg)", // Rotate the tag
            transformOrigin: "center", // Keep rotation centered
          }}
        >
          {name.includes("Premium")
            ? "Premium"
            : name.includes("Standard")
            ? "Standard"
            : "Basic"}
        </div>

        {/* Card Content */}
        <h4
          className={`text-4xl font-extrabold text-${additional.color}-700 mb-4`}
        >
          {locale === "en" ? name : nameZh}
        </h4>
        <p className="text-gray-700 mb-4">NT${cost}</p>
        <p className="text-gray-700 mb-4">Credits: {credits}</p>

        {/* Buy Button */}
        <button
          className={`px-6 py-3 rounded-full text-white shadow-xl transition-all duration-300`}
          style={{
            background: `linear-gradient(to right, ${
              additional.color === "green"
                ? "#22c55e, #15803d"
                : additional.color === "red"
                ? "#ef4444, #dc2626"
                : "#8b5cf6, #6d28d9"
            })`,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          onMouseOver={(e) => (e.target.style.filter = "brightness(1.2)")}
          onMouseOut={(e) => (e.target.style.filter = "brightness(1)")}
          onClick={() =>
            handleCheckout(plan.priceId, plan.id, userData?.userId)
          }
        >
          {t("buyNow")}
        </button>

        {/* Icon Wrapper */}
        <div
          className={`absolute -top-8 -right-8 w-16 h-16 bg-${additional.color}-500 text-white rounded-full flex items-center justify-center text-4xl shadow-lg`}
          style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)" }}
        >
          {additional.icon}
        </div>
      </div>
    );
  };

  return (
    <section
      id="pricing"
      className={`container mx-auto px-6 ${
        isSection ? "py-20" : "py-32"
      } text-center`}
    >
      <h3 className="text-4xl font-bold text-purple-700 mb-12">
        {t("choosePlan")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...pricingplans].reverse().map((plan) => (
          <PlanItem key={plan.planId} plan={plan} />
        ))}
      </div>
      {!isSection && (
        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            onClick={() => router.push("/user/dashboard")}
          >
            {t("goToDashboard")}
            <div className="underline text-sm text-gray-200">
              {locale === "zh" ? "註冊即送免費點數" : ""}
            </div>
          </button>
        </div>
      )}
    </section>
  );
}
