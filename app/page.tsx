"use client"

import { useState } from "react"
import { Menu, X, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatWidget from "@/components/chat-widget"

export default function AIHeroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation Bar */}
      <nav className="relative z-50 px-6 py-4 bg-black/90 backdrop-blur-md border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/images/ruyaa-logo.png" alt="Ruyaa Capital Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <a href="#" className="hover:text-gray-300 transition-colors text-gray-400">
              الرئيسية
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors text-gray-400">
              الخدمات
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors text-gray-400">
              حول
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors text-gray-400">
              اتصل بنا
            </a>
            <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0">
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-700/30 p-6">
            <div className="flex flex-col space-y-4">
              <a href="#" className="hover:text-gray-300 transition-colors text-gray-400">
                الرئيسية
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors text-gray-400">
                الخدمات
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors text-gray-400">
                حول
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors text-gray-400">
                اتصل بنا
              </a>
              <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0 w-full">
                ابدأ الآن
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-6 py-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - AI Robot Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative group">
              {/* 3D Card Container */}
              <div className="relative transform-gpu transition-all duration-500 hover:scale-105">
                {/* Card Background with 3D Effect */}
                <div className="absolute inset-0 bg-gray-800/30 rounded-2xl blur-xl transform translate-x-4 translate-y-4"></div>
                <div className="absolute inset-0 bg-gray-700/20 rounded-2xl blur-lg transform translate-x-2 translate-y-2"></div>

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
                  {/* Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/20 via-transparent to-gray-400/20 p-[1px]">
                    <div className="h-full w-full rounded-2xl bg-gradient-to-br from-gray-900/95 to-black/95"></div>
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full h-full aspect-video">
                    {" "}
                    {/* Added aspect-video for consistent height */}
                    <img
                      src="/images/ai-robot-hero.png"
                      alt="AI Robot with Holographic Displays"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-right order-1 lg:order-2" dir="rtl">
            <div className="space-y-8">
              {/* Main Heading */}

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto lg:mx-0">
                حلول ذكية متطورة لتحويل تجربة العملاء المالية
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <div className="bg-gradient-to-br from-gray-800/20 to-transparent p-6 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                  <Zap className="h-8 w-8 text-gray-300 mb-3 mx-auto md:mx-0" />
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">معالجة فورية</h3>
                  <p className="text-gray-500 text-sm">تحليل البيانات في الوقت الفعلي</p>
                </div>

                <div className="bg-gradient-to-br from-gray-800/20 to-transparent p-6 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-gray-300 mb-3 mx-auto md:mx-0" />
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">أمان متقدم</h3>
                  <p className="text-gray-500 text-sm">حماية عالية المستوى للبيانات</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0 px-8 py-4 text-lg"
                >
                  ابدأ التجربة المجانية
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600/50 text-gray-300 hover:bg-gray-800/20 px-8 py-4 text-lg bg-transparent"
                >
                  تعرف على المزيد
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
      {/* Advisory Support Section */}
      <div className="relative py-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16" dir="rtl">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          {/* Single Card for Advisory Support */}
          <div className="relative group max-w-4xl mx-auto" dir="rtl">
            <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2">
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
          </div>
        </div>
      </div>

      {/* Smart Communication Section */}
      <div className="relative py-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16" dir="rtl">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          {/* Single Card for Smart Communication */}
          <div className="relative group max-w-4xl mx-auto" dir="rtl">
            <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2">
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
          </div>
        </div>
      </div>

      {/* Professional Appointments Section */}
      <div className="relative py-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16" dir="rtl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">إدارة المواعيد الاحترافية</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>

          {/* Card */}
          <div className="relative group max-w-4xl mx-auto" dir="rtl">
            <div className="relative transform-gpu transition-all duration-700 hover:scale-105 hover:-translate-y-2">
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
                  {/* Image Container */}
                  <div className="relative rounded-t-xl overflow-hidden aspect-[16/9]">
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
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  )
}
