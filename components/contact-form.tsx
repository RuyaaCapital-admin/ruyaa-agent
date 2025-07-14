"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import {
  Send,
  Check,
  Mail,
  Phone,
  User,
  MessageSquare,
  Building,
  Zap,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { lang, t } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);

    try {
      // For now, we'll use mailto as a fallback since no backend is set up
      // This can be replaced with a backend API call later
      const emailBody = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || "N/A"}
Subject: ${data.subject}

Message:
${data.message}
      `.trim();

      const mailtoLink = `mailto:admin@ruyaacapital.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;

      // Open default email client
      window.open(mailtoLink, "_self");

      // Show success message
      setIsSubmitted(true);
      reset();

      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto relative">
        {/* Success State with Futuristic Design */}
        <div className="relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-800/95 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl overflow-hidden">
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-500/20 via-transparent to-gray-400/20 p-[1px]">
            <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-900/98 to-black/98"></div>
          </div>

          {/* Grid Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>

          <div className="relative p-12">
            <div className="text-center space-y-6">
              {/* Success Icon with Glow */}
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-full flex items-center justify-center border border-green-700/50 backdrop-blur-sm">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white">
                {lang === "ar"
                  ? "تم إرسال رسالتك بنجاح!"
                  : "Message Sent Successfully!"}
              </h3>
              <p className="text-gray-400 text-lg">
                {lang === "ar"
                  ? "شكراً لتواصلك معنا. سنعود إليك قريباً."
                  : "Thank you for contacting us. We'll get back to you soon."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-2xl mx-auto relative"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Main Container with Futuristic Design */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-800/95 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl overflow-hidden">
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-500/20 via-transparent to-gray-400/20 p-[1px]">
          <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-900/98 to-black/98"></div>
        </div>

        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

        {/* Glowing Accents */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gray-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gray-400/10 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="relative border-b border-gray-700/30 p-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <Zap className="w-6 h-6 text-gray-300" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                {lang === "ar" ? "تواصل معنا" : "Contact Us"}
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              {lang === "ar"
                ? "نحن هنا لمساعدتك. أرسل لنا رسالة وسنعود إليك قريباً."
                : "We're here to help. Send us a message and we'll get back to you soon."}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="relative p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="text-white flex items-center gap-2 text-sm font-medium"
                >
                  <div className="p-1 bg-gray-800/50 rounded border border-gray-700/50">
                    <User className="w-3 h-3" />
                  </div>
                  {lang === "ar" ? "الاسم" : "Name"}
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder={
                      lang === "ar" ? "اسمك الكامل" : "Your full name"
                    }
                    className="bg-gray-900/60 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 backdrop-blur-sm rounded-xl h-12 transition-all duration-300 hover:bg-gray-900/80"
                  />
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/0 via-gray-400/5 to-gray-500/0 pointer-events-none"></div>
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-white flex items-center gap-2 text-sm font-medium"
                >
                  <div className="p-1 bg-gray-800/50 rounded border border-gray-700/50">
                    <Mail className="w-3 h-3" />
                  </div>
                  {lang === "ar" ? "البريد ��لإلكتروني" : "Email"}
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder={
                      lang === "ar" ? "بريدك الإلكتروني" : "your@email.com"
                    }
                    className="bg-gray-900/60 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 backdrop-blur-sm rounded-xl h-12 transition-all duration-300 hover:bg-gray-900/80"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/0 via-gray-400/5 to-gray-500/0 pointer-events-none"></div>
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone and Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-white flex items-center gap-2 text-sm font-medium"
                >
                  <div className="p-1 bg-gray-800/50 rounded border border-gray-700/50">
                    <Phone className="w-3 h-3" />
                  </div>
                  {lang === "ar" ? "رقم الهاتف" : "Phone"}
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder={
                      lang === "ar" ? "رقم هاتفك" : "Your phone number"
                    }
                    className="bg-gray-900/60 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 backdrop-blur-sm rounded-xl h-12 transition-all duration-300 hover:bg-gray-900/80"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/0 via-gray-400/5 to-gray-500/0 pointer-events-none"></div>
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="company"
                  className="text-white flex items-center gap-2 text-sm font-medium"
                >
                  <div className="p-1 bg-gray-800/50 rounded border border-gray-700/50">
                    <Building className="w-3 h-3" />
                  </div>
                  {lang === "ar" ? "الشركة (اختياري)" : "Company (Optional)"}
                </Label>
                <div className="relative">
                  <Input
                    id="company"
                    {...register("company")}
                    placeholder={
                      lang === "ar" ? "اسم شركتك" : "Your company name"
                    }
                    className="bg-gray-900/60 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 backdrop-blur-sm rounded-xl h-12 transition-all duration-300 hover:bg-gray-900/80"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/0 via-gray-400/5 to-gray-500/0 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-3">
              <Label
                htmlFor="subject"
                className="text-white flex items-center gap-2 text-sm font-medium"
              >
                <div className="p-1 bg-gray-800/50 rounded border border-gray-700/50">
                  <MessageSquare className="w-3 h-3" />
                </div>
                {lang === "ar" ? "الموضوع" : "Subject"}
              </Label>
              <div className="relative">
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder={
                    lang === "ar" ? "موضوع رسالتك" : "What is this about?"
                  }
                  className="bg-gray-900/60 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 backdrop-blur-sm rounded-xl h-12 transition-all duration-300 hover:bg-gray-900/80"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/0 via-gray-400/5 to-gray-500/0 pointer-events-none"></div>
              </div>
              {errors.subject && (
                <p className="text-red-400 text-sm">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-3">
              <Label
                htmlFor="message"
                className="text-white text-sm font-medium"
              >
                {lang === "ar" ? "الرسالة" : "Message"}
              </Label>
              <div className="relative">
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder={
                    lang === "ar"
                      ? "اكتب رسالتك هنا..."
                      : "Tell us how we can help you..."
                  }
                  rows={6}
                  className="bg-gray-900/60 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 backdrop-blur-sm rounded-xl resize-none transition-all duration-300 hover:bg-gray-900/80"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/0 via-gray-400/5 to-gray-500/0 pointer-events-none"></div>
              </div>
              {errors.message && (
                <p className="text-red-400 text-sm">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gray-800/90 to-black/90 hover:from-gray-700/90 hover:to-gray-800/90 text-white border border-gray-700/50 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:opacity-50 backdrop-blur-sm relative overflow-hidden group"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 via-gray-500/10 to-gray-600/0 group-hover:via-gray-400/20 transition-all duration-300"></div>

                <div className="relative flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      {lang === "ar" ? "جاري الإرسال..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
                    </>
                  )}
                </div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
