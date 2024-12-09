import { useRouter } from "next/router";
import { FiUser, FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { handleLogout } from "../lib/utils";
import { useUserContext } from "../context/UserContext";

export default function Header({ logoSrc = "/images/logo3.png", onLogout }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userData } = useUserContext();
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  return (
    <header className="bg-white shadow-md w-full fixed top-0 z-20">
      <div className="container mx-auto px-16 py-2 flex justify-between items-center">
        {/* Logo Image instead of Title */}
        <div>
          <img
            src={logoSrc}
            alt="Logo"
            className="cursor-pointer h-12 sm:h-14 md:h-16 lg:h-18 w-auto"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-gray-600">
          <Link
            href="/pricing"
            className="hover:text-purple-600 transition duration-200"
          >
            Pricing Plan
          </Link>
          <Link
            href="/about"
            className="hover:text-purple-600 transition duration-200"
          >
            About Us
          </Link>
          <Link
            href="/privacy"
            className="hover:text-purple-600 transition duration-200"
          >
            Privacy Policy
          </Link>

          {userData ? (
            <div className="relative dropdown">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-200"
              >
                <FiUser className="text-xl" />
                <span>Profile</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-4 z-30 border border-gray-100">
                  <p className="text-gray-700 font-medium mb-2">
                    Logged in as:
                  </p>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-gray-900 text-lg" />
                    <span className="text-gray-900 font-bold">
                      {userData.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-700 transition duration-200 w-full justify-center mt-4"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push("/auth")}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-200"
            >
              <FiUser className="text-xl" />
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={toggleSidebar}
          className="text-purple-600 hover:text-purple-800 transition duration-200 md:hidden"
        >
          {sidebarOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 sidebar">
          <div className="fixed top-0 left-0 w-3/4 max-w-xs bg-white h-full shadow-lg transform transition-transform duration-300 animate-slide-right p-6">
            {/* Sidebar Content */}
            <img
              src={logoSrc}
              alt="Logo"
              className="cursor-pointer"
              onClick={() => {
                toggleSidebar();
                router.push("/");
              }}
              style={{ height: "40px" }} // Adjust logo size
            />
            <nav className="flex flex-col gap-4 text-gray-700">
              <Link
                href="/pricing"
                onClick={() => toggleSidebar()}
                className="hover:text-purple-600 transition duration-200"
              >
                Pricing Plan
              </Link>
              <Link
                href="/about"
                onClick={() => toggleSidebar()}
                className="hover:text-purple-600 transition duration-200"
              >
                About Us
              </Link>
              <Link
                href="/privacy"
                onClick={() => toggleSidebar()}
                className="hover:text-purple-600 transition duration-200"
              >
                Privacy Policy
              </Link>

              {userData ? (
                <>
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-purple-600" />
                      <span className="text-gray-900 font-semibold">
                        {userData.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleSidebar();
                    }}
                    className="mt-4 flex items-center gap-2 text-red-500 font-semibold hover:text-red-700 transition duration-200 w-full justify-center"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    router.push("/auth");
                    toggleSidebar();
                  }}
                  className="flex items-center justify-center text-purple-600 hover:text-purple-800 font-semibold transition duration-200"
                >
                  <FiUser className="mr-1" />
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
