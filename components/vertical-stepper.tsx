"use client";

import { Clock, TrendingUp, Brain, Link, Calendar } from "lucide-react";

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
      "نسبة حل المشكلات تصل إلى 90%",
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
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6" dir="rtl">
      <div className="relative">
        {/* Vertical Line with Blue Shadow */}
        <div className="absolute right-4 sm:right-6 top-0 bottom-0 w-0.5 bg-gray-700">
          {/* Blue glow effect */}
          <div className="absolute inset-0 bg-blue-500/20 blur-sm w-1 -translate-x-0.5"></div>
        </div>

        {/* Steps */}
        <div className="space-y-8 sm:space-y-12">
          {stepperData.map((step, index) => (
            <div
              key={step.id}
              className="relative flex items-start gap-4 sm:gap-8"
            >
              {/* Step Circle with Blue Shadow */}
              <div className="relative flex-shrink-0">
                {/* Blue shadow layer */}
                <div className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full blur-md transform translate-x-1 translate-y-1"></div>

                {/* Main circle */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700 shadow-lg">
                  <div className="text-white scale-75 sm:scale-100">
                    {step.icon}
                  </div>
                </div>

                {/* Step number badge */}
                <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600 text-white text-xs font-bold">
                  {step.id}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                {/* Card with Blue Shadow */}
                <div className="relative">
                  {/* Blue shadow layer */}
                  <div className="absolute inset-0 bg-blue-500/10 rounded-xl blur-sm transform translate-x-2 translate-y-2"></div>

                  {/* Main card */}
                  <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-xl border border-gray-800/50 p-4 sm:p-6 shadow-2xl">
                    {/* Subtle border glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-transparent to-blue-400/10 p-[1px]">
                      <div className="h-full w-full rounded-xl bg-gradient-to-br from-gray-900/95 to-black/95"></div>
                    </div>

                    <div className="relative">
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
                              className="flex items-start gap-3"
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
          ))}
        </div>
      </div>
    </div>
  );
}
