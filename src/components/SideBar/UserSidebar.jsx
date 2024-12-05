import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserMenuItems } from "../../constants/constants";

const SideBar = ({ setMenuOpeb }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  // Menu item component for recursive rendering
  const Menu = ({ options }) => (
    <ul className="flex flex-col gap-4">
      {options.map((option, index) => {
        // Check if current path matches the option link or if it's a submenu
        const isActive =
          currentPath === option.link || currentPath.startsWith(option.link);

        return (
          <li
            key={index}
            className={`text-xl px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
              isActive
                ? "bg-purple-600 text-white font-bold"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            {/* Menu item link with icon */}
            <Link href={option.link} passHref>
              <span className="flex items-center gap-4">
                {/* Render icon */}
                <span className="text-xl">{option.icon}</span>
                <span>{option.name}</span>
              </span>
            </Link>
            {/* Recursively render submenus */}
            {option.children && <Menu options={option.children} />}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="w-full h-screen py-8 px-4">
      <div className="flex flex-col gap-8 items-center">
        {/* Dashboard Title */}
        <h1 className="text-4xl font-extrabold text-purple-600 cursor-default mb-6 text-center">
          Dashboard
        </h1>
        {/* Render Menu*/}
        <Menu options={UserMenuItems} />
      </div>
    </div>
  );
};

export default SideBar;
