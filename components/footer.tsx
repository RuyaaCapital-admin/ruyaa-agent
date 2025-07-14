"use client";

import { useLanguage } from "@/context/language-context";
import { Mail, Phone, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const { lang } = useLanguage();

  const handleWhatsApp = () => {
    window.open(
      "https://api.whatsapp.com/send/?phone=963940632191&text&type=phone_number&app_absent=0",
      "_blank",
    );
  };

  const handleEmail = () => {
    window.open("mailto:admin@ruyaacapital.com", "_blank");
  };

  return (
    <footer className="relative bg-black/95 border-t border-gray-800/50">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
              <div className="flex items-center gap-3">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fb28b53df88fa4c49b4b3781167d08bdc%2F79e6ee17896a499bbacd1436df3f847c?format=webp&width=800"
                  alt="Ruyaa Capital Logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {lang === "ar"
                  ? "رؤيا كابيتال - وكيل الذكاء الاصطناعي المتطور لتحويل تجربة العملاء وزيادة الإيرادات من خلال حلول ذكية ومبتكرة."
                  : "Ruyaa Capital - Advanced AI agent for transforming customer experience and increasing revenue through smart and innovative solutions."}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="p-3 bg-gray-900/60 hover:bg-gray-800/80 border border-gray-700/50 rounded-xl transition-all duration-300 hover:scale-105 group"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                </button>
                <button
                  onClick={handleEmail}
                  className="p-3 bg-gray-900/60 hover:bg-gray-800/80 border border-gray-700/50 rounded-xl transition-all duration-300 hover:scale-105 group"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
              <h3 className="text-lg font-semibold text-white">
                {lang === "ar" ? "روابط سريعة" : "Quick Links"}
              </h3>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {lang === "ar" ? "الرئيسية" : "Home"}
                </Link>
                <Link
                  href="/about"
                  className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {lang === "ar" ? "الخدمات" : "Services"}
                </Link>
                <Link
                  href="/services/professional-appointments"
                  className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {lang === "ar"
                    ? "المواعيد المهنية"
                    : "Professional Appointments"}
                </Link>
                <Link
                  href="/services/smart-communication"
                  className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {lang === "ar" ? "التواصل الذكي" : "Smart Communication"}
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
              <h3 className="text-lg font-semibold text-white">
                {lang === "ar" ? "خدماتنا" : "Our Services"}
              </h3>
              <div className="space-y-3">
                <div className="text-gray-400 text-sm">
                  {lang === "ar"
                    ? "وكيل الذكا�� الاصطناعي"
                    : "AI Agent Solutions"}
                </div>
                <div className="text-gray-400 text-sm">
                  {lang === "ar"
                    ? "إدارة التواصل الذكي"
                    : "Smart Communication Management"}
                </div>
                <div className="text-gray-400 text-sm">
                  {lang === "ar"
                    ? "المواعيد المهنية"
                    : "Professional Appointments"}
                </div>
                <div className="text-gray-400 text-sm">
                  {lang === "ar" ? "الاستشارات والدعم" : "Advisory & Support"}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6" dir={lang === "ar" ? "rtl" : "ltr"}>
              <h3 className="text-lg font-semibold text-white">
                {lang === "ar" ? "تواصل معنا" : "Contact Info"}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-900/60 border border-gray-700/50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                    </p>
                    <a
                      href="mailto:admin@ruyaacapital.com"
                      className="text-white text-sm hover:text-gray-300 transition-colors"
                    >
                      admin@ruyaacapital.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-900/60 border border-gray-700/50 rounded-lg">
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {lang === "ar" ? "واتساب" : "WhatsApp"}
                    </p>
                    <button
                      onClick={handleWhatsApp}
                      className="text-white text-sm hover:text-gray-300 transition-colors"
                    >
                      963 940 632 191
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-900/60 border border-gray-700/50 rounded-lg">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {lang === "ar" ? "الموقع الرئيسي" : "Main Website"}
                    </p>
                    <a
                      href="https://ruyaacapital.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm hover:text-gray-300 transition-colors"
                    >
                      ruyaacapital.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Copyright */}
              <div
                className="text-center md:text-left"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <p className="text-gray-500 text-sm">
                  {lang === "ar"
                    ? `© ${new Date().getFullYear()} رؤيا كابيتال. جميع الحقوق محفوظة.`
                    : `© ${new Date().getFullYear()} Ruyaa Capital. All rights reserved.`}
                </p>
              </div>

              {/* Legal Links */}
              <div
                className="flex items-center justify-center md:justify-end gap-6"
                dir={lang === "ar" ? "rtl" : "ltr"}
              >
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300"
                >
                  {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300"
                >
                  {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
