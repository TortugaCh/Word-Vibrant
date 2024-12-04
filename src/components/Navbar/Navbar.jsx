import { Avatar, Button, Dropdown } from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { handleLogout } from "../../lib/utils";

const Navbar = ({ mobile, setIsMenuOpen, userData }) => {
  const items = [
    {
      key: "1",
      label: (
        <Link href="/" onClick={() => handleLogout()}>
          <LogoutOutlined /> Logout
        </Link>
      ),
    },
    {
      key: "2",
      label: <h2>Credits: {userData?.credits || 5}</h2>,
    },
    {
      key: "3",
      label: <h2>Plan: {userData?.plan || "Basic"}</h2>,
    },
    {
      key: "4",
      label:<Link href="/pricing">Upgrade Your Plan</Link>,
    }
  ];
  return (
    <div
      className={`h-[80px] flex ${
        mobile === false ? "justify-end" : "justify-between"
      } sm:ml-0 sm:flex-wrap `}
    >
      {mobile && (
        <Button
          icon={<MenuOutlined />}
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
          className="mt-5"
        />
      )}
      <div className="flex items-center justify-between gap-[2px] mr-10">
        <Dropdown
          menu={{ items }}
          placement="bottom"
          overlayStyle={{ background: "none" }}
        >
          <Avatar src="/vercel.svg" size="large" className="border-cyan-950" />
          {/* <h1 className="border-cyan-950">
            Logout
          </h1> */}
        </Dropdown>
        <h3 className="ml-2 text-black">{userData?.name}</h3>
      </div>
    </div>
  );
};

export default Navbar;
