'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            📅 BookEase
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/services" className="text-black font-medium">
              Browse Services
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-black transition">
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 pb-2">
            <Link
              href="/services"
              className="text-black font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Browse Services
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}