import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Lavana Fashion</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover the latest fashion trends with Lavana.  
            Premium quality, affordable prices, and seamless shopping experience.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Our Story</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Shipping & Delivery</li>
            <li className="hover:text-white cursor-pointer">Returns & Refunds</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>

          <p className="text-sm text-gray-400 mb-4">
            Email: support@lavanafashion.com <br />
            Phone: +91 98765 43210
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-700 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © 2026 Lavana Fashion. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
