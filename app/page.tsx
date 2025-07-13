"use client"

import { useState } from "react"
import { Menu, X, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatWidget from "@/components/chat-widget"
import { useLanguage } from "@/context/language-context" // Import useLanguage
import Link from "next/link"

export default function AIHeroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage() // Use the language hook

  const toggleLanguage = () => {
    setLang(lang === "ar" ? "en" : "ar")
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-900/20 via-black to-zinc-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]"></div>
      
      {/* Navigation Bar */}
      <nav className="relative z-50 px-6 py-4 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/images/ruyaa-logo.png" alt="Ruyaa Capital Logo" className="h-10 w-auto mono-image" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <a href="#" className="mono-interactive text-gray-400">
              {t("home")}
            </a>
            <a href="#" className="mono-interactive text-gray-400">
              {t("services")}
            </a>
            <a href="#" className="mono-interactive text-gray-400">
              {t("about")}
            </a>
            <a href="#" className="mono-interactive text-gray-400">
              {t("contact")}
            </a>
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
              {t("get_started")}
            </Button>
            {/* Language Switch Button */}
            <Button
              variant="outline"
              className="border-zinc-700 text-gray-300 hover:bg-zinc-800 px-4 py-2 bg-transparent"
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
              className="border-zinc-700 text-gray-300 hover:bg-zinc-800 px-3 py-1.5 bg-transparent mr-2"
              onClick={toggleLanguage}
            >
              {t("language_switch")}
            </Button>
            <button className="text-gray-300 mono-interactive" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 p-6">
            <div className="flex flex-col space-y-4">
              <a href="#" className="mono-interactive text-gray-400">
                {t("home")}
              </a>
              <a href="#" className="mono-interactive text-gray-400">
                {t("services")}
              </a>
              <a href="#" className="mono-interactive text-gray-400">
                {t("about")}
              </a>
              <a href="#" className="mono-interactive text-gray-400">
                {t("contact")}
              </a>
              <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 w-full">
                {t("get_started")}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - AI Robot Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative group">
              <div className="relative transform-gpu transition-all duration-500 hover:scale-105">
                {/* Shadow Layers */}
                <div className="absolute inset-0 bg-zinc-800/20 rounded-xl blur-xl transform translate-x-3 translate-y-3"></div>
                <div className="absolute inset-0 bg-zinc-700/10 rounded-xl blur-lg transform translate-x-1 translate-y-1"></div>
                
                {/* Main Card */}
                <div className="mono-card overflow-hidden shadow-2xl">
                  <div className="relative w-full h-full aspect-video">
                    <img
                      src="/images/ai-robot-hero.png"
                      alt="AI Robot with Holographic Displays"
                      className="w-full h-full object-cover rounded-xl mono-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-right order-1 lg:order-2" dir={lang === "ar" ? "rtl" : "ltr"}>
            <div className="space-y-8">
              {/* Main Heading */}
              <h1 className="text-6xl md:text-7xl font-light text-gray-200 mb-6">
                رؤيا كابيتال
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">{t("hero_subtitle")}</p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <div className="mono-card p-6">
                  <Zap className="h-8 w-8 mono-icon mb-3 mx-auto md:mx-0" />
                  <h3 className="text-xl font-normal text-gray-300 mb-2">{t("instant_processing")}</h3>
                  <p className="text-gray-400 text-base">{t("realtime_data_analysis")}</p>
                </div>

                <div className="mono-card p-6">
                  <Shield className="h-8 w-8 mono-icon mb-3 mx-auto md:mx-0" />
                  <h3 className="text-xl font-normal text-gray-300 mb-2">{t("advanced_security")}</h3>
                  <p className="text-gray-400 text-base">{t("high_level_data_protection")}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-12">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-medium"
                >
                  {t("start_free_trial")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 text-gray-300 hover:bg-zinc-800 px-8 py-4 text-lg bg-transparent"
                >
                  {t("learn_more")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse delay-500"></div>
      </div>
      {/* Professional Appointments Section */}
      <div className="relative py-20 px-6">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16" dir={lang === "ar" ? "rtl" : "ltr"}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-200 mb-4">{t("professional_appointments_title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
          </div>

          {/* Card */}
          <div className="relative group max-w-4xl mx-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
            <Link href="/services/professional-appointments">
              <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                {/* Shadow Layers */}
                <div className="absolute inset-0 bg-zinc-800/20 rounded-xl blur-xl transform translate-x-4 translate-y-4"></div>
                <div className="absolute inset-0 bg-zinc-700/10 rounded-xl blur-lg transform translate-x-2 translate-y-2"></div>

                {/* Main Card */}
                <div className="mono-card overflow-hidden shadow-2xl">
                  <div className="relative">
                    {/* Image Container */}
                    <div className="relative rounded-t-xl overflow-hidden aspect-[16/9]">
                      <img
                        src="/images/professional-appointments.png"
                        alt="Professional Appointment Management"
                        className="w-full h-full object-cover mono-image"
                        style={{
                          objectPosition: "center top",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Advisory Support Section */}
      <div className="relative py-20 px-6">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16" dir={lang === "ar" ? "rtl" : "ltr"}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-200 mb-4">{t("advisory_support_title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
          </div>

          {/* Single Card for Advisory Support */}
          <div className="relative group max-w-4xl mx-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
            <Link href="/services/advisory-support">
              <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                {/* Shadow Layers */}
                <div className="absolute inset-0 bg-zinc-800/20 rounded-xl blur-xl transform translate-x-4 translate-y-4"></div>
                <div className="absolute inset-0 bg-zinc-700/10 rounded-xl blur-lg transform translate-x-2 translate-y-2"></div>

                {/* Main Card */}
                <div className="mono-card overflow-hidden shadow-2xl">
                  <div className="relative">
                    {/* Image Container - Full Image */}
                    <div className="relative rounded-t-xl overflow-hidden aspect-[2/1]">
                      <img
                        src="/images/advisory-support.png"
                        alt="Advisory Support"
                        className="w-full h-full object-cover mono-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Smart Communication Section */}
      <div className="relative py-20 px-6">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16" dir={lang === "ar" ? "rtl" : "ltr"}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-200 mb-4">{t("smart_communication_title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
          </div>

          {/* Single Card for Smart Communication */}
          <div className="relative group max-w-4xl mx-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
            <Link href="/services/smart-communication">
              <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                {/* Shadow Layers */}
                <div className="absolute inset-0 bg-zinc-800/20 rounded-xl blur-xl transform translate-x-4 translate-y-4"></div>
                <div className="absolute inset-0 bg-zinc-700/10 rounded-xl blur-lg transform translate-x-2 translate-y-2"></div>

                {/* Main Card */}
                <div className="mono-card overflow-hidden shadow-2xl">
                  <div className="relative">
                    {/* Image Container - Full Image */}
                    <div className="relative rounded-t-xl overflow-hidden aspect-[3/1]">
                      <img
                        src="/images/smart-communication.png"
                        alt="Smart Communication Management"
                        className="w-full h-full object-cover mono-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <ChatWidget />
      {/* WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send/?phone=963940632191&text&type=phone_number&app_absent=0"
        className="fixed bottom-6 left-6 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-lg z-50 transition-colors duration-200"
        target="_blank"
        aria-label="Chat on WhatsApp"
        rel="noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2.004c-5.514 0-9.982 4.468-9.982 9.982 0 1.758.465 3.49 1.352 5.007L2 22l5.161-1.353a9.964 9.964 0 004.88 1.256h.002c5.514 0 9.982-4.468 9.982-9.982S17.554 2.004 12.04 2.004zm0 18.354a8.369 8.369 0 01-4.25-1.157l-.304-.181-3.063.803.82-2.984-.198-.308a8.358 8.358 0 01-1.3-4.438c0-4.633 3.77-8.403 8.403-8.403s8.403 3.77 8.403 8.403-3.77 8.403-8.403 8.403zm4.716-6.315c-.26-.13-1.53-.754-1.767-.84-.237-.089-.41-.13-.582.13-.173.26-.669.84-.82 1.014-.151.173-.303.195-.563.065-.26-.13-1.098-.405-2.09-1.29-.773-.69-1.293-1.544-1.444-1.804-.151-.26-.016-.4.113-.53.116-.115.26-.303.39-.454.13-.151.173-.26.26-.43.086-.173.043-.325-.022-.454-.065-.13-.582-1.407-.797-1.933-.208-.5-.418-.432-.582-.44l-.498-.009a.959.959 0 00-.69.325c-.238.26-.912.89-.912 2.17s.934 2.51 1.064 2.683c.13.173 1.838 2.805 4.457 3.932.623.268 1.108.428 1.486.547.623.199 1.19.171 1.638.104.5-.075 1.53-.623 1.746-1.224.217-.6.217-1.116.152-1.224-.065-.104-.238-.173-.498-.303z" />
        </svg>
      </a>
    </div>
  )
}
                    <img
                      src="/images/professional-appointments.png"
                      alt="Professional Appointment Management"
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: "center top", // Adjust object-position to show the screen part
                      }}
                    />
                  </div>

                  {/* Text Content */}
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
          <div className="text-center mb-16" dir={lang === "ar" ? "rtl" : "ltr"}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("advisory_support_title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          {/* Single Card for Advisory Support */}
          <div className="relative group max-w-4xl mx-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
            <Link href="/services/advisory-support">
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
          <div className="text-center mb-16" dir={lang === "ar" ? "rtl" : "ltr"}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("smart_communication_title")}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          {/* Single Card for Smart Communication */}
          <div className="relative group max-w-4xl mx-auto" dir={lang === "ar" ? "rtl" : "ltr"}>
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
                    {" "}
                    {/* Adjusted aspect ratio to fit the full image */}
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

      <ChatWidget />
      {/* WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send/?phone=963940632191&text&type=phone_number&app_absent=0"
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
        target="_blank"
        aria-label="Chat on WhatsApp"
        rel="noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2.004c-5.514 0-9.982 4.468-9.982 9.982 0 1.758.465 3.49 1.352 5.007L2 22l5.161-1.353a9.964 9.964 0 004.88 1.256h.002c5.514 0 9.982-4.468 9.982-9.982S17.554 2.004 12.04 2.004zm0 18.354a8.369 8.369 0 01-4.25-1.157l-.304-.181-3.063.803.82-2.984-.198-.308a8.358 8.358 0 01-1.3-4.438c0-4.633 3.77-8.403 8.403-8.403s8.403 3.77 8.403 8.403-3.77 8.403-8.403 8.403zm4.716-6.315c-.26-.13-1.53-.754-1.767-.84-.237-.089-.41-.13-.582.13-.173.26-.669.84-.82 1.014-.151.173-.303.195-.563.065-.26-.13-1.098-.405-2.09-1.29-.773-.69-1.293-1.544-1.444-1.804-.151-.26-.016-.4.113-.53.116-.115.26-.303.39-.454.13-.151.173-.26.26-.43.086-.173.043-.325-.022-.454-.065-.13-.582-1.407-.797-1.933-.208-.5-.418-.432-.582-.44l-.498-.009a.959.959 0 00-.69.325c-.238.26-.912.89-.912 2.17s.934 2.51 1.064 2.683c.13.173 1.838 2.805 4.457 3.932.623.268 1.108.428 1.486.547.623.199 1.19.171 1.638.104.5-.075 1.53-.623 1.746-1.224.217-.6.217-1.116.152-1.224-.065-.104-.238-.173-.498-.303z" />
        </svg>
      </a>
    </div>
  )
}