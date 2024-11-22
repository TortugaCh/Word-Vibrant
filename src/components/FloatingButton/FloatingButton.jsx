import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

const FloatingButton = ({ onClick }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <PlusCircleOutlined style={{ fontSize: "48px", color: "#52c41a" }} />
    </div>
  );
};

export default FloatingButton;
