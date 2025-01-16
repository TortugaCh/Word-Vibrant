import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log("req.body", req.body);

  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    console.log(email, subject, message);
    console.log("Missing required fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    // Verify the transporter
    await transporter.verify();
    console.log("Email server is ready to send messages.");

    // Send the email
    const sendResult = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject,
      html: message,
    });

    console.log("Email sent successfully", sendResult);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending mail:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

