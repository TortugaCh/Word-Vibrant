// src/pages/cancel.js
import React from "react";

export default function Cancel() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>❌</div>
        <h1 style={styles.title}>Payment Cancelled</h1>
        <p style={styles.message}>
          Your payment was not completed. If you encountered an issue, please
          try again or contact support.
        </p>
        <button
          style={styles.button}
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
        <button
          style={{
            ...styles.button,
            backgroundColor: "#ffcc00",
            color: "#343a40",
          }}
          onClick={() => (window.location.href = "/support")}
        >
          Contact Support
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
    color: "#dc3545",
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
  button: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "10px",
  },
};
