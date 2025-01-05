import React, { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { withMessages } from "../../lib/getMessages";
import {
  handleEmailAuth,
  handleFacebookAuth,
  handleGoogleAuth,
} from "../../lib/utils/auth";
import { useUserContext } from "../../context/UserContext";
import { Input, Button, Form, Alert, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa6";

const { Title } = Typography;

export default function AuthPage() {
  const router = useRouter();
  const t = useTranslations("auth");
  const { setUserData, setUserCredits } = useUserContext();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (values) => {
    const { email, password, username } = values;
    setLoading(true);
    setError("");

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

  const handleFacebookSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await handleFacebookAuth();
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
    <div className="relative min-h-screen flex justify-center items-center bg-white overflow-hidden">
      {/* Decorative SVGs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#7e57c2] rounded-full opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#b74fae] rounded-full opacity-20"></div>

      {/* Auth Container */}
      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-[#7e57c2]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo3.png"
            alt="Logo"
            width={100}
            height={100}
            className="animate-fade-in"
          />
        </div>

        {/* Back Button */}
        <Button
          onClick={() => router.push("/")}
          icon={<ArrowLeftOutlined />}
          type="default"
          className="absolute top-4 left-4 text-[#7e57c2] hover:text-[#b74fae] hover:bg-transparent transition duration-300"
        />

        {/* Title */}
        <Title level={2} className="text-center text-[#7e57c2] mb-6 font-bold">
          {t(isLogin ? "login" : "signUp")}
        </Title>

        {/* Google Sign-In */}
        <Button
          onClick={handleGoogleSignIn}
          icon={<FcGoogle />}
          type="default"
          className="flex items-center justify-center mb-4 w-full border border-gray-300 hover:border-[#7e57c2] hover:text-[#7e57c2] transition-transform transform hover:scale-105"
        >
          {t("Google")}
        </Button>

        {/* Facebook Sign-In */}
        <Button
          onClick={handleFacebookSignIn}
          type="default"
          className="flex items-center justify-center mb-4 w-full border border-gray-300 hover:border-[#7e57c2] hover:text-[#7e57c2] transition-transform transform hover:scale-105"
          icon={<FaFacebook />}
        >
          {t("Facebook")}
        </Button>

        {/* Email & Password Form */}
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
              <Input
                prefix={<UserOutlined className="text-[#7e57c2]" />}
                placeholder={t("userName")}
              />
            </Form.Item>
          )}

          <Form.Item
            label={t("email")}
            name="email"
            rules={[{ required: true, message: t("emailRequired") }]}
          >
            <Input
              prefix={<MailOutlined className="text-[#7e57c2]" />}
              placeholder={t("email")}
              type="email"
            />
          </Form.Item>

          <Form.Item
            label={t("password")}
            name="password"
            rules={[{ required: true, message: t("passwordRequired") }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-[#7e57c2]" />}
              placeholder={t("password")}
            />
          </Form.Item>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-right mb-4">
              <Button
                type="link"
                className="text-[#7e57c2] hover:text-[#b74fae] transition"
                onClick={() => router.push("/auth/reset-password")}
              >
                {t("forgotPassword")}
              </Button>
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#7e57c2] to-[#b74fae] text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #7e57c2, #b74fae, #eea72e)", // Gradient background
              }}
            >
              <span className="relative z-10">
                {t(isLogin ? "login" : "signUp")}
              </span>
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            </Button>
          </Form.Item>
        </Form>

        {/* Switch Between Login and Signup */}
        <div className="text-center mt-4">
          <Button
            type="default"
            onClick={() => setIsLogin(!isLogin)}
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#eea72e] to-[#b74fae] text-white font-semibold py-3 px-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{
              backgroundImage:
                "linear-gradient(to right, #eea72e, #b74fae, #7e57c2)", // Gradient background
            }}
          >
            <span className="relative z-10">
              {t(isLogin ? "switchToSignUp" : "switchToLogin")}
            </span>
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Alert message={error} type="error" showIcon className="mt-4" />
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = withMessages("auth");
