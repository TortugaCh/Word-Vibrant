import React, { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const ReusableDropdown = ({ input, handleChange }) => {
  const [selected, setSelected] = useState(null); // Local state to track selected value

  const handleMenuClick = (e) => {
    const selectedOption = input.options.find(option => option.id === e.key);
    setSelected(selectedOption.name); // Update local state
    handleChange(input.name, e.key); // Notify parent
  };

  const menu = (
    <Menu
      className="rounded-lg border border-purple-400 shadow-md"
      onClick={handleMenuClick}
      items={input.options.map((option) => ({
        key: option.id,
        label: (
          <div
            className="px-4 py-2 rounded-full hover:bg-purple-200 transition-all cursor-pointer"
            style={{
              backgroundColor: "transparent",
            }}
          >
            {option.name}
          </div>
        ),
      }))}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
    <Button
  className="w-full rounded-full flex items-center justify-between px-6 py-5 border border-purple-400 shadow-md focus:ring-2 focus:ring-purple-300"
  style={{
    transition: "border-color 0.3s ease", // Smooth transition for border color
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = "#F9AF42"; // Change border color to orange
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = "rgba(128, 90, 213, 1)"; // Revert to original purple
  }}
>
  <span className="text-gray-700">
    {selected || input.placeholder} {/* Show selected value or placeholder */}
  </span>
  <DownOutlined className="text-gray-500" />
</Button>

    </Dropdown>
  );
};

export default ReusableDropdown;
