import { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";
import { withMessages } from "../../lib/getMessages";
import { handleEmailAuth, handleGoogleAuth } from "../../lib/utils";

export default function AuthPage() {
  const router = useRouter();
  const t = useTranslations("auth");

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuth = async () => {
    const { email, password, username } = formData;
    try {
      const user = await handleEmailAuth(email, password, isLogin, username);
      if (user.role === "Admin") router.push("/admin");
      else router.push("/user/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await handleGoogleAuth();
      if (user.role === "Admin") router.push("/admin");
      else router.push("/user/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen flex justify-center items-center">
      <div className="auth-container max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {t(isLogin ? "login" : "signUp")}
        </h2>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="auth-button flex items-center justify-center mb-4"
        >
          <FcGoogle className="mr-2" size={24} />
          {t("Google")}
        </button>

        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder={t("userName")}
            value={formData.username}
            onChange={handleInputChange}
            className="auth-input mb-4"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder={t("email")}
          value={formData.email}
          onChange={handleInputChange}
          className="auth-input mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder={t("password")}
          value={formData.password}
          onChange={handleInputChange}
          className="auth-input mb-4"
        />

        <button
          onClick={handleAuth}
          className="auth-button primary w-full mb-4"
        >
          {t(isLogin ? "login" : "signUp")}
        </button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="auth-button secondary w-full"
        >
          {t(isLogin ? "switchToSignUp" : "switchToLogin")}
        </button>

        {error && <p className="auth-error text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export const getServerSideProps = withMessages("auth");
