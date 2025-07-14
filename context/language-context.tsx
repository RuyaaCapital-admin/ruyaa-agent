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
    services: "من نحن",
    about: "سجل طلبك",
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
    contact_us_title: "تواصل معنا",
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
    contact_us_title: "Contact Us",
    language_switch: "العربية", // Text for the button to switch to Arabic
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
