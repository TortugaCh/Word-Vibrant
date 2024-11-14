import { db } from '../../../lib/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import NewebPay from 'newebpay-api';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
console.log(req.body);
  const { Status, Message, TradeInfo } = req.body;

  // Create a new instance of NewebPay with your credentials
  const newebpay = new NewebPay({
    MerchantID: process.env.NEWEBPAY_MERCHANT_ID,
    hashKey: process.env.NEWEBPAY_HASH_KEY,
    hashIV: process.env.NEWEBPAY_HASH_IV,
  });

  // Decrypt the TradeInfo using the newebpay-api package
  const tradeData = newebpay.decrypt(TradeInfo);

  if (Status === 'SUCCESS' && tradeData) {
    const { userId, planId, MerchantOrderNo } = tradeData;

    try {
      // Save subscription details to Firestore
      const subscriptionCollection = collection(db, 'subscriptions');
      await addDoc(subscriptionCollection, {
        userId,
        planId,
        MerchantOrderNo,
        subscriptionStatus: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        expiryDate: calculateExpiryDate(planId),
      });

      console.log(`Subscription for User ID ${userId} added successfully`);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error saving subscription:', err);
      return res.status(500).json({ error: 'Failed to save subscription' });
    }
  } else {
    console.error('Payment failed:', Message);
    return res.status(400).json({ error: 'Payment not successful' });
  }
}

// Helper function to calculate the subscription expiry date based on plan
function calculateExpiryDate(planId) {
  const durationMap = {
    basic: 365,     // 1 year
    standard: 365,  // 1 year
    premium: 365,   // 1 year
  };
  const days = durationMap[planId] || 30;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}
