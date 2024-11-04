// src/components/Layout.js
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>Welcome to Chinese Literacy AI</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2023 Chinese Literacy AI</p>
      </footer>
    </div>
  );
}
