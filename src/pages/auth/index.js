import React, { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";
import { withMessages } from "../../lib/getMessages";
import { handleEmailAuth, handleGoogleAuth } from "../../lib/utils";
import Loader from "../../components/Loader"; // Import the reusable loader
import { useUserContext } from "../../context/UserContext";

export default function AuthPage() {
  const router = useRouter();
  const t = useTranslations("auth");
  const { setUserData, setUserCredits } = useUserContext();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Password reset state

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuth = async () => {
    const { email, password, username } = formData;
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors
    try {
      const user = await handleEmailAuth(email, password, isLogin, username);
      if (user) {
        if (user.role === "Admin") router.push("/admin");
        else router.push("/user/dashboard");
        setUserData(user);
        setUserCredits(user.credits);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors
    try {
      const user = await handleGoogleAuth();
      console.log("User:", user);
      console.log("User Data:", user.userData.credits);
      if (user) {
        if (user.role === "Admin") router.push("/admin");
        else router.push("/user/dashboard");
        setUserData(user.userData);
        setUserCredits(user.userData.credits);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Show loader if loading
  // if (loading) {
  //   return <Loader />;
  // }

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
          {loading ? "Loading..." : t(isLogin ? "login" : "signUp")}
        </button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="auth-button secondary w-full"
        >
          {t(isLogin ? "switchToSignUp" : "switchToLogin")}
        </button>

        {/* Forgot Password Link */}
        {isLogin && (
          <button
            onClick={() => router.push("/auth/reset-password")}
            className="auth-button w-full mt-4"
          >
            {t("forgotPassword")}
          </button>
        )}

        {error && <p className="auth-error text-red-500 mt-4">{error}</p>}
        {isPasswordReset && (
          <p className="auth-success text-green-500 mt-4">
            {t("passwordResetSuccess")}
          </p>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = withMessages("auth");
