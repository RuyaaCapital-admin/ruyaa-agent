'use client';

import { useEffect, useRef } from 'react';

const stats = [
  { 
    value: '8%', 
    label: 'فقط من المواعيد الملغاة',
    icon: '✓',
    delay: 0.1
  },
  { 
    value: '90%', 
    label: 'من رضا المرضى',
    icon: '❤',
    delay: 0.2
  },
  { 
    value: '3 ساعات', 
    label: 'توفير يومياً من وقت العمل',
    icon: '⏱',
    delay: 0.3
  },
  { 
    value: '80 مريض', 
    label: 'استقبال يومياً بكفاءة',
    icon: '👥',
    delay: 0.4
  }
];

export default function StatisticsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      const items = currentRef.querySelectorAll('.stat-item');
      items.forEach((item) => observer.observe(item));
    }

    return () => {
      if (currentRef) {
        const items = currentRef.querySelectorAll('.stat-item');
        items.forEach((item) => observer.unobserve(item));
      }
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#0a0a0a] px-4 text-2xl font-bold text-white">
            النتائج بعد التطبيق
          </span>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="stat-item opacity-0 transform translate-y-8 transition-all duration-700 ease-out"
            style={{ transitionDelay: `${stat.delay}s` }}
          >
            <div className="h-full bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-colors duration-300">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{stat.icon}</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <p className="text-gray-300 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        @media (max-width: 640px) {
          .animate-fadeInUp {
            animation: none;
            opacity: 1;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
