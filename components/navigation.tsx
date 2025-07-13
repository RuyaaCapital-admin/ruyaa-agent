"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  return (
    <nav className="relative z-50 px-6 py-4 bg-black/90 backdrop-blur-md border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img
              src="/images/ruyaa-logo.png"
              alt="Ruyaa Capital Logo"
              className="h-12 md:h-16 w-auto transition-all duration-300 cursor-pointer"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <Link
            href="/"
            className="hover:text-gray-300 transition-colors text-gray-400"
          >
            {t("home")}
          </Link>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors text-gray-400"
          >
            {t("services")}
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors text-gray-400"
          >
            {t("about")}
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors text-gray-400"
          >
            {t("contact")}
          </a>
          <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0">
            {t("get_started")}
          </Button>
          {/* Language Switch Button */}
          <Button
            variant="outline"
            className="border-gray-600/50 text-gray-300 hover:bg-gray-800/20 px-4 py-2 bg-transparent"
            onClick={toggleLanguage}
          >
            {t("language_switch")}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Language Switch Button for Mobile */}
          <Button
            variant="outline"
            className="border-gray-600/50 text-gray-300 hover:bg-gray-800/20 px-3 py-1.5 bg-transparent mr-2"
            onClick={toggleLanguage}
          >
            {t("language_switch")}
          </Button>
          <button
            className="text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-700/30 p-6">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="hover:text-gray-300 transition-colors text-gray-400"
            >
              {t("home")}
            </Link>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors text-gray-400"
            >
              {t("services")}
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors text-gray-400"
            >
              {t("about")}
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors text-gray-400"
            >
              {t("contact")}
            </a>
            <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0 w-full">
              {t("get_started")}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
