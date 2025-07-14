"use client";

import { useLanguage } from "@/context/language-context";
import ChatWidget from "@/components/chat-widget";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div
      className="min-h-screen text-white overflow-hidden relative"
      style={{
        backgroundImage:
          'url("/dark-background-abstract-with-light-effect-vector.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto" dir="rtl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent mb-6">
              من نحن – Ruyaa Capital
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 md:p-12 shadow-2xl">
              {/* Company Description */}
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                <strong className="text-white">Ruyaa Capital</strong> هي مؤسسة
                مالية وتقنية مدفوعة بالذكاء الاصطناعي، تأسست في سوريا وتوسّعت
                منذ سنوات إلى دولة الإمارات العربية المتحدة والمملكة العربية
                السعودية. مهمتنا هي تمكين الأفراد والشركات من تحقيق أقصى
                إمكاناتهم عبر حلول تداول واستشارات مدعومة بالكامل بوكلاء ذكاء
                اصطناعي متطوّرين.
              </p>

              {/* Vision */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  </div>
                  رؤيتنا
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  نحو مستقبل يندمج فيه الذكاء الاصطناعي بسلاسة مع القرارات
                  المالية والتشغيلية، ليمنح عملاءنا سرعة الأداء، دقّة التحليل،
                  وسهولة الاستخدام.
                </p>
              </div>

              {/* What Makes Us Different */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  </div>
                  ما الذي يميّزنا؟
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        تداول تقوده الخوارزميات:
                      </strong>{" "}
                      منصّة ruyaacapital.com تشغّل وكلاء تداول ذكيين يقومون
                      بتحليل الأسواق وتنفيذ الصفقات في الوقت الفعلي، مع إدارة
                      مخاطر استباقية.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">
                        حلول أعمال مدفوعة بالوكلاء:
                      </strong>{" "}
                      عبر agent.ruyaacapital.com نقدّم وكلاء ذكاء اصطناعي جاهزين
                      لخدمة العملاء، أتمتة المهام، وجدولة المواعيد—وكل ذلك
                      بتكامل كامل مع Google Workspace و Meta Business Suite.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">شراكة تقنية رائدة:</strong>{" "}
                      نعمل بشراكة رسمية مع{" "}
                      <strong className="text-blue-400">ChatGPT</strong> لتقديم
                      تجربة حوارية طبيعية وتعلم متواصل لوكلائنا.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Values */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                  </div>
                  قيمنا
                </h3>
                <ol className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <strong className="text-white">الابتكار المستدام:</strong>{" "}
                      نتبنّى أحدث التقنيات ونطوّعها لخدمة عملائنا.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <strong className="text-white">الشفافية:</strong> تقارير
                      فورية ولوحات تحكم حيّة تتيح رؤية واضحة لكل خطوة.
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <strong className="text-white">موثوقية إقليمية:</strong>{" "}
                      جذورنا في سوريا ودعمنا من مراكز أعمال في الإمارات
                      والسعودية يضمنان استمرارية الخدمة على أعلى مستوى.
                    </div>
                  </li>
                </ol>
              </div>

              {/* Mission */}
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  </div>
                  رسالتنا إليك
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  سواء كنت مستثمراً يبحث عن ميزة تنافسية أو شركة تتطلّع إلى
                  أتمتة عملياتها وخدمة عملائها على مدار الساعة، فإن Ruyaa
                  Capital تضع قوة الذكاء الاصطناعي بين يد��ك.
                </p>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20">
                  <blockquote className="text-xl md:text-2xl font-bold text-white text-center">
                    انضم إلينا اليوم، ودع وكلاءنا يفتحون لك آفاقاً جديدة من
                    النمو والابتكار.
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}
