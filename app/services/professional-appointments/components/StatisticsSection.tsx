"use client";

import { useEffect, useRef } from "react";

const stats = [
  "جميع المواعيد مُنظَّمة بدقة، دون إلغاء أو تأخير، وكل عميل يعلم دوره بوضوح.",
  "رضا العملاء يرتفع إلى أعلى المستويات بفضل سرعة الاستجابة وسهولة الخدمة.",
  "توفير 6 ساعات يوميًا من وقت العمل، حيث تُدار جميع المهام المتكررة تلقائيًا وبسلاسة.",
  "يمكنك خدمة أكثر من 100 عميل يوميًا دون أي ضغط أو إرهاق—النظام دائمًا دقيق وسريع الاستجابة.",
];

export default function StatisticsSection() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-white text-center mb-6">
        النتائج بعد التطبيق
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02]"
          >
            {/* Subtle background shadows for depth */}
            <div className="absolute inset-0 bg-gray-900/30 rounded-xl blur-xl transform translate-x-2 translate-y-2"></div>
            <div className="absolute inset-0 bg-gray-800/20 rounded-xl blur-lg transform translate-x-1 translate-y-1"></div>

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-gray-900/95 to-black/90 backdrop-blur-xl rounded-xl border border-gray-700/30 p-6 hover:border-gray-600/50 transition-all duration-300">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/5 via-transparent to-gray-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                <p
                  className="text-white text-sm leading-relaxed font-medium text-center"
                  dir="rtl"
                >
                  {stat}
                </p>
              </div>

              {/* Subtle reflection effect */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
