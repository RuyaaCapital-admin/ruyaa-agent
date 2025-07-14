'use client';

import { useEffect, useRef } from 'react';

const stats = [
  '8% فقط من المواعيد الملغاة',
  'تحقيق 90% من رضا المرضى',
  'توفير 3 ساعات يومياً من وقت العمل',
  'استقبال 80 مريض يومياً بكفاءة'
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
