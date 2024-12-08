import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { adminMenuItems } from "../../constants/constants";

const SideBar = ({ setMenuOpen }) => {
  const router = useRouter();
  const currentPath = router.asPath; // Use asPath for full path comparison
  const { locale } = router;

  // Function to determine if the menu item is active
  const isActive = (link, children) => {
    // Special case for "Home" link, only active on "/admin"
    if (link === "/admin") {
      return currentPath === "/admin"; // Only active when exactly at /admin
    }

    // Active state check for other routes, includes parent-child relations
    return (
      currentPath === link ||
      currentPath.startsWith(link) ||
      (children && children.some(child => currentPath.startsWith(child.link)))
    );
  };

  const Menu = ({ options }) => (
    <ul className="flex flex-col gap-4">
      {options.map((option, index) => {
        const active = isActive(option.link, option.children);
        return (
          <li
            key={index}
            className={`text-lg px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${active ? "bg-purple-600 text-white font-bold" : "hover:bg-gray-200 text-gray-700"
              }`}
          >
            <Link href={option.link} passHref>
              <span className="flex items-center gap-4">
                <span className="text-xl">{option.icon}</span>
                <span>{locale === "zh" ? option.nameZh : option.name}</span>
              </span>
            </Link>
            {option.children && <Menu options={option.children} />}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex flex-col gap-3 items-center">
        {/* Logo */}
        <div className="mt-2 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10">
          <img
            src="/images/logo3.png" // Update this with your logo's path
            alt="Logo"
            className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-auto"
          />
        </div>

        {/* Dashboard Title */}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-purple-600 cursor-default mb-2 text-center">
          Dashboard
        </h1>

        {/* Render Menu */}
        <Menu options={adminMenuItems} />
      </div>
    </div>
  );
};

export default SideBar;
