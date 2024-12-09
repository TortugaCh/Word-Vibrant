// Footer.js
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#b47fe5] text-white py-8 px-4 w-full">
      <div className="max-w-screen-xl mx-auto">
        {/* Footer Top Section: Logo + Info */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            <img
              src="/images/logo3.png" // Use your logo image
              alt="Company Logo"
              className="h-16 mb-4"
            />
            <p className="text-lg text-center lg:text-left">
              Your company description here. Short and memorable, showcasing
              your brand.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start mt-6 lg:mt-0 space-x-6 space-y-4 lg:space-y-0">
            <a
              href="/about"
              className="text-white hover:text-[#ffae33] transition duration-300"
            >
              About Us
            </a>
            <a
              href="/terms"
              className="text-white hover:text-[#ffae33] transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="text-white hover:text-[#ffae33] transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="mailto:contact@company.com"
              className="text-white hover:text-[#ffae33] transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Footer Middle Section: Social Media */}
        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="#"
            className="text-white hover:text-[#ffae33] transition duration-300"
          >
            <FaFacebookF size={28} />
          </a>
          <a
            href="#"
            className="text-white hover:text-[#ffae33] transition duration-300"
          >
            <FaTwitter size={28} />
          </a>
          <a
            href="#"
            className="text-white hover:text-[#ffae33] transition duration-300"
          >
            <FaLinkedinIn size={28} />
          </a>
          <a
            href="#"
            className="text-white hover:text-[#ffae33] transition duration-300"
          >
            <FaInstagram size={28} />
          </a>
        </div>

        {/* Footer Bottom Section: Copyright */}
        <div className="text-center text-gray-100 text-sm mb-4">
          <p>
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
