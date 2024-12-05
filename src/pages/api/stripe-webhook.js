// pages/api/stripe-webhook.js

import Stripe from "stripe";
import { db } from "../../lib/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse the raw request body
async function parseRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const payload = await parseRequestBody(req);
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error(`Error processing event ${event.type}:`, err);
    return res.status(500).send(`Server Error: ${err.message}`);
  }

  res.json({ received: true });
}

async function handleCheckoutSessionCompleted(session) {
  console.log("Checkout session completed", session);
  const { userId, planId } = session.metadata;
  const email = session.customer_email || session.customer_details?.email;
  const subscriptionId = session.subscription;

  if (!email) {
    throw new Error("Email is missing in the session object.");
  }

  // Store subscription details in Firestore
  const subscriptionRef = doc(db, "subscriptions", subscriptionId);
  await setDoc(subscriptionRef, {
    userId,
    planId,
    subscriptionId,
    email,
    status: "active",
    createdAt: new Date(),
  });

  // Retrieve plan details
  const planRef = doc(db, "pricingplans", planId);
  const planSnapshot = await getDoc(planRef);

  if (!planSnapshot.exists()) {
    throw new Error("Plan not found");
  }

  const plan = planSnapshot.data();
  const creditsToAdd = plan.credits || 0;

  // Find user by email
  const userRef = collection(db, "persons");
  const q = query(userRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Person not found");
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();
  const userDocRef = doc(db, "persons", userDoc.id);

  // Update user credits
  await updateDoc(userDocRef, {
    credits: (userData.credits || 0) + creditsToAdd,
    plan: plan.name,
  });
}

async function handleSubscriptionDeleted(subscription) {
  const subscriptionId = subscription.id;

  const subscriptionRef = doc(db, "subscriptions", subscriptionId);
  const subscriptionSnapshot = await getDoc(subscriptionRef);

  if (subscriptionSnapshot.exists()) {
    const subscriptionData = subscriptionSnapshot.data();
    const userRef = collection(db, "persons");
    const q = query(userRef, where("userId", "==", subscriptionData.userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const userDocRef = doc(db, "persons", userDoc.id);

      // Reduce user credits (optional logic)
      const updatedCredits = Math.max(
        (userData.credits || 0) - (subscriptionData.credits || 0),
        0
      );
      await updateDoc(userDocRef, { credits: updatedCredits });
    }

    await deleteDoc(subscriptionRef);
  }
}

async function handleSubscriptionUpdated(subscription) {
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const subscriptionRef = doc(db, "subscriptions", subscriptionId);
  await updateDoc(subscriptionRef, {
    status,
    updatedAt: new Date(),
  });
}
