'use client';

import Link from 'next/link';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Care<span className="text-blue-500">.xyz</span>
            </h3>
            <p className="text-sm mb-4">
              Reliable and trusted care services for children, elderly, and other family members in Bangladesh.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-500 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-blue-500 transition">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Baby Care Services</li>
              <li>Elderly Companion Care</li>
              <li>Special Needs Child Care</li>
              <li>Home Nursing Service</li>
              <li>Post-Operative Care</li>
              <li>Nanny Care Services</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <FiMapPin className="h-5 w-5 mr-2 text-blue-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="h-5 w-5 mr-2 text-blue-500" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center">
                <FiMail className="h-5 w-5 mr-2 text-blue-500" />
                <span>info@care.xyz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Care.xyz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
