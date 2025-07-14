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
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "زيادة الإيرادات",
    description:
      "عزز مبيعاتك وأرباحك من خلال تفاعلات فعالة مع العملاء مدعومة بالذكاء الاصطناعي.",
    icon: <TrendingUp className="w-6 h-6" />,
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
    icon: <Link className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "إدارة المواعيد و الحجوزات باحتراف",
    description: "ينظم مواعيدك مثل الإنسان",
    icon: <Calendar className="w-6 h-6" />,
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
                  {/* Blue shadow layer */}
                  <div className="absolute inset-0 w-12 h-12 bg-blue-500/20 rounded-full blur-md transform translate-x-1 translate-y-1"></div>

                  {/* Main circle */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700 shadow-lg">
                    <div className="text-white">{step.icon}</div>
                  </div>

                  {/* Step number badge */}
                  <div
                    className={`absolute -top-2 w-6 h-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600 text-white text-xs font-bold ${
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
                    {/* Card with Blue Shadow */}
                    <div className="relative">
                      {/* Blue shadow layer */}
                      <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-sm transform translate-x-2 translate-y-2"></div>

                      {/* Main card */}
                      <div className="relative bg-black rounded-xl border border-gray-800/50 p-4 sm:p-6 shadow-2xl mt-8 sm:mt-0">
                        {/* Subtle border glow */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 via-transparent to-blue-400/5 p-[1px]">
                          <div className="h-full w-full rounded-xl bg-black"></div>
                        </div>

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
