// Footer.js
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = ({ t }) => {
  return (
    <footer className="relative bg-gradient-to-br from-[#b47fe5] to-[#9747FF] text-white py-5 px-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-screen-xl mx-auto relative">
        {/* Footer Top Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-5">
          {/* Logo + Description */}
          <div className="flex flex-col items-center lg:items-start space-y-6 mt-6">
            <img
              src="/images/logo3.png"
              alt="Company Logo"
              className="h-16 hover:transform hover:scale-105 transition-transform duration-300"
            />
            <p className="text-lg text-center lg:text-left text-white/90 max-w-md">
              {t("footer.description")}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-8">
            {[
              { href: "/about", text: t("footer.aboutUs") },
              { href: "/terms", text: t("footer.termsOfService") },
              { href: "/privacy", text: t("footer.termCondition") },
              {
                href: "mailto:contact@company.com",
                text: t("footer.contactUs"),
              },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-white/90 hover:text-white transition-colors duration-300 text-center lg:text-left relative group"
              >
                <span className="relative">
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ffae33] transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-8 mb-12">
          {[
            { Icon: FaFacebookF, href: "#" },
            { Icon: FaInstagram, href: "#" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="transform hover:scale-110 transition-all duration-300"
            >
              <div className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors duration-300">
                <Icon size={24} className="text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} 語動. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
