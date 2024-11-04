<<<<<<< HEAD
// src/pages/index.js
import Link from "next/link";
import {useRouter} from "next/router";

export default function HomePage() {
  const router = useRouter();
=======
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

>>>>>>> e4b9d87f43654e7b9366bce6ebe185f438949fa9
  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="heading">Welcome to Chinese Literacy AI</h1>
        <p className="subheading">Select a curriculum and start learning!</p>

        <div className="button-container">
<<<<<<< HEAD
          {/* Link to Login Page */}
          <Link href="/auth">
            <button className="button" onClick={()=>console.log(router)}>Login or Sign Up</button>
          </Link>

          {/* Link to Dashboard */}
          <Link href="/dashboard">
            <button className="button dashboard-button">Go to Dashboard</button>
          </Link>
=======
          <button className="button" onClick={() => router.push("/auth")}>
            Login or Sign Up
          </button>
          <button
            className="button dashboard-button"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </button>
>>>>>>> e4b9d87f43654e7b9366bce6ebe185f438949fa9
        </div>
      </div>

      {/* Fun background decorations */}
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="star1">⭐</div>
      <div className="star2">⭐</div>
      <div className="star3">⭐</div>
      <div className="triangle triangle1"></div>
      <div className="triangle triangle2"></div>
      <div className="chinese-word1">汉</div>
      <div className="chinese-word2">字</div>
    </div>
  );
}
