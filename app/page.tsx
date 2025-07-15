"use client";

"use client";

import { Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatWidget from "@/components/chat-widget";
import ContactForm from "@/components/contact-form";
import VerticalStepper from "@/components/vertical-stepper";
import PlatformLogos from "@/components/platform-logos";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-context"; // Import useLanguage
import { useChatWidget } from "@/context/chat-context"; // Import chat context
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AIHeroPage() {
  const { lang, t } = useLanguage(); // Use the language hook
  const { isOpen } = useChatWidget(); // Get chat open state
  const { openChat } = useChatWidget(); // Use the chat widget hook

  return (
    <div
      className="min-h-screen text-white overflow-hidden relative"
      style={{
        backgroundImage:
          'url("/dark-background-abstract-with-light-effect-vector.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-6 py-12 pt-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto" dir="rtl">
          <div className="flex items-center justify-between">
            {/* AI Brain Image - positioned on the right */}
            <div className="hidden lg:flex items-center justify-center w-1/3 opacity-80">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2c6c4e9567bc48d998d9523a7c150246%2Fd8d2d23a35ae4a4ab74780941dfdb855?format=webp&width=800"
                alt="AI Brain"
                className="w-72 h-72 object-contain drop-shadow-lg"
              />
            </div>

            {/* Main Content */}
            <div className="text-center relative z-10 lg:w-2/3">
              {/* Main Title with Subtle Blue Shadow */}
              <div className="relative mb-8">
                {/* Blue Shadow Layer */}
                <div className="absolute inset-0 transform translate-x-2 translate-y-2">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400/20 to-cyan-400/20 bg-clip-text text-transparent blur-sm">
                    وكيل الذكاء الاصطناعي من رؤيا كابيتا
                  </h1>
                </div>
                {/* Main Title */}
                <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                  وكيل الذكاء الاصطناعي من رؤيا كابيتا
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                حلول ذكية متطورة لتحويل تجربة العملاء وزيادة الإيرادات
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  onClick={openChat}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0 px-8 py-4 text-lg shadow-lg shadow-blue-500/10"
                >
                  ابدأ التجربة المجانية
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600/50 text-gray-300 hover:bg-gray-800/20 px-8 py-4 text-lg bg-transparent shadow-lg shadow-blue-500/5"
                >
                  تعرف على المزيد
                </Button>
              </div>

              {/* Platform Logos */}
              <PlatformLogos />
            </div>
          </div>
        </div>
      </div>

      {/* Features Timeline Section */}
      <div className="relative py-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-transparent"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12" dir="rtl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight px-4 mb-4">
              مميزات وكيل الذكاء الاصطناعي
            </h2>
            <p className="text-gray-400 text-lg mb-4 max-w-2xl mx-auto">
              اكتشف كيف يمكن لوكيل الذكاء الاصطناعي الخاص بنا تحويل عملك وزيادة
              أرباحك
            </p>
          </div>

          <VerticalStepper />
        </div>
      </div>

      {/* Professional Appointments Section */}
      <div className="relative py-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-transparent"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div
            className="text-center mb-16"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("professional_appointments_title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          {/* Card - Simplified */}
          <div
            className="relative group max-w-4xl mx-auto overflow-hidden"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <Link href="/services/professional-appointments">
              <div className="relative transform-gpu transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
                {/* Image Only - No Card Styling */}
                <div className="relative w-full">
                  <img
                    src="/images/service-card.png"
                    alt="Service Card"
                    className="w-full h-auto block"
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Smart Communication Section */}
      <div className="relative py-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-transparent"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div
            className="text-center mb-16"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("smart_communication_title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          {/* Single Card for Smart Communication */}
          <div
            className="relative group max-w-4xl mx-auto"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <Link href="/services/smart-communication">
              <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                {/* 3D Shadow Layers */}
                <div className="absolute inset-0 bg-gray-800/40 rounded-2xl blur-2xl transform translate-x-6 translate-y-6"></div>
                <div className="absolute inset-0 bg-gray-700/30 rounded-2xl blur-xl transform translate-x-3 translate-y-3"></div>
                <div className="absolute inset-0 bg-gray-600/20 rounded-2xl blur-lg transform translate-x-1 translate-y-1"></div>

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
                  {/* Subtle Border Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/20 via-transparent to-gray-400/20 p-[1px]">
                    <div className="h-full w-full rounded-2xl bg-gradient-to-br from-gray-900/98 to-black/98"></div>
                  </div>

                  {/* Card Content */}
                  <div className="relative">
                    {/* Image Container - Full Image */}
                    <div className="relative rounded-t-xl overflow-hidden aspect-[3/1]">
                      <img
                        src="/images/smart-communication.png"
                        alt="Smart Communication Management"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text Content - Below the image */}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Advisory Support Section */}
      <div className="relative py-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-transparent"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div
            className="text-center mb-16"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("advisory_support_title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          {/* Single Card for Advisory Support */}
          <div
            className="relative group max-w-4xl mx-auto"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                  {/* 3D Shadow Layers */}
                  <div className="absolute inset-0 bg-gray-800/40 rounded-2xl blur-2xl transform translate-x-6 translate-y-6"></div>
                  <div className="absolute inset-0 bg-gray-700/30 rounded-2xl blur-xl transform translate-x-3 translate-y-3"></div>
                  <div className="absolute inset-0 bg-gray-600/20 rounded-2xl blur-lg transform translate-x-1 translate-y-1"></div>

                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
                    {/* Subtle Border Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/20 via-transparent to-gray-400/20 p-[1px]">
                      <div className="h-full w-full rounded-2xl bg-gradient-to-br from-gray-900/98 to-black/98"></div>
                    </div>

                    {/* Card Content */}
                    <div className="relative">
                      {/* Image Container - Full Image */}
                      <div className="relative rounded-t-xl overflow-hidden aspect-[2/1]">
                        {" "}
                        {/* Adjusted aspect ratio to fit the full image */}
                        <img
                          src="/images/advisory-support.png"
                          alt="Advisory Support"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text Content - Below the image */}
                    </div>
                  </div>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900/95 border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle
                    className="text-white text-center"
                    dir="rtl"
                  >
                    الانتقال إلى صفحة وكلاء التداول؟
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-center">
                  <AlertDialogAction
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
                    onClick={() =>
                      window.open("https://ruyaacapital.com", "_blank")
                    }
                  >
                    زيار�� الآن
                  </AlertDialogAction>
                  <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    إلغاء
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative py-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-transparent"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div
            className="text-center mb-16"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("contact_us_title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          <ContactForm />
        </div>
      </div>

            <ChatWidget />
      {/* WhatsApp Floating Button - Hide when chat is open */}
      {!isOpen && (
        <a
          href="https://api.whatsapp.com/send/?phone=963940632191&text&type=phone_number&app_absent=0"
          className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-40 transition-opacity duration-300"
          target="_blank"
          aria-label="Chat on WhatsApp"
          rel="noreferrer"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2.004c-5.514 0-9.982 4.468-9.982 9.982 0 1.758.465 3.49 1.352 5.007L2 22l5.161-1.353a9.964 9.964 0 004.88 1.256h.002c5.514 0 9.982-4.468 9.982-9.982S17.554 2.004 12.04 2.004zm0 18.354a8.369 8.369 0 01-4.25-1.157l-.304-.181-3.063.803.82-2.984-.198-.308a8.358 8.358 0 01-1.3-4.438c0-4.633 3.77-8.403 8.403-8.403s8.403 3.77 8.403 8.403-3.77 8.403-8.403 8.403zm4.716-6.315c-.26-.13-1.53-.754-1.767-.84-.237-.089-.41-.13-.582.13-.173.26-.669.84-.82 1.014-.151.173-.303.195-.563.065-.26-.13-1.098-.405-2.09-1.29-.773-.69-1.293-1.544-1.444-1.804-.151-.26-.016-.4.113-.53.116-.115.26-.303.39-.454.13-.151.173-.26.26-.43.086-.173.043-.325-.022-.454-.065-.13-.582-1.407-.797-1.933-.208-.5-.418-.432-.582-.44l-.498-.009a.959.959 0 00-.69.325c-.238.26-.912.89-.912 2.17s.934 2.51 1.064 2.683c.13.173 1.838 2.805 4.457 3.932.623.268 1.108.428 1.486.547.623.199 1.19.171 1.638.104.5-.075 1.53-.623 1.746-1.224.217-.6.217-1.116.152-1.224-.065-.104-.238-.173-.498-.303z" />
        </svg>
      </a>

      {/* Footer */}
      <Footer />
    </div>
  );
}