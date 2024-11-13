// pages/api/stripe-webhook.js

import Stripe from "stripe";
import { buffer } from "micro"; // Needed to parse the raw request body
import { db } from "../../../firebase"; // Firebase configuration
import { doc, setDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Disables Next.js body parsing for raw request body
  },
};

// Parse the incoming request as a raw buffer
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
    // Verify the Stripe event with the webhook secret
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the Stripe event types
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, planId } = session.metadata;
    const subscriptionId = session.subscription;

    // Store subscription details in Firestore
    const subscriptionRef = doc(db, "subscriptions", subscriptionId);
    await setDoc(subscriptionRef, {
      userId,
      planId,
      subscriptionId,
      status: "active",
      createdAt: new Date(),
    });
  }

  res.json({ received: true });
}
