"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Language, Record<string, string>> = {
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    about: "حول",
    contact: "اتصل بنا",
    get_started: "ابدأ الآن",
    hero_subtitle: "حلول ذكية متطورة لتحويل تجربة العملاء المالية",
    instant_processing: "معالجة فورية",
    realtime_data_analysis: "تحليل البيانات في الوقت الفعلي",
    advanced_security: "أمان متقدم",
    high_level_data_protection: "حماية عالية المستوى للبيانات",
    start_free_trial: "ابدأ التجربة المجانية",
    learn_more: "تعرف على المزيد",
    advisory_support_title: "الاستشارات والدعم",
    smart_communication_title: "إدارة الاتصالات الذكية",
    professional_appointments_title: "إدارة المواعيد الاحترافية",
    ruyaa_ai_assistant: "مساعد رؤيا الذكي",
    chat_welcome_message:
      "أهلاً! أنا مساعد رؤيا الذكي – جاهز أشرح كيف وكلاؤنا بيخلّصوا شغلك تلقائياً. شو بتحتاج؟",
    type_your_message: "اكتب رسالتك...",
    send: "إرسال",
    language_switch: "English", // Text for the button to switch to English
  },
  en: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    get_started: "Get Started",
    hero_subtitle:
      "Advanced AI Solutions for Transforming Financial Customer Experience",
    instant_processing: "Instant Processing",
    realtime_data_analysis: "Real-time data analysis",
    advanced_security: "Advanced Security",
    high_level_data_protection: "High-level data protection",
    start_free_trial: "Start Free Trial",
    learn_more: "Learn More",
    advisory_support_title: "Advisory & Support",
    smart_communication_title: "Smart Communication Management",
    professional_appointments_title: "Professional Appointment Management",
    ruyaa_ai_assistant: "Ruyaa AI Assistant",
    chat_welcome_message:
      "Hello! I'm Ruyaa AI Assistant – ready to explain how our agents automate your work. What do you need?",
    type_your_message: "Type your message...",
    send: "Send",
    language_switch: "العربية", // Text for the button to switch to Arabic
    smart_communication_description:
      "Advanced Smart Communication Management System that transforms customer interaction experience",
    smart_communication_main_benefit:
      "Improve communication efficiency and increase customer satisfaction by up to 85%",
    service_overview: "Service Overview",
    key_benefits: "Key Benefits",
    how_it_works: "How It Works",
    smart_comm_overview:
      "Smart Communication Management System uses advanced AI technologies to automatically analyze and route conversations, ensuring each customer reaches the right solution as quickly as possible.",
    automated_routing: "Smart Automated Routing",
    automated_routing_desc:
      "Automatically route conversations to the appropriate team based on inquiry nature",
    sentiment_analysis: "Sentiment Analysis",
    sentiment_analysis_desc:
      "Understand customer emotional state and provide appropriate responses",
    response_optimization: "Response Optimization",
    response_optimization_desc:
      "Suggest best responses and solutions based on context and history",
    multichannel_support: "Multi-channel Support",
    multichannel_support_desc:
      "Unified management of conversations across email, chat, and phone",
    real_time_analytics: "Real-time Analytics",
    real_time_analytics_desc:
      "Monitor team performance and customer satisfaction metrics in real-time",
    cost_reduction: "Cost Reduction",
    cost_reduction_desc: "Reduce customer service costs by up to 40%",
    step_1: "Step 1: Automatic Analysis",
    step_1_desc:
      "System analyzes message content and determines inquiry nature",
    step_2: "Step 2: Smart Routing",
    step_2_desc: "Routes conversation to the best available team or agent",
    step_3: "Step 3: Smart Assistance",
    step_3_desc: "Provides suggestions for appropriate solutions and responses",
    step_4: "Step 4: Follow-up and Improvement",
    step_4_desc: "Tracks results and continuously improves performance",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("ar"); // Default to Arabic

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language;
    if (storedLang && (storedLang === "ar" || storedLang === "en")) {
      setLang(storedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang][key] || key; // Fallback to key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
