// src/pages/success.js
import React from "react";

export default function Success() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🎉</div>
        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.message}>
          Thank you for your purchase! Your transaction has been completed
          successfully.
        </p>
        <div style={styles.details}></div>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "450px",
    width: "100%",
  },
  icon: {
    fontSize: "60px",
    color: "#28a745",
    marginBottom: "20px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: "15px",
  },
  message: {
    fontSize: "16px",
    color: "#6c757d",
    marginBottom: "20px",
  },
  details: {
    backgroundColor: "#f1f3f5",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#495057",
    textAlign: "left",
  },
  button: {
    backgroundColor: "#ffffff",
    color: "#343a40",
    padding: "10px 20px",
    border: "2px solid #007bff",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  buttonHover: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    transform: "scale(1.05)",
  },
};
