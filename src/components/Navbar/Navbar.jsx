import { Avatar, Button, Dropdown, Menu } from "antd";
import { LogoutOutlined, MenuOutlined, CrownOutlined, UserOutlined, DollarCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { handleLogout } from "../../lib/utils";

const Navbar = ({ mobile, setIsMenuOpen, userData }) => {
  const items = [
    {
      key: "1",
      label: (
        <Link href="/" onClick={() => handleLogout()}>
          <LogoutOutlined style={{ marginRight: 8, color: "#9333EA" }} /> {/* Icon matches text */}
          Logout
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <DollarCircleOutlined style={{ marginRight: 8, color: "#FFD700" }} />
          Credits: {userData?.credits || 5}
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <CrownOutlined style={{ marginRight: 8, color: "#a7bace" }} />
          Plan: {userData?.plan || "Basic"}
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <Link href="/pricing">
          <CrownOutlined style={{ marginRight: 8, color: "#FFD700" }} />
          Upgrade Your Plan
        </Link>
      ),
    },
  ];
  

  const menu = (
    <Menu
      items={items}
      style={{
        backgroundColor: "#fff", // White background for the dropdown
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        border: "2px solid #9333EA", // Purple border
        transition: "all 0.3s ease-in-out",
      }}
    >
      {items.map((item) => (
        <Menu.Item
          key={item.key}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            margin: "4px 0",
            transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#9333EA"; // Purple background on hover
            e.currentTarget.style.color = "#fff"; // White text on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"; // Revert background color
            e.currentTarget.style.color = "#000"; // Default text color
          }}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  
  

  return (
    <div
      className={`h-[80px] flex ${
        mobile === false ? "justify-end" : "justify-between"
      } sm:ml-0 sm:flex-wrap`}
    >
      {mobile && (
        <Button
          icon={<MenuOutlined />}
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
          className="mt-5"
        />
      )}
      <div className="flex items-center justify-between gap-2 mr-10">
        <Dropdown
          overlay={menu}
          trigger={["hover"]}
          placement="bottomRight"
          overlayStyle={{
            minWidth: "200px",
          }}
        >
          <Button
            type="text"
            className="flex items-center px-4 py-2"
            style={{
              backgroundColor: "#9333EA",
              color: "#fff",
              borderRadius: "24px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              border: "2px solid #Ffffff", // Added border
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
            }}
          >
            <Avatar
              size="large"
              icon={<UserOutlined style={{ fontSize: "18px", color: "#fff" }} />}
              style={{
                backgroundColor: "#9333EA",
                marginRight: "8px",
                border: "2px solid #ffffff", // Added border around the avatar
              }}
            />
            <span
              style={{
                fontFamily: "'Pacifico', cursive",
                color: "#fff",
                fontSize: "16px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              {userData?.name || "Guest"}
            </span>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
