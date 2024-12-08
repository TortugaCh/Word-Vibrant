import { FiUser, FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import { handleLogout } from "../lib/utils";
import { useUserContext } from "../context/UserContext";

export default function Header({ logoSrc = "/images/logo4.png", onLogout }) {
  const router = useRouter();
  const { userData } = useUserContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // New state for scrolling effect

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 z-20 ">
      <div className="container mx-auto px-6 flex py-4 justify-between items-center">
        {/* Logo */}
        <div>
          <img
            src={logoSrc}
            alt="Logo"
            className="cursor-pointer h-16 sm:h-18 md:h-20 lg:h-32 w-auto"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center">
          <div
            className={`${
              isScrolled
                ? "bg-neutral-700 bg-opacity-70" // Transparent when scrolled
                : "bg-neutral-700" // Solid by default
            } text-neutral-300 rounded-full px-8 py-3 flex gap-9 shadow-lg transition duration-300`}
          >
            <Link
              href="/"
              className="rounded-full px-3 py-1 hover:bg-neutral-500 hover:text-white transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="rounded-full px-3 py-1 hover:bg-neutral-500 hover:text-white transition duration-300 font-medium"
            >
              Pricing Plan
            </Link>
            <Link
              href="/about"
              className="rounded-full px-3 py-1 hover:bg-neutral-500 hover:text-white transition duration-300 font-medium"
            >
              About Us
            </Link>
            <Link
              href="/privacy"
              className="rounded-full px-3 py-1 hover:bg-neutral-500 hover:text-white transition duration-300 font-medium"
            >
              Privacy Policy
            </Link>
          </div>
        </nav>

        {/* Profile or Login Button */}
        <div className="hidden md:block">
          {userData ? (
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 border-2 border-purple-600 text-purple-600 px-4 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition duration-200"
            >
              <FiUser className="text-xl" />
              Profile
            </button>
          ) : (
            <button
              onClick={() => router.push("/auth")}
              className="flex items-center gap-2 border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition duration-200"
            >
              <FiUser className="text-xl" />
              Login
            </button>
          )}
        </div>

        {/* Burger Menu for Small Devices */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-purple-600 hover:text-purple-800 transition duration-200"
        >
          {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>
    </header>
  );
}
