import { useRouter } from "next/router";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Drawer, Menu, Button, Dropdown } from "antd";
import { useUserContext } from "../context/UserContext";

export default function Header({ logoSrc = "/images/logo3.png", onLogout, t }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userData } = useUserContext();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const menuItems = [
    {
      label: t("header.pricingPlan"),
      key: "pricing",
      href: "/#pricing",
    },
    {
      label: t("header.aboutUs"),
      key: "about",
      href: "/about",
    },
    {
      label: t("header.termCondition"),
      key: "terms",
      href: "/term&condition",
    },
  ];

  const profileMenu = (
    <Menu>
      <Menu.Item>
        <div className="flex items-center gap-2">
          <FiUser />
          <span>{userData?.email}</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={() => {
          onLogout();
        }}
      >
        <div className="flex items-center gap-2 text-red-500">
          <FiLogOut />
          {t("header.logout")}
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-white shadow-md w-full fixed top-0 z-20">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <img
          src={logoSrc}
          alt="Logo"
          className="cursor-pointer h-12 w-auto"
          onClick={() => router.push("/")}
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="hover:text-purple-600 transition"
            >
              {item.label}
            </Link>
          ))}

          {userData ? (
            <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]}>
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                <FiUser className="mr-2" /> {t("header.profile")}
              </Button>
            </Dropdown>
          ) : (
            <Button
              onClick={() => router.push("/auth")}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              <FiUser className="mr-2" /> {t("header.login")}
            </Button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <Button
          type="text"
          icon={sidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          className="md:hidden"
          onClick={toggleSidebar}
        />
      </div>

      {/* Mobile Sidebar */}
      <Drawer
        title={<img src={logoSrc} alt="Logo" className="h-8 cursor-pointer" />}
        placement="left"
        closable={true}
        onClose={toggleSidebar}
        open={sidebarOpen}
      >
        <Menu mode="vertical">
          {menuItems.map((item) => (
            <Menu.Item key={item.key} onClick={toggleSidebar}>
              <Link href={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}

          {userData ? (
            <>
              <Menu.Divider />
              <Menu.Item disabled>
                <div className="flex items-center gap-2">
                  <FiUser />
                  <span>{userData.email}</span>
                </div>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  onLogout();
                  toggleSidebar();
                }}
              >
                <div className="flex items-center gap-2 text-red-500">
                  <FiLogOut /> {t("header.logout")}
                </div>
              </Menu.Item>
            </>
          ) : (
            <Menu.Item
              onClick={() => {
                router.push("/auth");
                toggleSidebar();
              }}
            >
              <div className="flex items-center gap-2">
                <FiUser /> {t("header.login")}
              </div>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
    </header>
  );
}
