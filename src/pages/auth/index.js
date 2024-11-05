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
import { format } from "path";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      let user = null;
      if (isLogin) {
        user = await signInWithEmailAndPassword(auth, email, password);
      } else {
        user = await createUserWithEmailAndPassword(auth, email, password);
      }
      if (user) {
        router.push({
          pathname: "/dashboard",
          query: { userData: JSON.stringify(user) },
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleAuth = async () => {
    // Implement Google Authentication here
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      if (user) {
        router.push({
          pathname: "/dashboard",
          query: { userData: JSON.stringify(user) },
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-heading">{isLogin ? "Login" : "Sign Up"}</h2>
      <button
        onClick={() => handleGoogleAuth()}
        className="auth-button secondary"
      >
        <FcGoogle size={24}/>
        Continue With Google
      </button>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={() => handleAuth()} className="auth-button primary">
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="auth-button secondary"
      >
        {isLogin ? "Switch to Sign Up" : "Switch to Login"}
      </button>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}
