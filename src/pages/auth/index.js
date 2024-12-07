// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { FcGoogle } from "react-icons/fc";
// import { useTranslations } from "next-intl";
// import { withMessages } from "../../lib/getMessages";
// import { handleEmailAuth, handleGoogleAuth } from "../../lib/utils";
// import Loader from "../../components/Loader"; // Import the reusable loader
// import { useUserContext } from "../../context/UserContext";

// export default function AuthPage() {
//   const router = useRouter();
//   const t = useTranslations("auth");
//   const { setUserData, setUserCredits } = useUserContext();
//   const [formData, setFormData] = useState({
//     email: "",
//     username: "",
//     password: "",
//   });
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // Loading state
//   const [isPasswordReset, setIsPasswordReset] = useState(false); // Password reset state

//   // Handle form inputs
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAuth = async () => {
//     const { email, password, username } = formData;
//     setLoading(true); // Start loading
//     setError(""); // Clear any previous errors
//     try {
//       const user = await handleEmailAuth(email, password, isLogin, username);
//       console.log(user)
//       if (user) {
//         if (user.role === "Admin") router.push("/admin");
//         else router.push("/user/dashboard");
//         setUserData(user);
//         setUserCredits(user.credits);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setLoading(true); // Start loading
//     setError(""); // Clear any previous errors
//     try {
//       const user = await handleGoogleAuth();
//       console.log("User:", user);
//       console.log("User Data:", user.userData);
//       if (user) {
//         if (user.role === "Admin") router.push("/admin");
//         else router.push("/user/dashboard");
//         setUserData(user.userData);
//         setUserCredits(user.userData.credits);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   // Show loader if loading
//   // if (loading) {
//   //   return <Loader />;
//   // }

//   return (
//     <div className="auth-page bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen flex justify-center items-center">
//       <div className="auth-container max-w-md w-full bg-white rounded-lg shadow-lg p-8">
//         <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
//           {t(isLogin ? "login" : "signUp")}
//         </h2>

//         {/* Google Sign-In Button */}
//         <button
//           onClick={handleGoogleSignIn}
//           className="auth-button flex items-center justify-center mb-4"
//         >
//           <FcGoogle className="mr-2" size={24} />
//           {t("Google")}
//         </button>

//         {!isLogin && (
//           <input
//             type="text"
//             name="username"
//             placeholder={t("userName")}
//             value={formData.username}
//             onChange={handleInputChange}
//             className="auth-input mb-4"
//           />
//         )}

//         <input
//           type="email"
//           name="email"
//           placeholder={t("email")}
//           value={formData.email}
//           onChange={handleInputChange}
//           className="auth-input mb-4"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder={t("password")}
//           value={formData.password}
//           onChange={handleInputChange}
//           className="auth-input mb-4"
//         />

//         <button
//           onClick={handleAuth}
//           className="auth-button primary w-full mb-4"
//         >
//           {loading ? "Loading..." : t(isLogin ? "login" : "signUp")}
//         </button>

//         <button
//           onClick={() => setIsLogin(!isLogin)}
//           className="auth-button secondary w-full"
//         >
//           {t(isLogin ? "switchToSignUp" : "switchToLogin")}
//         </button>

//         {/* Forgot Password Link */}
//         {isLogin && (
//           <button
//             onClick={() => router.push("/auth/reset-password")}
//             className="auth-button w-full mt-4"
//           >
//             {t("forgotPassword")}
//           </button>
//         )}

//         {error && <p className="auth-error text-red-500 mt-4">{error}</p>}
//         {isPasswordReset && (
//           <p className="auth-success text-green-500 mt-4">
//             {t("passwordResetSuccess")}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export const getServerSideProps = withMessages("auth");

import React, { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";
import { withMessages } from "../../lib/getMessages";
import { handleEmailAuth, handleGoogleAuth } from "../../lib/utils";
import { useUserContext } from "../../context/UserContext";
import { Input, Button, Form, Alert, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function AuthPage() {
  const router = useRouter();
  const t = useTranslations("auth");
  const { setUserData, setUserCredits } = useUserContext();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const handleAuth = async (values) => {
    const { email, password, username } = values;
    setLoading(true);
    setError("");
    console.log("Handling email auth:", email, password, isLogin, username);

    try {
      let user = await handleEmailAuth(email, password, isLogin, username);
      if (user) {
        user = user.userData;
        if (user.role === "Admin") router.push("/admin");
        else router.push("/user/dashboard");
        setUserData(user);
        setUserCredits(user.credits);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const user = await handleGoogleAuth();

      if (user) {
        if (user.role === "Admin") router.push("/admin");
        else router.push("/user/dashboard");
        setUserData(user.userData);
        setUserCredits(user.userData.credits);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen flex justify-center items-center">
      <div className="auth-container max-w-md w-full bg-white rounded-lg shadow-lg p-8 relative">
        {/* Back Button */}
        <Button
          onClick={() => router.push("/")}
          icon={<ArrowLeftOutlined />}
          type="default"
          className="absolute top-4 left-4"
        />

        <Title level={2} className="text-center text-purple-700 mb-6">
          {t(isLogin ? "login" : "signUp")}
        </Title>

        {/* Google Sign-In Button */}
        <Button
          onClick={handleGoogleSignIn}
          icon={<FcGoogle />}
          type="default"
          className="auth-button flex items-center justify-center mb-4 w-full"
        >
          {t("Google")}
        </Button>

        {/* Form for email and password */}
        <Form
          onFinish={handleAuth}
          layout="vertical"
          initialValues={{ email: "", password: "", username: "" }}
        >
          {!isLogin && (
            <Form.Item
              label={t("userName")}
              name="username"
              rules={[{ required: true, message: t("userNameRequired") }]}
            >
              <Input placeholder={t("userName")} />
            </Form.Item>
          )}

          <Form.Item
            label={t("email")}
            name="email"
            rules={[{ required: true, message: t("emailRequired") }]}
          >
            <Input placeholder={t("email")} type="email" />
          </Form.Item>

          <Form.Item
            label={t("password")}
            name="password"
            rules={[{ required: true, message: t("passwordRequired") }]}
          >
            <Input.Password placeholder={t("password")} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t(isLogin ? "login" : "signUp")}
            </Button>
          </Form.Item>
        </Form>

        {/* Switch between login and signup */}
        <Button
          type="link"
          className="w-full"
          onClick={() => setIsLogin(!isLogin)}
        >
          {t(isLogin ? "switchToSignUp" : "switchToLogin")}
        </Button>

        {/* Forgot Password Link */}
        {isLogin && (
          <Button
            type="link"
            className="w-full mt-4"
            onClick={() => router.push("/auth/reset-password")}
          >
            {t("forgotPassword")}
          </Button>
        )}

        {/* Display Error or Success message */}
        {error && (
          <Alert message={error} type="error" showIcon className="mt-4" />
        )}
        {isPasswordReset && (
          <Alert
            message={t("passwordResetSuccess")}
            type="success"
            showIcon
            className="mt-4"
          />
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = withMessages("auth");
