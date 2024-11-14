// src/pages/auth/index.js
import { useState } from "react";
import { useRouter } from "next/router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const API_LINK = process.env.NEXT_PUBLIC_API_LINK;
  const handleAuth = async () => {
    try {
      let user = null;
      if (email && password) {
        if (isLogin) {
          user = await signInWithEmailAndPassword(auth, email, password);
        } else {
          if (username)
            user = await createUserWithEmailAndPassword(auth, email, password);
          console.log(user);
          const resp = await axios.post(`${API_LINK}/person/create-person`, {
            email,
            name: username,
            userId: user.user.uid,
          });
          if (resp.status === 200 && user)
            router.push({
              pathname: "/dashboard",
            });
          else {
            await user.user.delete();
            setError("Failed to create user in the system; user deleted.");
          }
        }
        if (user && isLogin) {
          router.push({
            pathname: "/dashboard",
          });
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!checkUserExists(user.email)) {
        const resp = await axios.post(`${API_LINK}/person/create-person`, {
          email: user.email,
          name: user.displayName,
          userId: user.uid,
        });
        if (resp.status === 200 && user)
          router.push({
            pathname: "/dashboard",
          });
        else {
          await user.delete();
          setError("Failed to create user in the system; user deleted.");
        }
      } else {
        router.push({
          pathname: "/dashboard",
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const checkUserExists = async (email) => {
    const resp = await axios.get(`${API_LINK}/person/get-person/${email}`);
    if (resp.status === 200) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="auth-page bg-gradient-to-b from-indigo-50 to-purple-50 min-h-screen flex justify-center items-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="animate-bounce-slow circle1"></div>
      <div className="animate-bounce-slow circle2"></div>
      <div className="animate-bounce-slow circle3"></div>
      <div className="animate-spin-slow star1">⭐</div>
      <div className="animate-spin-slow star2">⭐</div>
      <div className="animate-spin-slow star3">⭐</div>
      <div className="triangle triangle1"></div>
      <div className="triangle triangle2"></div>
      <div className="chinese-word chinese-word1">汉</div>
      <div className="chinese-word chinese-word2">字</div>

      <div className="auth-container relative z-10 max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleAuth}
          className="flex items-center justify-center w-full mb-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          <FcGoogle className="mr-2" size={24} />
          Continue with Google
        </button>

        {/* Email Input */}
        {isLogin ? null : (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input mb-4"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input mb-4"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input mb-4"
        />

        {/* Primary Auth Button */}
        <button
          onClick={handleAuth}
          className="auth-button primary w-full mb-4"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* Toggle Login/Signup */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="auth-button secondary w-full"
        >
          {isLogin ? "Switch to Sign Up" : "Switch to Login"}
        </button>

        {/* Error Message */}
        {error && <p className="auth-error text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
