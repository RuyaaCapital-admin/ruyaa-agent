"use client"

export default function AdvisorySupportPage() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-start pt-12 pb-20"
      style={{
        backgroundImage: 'url("/dark-background-abstract-with-light-effect-vector.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full max-w-5xl px-4 mb-12">
        <img 
          src="/images/advisory-support.png" 
          alt="الاستشارات والدعم المالي"
          className="w-full h-auto rounded-xl shadow-2xl border border-gray-800/50"
        />
      </div>
    </div>
  )
}