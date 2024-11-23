import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Noto Serif TC', serif", // A Chinese-friendly font
          color: "#333",
        }}
      >
        {/* Animated Chinese Character */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#ff4d4f",
            marginBottom: "20px",
            animation: "pulse 2s infinite",
          }}
        >
          學
        </div>
        {/* Stroke Animation or Message */}
        <div
          style={{
            fontSize: "18px",
            color: "#555",
          }}
        >
          正在加載中... (Loader...)
        </div>
        <style jsx>
          {`
            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
