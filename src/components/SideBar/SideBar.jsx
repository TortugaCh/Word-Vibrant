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
    <div className="w-full h-screen py-4 px-2 md:px-4 overflow-x-hidden">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl md:text-4xl font-extrabold text-purple-600 cursor-default mb-6 text-center">
          Dashboard
        </h1>
        <Menu options={adminMenuItems} />
      </div>
    </div>
  );
};

export default SideBar;
