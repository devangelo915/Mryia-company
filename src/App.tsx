/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Palette,
  Users,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
  Menu,
  X,
  Megaphone,
  PartyPopper,
  GraduationCap,
  Building2,
  Camera,
  Shirt,
  Youtube,
  MessageCircle,
  Link2,
  FileText,
  Music,
  Video,
  Clock,
  BookOpen,
  Layers
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/img/mryaya.jpg"
            alt="مرايا"
            className="w-12 h-12 rounded-full object-cover shadow-md"
          />
          <div className="text-3xl font-arabic font-bold tracking-tight text-brand-accent" style={{ fontFamily: 'Almarai' }}>
            مرايا
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-arabic font-bold text-slate-600">
          <a href="#home" className="hover:text-brand-accent transition-colors">الرئيسية</a>
          <a href="#about" className="hover:text-brand-accent transition-colors">عن المركز</a>
          <a href="#services" className="hover:text-brand-accent transition-colors">الخدمات</a>
          <a href="#team" className="hover:text-brand-accent transition-colors">الفريق</a>
          <a href="#news" className="hover:text-brand-accent transition-colors">الأخبار</a>
          <a href="#contact" className="hover:text-brand-accent transition-colors">اتصل بنا</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-brand-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-slate-200 px-6 py-8 flex flex-col space-y-6 text-center uppercase tracking-widest font-arabic font-bold"
        >
          <a href="#home" onClick={() => setIsOpen(false)}>الرئيسية</a>
          <a href="#about" onClick={() => setIsOpen(false)}>عن المركز</a>
          <a href="#services" onClick={() => setIsOpen(false)}>الخدمات</a>
          <a href="#team" onClick={() => setIsOpen(false)}>الفريق</a>
          <a href="#news" onClick={() => setIsOpen(false)}>الأخبار</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>اتصل بنا</a>
        </motion.div>
      )}
    </motion.nav>
  );
};

