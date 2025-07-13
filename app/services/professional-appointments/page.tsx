"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Phone, Mail, MessageSquare, Calendar, Clock, Users, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChatWidget from "@/components/chat-widget"
import Link from "next/link"

export default function ProfessionalAppointmentsPage() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "تحليل النظام الحالي",
      description: "دراسة طريقة إدارة المواعيد الحالية وتحديد نقاط التحسين",
      duration: "2-3 أيام"
    },
    {
      title: "تصميم النظام",
      description: "إعداد نظام إدارة المواعيد المخصص حسب احتياجاتك",
      duration: "1 أسبوع"
    },
    {
      title: "التكامل والتدريب",
      description: "ربط النظام مع أدواتك الحالية وتدريب الفريق",
      duration: "3-5 أيام"
    },
    {
      title: "التشغيل والدعم",
      description: "تفعيل النظام مع دعم فني مستمر ومتابعة الأداء",
      duration: "مستمر"
    }
  ]

  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "جدولة ذكية",
      description: "نظام حجز متقدم يتجنب التعارض ويحسن استغلال الوقت"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "تذكيرات تلقائية",
      description: "إرسال تذكيرات للعملاء عبر الرسائل والبريد الإلكتروني"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "تطبيق جوال",
      description: "تطبيق مخصص للعملاء لحجز وإدارة مواعيدهم بسهولة"
    }
  ]

  const benefits = [
    "تقليل المواعيد الملغاة بنسبة 60%",
    "زيادة كفاءة استغلال الوقت بنسبة 40%",
    "تحسين تجربة العملاء",
    "توفير وقت الموظفين",
    "تقارير مفصلة عن الأداء",
    "سهولة إعادة الجدولة",
    "دعم المواعيد الجماعية",
    "تكامل مع التقويم الشخصي"
  ]

  return (
    <div className="min-h-screen bg-black text-gray-200 overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-900/20 via-black to-zinc-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]"></div>
      
      {/* Navigation Bar */}
      <nav className="relative z-50 px-6 py-4 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/ruyaa-logo.png" alt="Ruyaa Capital Logo" className="h-10 w-auto mono-image" />
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="border-zinc-700 text-gray-300 hover:bg-zinc-800 bg-transparent">
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-6">
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center" dir="rtl">
          <h1 className="text-5xl md:text-7xl font-light text-gray-200 mb-6">
            إدارة المواعيد الاحترافية
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            نظام متطور لإدارة وجدولة المواعيد مع تذكيرات ذكية وتطبيق جوال مخصص
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
        </div>
      </div>

      {/* Service Image */}
      <div className="relative py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gray-800/40 rounded-2xl blur-2xl transform translate-x-4 translate-y-4"></div>
            <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
              <img 
                src="/images/professional-appointments.png" 
                alt="إدارة المواعيد الاحترافية" 
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
                نظام إدارة المواعيد الاحترافية يوفر حلاً شاملاً لجدولة وإدارة المواعيد بطريقة ذكية وفعالة. 
                يتضمن النظام تطبيقاً للجوال يمكن العملاء من حجز مواعيدهم بسهولة، مع تذكيرات تلقائية وإمكانية إعادة الجدولة.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                يدعم النظام أنواع مختلفة من المواعيد (فردية، جماعية، افتراضية) ويوفر تقارير مفصلة عن الأداء واستغلال الوقت، 
                مما يساعد في تحسين كفاءة العمل وزيادة رضا العملاء.
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
                  <h4 className="text-lg font-semibold text-white mb-2">عيادة الدكتور أحمد</h4>
                  <p className="text-gray-300 text-sm mb-3">عيادة طبية تستقبل 50+ مريض يومياً</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">المرضى اليوميين:</span>
                      <span className="text-white">50-70 مريض</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ساعات العمل:</span>
                      <span className="text-white">8 ساعات</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">المواعيد الملغاة:</span>
                      <span className="text-red-400">20% يومياً</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4 border border-green-700/50">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">النتائج بعد التطبيق</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                      تقليل المواعيد الملغاة إلى 8%
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                      زيادة عدد المرضى إلى 80 مريض يومياً
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                      تحسين رضا المرضى بنسبة 90%
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 ml-2" />
                      توفير 3 ساعات يومياً من وقت الموظفين
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto" dir="rtl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">فوائد النظام</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6 text-center hover:border-gray-600/50 transition-all duration-300">
                <div className="w-12 h-12 bg-green-900/50 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <p className="text-white font-medium">{benefit}</p>
              </div>
            ))}
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
                <h3 className="text-xl font-semibold text-white mb-4">ابدأ مع نظام إدارة المواعيد</h3>
                <p className="text-gray-300 mb-6">
                  احصل على نسخة تجريبية مجانية لمدة 30 يوماً واكتشف كيف يمكن لنظامنا تحسين إدارة مواعيدك.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0">
                    احصل على نسخة تجريبية مجانية
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600/50 text-gray-300 hover:bg-gray-800/20 bg-transparent">
                    شاهد عرضاً توضيحياً
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