// src/components/Layout.js
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
