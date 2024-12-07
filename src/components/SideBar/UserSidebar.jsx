import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserMenuItems } from "../../constants/constants";

const SideBar = ({ setMenuOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { locale } = router;

  // Menu item component for recursive rendering
  const Menu = ({ options }) => (
    <ul className="flex flex-col gap-4">
      {options.map((option, index) => {
        const isActive =
          currentPath === option.link || currentPath.startsWith(option.link);

        return (
          <li
            key={index}
            className={`text-lg px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${isActive
                ? "bg-purple-600 text-white font-bold"
                : "hover:bg-gray-200 text-gray-700"
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
        {/* Dashboard Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-purple-600 cursor-default mb-6 text-center">
          Dashboard
        </h1>
        {/* Render Menu */}
        <Menu options={UserMenuItems} />
      </div>
    </div>
  );
};

export default SideBar;
