"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"magic" | "google" | "reset" | null>(
    null,
  );
  const [showResetForm, setShowResetForm] = useState(false);
  const [message, setMessage] = useState("");
  const { signInWithGoogle, signInWithMagicLink, resetPassword } = useAuth();
  const { lang } = useLanguage();

  const isRTL = lang === "ar";

  const translations = {
    ar: {
      signIn: "تسجيل الدخول",
      email: "البريد الإلكتروني",
      sendMagicLink: "أرسل رابط الدخول",
      continueWithGoogle: "متابعة عبر Google",
      forgotPassword: "نسيت كلمة المرور؟",
      resetPassword: "إعادة ضبط كلمة المرور",
      sendResetLink: "أرسل رابط إعادة الضبط",
      backToSignIn: "العودة لتسجيل الدخول",
      enterEmail: "أدخل بريدك الإلكتروني",
      checkEmail: "تحقق من بريدك الإلكتروني للحصول على رابط تسجيل الدخول",
      resetEmailSent:
        "تم إرسال رابط إعادة ضبط كلمة المرور إلى بريدك الإلكتروني",
      invalidEmail: "عذراً، يرجى إدخال بريد إلكتروني صحيح",
      errorOccurred: "حدث خطأ، يرجى المحاولة مرة أخرى",
    },
    en: {
      signIn: "Sign In",
      email: "Email",
      sendMagicLink: "Send Magic Link",
      continueWithGoogle: "Continue with Google",
      forgotPassword: "Forgot Password?",
      resetPassword: "Reset Password",
      sendResetLink: "Send Reset Link",
      backToSignIn: "Back to Sign In",
      enterEmail: "Enter your email address",
      checkEmail: "Check your email for the magic link to sign in",
      resetEmailSent: "Password reset link has been sent to your email",
      invalidEmail: "Please enter a valid email address",
      errorOccurred: "An error occurred, please try again",
    },
  };

  const t = (key: keyof typeof translations.ar) => translations[lang][key];

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage(t("invalidEmail"));
      return;
    }

    setLoading("magic");
    setMessage("");

    const { error } = await signInWithMagicLink(email);
    if (!error) {
      setEmail("");
      onClose(); // Close modal on success
    }
    setLoading(null);
  };

  const handleGoogleSignIn = async () => {
    setLoading("google");
    setMessage("");

    await signInWithGoogle();
    // Google auth will redirect, so we don't need to handle success here
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage(t("invalidEmail"));
      return;
    }

    setLoading("reset");
    setMessage("");

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setMessage(t("errorOccurred"));
      } else {
        setMessage(t("resetEmailSent"));
        setEmail("");
        setShowResetForm(false);
      }
    } catch (error) {
      setMessage(t("errorOccurred"));
    } finally {
      setLoading(null);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 pt-20 sm:pt-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-md bg-[#111827] sm:rounded-2xl shadow-xl p-6 ${isRTL ? "text-right" : "text-left"}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute ${isRTL ? "left-4" : "right-4"} top-4 text-gray-400 hover:text-gray-200 transition-colors`}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {showResetForm ? t("resetPassword") : t("signIn")}
          </h2>
          <p className="text-gray-400 text-sm">
            {showResetForm ? t("enterEmail") : t("enterEmail")}
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.includes(t("checkEmail")) ||
              message.includes(t("resetEmailSent"))
                ? "bg-green-900/30 text-green-400 border border-green-800"
                : "bg-red-900/30 text-red-400 border border-red-800"
            }`}
          >
            <p className="text-sm">{message}</p>
          </div>
        )}

        {!showResetForm ? (
          <>
            {/* Magic Link Form */}
            <form onSubmit={handleMagicLink} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t("email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  placeholder={t("email")}
                  disabled={loading === "magic"}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <Button
                type="submit"
                disabled={loading === "magic"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading === "magic" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                {t("sendMagicLink")}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-900 px-2 text-gray-400">
                  {lang === "ar" ? "أو" : "or"}
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading === "google"}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-4"
            >
              {loading === "google" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              {t("continueWithGoogle")}
            </Button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                onClick={() => setShowResetForm(true)}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                {t("forgotPassword")}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Reset Password Form */}
            <form onSubmit={handleResetPassword} className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {t("email")}
                </label>
                <Input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
                  placeholder={t("email")}
                  disabled={loading === "reset"}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
              <Button
                type="submit"
                disabled={loading === "reset"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading === "reset" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
                {t("sendResetLink")}
              </Button>
            </form>

            {/* Back to Sign In */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowResetForm(false);
                  setMessage("");
                  setEmail("");
                }}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
              >
                {t("backToSignIn")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
