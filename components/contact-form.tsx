"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import { Send, Check, Mail, Phone, User, MessageSquare } from "lucide-react";

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
      <Card className="w-full max-w-2xl mx-auto bg-black/95 border border-gray-800/50 shadow-2xl backdrop-blur-md">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto border-2 border-green-700">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {lang === "ar"
                ? "تم إرسال رسالتك بنجاح!"
                : "Message Sent Successfully!"}
            </h3>
            <p className="text-gray-400">
              {lang === "ar"
                ? "شكراً لتواصلك معنا. سنعود إليك قريباً."
                : "Thank you for contacting us. We'll get back to you soon."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="w-full max-w-2xl mx-auto bg-black/95 border border-gray-800/50 shadow-2xl backdrop-blur-md"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <CardHeader className="bg-gradient-to-r from-gray-900/90 to-black/90 border-b border-gray-700/30 p-6">
        <CardTitle className="text-2xl font-bold text-white text-center">
          {lang === "ar" ? "تواصل معنا" : "Contact Us"}
        </CardTitle>
        <p className="text-gray-400 text-center mt-2">
          {lang === "ar"
            ? "نحن هنا لمساعدتك. أرسل لنا رسالة وسنعود إليك قريباً."
            : "We're here to help. Send us a message and we'll get back to you soon."}
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-white flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                {lang === "ar" ? "الاسم" : "Name"}
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder={lang === "ar" ? "اسمك الكامل" : "Your full name"}
                className="bg-gray-900/80 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-600/50 focus:border-transparent backdrop-blur-sm"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-white flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {lang === "ar" ? "البريد الإ��كتروني" : "Email"}
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder={
                  lang === "ar" ? "بريدك الإلكتروني" : "your@email.com"
                }
                className="bg-gray-900/80 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-600/50 focus:border-transparent backdrop-blur-sm"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone and Company Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-white flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {lang === "ar" ? "رقم الهاتف" : "Phone"}
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder={lang === "ar" ? "رقم هاتفك" : "Your phone number"}
                className="bg-gray-900/80 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-600/50 focus:border-transparent backdrop-blur-sm"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-white">
                {lang === "ar" ? "الشركة (اختياري)" : "Company (Optional)"}
              </Label>
              <Input
                id="company"
                {...register("company")}
                placeholder={lang === "ar" ? "اسم شركتك" : "Your company name"}
                className="bg-gray-900/80 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-600/50 focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label
              htmlFor="subject"
              className="text-white flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              {lang === "ar" ? "الموضوع" : "Subject"}
            </Label>
            <Input
              id="subject"
              {...register("subject")}
              placeholder={
                lang === "ar" ? "موضوع رسالتك" : "What is this about?"
              }
              className="bg-gray-900/80 border-gray-700/50 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-600/50 focus:border-transparent backdrop-blur-sm"
            />
            {errors.subject && (
              <p className="text-red-400 text-sm">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white">
              {lang === "ar" ? "الرسالة" : "Message"}
            </Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder={
                lang === "ar"
                  ? "اكتب رسالتك هنا..."
                  : "Tell us how we can help you..."
              }
              rows={5}
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-transparent resize-none"
            />
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-gray-800/90 to-black/90 hover:from-gray-700/90 hover:to-gray-800/90 text-white border border-gray-700/50 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-50 backdrop-blur-sm"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                {lang === "ar" ? "جاري الإرسال..." : "Sending..."}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
