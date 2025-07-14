"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="min-h-screen text-white overflow-hidden relative flex items-center justify-center"
      style={{
        backgroundImage:
          'url("/dark-background-abstract-with-light-effect-vector.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent mb-6">
          404
        </h1>
        <h2
          className="text-2xl md:text-4xl font-bold text-white mb-4"
          dir="rtl"
        >
          الصفحة غير موجودة
        </h2>
        <p className="text-gray-400 text-lg mb-8" dir="rtl">
          عذراً، لا يمكن العثور على الصفحة التي تبحث عنها
        </p>
        <Link href="/">
          <Button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0 px-8 py-4 text-lg">
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
