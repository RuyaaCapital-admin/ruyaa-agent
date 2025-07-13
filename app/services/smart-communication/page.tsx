"use client";

export default function SmartCommunicationPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          'url("/dark-background-abstract-with-light-effect-vector.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen bg-black/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Smart Communication Management
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              نظام إدارة الاتصالات الذكية الذي يدعم جميع المنصات الرئيسية
            </p>

            {/* Supported Platforms Image */}
            <div className="flex justify-center mb-12">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8d6e2ebe2191474fb5a6de98317d4278%2F68c6df640b0e427098e1af83f07eb049?format=webp&width=800"
                alt="المنصات المدعومة - Supported Platforms"
                className="max-w-full h-auto"
                style={{
                  filter: "none",
                  background: "transparent",
                }}
              />
            </div>

            {/* How Smart Agent Works Image */}
            <div className="flex justify-center mb-12">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8d6e2ebe2191474fb5a6de98317d4278%2Ffaa0d28016fd431a9b1e525e41eb75ed?format=webp&width=800"
                alt="كيف يعمل الوكيل الذكي؟ - How does the smart agent work?"
                className="max-w-full h-auto"
                style={{
                  filter: "none",
                  background: "transparent",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
