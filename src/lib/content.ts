export type StatItem = {
  id: string;
  num: string;
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  order: number;
  titleEn?: string;
  subtitleEn?: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  desc: string;
  img: string;
  icon: string;
  order: number;
  titleEn?: string;
  descEn?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  desc: string;
  category: string;
  img: string;
  order: number;
  nameEn?: string;
  roleEn?: string;
  descEn?: string;
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  desc: string;
  img: string;
  order: number;
  titleEn?: string;
  descEn?: string;
};

export type SocialLink = {
  label: string;
  url: string;
  icon: string;
};

export type VideoBlock = {
  kicker: string;
  title: string;
  text: string;
  bullets: string[];
  embedUrl: string;
};

export type ImpactBar = {
  label: string;
  value: number;
  color: string;
};

export type SettingsEn = {
  hero?: { title?: string; subtitle?: string; ctaPrimaryLabel?: string; ctaSecondaryLabel?: string };
  about?: {
    kicker?: string;
    title?: string;
    paragraphs?: string[];
    boxTitle?: string;
    boxText?: string;
    tagline?: string;
    badgeValue?: string;
    badgeText?: string;
  };
  impact?: { kicker?: string; title?: string; text?: string; bars?: { label?: string }[]; badgeValue?: string; badgeText?: string };
  featuresHead?: { kicker?: string; title?: string; quote?: string };
  servicesHead?: { kicker?: string; title?: string };
  teamHead?: { kicker?: string; title?: string; text?: string };
  newsHead?: { kicker?: string; title?: string; text?: string };
  videos?: { kicker?: string; title?: string; text?: string; bullets?: string[] }[];
  contact?: { title?: string; text?: string; addressLabel?: string; addressText?: string; whatsappLabel?: string; hours?: string };
  socials?: { label?: string }[];
  footer?: {
    brand?: string;
    about?: string;
    catalogs?: { label?: string }[];
    socials?: { label?: string }[];
    rights?: string;
    credit?: string;
  };
};

export type Settings = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    ctaSecondaryLabel: string;
    ctaSecondaryHref: string;
  };
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    boxTitle: string;
    boxText: string;
    tagline: string;
    image: string;
    badgeValue: string;
    badgeText: string;
  };
  impact: {
    kicker: string;
    title: string;
    text: string;
    bars: ImpactBar[];
    images: string[];
    badgeValue: string;
    badgeText: string;
  };
  featuresHead: { kicker: string; title: string; quote: string };
  servicesHead: { kicker: string; title: string };
  teamHead: { kicker: string; title: string; text: string };
  newsHead: { kicker: string; title: string; text: string };
  videos: VideoBlock[];
  contact: {
    title: string;
    text: string;
    addressLabel: string;
    addressText: string;
    addressUrl: string;
    phone: string;
    whatsapp: string;
    whatsappLabel: string;
    email: string;
    hours: string;
  };
  socials: SocialLink[];
  footer: {
    brand: string;
    about: string;
    catalogs: { label: string; url: string }[];
    socials: SocialLink[];
    rights: string;
    credit: string;
  };
  mapEmbedUrl: string;
  en?: SettingsEn;
};

export type SiteContent = {
  settings: Settings;
  stats: StatItem[];
  services: ServiceItem[];
  team: TeamMember[];
  news: NewsItem[];
};

export const TEAM_CATEGORIES = ["الإدارة", "التنظيم", "الفريق الفني"];

export const TEAM_CATEGORY_EN: Record<string, string> = {
  "الإدارة": "Management",
  "التنظيم": "Organization",
  "الفريق الفني": "Artistic Team",
};

