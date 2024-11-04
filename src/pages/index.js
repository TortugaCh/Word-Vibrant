// src/pages/index.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <div className="hero-section">
        <h1 className="heading">Welcome to Chinese Literacy AI</h1>
        <p className="subheading">Select a curriculum and start learning!</p>

        <div className="button-container">
          {/* Link to Login Page */}
          <Link href="/auth">
            <button className="button">Login or Sign Up</button>
          </Link>

          {/* Link to Dashboard */}
          <Link href="/dashboard">
            <button className="button dashboard-button">Go to Dashboard</button>
          </Link>
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
