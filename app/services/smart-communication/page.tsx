"use client";

import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Brain,
  Target,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";

export default function SmartCommunicationPage() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: TrendingUp,
      title: t("automated_routing"),
      description: t("automated_routing_desc"),
      metric: "95%",
      metricLabel: "دقة التوجيه",
    },
    {
      icon: Brain,
      title: t("sentiment_analysis"),
      description: t("sentiment_analysis_desc"),
      metric: "90%",
      metricLabel: "دقة التحليل",
    },
    {
      icon: Target,
      title: t("response_optimization"),
      description: t("response_optimization_desc"),
      metric: "70%",
      metricLabel: "تحسن الرد",
    },
    {
      icon: MessageSquare,
      title: t("multichannel_support"),
      description: t("multichannel_support_desc"),
      metric: "100%",
      metricLabel: "التغطية",
    },
    {
      icon: BarChart3,
      title: t("real_time_analytics"),
      description: t("real_time_analytics_desc"),
      metric: "24/7",
      metricLabel: "المراقبة",
    },
    {
      icon: DollarSign,
      title: t("cost_reduction"),
      description: t("cost_reduction_desc"),
      metric: "40%",
      metricLabel: "توفير التكاليف",
    },
  ];

  const steps = [
    {
      number: "1",
      title: t("step_1"),
      description: t("step_1_desc"),
      icon: Brain,
    },
    {
      number: "2",
      title: t("step_2"),
      description: t("step_2_desc"),
      icon: Target,
    },
    {
      number: "3",
      title: t("step_3"),
      description: t("step_3_desc"),
      icon: Zap,
    },
    {
      number: "4",
      title: t("step_4"),
      description: t("step_4_desc"),
      icon: BarChart3,
    },
  ];

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
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600/20 p-4 rounded-full">
                <MessageSquare className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("smart_communication_title")}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {t("smart_communication_description")}
            </p>
            <Badge
              variant="secondary"
              className="text-lg px-6 py-2 bg-green-600/20 text-green-400 border-green-500/30"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              {t("smart_communication_main_benefit")}
            </Badge>
          </div>

          {/* Service Overview */}
          <Card className="mb-12 bg-gray-900/80 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-400" />
                {t("service_overview")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t("smart_comm_overview")}
              </p>
            </CardContent>
          </Card>

          {/* Key Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center gap-3">
              <Users className="h-8 w-8 text-blue-400" />
              {t("key_benefits")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="bg-gray-900/80 border-gray-700 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <IconComponent className="h-8 w-8 text-blue-400" />
                        <div className="text-left">
                          <div className="text-2xl font-bold text-green-400">
                            {benefit.metric}
                          </div>
                          <div className="text-sm text-gray-400">
                            {benefit.metricLabel}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center gap-3">
              <Clock className="h-8 w-8 text-blue-400" />
              {t("how_it_works")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    <Card className="bg-gray-900/80 border-gray-700 hover:bg-gray-800/80 transition-all duration-300">
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4 bg-blue-600/20 p-4 rounded-full w-fit">
                          <IconComponent className="h-8 w-8 text-blue-400" />
                        </div>
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mx-auto mb-2">
                          {step.number}
                        </div>
                        <CardTitle className="text-white text-lg">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-center leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="h-6 w-6 text-blue-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-blue-500/30">
            <CardContent className="text-center py-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                هل أنت مستعد لتحويل تجربة التواصل مع عملائك؟
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                ابدأ رحلتك مع نظام إدارة الاتصالات الذكية واستمتع بتحسن فوري في
                كفاءة فريق خدمة العملاء
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center gap-2">
                  {t("start_free_trial")}
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
                  {t("learn_more")}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
