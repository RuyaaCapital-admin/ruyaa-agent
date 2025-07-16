"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  User,
  LogOut,
  Settings,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useChatWidget } from "@/context/chat-context";
import { useAuth } from "@/context/auth-context";
import SignInModal from "@/components/signin-modal";
import Link from "next/link";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { openChat } = useChatWidget();
  const { user, loading, signOut, resetPassword } = useAuth();

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

  const handleAuthButtonClick = () => {
    if (user) {
      setIsUserDropdownOpen(!isUserDropdownOpen);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleResetPassword = async () => {
    if (user?.email) {
      try {
        await resetPassword(user.email);
        setIsUserDropdownOpen(false);
        // Could show a success message here
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    }
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.full_name || user.email || "";
  };

  const authTranslations = {
    ar: {
      profile: "الملف الشخصي",
      resetPassword: "إعادة ضبط كلمة المرور",
      signOut: "تسجيل الخروج",
    },
    en: {
      profile: "Profile",
      resetPassword: "Reset Password",
      signOut: "Sign Out",
    },
  };

  const tAuth = (key: keyof typeof authTranslations.ar) =>
    authTranslations[lang][key];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down and past 100px
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/90 backdrop-blur-md border-b border-gray-700/30 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fb28b53df88fa4c49b4b3781167d08bdc%2F79e6ee17896a499bbacd1436df3f847c?format=webp&width=800"
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
            onClick={() => setIsMenuOpen(false)}
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
          {!loading && (
            <div className="relative">
              <Button
                onClick={handleAuthButtonClick}
                className={`${
                  user
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                } text-white border-0 flex items-center gap-2`}
              >
                {user ? (
                  <>
                    <User className="h-4 w-4" />
                    <span className="max-w-32 truncate">
                      {getUserDisplayName()}
                    </span>
                  </>
                ) : (
                  t("get_started")
                )}
              </Button>

              {/* User Dropdown */}
              {user && isUserDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-xl p-2 min-w-[200px] z-50">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded hover:bg-gray-800/50 text-left w-full"
                    >
                      <User className="h-4 w-4" />
                      <span>{tAuth("profile")}</span>
                    </button>
                    <button
                      onClick={handleResetPassword}
                      className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors p-3 rounded hover:bg-gray-800/50 text-left w-full"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>{tAuth("resetPassword")}</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors p-3 rounded hover:bg-gray-800/50 text-left w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{tAuth("signOut")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Language Switch Button */}
          <Button
            variant="outline"
            className="border-gray-600/50 text-gray-300 hover:bg-gray-800/20 px-3 py-2 bg-transparent"
            onClick={toggleLanguage}
          >
            <Globe className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Language Switch Button for Mobile */}
          <Button
            variant="outline"
            className="border-gray-600/50 text-gray-300 hover:bg-gray-800/20 px-2 py-1.5 bg-transparent mr-2"
            onClick={toggleLanguage}
          >
            <Globe className="h-4 w-4" />
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
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-300 transition-colors text-gray-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("services")}
            </Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe1uegNY1vFO2TALM3JadNRt0fvPB_WJs_lb9Av6ePiS7OjIA/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors text-gray-400"
              onClick={() => setIsMenuOpen(false)}
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
                    onClick={() => {
                      handleWhatsApp();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      handleEmail();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </button>
                  <button
                    onClick={() => {
                      handleCall();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors p-2 rounded hover:bg-gray-800/50"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{lang === "ar" ? "اتصال" : "Call"}</span>
                  </button>
                </div>
              )}
            </div>
            {!loading && (
              <Button
                onClick={() => {
                  if (user) {
                    setIsUserDropdownOpen(!isUserDropdownOpen);
                  } else {
                    setIsSignInModalOpen(true);
                  }
                  setIsMenuOpen(false);
                }}
                className={`${
                  user
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
                } text-white border-0 w-full flex items-center justify-center gap-2`}
              >
                {user ? (
                  <>
                    <User className="h-4 w-4" />
                    <span className="truncate">{getUserDisplayName()}</span>
                  </>
                ) : (
                  t("get_started")
                )}
              </Button>
            )}

            {/* Mobile User Actions */}
            {user && (
              <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsUserDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded hover:bg-gray-800/50 w-full text-left"
                >
                  <User className="h-4 w-4" />
                  <span>{tAuth("profile")}</span>
                </button>
                <button
                  onClick={() => {
                    handleResetPassword();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors p-2 rounded hover:bg-gray-800/50 w-full text-left"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>{tAuth("resetPassword")}</span>
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors p-2 rounded hover:bg-gray-800/50 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{tAuth("signOut")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </nav>
  );
}
