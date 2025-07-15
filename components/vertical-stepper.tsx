"use client";

import {
  Clock,
  TrendingUp,
  Brain,
  Link,
  Calendar,
  Shield,
  Zap,
  MessageCircle,
  Globe,
  Settings,
  Headphones,
  DollarSign,
  Smartphone,
  CalendarClock,
} from "lucide-react";

interface StepperItem {
  id: number;
  title: string;
  description: string;
  details?: string[];
  icon: React.ReactNode;
}

const stepperData: StepperItem[] = [
  {
    id: 1,
    title: "خدمة على مدار الساعة",
    description:
      "يعمل وكيل الذكاء الاصطناعي الخاص بنا دون توقف، مما يضمن تلبية احتياجات عملائك في أي وقت.",
    icon: <Headphones className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "زيادة الإيرادات",
    description:
      "عزز مبيعاتك وأرباحك من خلال تفاعلات فعالة مع العملاء مدعومة بالذكاء الاصطناعي.",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "الحل الذكي المتكامل",
    description: "نظام شامل ومتطور لإدارة العملاء",
    details: [
      "الإجابة والإقناع وإتمام الصفقات أوتوماتيكياً",
      "متوفر 24 ساعة/7 أيام لجميع الاستفسارات",
      "نسبة حل ا��مشكلات تصل إلى 90%",
    ],
    icon: <Brain className="w-6 h-6" />,
  },
  {
    id: 4,
    title: "تكامل سلس عبر المنصات",
    description: "يمكن مقارنته مع جميع منصات التواصل الاجتماعي",
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "إدارة المواعيد و الحجوزات باحتراف",
    description: "ينظم مواعيدك مثل الإنسان",
    icon: <CalendarClock className="w-6 h-6" />,
  },
];

export default function VerticalStepper() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6" dir="rtl">
      <div className="relative">
        {/* Central Vertical Line with Blue Shadow */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-700">
          {/* Blue glow effect */}
          <div className="absolute inset-0 bg-blue-500/20 blur-sm w-1 -translate-x-0.5"></div>
        </div>

        {/* Steps */}
        <div className="space-y-12 sm:space-y-16">
          {stepperData.map((step, index) => {
            const isLeft = index % 2 === 1; // Alternate: right, left, right, left, right
            return (
              <div key={step.id} className="relative mb-4 sm:mb-0">
                {/* Step Circle positioned at center */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10 top-4 sm:top-0">
                  {/* Multiple shadow layers for depth */}
                  <div className="absolute inset-0 w-12 h-12 bg-blue-500/30 rounded-full blur-lg transform translate-x-2 translate-y-2"></div>
                  <div className="absolute inset-0 w-12 h-12 bg-black/40 rounded-full blur-sm transform translate-x-1 translate-y-1"></div>

                  {/* Main circle with enhanced design */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700 shadow-xl">
                    {/* Inner glow effect */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-800/50 to-transparent"></div>
                    <div className="relative text-white drop-shadow-sm">
                      {step.icon}
                    </div>
                  </div>

                  {/* Enhanced step number badge */}
                  <div
                    className={`absolute -top-2 w-6 h-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full flex items-center justify-center border border-gray-600 text-white text-xs font-bold shadow-lg ${
                      isLeft ? "-left-2" : "-right-2"
                    }`}
                  >
                    {step.id}
                  </div>
                </div>

                {/* Content positioned left or right */}
                <div
                  className={`w-full flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`w-full sm:w-5/12 ${isLeft ? "pr-12 sm:pr-16" : "pl-12 sm:pl-16"}`}
                  >
                    {/* Card with Enhanced Modern Shadows */}
                    <div className="relative">
                      {/* Multiple layered shadows for depth */}
                      <div className="absolute inset-0 bg-blue-500/15 rounded-xl blur-md transform translate-x-3 translate-y-3"></div>
                      <div className="absolute inset-0 bg-black/30 rounded-xl blur-sm transform translate-x-1 translate-y-1"></div>
                      <div className="absolute inset-0 bg-gray-900/20 rounded-xl blur-xs transform translate-x-0.5 translate-y-0.5"></div>

                      {/* Main card with enhanced design */}
                      <div className="relative bg-gradient-to-br from-gray-950 via-black to-gray-900 rounded-xl border border-gray-800/60 p-4 sm:p-6 shadow-2xl mt-8 sm:mt-0 backdrop-blur-sm">
                        {/* Enhanced border glow with reflection */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-transparent to-blue-400/5 p-[1px]">
                          <div className="h-full w-full rounded-xl bg-gradient-to-br from-gray-950/90 via-black to-gray-900/90"></div>
                        </div>
                        {/* Top reflection */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        <div
                          className={`relative ${isLeft ? "text-left" : "text-right"}`}
                        >
                          {/* Title */}
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-4">
                            {step.description}
                          </p>

                          {/* Details (if available) */}
                          {step.details && (
                            <ul className="space-y-2">
                              {step.details.map((detail, detailIndex) => (
                                <li
                                  key={detailIndex}
                                  className={`flex items-start gap-3 ${isLeft ? "" : "flex-row-reverse"}`}
                                >
                                  <div className="w-2 h-2 bg-blue-400/60 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-400 text-sm md:text-base">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
