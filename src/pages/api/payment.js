import NewebPay from "newebpay-api";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { plan, userId } = req.body;

  try {
    // Create a new instance of NewebPay with your credentials
    const merchant = {
      MerchantID: process.env.NEXT_PUBLIC_NEWEBPAY_MERCHANT_ID,
      hashKey: process.env.NEXT_PUBLIC_NEWEBPAY_HASH_KEY,
      hashIV: process.env.NEXT_PUBLIC_NEWEBPAY_HASH_IV,
      isProduction: false,
    };
    console.log(merchant);
    const newebpay = new NewebPay(merchant);

    const { cost, name, planId } = plan;
    const timeStamp = Math.floor(Date.now() / 1000);
    const merchantOrderNo = `ORDER${timeStamp}`;

    // Prepare trade information using the newebpay-api package
    const tradeInfo = newebpay.generateTradeInfo({
      MerchantID: process.env.NEXT_PUBLIC_NEWEBPAY_MERCHANT_ID,
      RespondType: "JSON",
      TimeStamp: timeStamp,
      Version: "1.6",
      LangType: "zh-tw",
      MerchantOrderNo: merchantOrderNo,
      Amt: cost,
      ItemDesc: name,
      ReturnURL: process.env.NEXT_PUBLIC_NEWEBPAY_RETURN_URL,
      NotifyURL: process.env.NEXT_PUBLIC_NEWEBPAY_NOTIFY_URL,
      ClientBackURL: "http://localhost:3000/subscription/success",
      Email: "user@example.com",
      TradeLimit: 300,
      planId,
      userId,
    });

    console.log("TradeInfo:", tradeInfo);
    // Generate encrypted TradeInfo and TradeSha using the library's built-in methods
    const postData = newebpay.generatePostData(tradeInfo);
    // Define the payment URL
    const paymentUrl =
      process.env.NEXT_PUBLIC_NEWEBPAY_API_URL ||
      "https://ccore.newebpay.com/MPG/period";
    //   const formData= {
    //     MerchantID: process.env.NEXT_PUBLIC_NEWEBPAY_MERCHANT_ID,
    //     TradeInfo,
    //     TradeSha,
    //     Version: tradeInfo.Version,
    //   }
    console.log(postData);

    // Return the payment URL and form data to the frontend
    return res.status(200).json({
      paymentUrl,
      formData: postData,
    });
  } catch (error) {
    console.error("Error generating NewebPay trade info:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
