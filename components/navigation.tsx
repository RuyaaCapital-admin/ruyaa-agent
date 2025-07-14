"use client";

import { useState } from "react";
import { Menu, X, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useChatWidget } from "@/context/chat-context";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { openChat } = useChatWidget();

  const toggleLanguage = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  const handleWhatsApp = () => {
    window.open(
      "https://api.whatsapp.com/send/?phone=963940632191&text&type=phone_number&app_absent=0",
      "_blank",
    );
  };

  const handleEmail = () => {
    window.open("mailto:admin@ruyaacapital.com", "_blank");
  };

  const handleCall = () => {
    window.open("tel:+963940632191", "_self");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/90 backdrop-blur-md border-b border-gray-700/30">
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
          <Link
            href="/about"
            className="hover:text-gray-300 transition-colors text-gray-400"
          >
            {t("services")}
          </Link>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe1uegNY1vFO2TALM3JadNRt0fvPB_WJs_lb9Av6ePiS7OjIA/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors text-gray-400"
          >
            {t("about")}
          </a>
          <div className="relative">
            <button
              onClick={() => setIsContactOpen(!isContactOpen)}
              className="hover:text-gray-300 transition-colors text-gray-400"
            >
              {t("contact")}
            </button>
            {isContactOpen && (
              <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-xl p-4 min-w-[200px] z-50">
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={handleEmail}
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Email</span>
                  </button>
                  <button
                    onClick={handleCall}
                    className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{lang === "ar" ? "اتصال" : "Call"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={openChat}
            className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0"
          >
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
            <Link
              href="/about"
              className="hover:text-gray-300 transition-colors text-gray-400"
            >
              {t("services")}
            </Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe1uegNY1vFO2TALM3JadNRt0fvPB_WJs_lb9Av6ePiS7OjIA/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors text-gray-400"
            >
              {t("about")}
            </a>
            <div>
              <button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="hover:text-gray-300 transition-colors text-gray-400 w-full text-left"
              >
                {t("contact")}
              </button>
              {isContactOpen && (
                <div className="mt-2 ml-4 flex flex-col space-y-2">
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={handleEmail}
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </button>
                  <button
                    onClick={handleCall}
                    className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{lang === "ar" ? "اتصال" : "Call"}</span>
                  </button>
                </div>
              )}
            </div>
            <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0 w-full">
              {t("get_started")}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