const About = () => (
  <section id="about" className="py-32 px-6 bg-white overflow-hidden animate-fade-in">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="inline-block px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-bold uppercase tracking-widest mb-6">
          من نحن
        </div>
        <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-6 text-brand-dark leading-tight" style={{ fontFamily: 'Almarai' }}>
          عن مركز مرايا للفنون
        </h2>
        <div className="w-20 h-1.5 bg-brand-accent mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-5 text-slate-700 leading-relaxed">
            <p className="text-lg">
              مركز مرايا للفنون هو مركز إبداعي متكامل للفنون والثقافة، يهدف إلى إثراء المشهد الفني وتقديم تجارب فريدة تجمع بين الإبداع والاحترافية. نسعى لخلق مساحة تفاعلية ملهمة تجمع بين الفنانين والجمهور، حيث تتحول الأفكار إلى واقع ينبض بالحياة.
            </p>

            <p className="text-lg">
              يقدّم المركز مجموعة متنوعة من الفعاليات تشمل المعارض الفنية، والأنشطة الثقافية، وحفلات التخرج، وحفلات الأطفال، في بيئة منظمة تعكس أعلى معايير الجودة والابتكار. كما نحرص على دعم واكتشاف المواهب من خلال استضافة الأعمال الفنية المعاصرة وتنظيم ورش ودورات تدريبية متخصصة تُسهم في تطوير المهارات الفنية لمختلف الأعمار والمستويات.
            </p>

            <p className="text-lg">
              ويوفر مركز مرايا مساحات وقاعات مرنة مجهزة بأحدث الإمكانيات، تتيح إقامة الفعاليات الخاصة واللقاءات والأنشطة المختلفة، بما يلبي احتياجات الأفراد والمؤسسات على حد سواء. كما يقدّم المركز خدمات متكاملة تشمل توفير الأزياء التنكرية والمسرحية، بما يدعم كافة أشكال الإنتاج الفني والترفيهي.
            </p>

            <div className="bg-brand-accent/5 border-l-4 border-brand-accent rounded-lg p-6 my-8">
              <p className="text-lg font-bold text-brand-dark mb-3">تخصصنا في المسرح الأسود</p>
              <p className="text-slate-700 leading-relaxed">
                نفخر بكوننا من المتخصصين في تقديم عروض المسرح الأسود، من خلال فريق احترافي يمتلك خبرة متميزة في تقديم عروض إبداعية عالية المستوى، تترك أثرًا بصريًا وفنيًا استثنائيًا لدى الجمهور.
              </p>
            </div>

            <p className="text-2xl font-arabic italic font-bold text-brand-accent pt-6 leading-relaxed">
              مرايا… حيث يُصنع الفن، وتُروى الحكايات، وتُخلق التجارب التي لا تُنسى
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-brand-accent/10 rounded-[3rem] blur-3xl -z-10"></div>
          <img
            src="/img/part.png"
            alt="مركز مرايا للفنون"
            className="w-full h-auto rounded-[2.5rem] shadow-2xl object-cover hover:shadow-brand-accent/30 transition-all duration-500"
          />
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-dark rounded-[2rem] flex flex-col items-center justify-center text-white shadow-2xl z-20 border-4 border-white">
            <span className="text-4xl font-bold mb-2">10+</span>
            <span className="text-xs font-arabic text-center px-4 font-bold leading-tight">سنوات من الإبداع والابتكار</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Impact = () => (
  <section className="py-32 px-6 bg-brand-secondary relative overflow-hidden animate-fade-in">
    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
          إحصائيات الأداء
        </div>
        <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-8 leading-tight">نحن نصنع الفرق في المشهد الفني</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-xl">
          منذ انطلاقنا، عملنا بجد لتطوير مهارات الفنانين وتوسيع آفاق الجمهور. تعكس هذه الأرقام التزامنا المستمر بالتميز والإبداع في كل ما نقدمه.
        </p>
        <div className="space-y-8">
          {[
            { label: "المعارض الفنية", value: 95, color: "bg-blue-600" },
            { label: "الورش التعليمية", value: 88, color: "bg-indigo-600" },
            { label: "دعم الفنانين", value: 92, color: "bg-brand-accent" },
            { label: "التفاعل المجتمعي", value: 85, color: "bg-slate-800" }
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="flex justify-between mb-3 items-end">
                <span className="font-bold text-lg text-brand-dark">{stat.label}</span>
                <span className="text-brand-accent font-mono text-xl font-bold">{stat.value}%</span>
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.value}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className={`h-full ${stat.color} shadow-lg shadow-brand-accent/20`}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="relative">
        <div className="grid grid-cols-2 gap-6">
          <motion.div initial={{ y: 20 }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
            <img src="/img/الرؤية والرسالة.jpg" alt="الرؤية والرسالة" className="rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover" />
            <img src="/img/mryaya.jpg" alt="لوجو مرايا" className="rounded-[2.5rem] shadow-2xl w-full aspect-square object-cover" />
          </motion.div>
          <motion.div initial={{ y: -20 }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="space-y-6 pt-12">
            <img src="/img/تعاونا مع.jpg" alt="الشراكات" className="rounded-[2.5rem] shadow-2xl w-full aspect-square object-cover" />
            <img src="/img/تواصل.jpg" alt="التواصل" className="rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover" />
          </motion.div>
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-2xl z-20 border-8 border-white">
          <div className="text-center">
            <div className="text-3xl font-bold">92%</div>
            <div className="text-[10px] uppercase font-bold tracking-tighter">رضا الزوار</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ImpactOld = () => {
  const stats = [
    { label: "المعارض الفنية", value: 95, color: "bg-blue-600" },
    { label: "الورش التعليمية", value: 88, color: "bg-indigo-600" },
    { label: "دعم الفنانين", value: 92, color: "bg-brand-accent" },
    { label: "التفاعل المجتمعي", value: 85, color: "bg-slate-800" }
  ];

  return null;
};

const Features = () => {
  const stats = [
    { num: "01", title: "انتاج", value: "23", subtitle: "عرض مسرحي", icon: Palette, gradient: "from-slate-800 to-slate-700", lightGradient: "from-slate-50 to-slate-50" },
    { num: "02", title: "عدد ليالي العروض", value: "112", subtitle: "ليلة عرض", icon: Calendar, gradient: "from-slate-700 to-slate-600", lightGradient: "from-slate-50 to-slate-50" },
    { num: "03", title: "متوسط عدد الحضور للعرض", value: "600", subtitle: "فرد", icon: Users, gradient: "from-slate-800 to-slate-700", lightGradient: "from-slate-50 to-slate-50" },
    { num: "04", title: "عدد المتدربين", value: "436", subtitle: "متدرب", icon: BookOpen, gradient: "from-slate-700 to-slate-600", lightGradient: "from-slate-50 to-slate-50" },
    { num: "05", title: "عدد الحفلات والايفنتات", value: "180", subtitle: "حفلة", icon: Music, gradient: "from-slate-800 to-slate-700", lightGradient: "from-slate-50 to-slate-50" },
    { num: "06", title: "انتاج الاذياء", value: "1750", subtitle: "طقم", icon: Layers, gradient: "from-slate-700 to-slate-600", lightGradient: "from-slate-50 to-slate-50" }
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-slate-50 animate-fade-in relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            إحصائيات الإنتاج
          </div>
          <h2 className="text-5xl md:text-6xl font-arabic font-bold text-brand-dark leading-tight">
            رقم يتحدث عن عطائنا
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className={`group relative bg-gradient-to-br ${stat.gradient} rounded-3xl p-10 shadow-2xl hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 overflow-hidden cursor-pointer`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Number badge */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <span className="text-2xl font-arabic font-bold text-white">{stat.num}</span>
                </div>

                <div className="relative z-10">
                  {/* Icon - Larger and more prominent */}
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white/30 transition-all duration-300 backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-arabic font-bold text-white mb-8 leading-relaxed">{stat.title}</h3>

                  {/* Stats */}
                  <div className="mb-6">
                    <div className="text-5xl md:text-6xl font-arabic font-black text-white mb-2 drop-shadow-lg">
                      {stat.value}+
                    </div>
                    <div className="text-sm text-white/90 font-arabic font-semibold">{stat.subtitle}</div>
                  </div>

                  {/* Divider */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                    className="h-1.5 bg-white/50 rounded-full backdrop-blur-sm"
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-2xl md:text-3xl font-arabic italic font-bold text-brand-dark leading-relaxed">
            كل رقم يمثل قصة إنجاز وشغف لا ينتهي نحو الاحتراف والتميز
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesOld = () => {
  const features = [
    { num: "01", title: "مساحات عرض واسعة", desc: "قاعات مجهزة بأحدث التقنيات لعرض الأعمال الفنية بمختلف أنواعها، مما يوفر منصة مثالية للفنانين لعرض إبداعاتهم." },
    { num: "02", title: "مكتبة فنية متخصصة", desc: "تضم مجموعة قيمة من الكتب والمراجع الفنية النادرة المتاحة للباحثين والطلاب والمهتمين بالفنون البصرية." },
    { num: "03", title: "استوديوهات للفنانين", desc: "مساحات عمل خاصة ومجهزة بالكامل توفر بيئة ملهمة للفنانين المقيمين لتطوير مشاريعهم الفنية الطموحة." },
    { num: "04", title: "برامج تعليمية", desc: "دورات تدريبية وورش عمل تفاعلية تغطي مختلف الفنون البصرية واليدوية، يشرف عليها نخبة من الخبراء." }
  ];

  return null;
};



const GalleryOld = () => {
  const images = [
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1576133030447-40ce028a9ffc?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600"
  ];

  return null;
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900 animate-fade-in">
    <div className="absolute inset-0 z-0">
      <img
        src="/img/mryaya.jpg"
        alt="مركز مرايا للفنون"
        className="w-full h-full object-cover opacity-60"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark/80"></div>
    </div>

    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-6xl md:text-8xl font-arabic font-bold leading-tight mb-6 text-white"
      >
        مركز مرايا للفنون
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        مساحة تجمع الفنّانين والجمهور لصناعة تجربة إبداعية لا تُنسى. نؤمن بأن الفن هو لغة التواصل العالمية التي تربط القلوب والعقول.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a
          href="#services"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-accent text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-brand-accent/25 group"
        >
          <span>اكتشف المزيد</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#contact"
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all"
        >
          <span>تواصل معنا</span>
        </a>
      </motion.div>
    </div>
  </section>
);

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      title: "الدعايا والاعلان",
      desc: "مطبوعات _ سوشيال ميديا",
      icon: <Megaphone className="w-6 h-6" />,
      img: "/img/الدعايا والاعلان.png"
    },
    {
      title: "تنظيم الفعاليات والحفلات",
      desc: "معارض الفنون التشكيلية والايفنتات الفنية والاوبن داي وحفلات الاطفال وحفلات التخرج",
      icon: <PartyPopper className="w-6 h-6" />,
      img: "/img/تنظيم حفلات التخرج وحفلات الاطفال والفاعليات الفنية.png"
    },
    {
      title: "كورسات فنية",
      desc: "الكورسات الفنية داخل مركز مرايا للفنون (موسيقي _ مسرح _ تصوير_فنون) للكبارو الاطفال",
      icon: <GraduationCap className="w-6 h-6" />,
      img: "/img/كورسات فنية.png"
    },
    {
      title: "قاعات ومساحات للإيجار",
      desc: "مساحة مستقلة ومرنة لاستضافة الأبحاث والفعاليات الخاصة بما يتطلبه الأمر من احتياجاتكم من بروفات واجتماعات وكورسات",
      icon: <Building2 className="w-6 h-6" />,
      img: "/img/قاعات ومساحات للايجار.png"
    },
    {
      title: "استديو تصوير وتسجيل",
      desc: "استديو ولوكيشن للتصوير والتسجيل وصناعة المحتوي",
      icon: <Camera className="w-6 h-6" />,
      img: "/img/استديو تصوير وتسجيل.png"
    },
    {
      title: "الأزياء التنكرية والمسرحية",
      desc: "جميع الشخصيات التنكرية والمسرحية للفرق المستقلة والحضانات والمدارس والجامعات والمناسبات وأيضا الديكورات والماكتات والخلفيات بيع وايجار",
      icon: <Shirt className="w-6 h-6" />,
      img: "/img/ايجار وبيع الاذياء التنكرية والمسرحية.png"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-brand-secondary animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">ماذا نقدم</div>
          <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-8">خدماتنا الإبداعية</h2>
          <div className="w-24 h-1.5 bg-brand-accent mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-accent shadow-lg">
                  {service.icon}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-arabic font-bold mb-4 text-brand-dark group-hover:text-brand-accent transition-colors">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const categories = ["الإدارة", "التنظيم", "الفريق الفني"];

  const members = [
    { name: "اندرو عماد كوندا", role: "Company Manager", desc: "مؤسس شركة وفريق مرايا", category: "الإدارة", img: "/img/اندرو عماد.png" },
    { name: "اميرة كامل", role: "Party Planning Office Manager", desc: "مسئولة مكتب تنظيم الحفلات", category: "الإدارة", img: "/img/اميرة كمال.png" },
    { name: "ابرام ملاك", role: "Director of the photography office", desc: "مدير مكتب التصوير", category: "الفريق الفني", img: "/img/ابرام ملاك.png" },
    { name: "نانسي صبحي", role: "Fashion Designer", desc: "تصميم وتنفيذ الاذياء التنكرية والمسرحية والاكسسوارات والديكورات", category: "الفريق الفني", img: "/img/نانسي صبحي.png" },
    { name: "جوليا جابر", role: "Reservations Officer", desc: "مسئولة الحجوزات داخل مركز مرايا", category: "الإدارة", img: "/img/جوليا جابر.png" },
    { name: "ايرينى نادى", role: "Logistics Manager", desc: "التخطيط والتنسيق", category: "الإدارة", img: "/img/ايريني نادي.png" },
    { name: "خليل ارنيست", role: "Organization Manager", desc: "مسئول تنظيم الحفلات", category: "التنظيم", img: "/img/خليل ارنست.png" },
    { name: "مينا صموئيل", role: "Marketing Manager", desc: "مدير التسويق وقيادة فريق التسويق بالشركة", category: "الإدارة", img: "/img/مينا صموئيل.png" },
    { name: "محمد ابو بكر", role: "Organization Manager", desc: "مسئول تنظيم الحفلات", category: "التنظيم", img: "/img/محمد ابو بكر.png" },
    { name: "سامر سامي", role: "Organization Manager", desc: "مسئول تنظيم الحفلات", category: "التنظيم", img: "/img/سامر سامي.png" },
    { name: "عادل ملاك", role: "Event Manager & Stage Actor", desc: "مسئول تنظيم فعاليات وممثل مسرحي", category: "التنظيم", img: "/img/عادل ملاك.png" },
    { name: "كيفن ثروت", role: "Theater Director", desc: "مخرج وممثل لدي فريق مرايا", category: "الفريق الفني", img: "/img/كيفن ثروت.png" },
    { name: "فيلوريان عيسي", role: "Theater Actor & Organizer", desc: "ممثل مسرحي مسئول تنظيم", category: "الفريق الفني", img: "/img/فيلوريان عيسي.png" },
    { name: "فيلو ارميا", role: "Media & Photography Manager", desc: "مسئول الميديا والتصوير وممثل مسرحي", category: "الفريق الفني", img: "/img/فيلو ارميا.png" },
    { name: "روماني سام", role: "Event Organizer & Stage Actor", desc: "مسئول تنظيم حفلات وممثل مسرحي", category: "التنظيم", img: "/img/روماني سام.png" },
    { name: "سارة سامي", role: "Arts Instructor & Actress", desc: "مدربة ورش الفنون وممثلة مسرحية", category: "الفريق الفني", img: "/img/سارة سامي.png" },
    { name: "مارينا أشرف", role: "Theater Actress & Organizer", desc: "ممثلة مسرحية مسئولة تنظيم", category: "الفريق الفني", img: "/img/مارينا اشرف.png" },
    { name: "بيشوي هاني", role: "Graphic Designer & Director", desc: "مصمم جرافيك ومخرج وممثل مسرحي", category: "الفريق الفني", img: "/img/بيشوي هاني.png" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "الإدارة":
        return "from-blue-600/20 to-blue-400/20";
      case "التنظيم":
        return "from-purple-600/20 to-purple-400/20";
      case "الفريق الفني":
        return "from-brand-accent/10 to-slate-600/10";
      default:
        return "from-slate-600/20 to-slate-400/20";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "الإدارة":
        return "bg-blue-100 text-blue-700";
      case "التنظيم":
        return "bg-purple-100 text-purple-700";
      case "الفريق الفني":
        return "bg-brand-accent/10 text-brand-accent";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <section id="team" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">المبدعون</div>
          <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-6">فريق العمل</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">فريقنا يتكون من محترفين ومبدعين متخصصين في مجالاتهم</p>
        </motion.div>

        {categories.map((category) => {
          const categoryMembers = members.filter(m => m.category === category);
          return (
            <div key={category} className="mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-12"
              >
                <div className={`px-6 py-3 rounded-full font-bold text-lg font-arabic ${getCategoryBadgeColor(category)}`}>
                  {category}
                </div>
                <div className="h-1 flex-1 bg-gradient-to-r from-brand-accent/50 to-transparent rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {categoryMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className={`relative overflow-hidden rounded-3xl aspect-[3/4] mb-6 shadow-2xl shadow-slate-200 bg-gradient-to-br ${getCategoryColor(category)} border border-white/20`}>
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="px-2"
                    >
                      <div className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-brand-accent transition-colors">{member.role}</div>
                      <h3 className="text-xl md:text-2xl font-arabic font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">{member.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{member.desc}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};



const News = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const news = [
    {
      date: "أبريل 2024",
      title: "أعمالنا الفنية السابقة",
      desc: "استعرض معنا مجموعة رائعة من الأعمال الفنية التي قدمناها على مدى سنوات، تعكس تطورنا المستمر وحبنا للفن.",
      img: "/img/اعمال سابقه.png"
    },
    {
      date: "مارس 2024",
      title: "انطلاق مشروع مسارات في مركز مرايا",
      desc: "بدء مشروع مسارات الفنية الجديد الذي يهدف إلى تطوير المهارات الفنية للطلاب والهواة من جميع الأعمار.",
      img: "/img/انطلاق مشروع مسارات في مركز مرايا.png"
    },
    {
      date: "فبراير 2024",
      title: "كورسات فنية متخصصة",
      desc: "انطلاق برنامج الكورسات الفنية الشاملة التي تغطي مختلف التخصصات من الرسم والتصوير إلى الفنون الأدائية.",
      img: "/img/كورسات فنية.png"
    },
    {
      date: "يناير 2024",
      title: "بداية العمل على عرض ايقونات مسرح أسود",
      desc: "انطلاق إنتاج عرض جديد يجمع بين الفن المسرحي التقليدي والعناصر الحديثة، قريباً على المسرح.",
      img: "/img/بداية العمل علي عرض ايقونات مسرح اسود.png"
    },
    {
      date: "ديسمبر 2023",
      title: "الرؤية والرسالة",
      desc: "تعريف شامل برؤية ورسالة مركز مرايا للفنون، حيث نسعى لإثراء المشهد الفني وتقديم تجارب فريدة تجمع الإبداع والاحترافية.",
      img: "/img/الرؤية والرسالة.jpg"
    },
    {
      date: "نوفمبر 2023",
      title: "تعاوننا مع الشركاء",
      desc: "شراكات استراتيجية مع مؤسسات وجهات متعددة لدعم الحركة الفنية والثقافية وتطوير المشهد الإبداعي.",
      img: "/img/تعاونا مع.jpg"
    },
    {
      date: "أكتوبر 2023",
      title: "تواصل معنا",
      desc: "قنوات تواصل متعددة متاحة لكم طوال الوقت، لأي استفسارات أو طلبات حول خدماتنا وفعالياتنا.",
      img: "/img/تواصل.jpg"
    }
  ];

  return (
    <>
      <section id="news" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">آخر الأنشطة</div>
            <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-6">آخر الأخبار</h2>
            <p className="text-slate-600 text-lg">تابع معنا أحدث الفعاليات والأخبار من مركز مرايا</p>
          </motion.div>

          <div className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory" style={{ scrollBehavior: 'smooth', direction: 'rtl', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {news.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-96 group snap-center"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-slate-100 hover:border-brand-accent/20">
                  {/* الصورة */}
                  <div className="relative h-44 overflow-hidden bg-slate-200 cursor-pointer" onClick={() => setSelectedImg(item.img)}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* المحتوى */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-arabic font-bold text-brand-dark mb-3 line-clamp-2 group-hover:text-brand-accent transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {item.desc}
                    </p>

                    <button className="text-sm font-bold uppercase tracking-widest text-brand-accent hover:text-brand-dark transition-colors flex items-center space-x-2 group/btn">
                      <span>اقرأ المزيد</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* رسالة للـ scroll */}
          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm">اسحب جانباً لعرض المزيد من الأخبار</p>
          </div>
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

      {/* Lightbox Modal */}
      {selectedImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <img
              src={selectedImg}
              alt="صورة مكبرة"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute -top-12 right-0 text-white hover:text-brand-accent transition-colors text-2xl font-bold"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format message for WhatsApp
    const whatsappMessage = `
*رسالة من نموذج التواصل*
الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
الموضوع: ${formData.subject}

الرسالة:
${formData.message}
    `.trim();

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/201010535278?text=${encodedMessage}`, '_blank');

    // Clear form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-brand-secondary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-arabic font-bold mb-8">تواصل معنا</h2>
          <p className="text-slate-600 mb-12 leading-relaxed">
            نحن هنا للإجابة على استفساراتكم ومشاركة شغفنا بالفن معكم. لا تترددوا في زيارتنا أو التواصل عبر القنوات المتاحة.
          </p>

          <div className="space-y-6">
            <a href="https://maps.app.goo.gl/SqXXnbU8ax8ftncS9" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold group-hover:text-brand-accent transition-colors">مركز مرايا المنيا</span>
                <span className="text-xs text-slate-500 leading-relaxed">بجوار مستشفي المبرة وامام ممر الكف الاحمر وامام محل فيونكة عمارة الدكتور احمد سيد المنجبادي الدور التالت</span>
              </div>
            </a>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <span>01010535278</span>
            </div>
            <a href="https://wa.me/201010535278" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="group-hover:text-green-600 transition-colors">تواصل معنا عبر واتساب: 01010535278</span>
            </a>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <span>androwanakonda@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <div className="font-bold">ساعات العمل:</div>
                <div>يومياً من 12 ظهراً حتى 9 مساءً (الجمعة عطلة)</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <a href="https://www.facebook.com/مرايا-520910381366968/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all" title="صفحة فيسبوك">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/mrayatheater?utm_medium=copy_link" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all" title="انستجرام">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://x.com/mraya_centr?t=c85QeUobRnp_JjyjRGVwzQ&s=09" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all" title="موقع إكس">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://youtube.com/channel/UCVwpzxVrCXOZSK2ReCvYD_g" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all" title="يوتيوب">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@mraya.team?_r=1&_t=ZS-95KzUxJXRG0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all" title="تيك توك">
              <Music className="w-5 h-5" />
            </a>
            <a href="https://heylink.me/theatermaraya/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all" title="هاي لينك">
              <Link2 className="w-5 h-5" />
            </a>
            <a href="https://k.kwai.com/p/CVB5Jzic" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all" title="كواي">
              <Video className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/groups/1675235775921571/?ref=share" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all" title="جروب فيسبوك">
              <Users className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl shadow-brand-dark/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-50">الاسم</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-accent transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-50">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-accent transition-all outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold opacity-50">الموضوع</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-accent transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold opacity-50">الرسالة</label>
              <textarea
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-accent transition-all outline-none resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-brand-accent/20"
            >
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => (
  <>
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100"
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/CuHvR4DXQAs"
              title="Maraya Art Centre Promo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </motion.div>

          <div>
            <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">برومو المكان</div>
            <h2 className="text-4xl md:text-5xl font-arabic font-bold mb-8">اكتشف عالم مرايا</h2>
            <p className="text-lg text-brand-dark/70 leading-relaxed mb-8">
              شاهد البرومو الخاص بمركز مرايا للفنون وتعرف على المساحات الإبداعية والروح الفنية التي تميز مكاننا. نحن نوفر البيئة المثالية لكل فنان ومبدع.
            </p>
            <ul className="space-y-4">
              {["جولات داخل الاستوديوهات", "عرض للمساحات المتاحة", "نبذة عن الفعاليات"].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 px-6 bg-brand-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">المسرح الأسود</div>
            <h2 className="text-4xl md:text-5xl font-arabic font-bold mb-8">عالم المسرح الأسود</h2>
            <p className="text-lg text-brand-dark/70 leading-relaxed mb-8">
              استكشف تجربة المسرح الأسود الفريدة من نوعها، حيث الإضاءة الدرامية والأداء المسرحي المتقن يخلقان حدثاً مذهلاً لا يُنسى. تابع معنا هذه التجربة الفنية المميزة.
            </p>
            <ul className="space-y-4">
              {["عروض مسرحية مبتكرة", "تجارب بصرية فريدة", "أداء فني احترافي"].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100"
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/qFAcd8iHEW4"
              title="عرض المسرح الأسود"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  </>
);

const MapSection = () => (
  <section className="w-full h-[450px] relative grayscale hover:grayscale-0 transition-all duration-1000">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.3087654321!2d30.75!3d28.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA2JzAwLjAiTiAzMMKwNDUnMDAuMCJF!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg"
      className="w-full h-full border-0"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </section>
);

const Footer = () => (
  <footer className="py-20 border-t border-brand-dark/10 bg-brand-warm/30">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <div className="text-4xl font-arabic font-bold tracking-tight mb-6">
            مرايا
          </div>
          <p className="text-brand-dark/60 max-w-sm leading-relaxed">
            مركز مرايا للفنون هو وجهة إبداعية مكرسة لدعم الفنانين والمصممين، وتوفير بيئة ملهمة للابتكار والتعلم.
          </p>
        </div>
        <div>
          <h4 className="font-arabic font-bold uppercase tracking-widest text-sm mb-6">روابط سريعة</h4>
          <ul className="space-y-4 text-brand-dark/60">
            <li><a href="#about" className="hover:text-brand-accent transition-colors">عن المركز</a></li>
            <li><a href="#services" className="hover:text-brand-accent transition-colors">الخدمات</a></li>
            <li><a href="#team" className="hover:text-brand-accent transition-colors">الفريق</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-arabic font-bold uppercase tracking-widest text-sm mb-6">كتالوجاتنا</h4>
          <ul className="space-y-4 text-brand-dark/60">
            <li>
              <a href="https://drive.google.com/drive/folders/1kI8L513qx5EXoAeL4vL-WQfH5djkXYee?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-brand-accent transition-colors">
                <FileText className="w-4 h-4" />
                <span>كتالوج مرايا</span>
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/drive/folders/1GWn_xFzEQcBicUPHnbPTguzViv8_Bcs1?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-brand-accent transition-colors">
                <FileText className="w-4 h-4" />
                <span>قائمة المنتجات</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-arabic font-bold uppercase tracking-widest text-sm mb-6">تابعنا</h4>
          <div className="grid grid-cols-4 gap-4">
            <a href="https://www.facebook.com/مرايا-520910381366968/" target="_blank" rel="noopener noreferrer" className="text-brand-dark/60 hover:text-brand-accent transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="https://instagram.com/mrayatheater?utm_medium=copy_link" target="_blank" rel="noopener noreferrer" className="text-brand-dark/60 hover:text-brand-accent transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="https://youtube.com/channel/UCVwpzxVrCXOZSK2ReCvYD_g" target="_blank" rel="noopener noreferrer" className="text-brand-dark/60 hover:text-brand-accent transition-colors"><Youtube className="w-5 h-5" /></a>
            <a href="https://www.tiktok.com/@mraya.team?_r=1&_t=ZS-95KzUxJXRG0" target="_blank" rel="noopener noreferrer" className="text-brand-dark/60 hover:text-brand-accent transition-colors"><Music className="w-5 h-5" /></a>
            <a href="https://x.com/mraya_centr?t=c85QeUobRnp_JjyjRGVwzQ&s=09" target="_blank" rel="noopener noreferrer" className="text-brand-dark/60 hover:text-brand-accent transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="https://wa.me/01010535278" target="_blank" rel="noopener noreferrer" className="text-brand-dark/60 hover:text-brand-accent transition-colors"><MessageCircle className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      <div className="pt-12 border-t border-brand-dark/10 text-center text-sm text-brand-dark/40 font-arabic">
        <p>© 2024 مركز مرايا للفنون. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen selection:bg-brand-accent selection:text-white overflow-x-hidden"
    >
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Impact />
      <Services />
      <VideoSection />
      <Team />
      <News />
      <Contact />
      <MapSection />
      <Footer />
    </motion.div>
  );
}
