"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Clock,
  FileText,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useState } from "react";
import { SiteContent, TEAM_CATEGORIES } from "@/lib/content";
import { getIcon } from "@/lib/icons";

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
          <img src="/img/mryaya.jpg" alt="مرايا" className="w-12 h-12 rounded-full object-cover shadow-md" />
          <div className="text-3xl font-arabic font-bold tracking-tight text-brand-accent" style={{ fontFamily: "Almarai" }}>
            مرايا
          </div>
        </a>

        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-arabic font-bold text-slate-600">
          <a href="#home" className="hover:text-brand-accent transition-colors">الرئيسية</a>
          <a href="#about" className="hover:text-brand-accent transition-colors">عن المركز</a>
          <a href="#services" className="hover:text-brand-accent transition-colors">الخدمات</a>
          <a href="#team" className="hover:text-brand-accent transition-colors">الفريق</a>
          <a href="#news" className="hover:text-brand-accent transition-colors">الأخبار</a>
          <a href="#contact" className="hover:text-brand-accent transition-colors">اتصل بنا</a>
        </div>

        <button className="md:hidden text-brand-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

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

const Hero = ({ content }: { content: SiteContent }) => {
  const { hero } = content.settings;
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900 animate-fade-in">
      <div className="absolute inset-0 z-0">
        <img src={hero.image} alt={hero.title} className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark/80"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-arabic font-bold leading-tight mb-6 text-white"
        >
          {hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={hero.ctaPrimaryHref}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-accent text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-brand-accent/25 group"
          >
            <span>{hero.ctaPrimaryLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={hero.ctaSecondaryHref}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all"
          >
            <span>{hero.ctaSecondaryLabel}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = ({ content }: { content: SiteContent }) => {
  const { about } = content.settings;
  return (
    <section id="about" className="py-32 px-6 bg-white overflow-hidden animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-bold uppercase tracking-widest mb-6">
            {about.kicker}
          </div>
          <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-6 text-brand-dark leading-tight" style={{ fontFamily: "Almarai" }}>
            {about.title}
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
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-lg">{p}</p>
              ))}

              <div className="bg-brand-accent/5 border-l-4 border-brand-accent rounded-lg p-6 my-8">
                <p className="text-lg font-bold text-brand-dark mb-3">{about.boxTitle}</p>
                <p className="text-slate-700 leading-relaxed">{about.boxText}</p>
              </div>

              <p className="text-2xl font-arabic italic font-bold text-brand-accent pt-6 leading-relaxed">{about.tagline}</p>
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
              src={about.image}
              alt={about.title}
              className="w-full h-auto rounded-[2.5rem] shadow-2xl object-cover hover:shadow-brand-accent/30 transition-all duration-500"
            />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-brand-dark rounded-[2rem] flex flex-col items-center justify-center text-white shadow-2xl z-20 border-4 border-white">
              <span className="text-4xl font-bold mb-2">{about.badgeValue}</span>
              <span className="text-xs font-arabic text-center px-4 font-bold leading-tight">{about.badgeText}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Impact = ({ content }: { content: SiteContent }) => {
  const { impact } = content.settings;
  const imgAlts = ["الرؤية والرسالة", "لوجو مرايا", "الشراكات", "التواصل"];
  return (
    <section className="py-32 px-6 bg-brand-secondary relative overflow-hidden animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
            {impact.kicker}
          </div>
          <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-8 leading-tight">{impact.title}</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-xl">{impact.text}</p>
          <div className="space-y-8">
            {impact.bars.map((stat, i) => (
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
              <img src={impact.images[0]} alt={imgAlts[0]} className="rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover" />
              <img src={impact.images[1]} alt={imgAlts[1]} className="rounded-[2.5rem] shadow-2xl w-full aspect-square object-cover" />
            </motion.div>
            <motion.div initial={{ y: -20 }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="space-y-6 pt-12">
              <img src={impact.images[2]} alt={imgAlts[2]} className="rounded-[2.5rem] shadow-2xl w-full aspect-square object-cover" />
              <img src={impact.images[3]} alt={imgAlts[3]} className="rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover" />
            </motion.div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-2xl z-20 border-8 border-white">
            <div className="text-center">
              <div className="text-3xl font-bold">{impact.badgeValue}</div>
              <div className="text-[10px] uppercase font-bold tracking-tighter">{impact.badgeText}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = ({ content }: { content: SiteContent }) => {
  const { featuresHead } = content.settings;
  const gradients = ["from-slate-800 to-slate-700", "from-slate-700 to-slate-600"];
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-slate-50 animate-fade-in relative overflow-hidden">
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
            {featuresHead.kicker}
          </div>
          <h2 className="text-5xl md:text-6xl font-arabic font-bold text-brand-dark leading-tight">{featuresHead.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.stats.map((stat, i) => {
            const IconComponent = getIcon(stat.icon);
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className={`group relative bg-gradient-to-br ${gradients[i % 2]} rounded-3xl p-10 shadow-2xl hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 overflow-hidden cursor-pointer`}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-6 left-6 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <span className="text-2xl font-arabic font-bold text-white">{stat.num}</span>
                </div>

                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-white/30 transition-all duration-300 backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>

                  <h3 className="text-xl font-arabic font-bold text-white mb-8 leading-relaxed">{stat.title}</h3>

                  <div className="mb-6">
                    <div className="text-5xl md:text-6xl font-arabic font-black text-white mb-2 drop-shadow-lg">{stat.value}+</div>
                    <div className="text-sm text-white/90 font-arabic font-semibold">{stat.subtitle}</div>
                  </div>

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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-24 text-center"
        >
          <p className="text-2xl md:text-3xl font-arabic italic font-bold text-brand-dark leading-relaxed">{featuresHead.quote}</p>
        </motion.div>
      </div>
    </section>
  );
};

const Services = ({ content }: { content: SiteContent }) => {
  const { servicesHead } = content.settings;
  return (
    <section id="services" className="py-32 px-6 bg-brand-secondary animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">{servicesHead.kicker}</div>
          <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-8">{servicesHead.title}</h2>
          <div className="w-24 h-1.5 bg-brand-accent mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {content.services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
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
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-arabic font-bold mb-4 text-brand-dark group-hover:text-brand-accent transition-colors">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

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

const Team = ({ content }: { content: SiteContent }) => {
  const { teamHead } = content.settings;
  const allCategories = [...TEAM_CATEGORIES, ...content.team.map((m) => m.category).filter((c) => !TEAM_CATEGORIES.includes(c))];
  return (
    <section id="team" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-32">
          <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">{teamHead.kicker}</div>
          <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-6">{teamHead.title}</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">{teamHead.text}</p>
        </motion.div>

        {allCategories.map((category) => {
          const categoryMembers = content.team.filter((m) => m.category === category);
          if (categoryMembers.length === 0) return null;
          return (
            <div key={category} className="mb-20">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-12">
                <div className={`px-6 py-3 rounded-full font-bold text-lg font-arabic ${getCategoryBadgeColor(category)}`}>{category}</div>
                <div className="h-1 flex-1 bg-gradient-to-r from-brand-accent/50 to-transparent rounded-full"></div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {categoryMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      className={`relative overflow-hidden rounded-3xl aspect-[3/4] mb-6 shadow-2xl shadow-slate-200 bg-gradient-to-br ${getCategoryColor(category)} border border-white/20`}
                    >
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="px-2">
                      <div className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-brand-accent transition-colors">
                        {member.role}
                      </div>
                      <h3 className="text-xl md:text-2xl font-arabic font-bold text-brand-dark mb-3 group-hover:text-brand-accent transition-colors">
                        {member.name}
                      </h3>
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

const News = ({ content }: { content: SiteContent }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const { newsHead } = content.settings;

  return (
    <>
      <section id="news" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-20">
            <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">{newsHead.kicker}</div>
            <h2 className="text-5xl md:text-6xl font-arabic font-bold mb-6">{newsHead.title}</h2>
            <p className="text-slate-600 text-lg">{newsHead.text}</p>
          </motion.div>

          <div
            className="news-scroll flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth", direction: "rtl", msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {content.news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-96 group snap-center"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-slate-100 hover:border-brand-accent/20">
                  <div className="relative h-44 overflow-hidden bg-slate-200 cursor-pointer" onClick={() => setSelectedImg(item.img)}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    {item.date && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-brand-dark text-xs font-bold px-3 py-1.5 rounded-full">
                        {item.date}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-arabic font-bold text-brand-dark mb-3 line-clamp-2 group-hover:text-brand-accent transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{item.desc}</p>

                    <button className="text-sm font-bold uppercase tracking-widest text-brand-accent hover:text-brand-dark transition-colors flex items-center space-x-2 group/btn">
                      <span>اقرأ المزيد</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 text-sm">اسحب جانباً لعرض المزيد من الأخبار</p>
          </div>
        </div>

        <style>{`
          .news-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

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
            <img src={selectedImg} alt="صورة مكبرة" className="w-full h-auto rounded-2xl shadow-2xl" />
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

const Contact = ({ content }: { content: SiteContent }) => {
  const { contact, socials } = content.settings;
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `
*رسالة من نموذج التواصل*
الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
الموضوع: ${formData.subject}

الرسالة:
${formData.message}
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodedMessage}`, "_blank");

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-brand-secondary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-arabic font-bold mb-8">{contact.title}</h2>
          <p className="text-slate-600 mb-12 leading-relaxed">{contact.text}</p>

          <div className="space-y-6">
            <a href={contact.addressUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold group-hover:text-brand-accent transition-colors">{contact.addressLabel}</span>
                <span className="text-xs text-slate-500 leading-relaxed">{contact.addressText}</span>
              </div>
            </a>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <span>{contact.phone}</span>
            </div>
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="group-hover:text-green-600 transition-colors">{contact.whatsappLabel}</span>
            </a>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <span>{contact.email}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <div className="font-bold">ساعات العمل:</div>
                <div>{contact.hours}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            {socials.map((social, i) => {
              const IconComponent = getIcon(social.icon);
              return (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all"
                  title={social.label}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
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

const VideoSection = ({ content }: { content: SiteContent }) => {
  const { videos } = content.settings;
  const alts = ["Maraya Art Centre Promo", "عرض المسرح الأسود"];
  return (
    <>
      {videos.map((video, index) => {
        const flip = index % 2 === 1;
        const embed = (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100"
          >
            <iframe
              className="w-full h-full"
              src={video.embedUrl}
              title={alts[index] || video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </motion.div>
        );
        const text = (
          <div>
            <div className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">{video.kicker}</div>
            <h2 className="text-4xl md:text-5xl font-arabic font-bold mb-8">{video.title}</h2>
            <p className="text-lg text-brand-dark/70 leading-relaxed mb-8">{video.text}</p>
            <ul className="space-y-4">
              {video.bullets.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
        return (
          <section key={index} className={`py-24 px-6 ${index % 2 === 0 ? "bg-white" : "bg-brand-secondary"} overflow-hidden`}>
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                {flip ? text : embed}
                {flip ? embed : text}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

const MapSection = ({ content }: { content: SiteContent }) => (
  <section className="w-full h-[450px] relative grayscale hover:grayscale-0 transition-all duration-1000">
    <iframe src={content.settings.mapEmbedUrl} className="w-full h-full border-0" allowFullScreen loading="lazy" title="موقع مركز مرايا"></iframe>
  </section>
);

const Footer = ({ content }: { content: SiteContent }) => {
  const { footer } = content.settings;
  return (
    <footer className="py-20 border-t border-brand-dark/10 bg-brand-warm/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <div className="text-4xl font-arabic font-bold tracking-tight mb-6">{footer.brand}</div>
            <p className="text-brand-dark/60 max-w-sm leading-relaxed">{footer.about}</p>
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
              {footer.catalogs.map((catalog, i) => (
                <li key={i}>
                  <a href={catalog.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-brand-accent transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>{catalog.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-arabic font-bold uppercase tracking-widest text-sm mb-6">تابعنا</h4>
            <div className="grid grid-cols-4 gap-4">
              {footer.socials.map((social, i) => {
                const IconComponent = getIcon(social.icon);
                return (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="text-brand-dark/60 hover:text-brand-accent transition-colors" title={social.label}>
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-brand-dark/10 text-center text-sm text-brand-dark/40 font-arabic">
          <p>© {new Date().getFullYear()} مركز مرايا للفنون. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default function SitePage({ content }: { content: SiteContent }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen selection:bg-brand-accent selection:text-white overflow-x-hidden"
    >
      <Navbar />
      <Hero content={content} />
      <About content={content} />
      <Features content={content} />
      <Impact content={content} />
      <Services content={content} />
      <VideoSection content={content} />
      <Team content={content} />
      <News content={content} />
      <Contact content={content} />
      <MapSection content={content} />
      <Footer content={content} />
    </motion.div>
  );
}
