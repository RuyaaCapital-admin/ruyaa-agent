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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              This is the Smart Communication service page. Content will be
              added here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
