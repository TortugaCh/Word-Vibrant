import React from "react";
import { adminMenuItems, UserMenuItems } from "../../constants/constants";
import { useRouter } from "next/router";
import Link from "next/link";

const SideBar = ({setMenuOpeb}) => {
  const router = useRouter();
  const Menu = ({ options }) => (
    <ul className="flex flex-col gap-4">
      {options.map((option, index) => (
        <li key={index} className="text-xl ">
          <Link href={option.link}>{option.name}</Link>
          {option.children && <Menu options={option.children} />}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="p-10 ">
      <div className="flex flex-col gap-8 items-center">
        <h1
          className="text-3xl text-center font-extrabold text-purple-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Dashboard
        </h1>
        <Menu options={UserMenuItems} />
      </div>
    </div>
  );
};

export default SideBar;
