import React from "react";
import Header from "./Header"; // Ensure you have this header component

export default function Template({ children, title, userData, onLogout, t }) {
  // Static circle positions (Top-Left, Top-Right, Bottom-Right, Bottom-Left, Center)
  const circles = [
    { top: "15%", left: "5%", size: "80px", color: "rgba(126, 87, 194, 0.5)" },
    {
      top: "2%",
      right: "3%",
      size: "100px",
      color: "rgba(183, 79, 174, 0.5)",
    },
    {
      bottom: "5%",
      right: "3%",
      size: "120px",
      color: "rgba(238, 167, 46, 0.5)",
    },
    {
      bottom: "10%",
      left: "5%",
      size: "90px",
      color: "rgba(183, 79, 174, 0.3)",
    }, // New bottom-left circle
    // { top: "40%", left: "45%", size: "60px", color: "rgba(238, 167, 46, 0.4)" }, // New center circle
  ];

  return (
    <div className="relative bg-white min-h-screen flex flex-col items-center overflow-hidden">
      {/* Header */}
      <Header title={title} userData={userData} onLogout={onLogout} t={t} />

      {/* Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {circles.map((circle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-floating" // New animation
            style={{
              top: circle.top,
              bottom: circle.bottom,
              left: circle.left,
              right: circle.right,
              width: circle.size,
              height: circle.size,
              backgroundColor: circle.color,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content Area with Margin from Top */}
      <main className="container mx-auto px-6 py-6 mt-16 md:px-10 md:py-20 relative z-10 text-center">
        {children}
      </main>
    </div>
  );
}
