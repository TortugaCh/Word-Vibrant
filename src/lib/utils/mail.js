import axios from "axios";
import * as handlebar from "handlebars";
import { emailTemplate} from "./emailTemplate";
export async function sendMail({ name, email, subject, message }) {
  const emailBody = await compileTemplate(
    name,
    "https://wordvibrant.com.tw",
    message
  );
  try {
    const res = await axios.post("/api/send-email", {
      email,
      subject,
      message: emailBody,
    });
    return res;
  } catch (error) {
    console.error("Error sending mail:", error);
    return null;
  }
}

export const compileTemplate = async (name, url, message) => {
  // const image = "https://www.wordvibrant.com.tw/images/logo4.png";
  // const getBase64 = await toBase64(image);
  const template = handlebar.compile(emailTemplate);
  const htmlBody = template({ name, url, content: message });
  return htmlBody;
};
