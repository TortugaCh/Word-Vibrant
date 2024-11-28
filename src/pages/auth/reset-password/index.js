import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../lib/firebaseConfig";
import { withMessages } from "../../../lib/getMessages";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { message } from "antd";
import { useRouter } from "next/router";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router=useRouter();
  const t = useTranslations("auth");
  const handlePasswordReset = async () => {
    const { email } = formData;
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors
    try {
      await sendPasswordResetEmail(auth, email);
      //   message.success(t("passwordResetEmailSent"));
      message.success("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message);
      message.error(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="auth-page bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen flex justify-center items-center">
      <div className="auth-container max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {/* {t(isLogin ? "login" : "signUp")} */}
          Reset Your Password
        </h2>

        <input
          type="email"
          name="email"
          placeholder={t("email")}
          value={formData.email}
          onChange={handleInputChange}
          className="auth-input mb-4"
        />
        <div className="flex flex-col gap-4">
          <button
            onClick={handlePasswordReset}
            className="auth-button bg-purple-700 text-white py-2 rounded-lg"
          >
            Send Instructions
          </button>
          <button
            onClick={()=>router.push("/auth")}
            className="auth-button bg-purple-700 text-white  py-2 rounded-lg "
          >
            Go Back To Login Page
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withMessages("auth");
