import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Configure your email transport
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com", // Replace with your SMTP host
      port: 587, // Port for SMTP
      auth: {
        user: "your-email@example.com", // Your email
        pass: "your-email-password", // Your email password or app password
      },
    });

    try {
      // Send email
      await transporter.sendMail({
        from: email, // Sender's email
        to: "chiahuammx@gmail.com", // Your email
        subject: `New Message from ${name}`,
        text: message,
      });

      res
        .status(200)
        .json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to send email.", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
