"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Phone, Mail, MessageSquare, Users, TrendingUp, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChatWidget from "@/components/chat-widget"
import Link from "next/link"

export default function AdvisorySupportPage() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "تحليل الوضع الحالي",
      description: "دراسة شاملة لوضعك المالي الحالي وتحديد نقاط القوة والضعف",
      duration: "1-2 أسابيع"
    },
    {
      title: "وضع الاستراتيجية",
      description: "تطوير خطة مالية مخصصة تناسب أهدافك وظروفك الشخصية",
      duration: "1 أسبوع"
    },
    {
      title: "التنفيذ والمتابعة",
      description: "تطبيق الخطة مع متابعة دورية وتعديلات حسب الحاجة",
      duration: "مستمر"
    },
    {
      title: "التقييم والتطوير",
      description: "مراجعة النتائج وتحسين الاستراتيجية بناءً على الأداء",
      duration: "شهرياً"
    }
  ]

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "فريق خبراء متخصص",
      description: "مستشارون ماليون معتمدون بخبرة تزيد عن 10 سنوات"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "تحليل متقدم",
      description: "استخدام أحدث أدوات التحليل المالي والذكاء الاصطناعي"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "سرية تامة",
      description: "حماية كاملة لبياناتك المالية وفقاً لأعلى معايير الأمان"
    }
  ]

  return (
    <div className="min-h-screen text-white overflow-hidden bg-cover bg-center bg-no-repeat" 
         style={{ backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yqffaVPVc3zn939Dz3nCF475QQUNSQ.png")' }}>
      
      {/* Navigation Bar */}
      <nav className="relative z-50 px-6 py-4 bg-black/90 backdrop-blur-md border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/ruyaa-logo.png" alt="Ruyaa Capital Logo" className="h-10 w-auto" />
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="border-gray-600/50 text-gray-300 hover:bg-gray-800/20 bg-transparent">
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-6">
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center" dir="rtl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            الاستشارات والدعم المالي
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            خدمات استشارية متخصصة لتحقيق أهدافك المالية مع فريق من الخبراء المعتمدين
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </div>

      {/* Service Image */}
      <div className="relative py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gray-800/40 rounded-2xl blur-2xl transform translate-x-4 translate-y-4"></div>
            <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
              <img 
                src="/images/advisory-support.png" 
                alt="خدمات الاستشارات والدعم المالي" 
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto" dir="rtl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">وصف الخدمة</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                نقدم خدمات استشارية مالية شاملة تهدف إلى مساعدتك في اتخاذ قرارات مالية مدروسة وتحقيق أهدافك الاستثمارية. 
                فريقنا من المستشارين المعتمدين يوفر لك التوجيه والدعم اللازم لإدارة أموالك بكفاءة عالية.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                نستخدم أحدث أدوات التحليل المالي والذكاء الاصطناعي لتقديم توصيات مخصصة تناسب وضعك المالي وأهدافك الشخصية.
              </p>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 space-x-reverse">
                    <div className="text-gray-400 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">مثال توضيحي</h3>
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-white mb-2">العميل: محمد أحمد</h4>
                  <p className="text-gray-300 text-sm mb-3">مهندس، 35 سنة، يريد الاستثمار لتعليم أطفاله</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">الراتب الشهري:</span>
                      <span className="text-white">15,000 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">المدخرات الحالية:</span>
                      <span className="text-white">100,000 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">الهدف:</span>
                      <span className="text-white">500,000 ريال في 10 سنوات</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4 border border-green-700/50">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">الحل المقترح</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                      استثمار 3,000 ريال شهرياً في صناديق متنوعة
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                      توزيع المحفظة: 60% أسهم، 30% سندات، 10% ذهب
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                      مراجعة ربع سنوية وإعادة توازن المحفظة
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Steps */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto" dir="rtl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">خطوات تنفيذ الخدمة</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card 
                key={index}
                className={`bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border-gray-700/50 cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'border-white/50 scale-105' : 'hover:border-gray-600/50'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      activeStep === index ? 'bg-white text-black' : 'bg-gray-700 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-xs text-gray-400">{step.duration}</span>
                  </div>
                  <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8" dir="rtl">
            <h2 className="text-3xl font-bold text-white text-center mb-8">اطلب الخدمة الآن</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">معلومات التواصل</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-300">+963 940 632 191</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-300">info@ruyaacapital.com</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-300">تواصل عبر الواتساب</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">ابدأ رحلتك المالية</h3>
                <p className="text-gray-300 mb-6">
                  احجز استشارة مجانية مع أحد خبرائنا لمناقشة أهدافك المالية ووضع خطة مخصصة لك.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0">
                    احجز استشارة مجانية
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600/50 text-gray-300 hover:bg-gray-800/20 bg-transparent">
                    تحميل الكتيب التعريفي
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send/?phone=963940632191&text&type=phone_number&app_absent=0"
        className="fixed bottom-6 left-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
        target="_blank"
        aria-label="Chat on WhatsApp"
        rel="noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2.004c-5.514 0-9.982 4.468-9.982 9.982 0 1.758.465 3.49 1.352 5.007L2 22l5.161-1.353a9.964 9.964 0 004.88 1.256h.002c5.514 0 9.982-4.468 9.982-9.982S17.554 2.004 12.04 2.004zm0 18.354a8.369 8.369 0 01-4.25-1.157l-.304-.181-3.063.803.82-2.984-.198-.308a8.358 8.358 0 01-1.3-4.438c0-4.633 3.77-8.403 8.403-8.403s8.403 3.77 8.403 8.403-3.77 8.403-8.403 8.403zm4.716-6.315c-.26-.13-1.53-.754-1.767-.84-.237-.089-.41-.13-.582.13-.173.26-.669.84-.82 1.014-.151.173-.303.195-.563.065-.26-.13-1.098-.405-2.09-1.29-.773-.69-1.293-1.544-1.444-1.804-.151-.26-.016-.4.113-.53.116-.115.26-.303.39-.454.13-.151.173-.26.26-.43.086-.173.043-.325-.022-.454-.065-.13-.582-1.407-.797-1.933-.208-.5-.418-.432-.582-.44l-.498-.009a.959.959 0 00-.69.325c-.238.26-.912.89-.912 2.17s.934 2.51 1.064 2.683c.13.173 1.838 2.805 4.457 3.932.623.268 1.108.428 1.486.547.623.199 1.19.171 1.638.104.5-.075 1.53-.623 1.746-1.224.217-.6.217-1.116.152-1.224-.065-.104-.238-.173-.498-.303z" />
        </svg>
      </a>
    </div>
  )
}