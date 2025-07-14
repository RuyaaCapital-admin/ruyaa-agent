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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-gray-800 text-sm font-semibold text-white text-center hover:bg-black/60 transition-colors duration-200"
          >
            {stat}
          </div>
        ))}
      </div>
    </div>
  );
}