export const DEFAULT_SETTINGS: Settings = {
  hero: {
    title: "مركز مرايا للفنون",
    subtitle:
      "مساحة تجمع الفنّانين والجمهور لصناعة تجربة إبداعية لا تُنسى. نؤمن بأن الفن هو لغة التواصل العالمية التي تربط القلوب والعقول.",
    image: "/img/mryaya.jpg",
    ctaPrimaryLabel: "اكتشف المزيد",
    ctaPrimaryHref: "#services",
    ctaSecondaryLabel: "تواصل معنا",
    ctaSecondaryHref: "#contact",
  },
  about: {
    kicker: "من نحن",
    title: "عن مركز مرايا للفنون",
    paragraphs: [
      "مركز مرايا للفنون هو مركز إبداعي متكامل للفنون والثقافة، يهدف إلى إثراء المشهد الفني وتقديم تجارب فريدة تجمع بين الإبداع والاحترافية. نسعى لخلق مساحة تفاعلية ملهمة تجمع بين الفنانين والجمهور، حيث تتحول الأفكار إلى واقع ينبض بالحياة.",
      "يقدّم المركز مجموعة متنوعة من الفعاليات تشمل المعارض الفنية، والأنشطة الثقافية، وحفلات التخرج، وحفلات الأطفال، في بيئة منظمة تعكس أعلى معايير الجودة والابتكار. كما نحرص على دعم واكتشاف المواهب من خلال استضافة الأعمال الفنية المعاصرة وتنظيم ورش ودورات تدريبية متخصصة تُسهم في تطوير المهارات الفنية لمختلف الأعمار والمستويات.",
      "ويوفر مركز مرايا مساحات وقاعات مرنة مجهزة بأحدث الإمكانيات، تتيح إقامة الفعاليات الخاصة واللقاءات والأنشطة المختلفة، بما يلبي احتياجات الأفراد والمؤسسات على حد سواء. كما يقدّم المركز خدمات متكاملة تشمل توفير الأزياء التنكرية والمسرحية، بما يدعم كافة أشكال الإنتاج الفني والترفيهي.",
    ],
    boxTitle: "تخصصنا في المسرح الأسود",
    boxText:
      "نفخر بكوننا من المتخصصين في تقديم عروض المسرح الأسود، من خلال فريق احترافي يمتلك خبرة متميزة في تقديم عروض إبداعية عالية المستوى، تترك أثرًا بصريًا وفنيًا استثنائيًا لدى الجمهور.",
    tagline: "مرايا… حيث يُصنع الفن، وتُروى الحكايات، وتُخلق التجارب التي لا تُنسى",
    image: "/img/part.png",
    badgeValue: "10+",
    badgeText: "سنوات من الإبداع والابتكار",
  },
  impact: {
    kicker: "إحصائيات الأداء",
    title: "نحن نصنع الفرق في المشهد الفني",
    text: "منذ انطلاقنا، عملنا بجد لتطوير مهارات الفنانين وتوسيع آفاق الجمهور. تعكس هذه الأرقام التزامنا المستمر بالتميز والإبداع في كل ما نقدمه.",
    bars: [
      { label: "المعارض الفنية", value: 95, color: "bg-blue-600" },
      { label: "الورش التعليمية", value: 88, color: "bg-indigo-600" },
      { label: "دعم الفنانين", value: 92, color: "bg-brand-accent" },
      { label: "التفاعل المجتمعي", value: 85, color: "bg-slate-800" },
    ],
    images: ["/img/الرؤية والرسالة.jpg", "/img/mryaya.jpg", "/img/تعاونا مع.jpg", "/img/تواصل.jpg"],
    badgeValue: "92%",
    badgeText: "رضا الزوار",
  },
  featuresHead: {
    kicker: "إحصائيات الإنتاج",
    title: "رقم يتحدث عن عطائنا",
    quote: "كل رقم يمثل قصة إنجاز وشغف لا ينتهي نحو الاحتراف والتميز",
  },
  servicesHead: { kicker: "ماذا نقدم", title: "خدماتنا الإبداعية" },
  teamHead: {
    kicker: "المبدعون",
    title: "فريق العمل",
    text: "فريقنا يتكون من محترفين ومبدعين متخصصين في مجالاتهم",
  },
  newsHead: {
    kicker: "آخر الأنشطة",
    title: "آخر الأخبار",
    text: "تابع معنا أحدث الفعاليات والأخبار من مركز مرايا",
  },
  videos: [
    {
      kicker: "برومو المكان",
      title: "اكتشف عالم مرايا",
      text: "شاهد البرومو الخاص بمركز مرايا للفنون وتعرف على المساحات الإبداعية والروح الفنية التي تميز مكاننا. نحن نوفر البيئة المثالية لكل فنان ومبدع.",
      bullets: ["جولات داخل الاستوديوهات", "عرض للمساحات المتاحة", "نبذة عن الفعاليات"],
      embedUrl: "https://www.youtube.com/embed/CuHvR4DXQAs",
    },
    {
      kicker: "المسرح الأسود",
      title: "عالم المسرح الأسود",
      text: "استكشف تجربة المسرح الأسود الفريدة من نوعها، حيث الإضاءة الدرامية والأداء المسرحي المتقن يخلقان حدثاً مذهلاً لا يُنسى. تابع معنا هذه التجربة الفنية المميزة.",
      bullets: ["عروض مسرحية مبتكرة", "تجارب بصرية فريدة", "أداء فني احترافي"],
      embedUrl: "https://www.youtube.com/embed/qFAcd8iHEW4",
    },
  ],
  contact: {
    title: "تواصل معنا",
    text: "نحن هنا للإجابة على استفساراتكم ومشاركة شغفنا بالفن معكم. لا تترددوا في زيارتنا أو التواصل عبر القنوات المتاحة.",
    addressLabel: "مركز مرايا المنيا",
    addressText:
      "بجوار مستشفي المبرة وامام ممر الكف الاحمر وامام محل فيونكة عمارة الدكتور احمد سيد المنجبادي الدور التالت",
    addressUrl: "https://maps.app.goo.gl/SqXXnbU8ax8ftncS9",
    phone: "01010535278",
    whatsapp: "201010535278",
    whatsappLabel: "تواصل معنا عبر واتساب: 01010535278",
    email: "androwanakonda@gmail.com",
    hours: "يومياً من 12 ظهراً حتى 9 مساءً (الجمعة عطلة)",
  },
  socials: [
    { label: "صفحة فيسبوك", url: "https://www.facebook.com/مرايا-520910381366968/", icon: "facebook" },
    { label: "انستجرام", url: "https://instagram.com/mrayatheater?utm_medium=copy_link", icon: "instagram" },
    { label: "موقع إكس", url: "https://x.com/mraya_centr?t=c85QeUobRnp_JjyjRGVwzQ&s=09", icon: "twitter" },
    { label: "يوتيوب", url: "https://youtube.com/channel/UCVwpzxVrCXOZSK2ReCvYD_g", icon: "youtube" },
    { label: "تيك توك", url: "https://www.tiktok.com/@mraya.team?_r=1&_t=ZS-95KzUxJXRG0", icon: "tiktok" },
    { label: "هاي لينك", url: "https://heylink.me/theatermaraya/", icon: "link" },
    { label: "كواي", url: "https://k.kwai.com/p/CVB5Jzic", icon: "kwai" },
    { label: "جروب فيسبوك", url: "https://www.facebook.com/groups/1675235775921571/?ref=share", icon: "group" },
  ],
  footer: {
    brand: "مرايا",
    rights: "مرايا. جميع الحقوق محفوظة.",
    credit: "تصميم وتطوير الموقع بواسطة Hexa Plus",
    about: "مركز مرايا للفنون هو وجهة إبداعية مكرسة لدعم الفنانين والمصممين، وتوفير بيئة ملهمة للابتكار والتعلم.",
    catalogs: [
      {
        label: "كتالوج مرايا",
        url: "https://drive.google.com/drive/folders/1kI8L513qx5EXoAeL4vL-WQfH5djkXYee?usp=drive_link",
      },
      {
        label: "قائمة المنتجات",
        url: "https://drive.google.com/drive/folders/1GWn_xFzEQcBicUPHnbPTguzViv8_Bcs1?usp=drive_link",
      },
    ],
    socials: [
      { label: "فيسبوك", url: "https://www.facebook.com/مرايا-520910381366968/", icon: "facebook" },
      { label: "انستجرام", url: "https://instagram.com/mrayatheater?utm_medium=copy_link", icon: "instagram" },
      { label: "يوتيوب", url: "https://youtube.com/channel/UCVwpzxVrCXOZSK2ReCvYD_g", icon: "youtube" },
      { label: "تيك توك", url: "https://www.tiktok.com/@mraya.team?_r=1&_t=ZS-95KzUxJXRG0", icon: "tiktok" },
      { label: "موقع إكس", url: "https://x.com/mraya_centr?t=c85QeUobRnp_JjyjRGVwzQ&s=09", icon: "twitter" },
      { label: "واتساب", url: "https://wa.me/201010535278", icon: "whatsapp" },
    ],
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.3087654321!2d30.75!3d28.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDA2JzAwLjAiTiAzMMKwNDUnMDAuMCJF!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg",
};


export const DEFAULT_SETTINGS_EN: SettingsEn = {
  hero: {
    title: "Mraya Arts Center",
    subtitle:
      "A space that brings artists and audiences together to create an unforgettable creative experience. We believe art is the universal language that connects hearts and minds.",
    ctaPrimaryLabel: "Discover More",
    ctaSecondaryLabel: "Contact Us",
  },
  about: {
    kicker: "Who We Are",
    title: "About Mraya Arts Center",
    paragraphs: [
      "Mraya Arts Center is an integrated creative hub for arts and culture, dedicated to enriching the art scene and delivering unique experiences that combine creativity and professionalism. We strive to create an inspiring, interactive space that brings artists and audiences together, where ideas turn into a living reality.",
      "The center offers a diverse range of events including art exhibitions, cultural activities, graduation parties, and children's parties, in an organized environment that reflects the highest standards of quality and innovation. We are also committed to supporting and discovering talent by hosting contemporary artworks and organizing specialized workshops and training courses that develop artistic skills for all ages and levels.",
      "Mraya provides flexible halls and spaces equipped with the latest facilities, suitable for private events, meetings, and various activities, meeting the needs of individuals and organizations alike. The center also offers integrated services including costume and theatrical outfit rental, supporting all forms of artistic and entertainment production.",
    ],
    boxTitle: "We Specialize in Black Theater",
    boxText:
      "We are proud to be among the specialists in black theater performances, with a professional team of outstanding experience delivering high-level creative shows that leave an exceptional visual and artistic impact on audiences.",
    tagline: "Mraya... where art is made, stories are told, and unforgettable experiences are created",
    badgeText: "Years of creativity and innovation",
  },
  impact: {
    kicker: "Performance Statistics",
    title: "We Make a Difference in the Art Scene",
    text: "Since our launch, we have worked hard to develop artists' skills and broaden audiences' horizons. These numbers reflect our ongoing commitment to excellence and creativity in everything we offer.",
    bars: [{ label: "Art Exhibitions" }, { label: "Educational Workshops" }, { label: "Artist Support" }, { label: "Community Engagement" }],
    badgeText: "Visitor satisfaction",
  },
  featuresHead: {
    kicker: "Production Statistics",
    title: "Numbers That Speak of Our Giving",
    quote: "Every number tells a story of achievement and endless passion for professionalism and excellence",
  },
  servicesHead: { kicker: "What We Offer", title: "Our Creative Services" },
  teamHead: {
    kicker: "The Creatives",
    title: "Our Team",
    text: "Our team consists of professionals and creatives specialized in their fields",
  },
  newsHead: {
    kicker: "Latest Activities",
    title: "Latest News",
    text: "Follow our latest events and news from Mraya Center",
  },
  videos: [
    {
      kicker: "Venue Promo",
      title: "Discover the World of Mraya",
      text: "Watch the Mraya Arts Center promo and explore the creative spaces and artistic spirit that make our venue special. We provide the ideal environment for every artist and creative.",
      bullets: ["Tours inside the studios", "A look at available spaces", "An overview of our events"],
    },
    {
      kicker: "Black Theater",
      title: "The World of Black Theater",
      text: "Explore the one-of-a-kind black theater experience, where dramatic lighting and masterful stage performance create a stunning, unforgettable event. Join us for this remarkable artistic experience.",
      bullets: ["Innovative theater shows", "Unique visual experiences", "Professional artistic performance"],
    },
  ],
  contact: {
    title: "Contact Us",
    text: "We are here to answer your questions and share our passion for art with you. Don't hesitate to visit us or reach out through the available channels.",
    addressLabel: "Mraya Center, Minya",
    addressText: "Next to Al-Mabarrah Hospital, opposite the Red Palm passage and Fayonka store, Dr. Ahmed Sayed El-Mongabady building, 3rd floor",
    whatsappLabel: "Reach us on WhatsApp: 01010535278",
    hours: "Daily from 12 PM to 9 PM (closed on Fridays)",
  },
  socials: [
    { label: "Facebook page" },
    { label: "Instagram" },
    { label: "X (Twitter)" },
    { label: "YouTube" },
    { label: "TikTok" },
    { label: "HeyLink" },
    { label: "Kwai" },
    { label: "Facebook group" },
  ],
  footer: {
    brand: "Mraya",
    about: "Mraya Arts Center is a creative destination dedicated to supporting artists and designers, providing an inspiring environment for innovation and learning.",
    catalogs: [{ label: "Mraya Catalog" }, { label: "Products List" }],
    socials: [{ label: "Facebook" }, { label: "Instagram" }, { label: "YouTube" }, { label: "TikTok" }, { label: "X (Twitter)" }, { label: "WhatsApp" }],
    rights: "Mraya. All Rights Reserved.",
    credit: "Website Design & Development by HEXA PLUS.",
  },
};

export const DEFAULT_STATS: StatItem[] = [
  { id: "s1", num: "01", title: "انتاج", value: "23", subtitle: "عرض مسرحي", icon: "palette", order: 1, titleEn: "Productions", subtitleEn: "theater shows" },
  { id: "s2", num: "02", title: "عدد ليالي العروض", value: "112", subtitle: "ليلة عرض", icon: "calendar", order: 2, titleEn: "Show Nights", subtitleEn: "performance nights" },
  { id: "s3", num: "03", title: "متوسط عدد الحضور للعرض", value: "600", subtitle: "فرد", icon: "users", order: 3, titleEn: "Average Attendance per Show", subtitleEn: "attendees" },
  { id: "s4", num: "04", title: "عدد المتدربين", value: "436", subtitle: "متدرب", icon: "book", order: 4, titleEn: "Trainees", subtitleEn: "trainees" },
  { id: "s5", num: "05", title: "عدد الحفلات والايفنتات", value: "180", subtitle: "حفلة", icon: "music", order: 5, titleEn: "Parties & Events", subtitleEn: "events" },
  { id: "s6", num: "06", title: "انتاج الاذياء", value: "1750", subtitle: "طقم", icon: "layers", order: 6, titleEn: "Costume Production", subtitleEn: "outfits" },
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  { id: "v1", title: "الدعايا والاعلان", desc: "مطبوعات _ سوشيال ميديا", img: "/img/الدعايا والاعلان.png", icon: "megaphone", order: 1, titleEn: "Advertising & Marketing", descEn: "Print materials - social media" },
  {
    id: "v2",
    title: "تنظيم الفعاليات والحفلات",
    desc: "معارض الفنون التشكيلية والايفنتات الفنية والاوبن داي وحفلات الاطفال وحفلات التخرج",
    img: "/img/تنظيم حفلات التخرج وحفلات الاطفال والفاعليات الفنية.png",
    icon: "party",
    order: 2, titleEn: "Event & Party Planning", descEn: "Fine art exhibitions, art events, open days, kids parties, and graduation parties"
  },
  {
    id: "v3",
    title: "كورسات فنية",
    desc: "الكورسات الفنية داخل مركز مرايا للفنون (موسيقي _ مسرح _ تصوير_فنون) للكبارو الاطفال",
    img: "/img/كورسات فنية.png",
    icon: "graduation",
    order: 3, titleEn: "Art Courses", descEn: "Art courses at Mraya Arts Center (music - theater - photography - arts) for adults and kids"
  },
  {
    id: "v4",
    title: "قاعات ومساحات للإيجار",
    desc: "مساحة مستقلة ومرنة لاستضافة الأبحاث والفعاليات الخاصة بما يتطلبه الأمر من احتياجاتكم من بروفات واجتماعات وكورسات",
    img: "/img/قاعات ومساحات للايجار.png",
    icon: "building",
    order: 4, titleEn: "Halls & Spaces for Rent", descEn: "An independent, flexible space to host your research and private events, covering your needs for rehearsals, meetings, and courses"
  },
  { id: "v5", title: "استديو تصوير وتسجيل", desc: "استديو ولوكيشن للتصوير والتسجيل وصناعة المحتوي", img: "/img/استديو تصوير وتسجيل.png", icon: "camera", order: 5, titleEn: "Photo & Recording Studio", descEn: "A studio and location for filming, recording, and content production" },
  {
    id: "v6",
    title: "الأزياء التنكرية والمسرحية",
    desc: "جميع الشخصيات التنكرية والمسرحية للفرق المستقلة والحضانات والمدارس والجامعات والمناسبات وأيضا الديكورات والماكتات والخلفيات بيع وايجار",
    img: "/img/ايجار وبيع الاذياء التنكرية والمسرحية.png",
    icon: "shirt",
    order: 6, titleEn: "Costumes & Theatrical Outfits", descEn: "All costume and theatrical characters for independent troupes, nurseries, schools, universities, and occasions, plus decor, maquettes, and backdrops for sale or rent"
  },
];

export const DEFAULT_TEAM: TeamMember[] = [
  { id: "t1", name: "اندرو عماد كوندا", role: "Company Manager", desc: "مؤسس شركة وفريق مرايا", category: "الإدارة", img: "/img/اندرو عماد.png", order: 1, nameEn: "Andro Emad Konda", descEn: "Founder of Mraya company and team" },
  { id: "t2", name: "اميرة كامل", role: "Party Planning Office Manager", desc: "مسئولة مكتب تنظيم الحفلات", category: "الإدارة", img: "/img/اميرة كمال.png", order: 2, nameEn: "Amira Kamel", descEn: "Party planning office manager" },
  { id: "t3", name: "ابرام ملاك", role: "Director of the photography office", desc: "مدير مكتب التصوير", category: "الفريق الفني", img: "/img/ابرام ملاك.png", order: 3, nameEn: "Abram Malak", descEn: "Photography office manager" },
  { id: "t4", name: "نانسي صبحي", role: "Fashion Designer", desc: "تصميم وتنفيذ الاذياء التنكرية والمسرحية والاكسسوارات والديكورات", category: "الفريق الفني", img: "/img/نانسي صبحي.png", order: 4, nameEn: "Nancy Sobhy", descEn: "Design and production of costumes, theatrical outfits, accessories, and decor" },
  { id: "t5", name: "جوليا جابر", role: "Reservations Officer", desc: "مسئولة الحجوزات داخل مركز مرايا", category: "الإدارة", img: "/img/جوليا جابر.png", order: 5, nameEn: "Julia Gaber", descEn: "Reservations officer at Mraya Center" },
  { id: "t6", name: "ايرينى نادى", role: "Logistics Manager", desc: "التخطيط والتنسيق", category: "الإدارة", img: "/img/ايريني نادي.png", order: 6, nameEn: "Irene Nady", descEn: "Planning and coordination" },
  { id: "t7", name: "خليل ارنيست", role: "Organization Manager", desc: "مسئول تنظيم الحفلات", category: "التنظيم", img: "/img/خليل ارنست.png", order: 7, nameEn: "Khalil Ernest", descEn: "Party planning officer" },
  { id: "t8", name: "مينا صموئيل", role: "Marketing Manager", desc: "مدير التسويق وقيادة فريق التسويق بالشركة", category: "الإدارة", img: "/img/مينا صموئيل.png", order: 8, nameEn: "Mina Samuel", descEn: "Marketing manager, leading the company marketing team" },
  { id: "t9", name: "محمد ابو بكر", role: "Organization Manager", desc: "مسئول تنظيم الحفلات", category: "التنظيم", img: "/img/محمد ابو بكر.png", order: 9, nameEn: "Mohamed Abou Bakr", descEn: "Party planning officer" },
  { id: "t10", name: "سامر سامي", role: "Organization Manager", desc: "مسئول تنظيم الحفلات", category: "التنظيم", img: "/img/سامر سامي.png", order: 10, nameEn: "Samer Samy", descEn: "Party planning officer" },
  { id: "t11", name: "عادل ملاك", role: "Event Manager & Stage Actor", desc: "مسئول تنظيم فعاليات وممثل مسرحي", category: "التنظيم", img: "/img/عادل ملاك.png", order: 11, nameEn: "Adel Malak", descEn: "Event organizer and stage actor" },
  { id: "t12", name: "كيفن ثروت", role: "Theater Director", desc: "مخرج وممثل لدي فريق مرايا", category: "الفريق الفني", img: "/img/كيفن ثروت.png", order: 12, nameEn: "Kevin Tharwat", descEn: "Director and actor at Mraya team" },
  { id: "t13", name: "فيلوريان عيسي", role: "Theater Actor & Organizer", desc: "ممثل مسرحي مسئول تنظيم", category: "الفريق الفني", img: "/img/فيلوريان عيسي.png", order: 13, nameEn: "Floriane Issa", descEn: "Stage actor and organizer" },
  { id: "t14", name: "فيلو ارميا", role: "Media & Photography Manager", desc: "مسئول الميديا والتصوير وممثل مسرحي", category: "الفريق الفني", img: "/img/فيلو ارميا.png", order: 14, nameEn: "Philo Armia", descEn: "Media and photography officer, and stage actor" },
  { id: "t15", name: "روماني سام", role: "Event Organizer & Stage Actor", desc: "مسئول تنظيم حفلات وممثل مسرحي", category: "التنظيم", img: "/img/روماني سام.png", order: 15, nameEn: "Romani Sam", descEn: "Party organizer and stage actor" },
  { id: "t16", name: "سارة سامي", role: "Arts Instructor & Actress", desc: "مدربة ورش الفنون وممثلة مسرحية", category: "الفريق الفني", img: "/img/سارة سامي.png", order: 16, nameEn: "Sara Samy", descEn: "Arts workshop instructor and stage actress" },
  { id: "t17", name: "مارينا أشرف", role: "Theater Actress & Organizer", desc: "ممثلة مسرحية مسئولة تنظيم", category: "الفريق الفني", img: "/img/مارينا اشرف.png", order: 17, nameEn: "Marina Ashraf", descEn: "Stage actress and organizer" },
  { id: "t18", name: "بيشوي هاني", role: "Graphic Designer & Director", desc: "مصمم جرافيك ومخرج وممثل مسرحي", category: "الفريق الفني", img: "/img/بيشوي هاني.png", order: 18, nameEn: "Bishoy Hany", descEn: "Graphic designer, director, and stage actor" },
];

export const DEFAULT_NEWS: NewsItem[] = [
  { id: "n1", date: "", title: "أعمالنا الفنية السابقة", desc: "استعرض معنا مجموعة رائعة من الأعمال الفنية التي قدمناها على مدى سنوات، تعكس تطورنا المستمر وحبنا للفن.", img: "/img/اعمال سابقه.png", order: 1, titleEn: "Our Previous Artworks", descEn: "Explore a wonderful collection of the artworks we have presented over the years, reflecting our continuous growth and love for art." },
  { id: "n2", date: "", title: "انطلاق مشروع مسارات في مركز مرايا", desc: "بدء مشروع مسارات الفنية الجديد الذي يهدف إلى تطوير المهارات الفنية للطلاب والهواة من جميع الأعمار.", img: "/img/انطلاق مشروع مسارات في مركز مرايا.png", order: 2, titleEn: "Masarat Project Launches at Mraya", descEn: "The launch of the new Masarat art project, aimed at developing artistic skills for students and hobbyists of all ages." },
  { id: "n3", date: "", title: "كورسات فنية متخصصة", desc: "انطلاق برنامج الكورسات الفنية الشاملة التي تغطي مختلف التخصصات من الرسم والتصوير إلى الفنون الأدائية.", img: "/img/كورسات فنية.png", order: 3, titleEn: "Specialized Art Courses", descEn: "The launch of a comprehensive art courses program covering various specialties, from drawing and photography to performing arts." },
  { id: "n4", date: "", title: "بداية العمل على عرض ايقونات مسرح أسود", desc: "انطلاق إنتاج عرض جديد يجمع بين الفن المسرحي التقليدي والعناصر الحديثة، قريباً على المسرح.", img: "/img/بداية العمل علي عرض ايقونات مسرح اسود.png", order: 4, titleEn: 'Work Begins on Black Theater Show "Icons"', descEn: "Production kicks off on a new show combining traditional theater art with modern elements, coming soon to the stage." },
  { id: "n5", date: "", title: "الرؤية والرسالة", desc: "تعريف شامل برؤية ورسالة مركز مرايا للفنون، حيث نسعى لإثراء المشهد الفني وتقديم تجارب فريدة تجمع الإبداع والاحترافية.", img: "/img/الرؤية والرسالة.jpg", order: 5, titleEn: "Vision & Mission", descEn: "A comprehensive introduction to the vision and mission of Mraya Arts Center, as we strive to enrich the art scene with unique experiences combining creativity and professionalism." },
  { id: "n6", date: "", title: "تعاوننا مع الشركاء", desc: "شراكات استراتيجية مع مؤسسات وجهات متعددة لدعم الحركة الفنية والثقافية وتطوير المشهد الإبداعي.", img: "/img/تعاونا مع.jpg", order: 6, titleEn: "Our Partner Collaborations", descEn: "Strategic partnerships with multiple institutions and entities to support the arts and culture movement and develop the creative scene." },
  { id: "n7", date: "", title: "تواصل معنا", desc: "قنوات تواصل متعددة متاحة لكم طوال الوقت، لأي استفسارات أو طلبات حول خدماتنا وفعالياتنا.", img: "/img/تواصل.jpg", order: 7, titleEn: "Contact Us", descEn: "Multiple contact channels are available to you at all times for any inquiries or requests about our services and events." },
];

export const DEFAULT_CONTENT: SiteContent = {
  settings: DEFAULT_SETTINGS,
  stats: DEFAULT_STATS,
  services: DEFAULT_SERVICES,
  team: DEFAULT_TEAM,
  news: DEFAULT_NEWS,
};
