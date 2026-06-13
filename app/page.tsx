"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import {
  Brain,
  Code2,
  Search,
  Target,
  LineChart,
  TrendingUp,
  Workflow,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Zap,
  Laptop,
  Users,
  Compass,
  Mail,
  Sparkles,
  Award,
  Layers,
  Star,
  Activity,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Database,
  X,
  Menu
} from "lucide-react";

// Types
interface Metric {
  label: string;
  value: string;
}

interface Project {
  id: string;
  name: string;
  tagline: string;
  challenge: string;
  solution: string;
  impact: string;
  tags: string[];
  metrics: Metric[];
}

// ----------------------------------------------------
// Static Data
// ----------------------------------------------------

const expertiseAreas = [
  {
    title: "Full Stack Development",
    description: "Custom digital platforms built for high performance, enterprise scalability, and direct business growth.",
    icon: Code2,
    accent: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400"
  },
  {
    title: "AI Solutions & Automation",
    description: "Intelligent AI workflows, conversational agents, and automated operations that multiply team leverage.",
    icon: Brain,
    accent: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400"
  },
  {
    title: "SEO Services",
    description: "Search-first digital architecture designed to lift brand authority, search rankings, and organic inbound volume.",
    icon: Search,
    accent: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400"
  },
  {
    title: "Google Ads Management",
    description: "Paid acquisition programs structured to maximize profitable growth and predictable return on ad spend.",
    icon: Target,
    accent: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-400"
  },
  {
    title: "Digital Marketing",
    description: "Omni-channel marketing initiatives that align messaging, customer journey, and commercial targets.",
    icon: MegaphoneIcon,
    accent: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400"
  },
  {
    title: "CRM & Business Systems",
    description: "Tailored business automation and CRM structures for unified database tracking and consistent client communication.",
    icon: Workflow,
    accent: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400"
  },
  {
    title: "Lead Generation Strategy",
    description: "Data-driven client acquisition models built to convert inbound traffic into high-intent revenue prospects.",
    icon: TrendingUp,
    accent: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400"
  }
];

function MegaphoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

const services = [
  {
    title: "Platform Development",
    description: "Engineered web applications and user-centric portals built to convert interest into commercial outcomes.",
    details: ["Custom React / Next.js Architecture", "API Integration & Backend Development", "Speed & Core Web Vitals Optimization", "Database Architecture"],
    icon: Laptop
  },
  {
    title: "AI-Driven Automation",
    description: "Integrate custom AI pipelines and automated triggers that remove operational drag and human error.",
    details: ["LLM & Chatbot Implementations", "Workflow Automation (Make, Zapier, Custom scripts)", "Intelligent Lead Routing & Alerts", "Operational Process Audits"],
    icon: Brain
  },
  {
    title: "SEO & Organic Growth",
    description: "Strategic content systems, Technical SEO, and authority acquisition designed to dominate commercial keywords.",
    details: ["Technical Site Audits & Fixing", "Keyword Research & Domain Mapping", "On-Page Semantic Optimization", "Backlink & Authority Building"],
    icon: Search
  },
  {
    title: "Paid Media Management",
    description: "End-to-end paid advertising setups targeted to drive qualified transactions and premium clients.",
    details: ["Search, Display & Remarketing Campaigns", "A/B Landing Page Testing", "Conversion API Integration", "ROAS & Spend Efficiency Audits"],
    icon: Target
  },
  {
    title: "CRM Integration",
    description: "Connect HubSpot, Salesforce, or custom CRM solutions with your product platform for seamless pipeline visibility.",
    details: ["CRM Data Architecture & Syncing", "Automated Lead Scoring", "Email Nurturing Sequence Setup", "Sales Pipeline Dashboard Tracking"],
    icon: Workflow
  },
  {
    title: "Growth Consultations",
    description: "Strategic analysis to identify bottlenecks in your digital ecosystem and align technology to business revenue goals.",
    details: ["Funnel Conversion Architecture", "Digital Tech Stack Auditing", "Automation Map Planning", "Growth Marketing Advisory"],
    icon: Sparkles
  },
  {
    title: "Analytics & Optimization",
    description: "Deploy robust tracking capabilities to trace customer paths from click to close, enabling smart reinvestment decisions.",
    details: ["Google Tag Manager Setup", "Custom Event Tracking (GA4)", "Heatmaps & User Behavior Analysis", "Post-Purchase Optimization Routing"],
    icon: LineChart
  }
];

const impactMetrics = [
  { label: "Websites Developed", value: "32+" },
  { label: "Industries Served", value: "6" },
  { label: "Marketing Campaigns", value: "120+" },
  { label: "Automation Systems", value: "45+" },
  { label: "Growth Solutions", value: "85+" }
];

const projectsData: Project[] = [
  {
    id: "ann",
    name: "America Needs Nurses",
    tagline: "Healthcare Recruitment Platform",
    challenge: "Modernizing a fragmented recruitment platform to accelerate nursing placements while boosting organic visibility in a highly competitive sector.",
    solution: "Built a custom, conversion-driven web application integrated with an automated applicant tracking system (ATS) sync and a targeted local SEO plan.",
    impact: "Accelerated applicant intake by 40%, reduced placement time, and generated a 250% lift in organic search impressions within 6 months.",
    tags: ["Full Stack Development", "SEO Roadmap", "CRM Integration", "Healthcare"],
    metrics: [{ label: "Lead Growth", value: "+250%" }, { label: "Placement Velocity", value: "-30%" }]
  },
  {
    id: "acr",
    name: "Atlanta Car Rental",
    tagline: "Luxury Vehicle Booking System",
    challenge: "A highly crowded regional travel market demanded a high-end booking platform with a lower cost per acquisition than aggregate platforms.",
    solution: "Designed a premium luxury digital interface, structured Google Ads campaigns with custom landing pages, and implemented automated CRM lead nurturing.",
    impact: "Boosted direct booking revenue by 180% and reduced lead acquisition cost by 45% using automated campaigns.",
    tags: ["Google Ads", "Web Applications", "CRM Architecture", "Travel"],
    metrics: [{ label: "Direct Bookings", value: "+180%" }, { label: "CPA Reduction", value: "-45%" }]
  },
  {
    id: "yr",
    name: "YalaRide",
    tagline: "On-Demand Transportation App",
    challenge: "Scaling demand across multiple regional hubs while keeping operational onboarding overhead low.",
    solution: "Deployed a high-performance web platform, high-converting organic landing pages, and an automated client intake and screening workflow.",
    impact: "Drove 10,000+ driver sign-ups and reduced operational onboarding time by 50% via intelligent screening bots.",
    tags: ["Automation Systems", "Lead Generation", "React Platform", "Automotive"],
    metrics: [{ label: "Driver Sign-ups", value: "10K+" }, { label: "Onboarding Time", value: "-50%" }]
  },
  {
    id: "adt",
    name: "Arrowhead DigiTech",
    tagline: "B2B Lead Acquisition Agency Site",
    challenge: "Establishing visual authority and scaling conversion rates for a premium digital growth agency.",
    solution: "Architected a custom Next.js portfolio platform featuring high-end animations, interactive CRM-connected lead forms, and structured marketing funnels.",
    impact: "Increased inbound lead conversion rates from 1.2% to 4.8% and established a premium visual system.",
    tags: ["Next.js", "AI Integrations", "Lead Gen Strategy", "Marketing"],
    metrics: [{ label: "Conversion Rate", value: "4.8x" }, { label: "Inbound Leads", value: "+220%" }]
  },
  {
    id: "cc",
    name: "Cars Compound",
    tagline: "Automotive Marketplace Platform",
    challenge: "Traditional dealership interfaces lacked premium styling, causing high user bounce rates and low lead submissions.",
    solution: "Engineered a lightning-fast catalog search interface using Next.js and Tailwind, integrated with a multi-channel CRM lead distribution engine.",
    impact: "Decreased page load times under 1s, resulting in a 65% reduction in bounce rate and 80% higher lead submissions.",
    tags: ["Next.js", "CRM Automation", "Performance Opt.", "Automotive"],
    metrics: [{ label: "Bounce Rate", value: "-65%" }, { label: "Lead Submissions", value: "+80%" }]
  },
  {
    id: "gjt",
    name: "Go-Jetter Travel & Tours",
    tagline: "Premium Travel & Custom Tour Agency",
    challenge: "High-value tour bookings required complex personalization and manual sales support, limiting growth.",
    solution: "Created an interactive tour builder interface coupled with an automated AI assistant that qualifies travel preferences and sends direct CRM entries.",
    impact: "Automated 70% of pre-sales trip customization and increased custom tour package sales by 95%.",
    tags: ["AI Chatbots", "SEO Services", "Digital Systems", "Travel"],
    metrics: [{ label: "Automated Prep", value: "70%" }, { label: "Sales Growth", value: "+95%" }]
  },
  {
    id: "it",
    name: "Ihawa Travel",
    tagline: "Custom Travel Booking Hub",
    challenge: "Capturing organic search market share for custom global travel destinations without high ad spending.",
    solution: "Rolled out a content hub optimized with structured data and search-first layout design, backed by a conversion-focused booking engine.",
    impact: "Attained top 3 rankings for 40+ high-intent search queries, bringing in consistent monthly bookings organically.",
    tags: ["SEO Services", "Web Development", "Organic Strategy", "Travel"],
    metrics: [{ label: "Search Ranking", value: "Top 3" }, { label: "Organic Bookings", value: "+140%" }]
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Growth Blueprint",
    description: "We map out your current conversion metrics, target audience behavior, and construct a precise technological & marketing blueprint mapped to bottom-line revenue outcomes.",
    details: ["Competitor Gap Analysis", "Infrastructure Auditing", "CRM Schema Planning", "Commercial Goal KPI Mapping"]
  },
  {
    step: "02",
    title: "Premium Architecture & Build",
    description: "We construct high-fidelity digital interfaces, optimized speed models, and solid database linkages designed to deliver state-of-the-art experiences.",
    details: ["Next.js & React Custom Builds", "Conversion-Focused UX Direction", "Clean Code Modular Scalability", "Responsive Touch Design"]
  },
  {
    step: "03",
    title: "AI & System Automation Linkage",
    description: "Operational drag is eliminated by stitching CRM pipelines, email triggers, lead qualifiers, and automated AI assistance together into a smooth operational matrix.",
    details: ["CRM Syncing & Setup", "AI Automated Funnel Qualifiers", "Intelligent Notifications & Alert Triggers", "Multi-Source Lead Routing"]
  },
  {
    step: "04",
    title: "Optimization & Revenue Scaling",
    description: "We launch structured paid acquisition channels, organic optimization protocols, and continuous cohort testing to compound growth over time.",
    details: ["High-Intent Google Ads Directing", "Continuous Conversion Rate Optimization", "Technical Organic Ranking Pushes", "Cohort & Funnel Performance Audits"]
  }
];

const industries = [
  { name: "Healthcare & MedTech", icon: Activity, desc: "Recruitment flows & HIPAA-compliant leads" },
  { name: "Travel & Hospitality", icon: Compass, desc: "Automated custom bookings & luxury agency setups" },
  { name: "Car Rental Systems", icon: Laptop, desc: "Bespoke fleet reservation engines" },
  { name: "Automotive Marketplaces", icon: Database, desc: "High-performance catalogs & CRM routers" },
  { name: "Recruitment & Placement", icon: Users, desc: "Applicant screening pipelines & ATS platforms" },
  { name: "Professional Service Brands", icon: Award, desc: "High-ticket client acquisition systems" }
];

const testimonials = [
  {
    quote: "Usman delivered a premium digital solution that transformed our patient and client intake. His combination of Next.js architecture, custom automation workflows, and SEO strategy didn't just build a portfolio — it created a recurring revenue stream.",
    author: "Founder & Director",
    company: "America Needs Nurses",
    rating: 5,
    tag: "Healthcare Tech"
  },
  {
    quote: "We were struggling to scale direct bookings without burning through massive ad spend on aggregate platforms. Usman built a premium portal, optimized our Google Ads layout, and synced our entire pipeline with HubSpot. Our direct reservations grew by 180% while cutting acquisition costs in half.",
    author: "Operations Director",
    company: "Atlanta Car Rental",
    rating: 5,
    tag: "Luxury Travel"
  },
  {
    quote: "Most developers just write code. Usman understood our business structure. He automated driver screening and routed leads smoothly, freeing up countless hours for our dispatch teams. Visual aesthetics are spectacular, but the actual operational leverage is what wowed us.",
    author: "CEO & Founder",
    company: "YalaRide",
    rating: 5,
    tag: "Automotive App"
  }
];

const techStack = [
  {
    category: "Full Stack Engineering",
    desc: "Lightning-fast platforms built for modern web standards",
    items: [
      { name: "Next.js", level: 95 },
      { name: "React / React 19", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 98 },
      { name: "Node.js / Express", level: 85 },
      { name: "PostgreSQL / Prisma", level: 80 },
      { name: "Headless Architectures", level: 90 },
      { name: "WordPress & Elementor", level: 95 }
    ]
  },
  {
    category: "AI & Automation Engine",
    desc: "Deploying machine intelligence and syncing CRM pipelines",
    items: [
      { name: "OpenAI / Anthropic APIs", level: 90 },
      { name: "AI Chatbots & Agents", level: 85 },
      { name: "CRM Integration (HubSpot/Salesforce)", level: 92 },
      { name: "Workflow Automation (Zapier/Make)", level: 95 },
      { name: "Automated Lead Routing", level: 95 },
      { name: "Database Triggers", level: 88 }
    ]
  },
  {
    category: "Digital Growth & Media",
    desc: "Driving commercial conversions and capturing search intent",
    items: [
      { name: "Technical SEO Auditing", level: 95 },
      { name: "Commercial Keyword Mapping", level: 90 },
      { name: "Google Ads Campaigns", level: 92 },
      { name: "Meta Conversion API", level: 88 },
      { name: "Google Tag Manager", level: 94 },
      { name: "GA4 Analytics Architecture", level: 90 }
    ]
  }
];

const comparisons = [
  {
    feature: "Strategic Scope",
    usman: "Builds holistic systems integrating code, marketing campaigns, and business automations.",
    agency: "Builds a website template only; has no marketing or automation expertise."
  },
  {
    feature: "Technical Quality",
    usman: "Custom Next.js & React frameworks with sub-second page loads and clean schemas.",
    agency: "Bloated themes with poor performance scores and fragile plugin reliance."
  },
  {
    feature: "Business Alignment",
    usman: "Focuses strictly on Lead Conversion Rates, Cost Per Acquisition, and Operational Leverage.",
    agency: "Focuses on vanity metrics, generic templates, and standard deliverables."
  },
  {
    feature: "AI Integrations",
    usman: "Native deployment of LLM pipelines and automated CRM routers to bypass manual actions.",
    agency: "Limited or no AI execution; relies on third-party basic iframe code."
  }
];

// ----------------------------------------------------
// Helper Subcomponents
// ----------------------------------------------------

// Count-up counter utilizing framer motion hook
function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numericVal = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericVal, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, numericVal, count, duration]);

  return (
    <motion.span ref={ref} className="font-semibold tracking-tight">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </motion.span>
  );
}

// Interactive 3D Orbiting / Floating Tech Hub Graphic
function HeroVisual() {
  return (
    <div className="relative flex h-[350px] w-full items-center justify-center overflow-visible md:h-[450px]">
      {/* Glow Effects Behind */}
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px]" />

      {/* Isometric Grid Base */}
      <div className="absolute h-[280px] w-[280px] rounded-full border border-white/5 bg-gradient-to-b from-white/5 to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] opacity-40 animate-spin-slow" />
      <div className="absolute h-[180px] w-[180px] rounded-full border border-violet-500/10 bg-transparent opacity-60 animate-spin-slow [animation-direction:reverse]" />

      {/* Orbit Rings */}
      <svg className="absolute h-full w-full max-w-[420px] overflow-visible" viewBox="0 0 400 400" fill="none">
        {/* Core AI Orb */}
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="neonPurpleBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Orbit Path 1 */}
        <ellipse cx="200" cy="200" rx="150" ry="60" stroke="url(#neonPurpleBlue)" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" className="rotate-12 transform-gpu origin-center" />
        {/* Orbit Path 2 */}
        <ellipse cx="200" cy="200" rx="120" ry="50" stroke="url(#neonPurpleBlue)" strokeWidth="1" opacity="0.2" className="-rotate-45 transform-gpu origin-center" />

        {/* Core Node */}
        <circle cx="200" cy="200" r="30" fill="url(#coreGlow)" />
        <circle cx="200" cy="200" r="12" fill="#020205" stroke="url(#neonPurpleBlue)" strokeWidth="2" />
        <circle cx="200" cy="200" r="4" fill="#8b5cf6" className="animate-pulse" />
      </svg>

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="absolute top-[15%] left-[12%] flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0c0a1b]/80 px-4 py-2 shadow-2xl backdrop-blur-md"
      >
        <span className="flex h-2.5 w-2.5 rounded-full bg-violet-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-violet-200">Next.js App Router</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-[20%] right-[10%] flex items-center gap-2 rounded-2xl border border-white/10 bg-[#050b18]/80 px-4 py-2 shadow-2xl backdrop-blur-md"
      >
        <span className="flex h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-blue-200">AI Automation</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
        className="absolute top-[48%] right-[5%] flex items-center gap-2 rounded-2xl border border-white/10 bg-[#081216]/80 px-4 py-2 shadow-2xl backdrop-blur-md"
      >
        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-emerald-200">Google Ads / ROI</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-[10%] left-[8%] flex items-center gap-2 rounded-2xl border border-white/10 bg-[#160613]/80 px-4 py-2 shadow-2xl backdrop-blur-md"
      >
        <span className="flex h-2.5 w-2.5 rounded-full bg-pink-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide text-pink-200">CRM Conversion</span>
      </motion.div>

      {/* Connected Glowing Sparks */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet-500/10 opacity-30 animate-spin-slow" style={{ animationDuration: "50s" }} />
    </div>
  );
}

// ----------------------------------------------------
// Main Homepage Redesign Component
// ----------------------------------------------------
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project>(projectsData[0]);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", projectType: "Growth System", details: "" });

  const { scrollY } = useScroll();

  // Scroll event listener for Navbar state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsNavScrolled(true);
      } else {
        setIsNavScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer to track active section in viewport
  useEffect(() => {
    const sections = ["home", "about", "expertise", "services", "projects", "process", "industries", "why", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((item) => {
        if (item) item.observer.unobserve(item.el);
      });
    };
  }, []);

  const handleTestimonialChange = (index: number) => {
    setActiveTestimonial(index);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: "", email: "", projectType: "Growth System", details: "" });
    }, 4500);
  };

  return (
    <div className="relative isolate min-h-screen bg-[#020205] text-slate-100 overflow-x-hidden bg-grid-pattern">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[8%] left-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14),transparent_60%)] blur-[90px] animate-pulse-glow" />
      <div className="absolute top-[28%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_65%)] blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-[15%] left-[-5%] -z-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_60%)] blur-[95px]" />
      
      {/* ----------------------------------------------------
          Navbar
          ---------------------------------------------------- */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isNavScrolled
            ? "bg-[#020205]/85 backdrop-blur-xl border-b border-white/5 py-4 shadow-xl shadow-black/30"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 p-[1px] group-hover:shadow-[0_0_15px_rgba(139,92,246,0.35)] transition-all duration-300">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#020205] text-sm font-black text-white">
                UF
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-white group-hover:text-violet-400 transition-colors">
                Usman Farooqi
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-slate-400 group-hover:text-slate-200 transition-colors">
                Growth Specialist
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1.5 backdrop-blur-md">
            {[
              ["About", "about"],
              ["Expertise", "expertise"],
              ["Services", "services"],
              ["Projects", "projects"],
              ["Process", "process"],
              ["CTA", "contact"]
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {activeSection === id && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="relative group overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-blue-600 p-[1.5px] font-semibold text-xs text-white shadow-lg shadow-violet-950/20 hover:shadow-violet-500/20 transition-all duration-300"
            >
              <span className="relative block rounded-full bg-[#020205] px-5 py-2.5 transition-all duration-300 group-hover:bg-transparent">
                Launch Growth Call
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/5 bg-[#020205] px-6 py-8"
            >
              <div className="flex flex-col gap-4">
                {[
                  ["About", "about"],
                  ["Expertise", "expertise"],
                  ["Services", "services"],
                  ["Projects", "projects"],
                  ["Process", "process"],
                  ["Contact", "contact"]
                ].map(([label, id]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5"
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg"
                >
                  Book Growth Call <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ----------------------------------------------------
          Section 1: Hero
          ---------------------------------------------------- */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            {/* Glowing Accent Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/20 px-4.5 py-1.5 text-xs font-semibold tracking-wider text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-violet-400" />
              <span>FULL STACK DEVELOPER • AI & DIGITAL GROWTH</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] lg:max-w-[640px]">
              Strategic systems that turn technology into{" "}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent text-glow-purple">
                business growth.
              </span>
            </h1>

            {/* Sub-Headline description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-[560px]">
              Hi, I am <strong className="text-white font-semibold">Usman Farooqi</strong>. I bridge complex engineering with revenue marketing, constructing custom Next.js platforms, intelligent AI automations, and ROI campaigns to scale companies.
            </p>

            {/* Target capabilities list */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-w-[480px]">
              {[
                "Full Stack Development",
                "AI Agent Integrations",
                "Technical SEO Roads",
                "Google Ads Management",
                "CRM Flow Automations",
                "Lead Generation Architecture"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Check className="h-4 w-4 text-violet-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-950/30 hover:shadow-violet-600/40 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Strategy Session
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Explore Case Studies
              </a>
            </div>
          </motion.div>

          {/* Right 3D Visual Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 2: About Me
          ---------------------------------------------------- */}
      <section id="about" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Glass Panel Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span>About Me</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                An engineer focused on the ultimate business outcome:{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Revenue Growth.
                </span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                I do not just deliver lines of code. I deliver complete digital pipelines. By blending full-stack software development with lead conversion strategies (SEO, Google Ads, CRM architecture), I enable brands to unlock massive automation efficiencies and scale lead traffic.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                Whether creating bespoke web platforms from scratch or designing automated workflows to qualify driver intakes for ride companies, my systems have one core mission: to optimize user conversions and eliminate manual back-office tasks.
              </p>

              {/* Approach Badges */}
              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="rounded-2xl border border-white/5 bg-[#0a0715]/60 p-5 shadow-lg">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-violet-300 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-violet-400" /> Focus
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Business KPIs, Google Ads ROAS efficiency, custom LLM routing, and CRM synchronization.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-[#050b18]/60 p-5 shadow-lg">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-400" /> Philosophy
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Seamless integration. Building strategic digital systems rather than throwing isolated features.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side Stats Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 grid gap-4 sm:grid-cols-2"
            >
              {[
                { label: "AI systems built", count: "45+", color: "from-violet-500/20 to-purple-500/5", border: "hover:border-violet-500/30" },
                { label: "Completed platforms", count: "32+", color: "from-blue-500/20 to-indigo-500/5", border: "hover:border-blue-500/30" },
                { label: "Ads Campaigns", count: "120+", color: "from-pink-500/20 to-rose-500/5", border: "hover:border-pink-500/30" },
                { label: "Satisfied Partners", count: "99%", color: "from-emerald-500/20 to-teal-500/5", border: "hover:border-emerald-500/30" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`relative rounded-3xl border border-white/5 bg-gradient-to-br ${stat.color} p-6 shadow-xl text-center backdrop-blur-md transition-all duration-300 ${stat.border}`}
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    <Counter value={stat.count} />
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 3: Core Expertise
          ---------------------------------------------------- */}
      <section id="expertise" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>Core Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The full-stack capability engine.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We coordinate engineering and media marketing disciplines into a single growth force to power your acquisition.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {expertiseAreas.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-6.5 shadow-lg transition-all duration-300 hover:border-violet-500/25 hover:bg-white/[0.04] hover:-translate-y-1"
                >
                  {/* Glass Top Gradient Effect */}
                  <div className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-300 group-hover:bg-violet-500/10 group-hover:text-violet-400 transition-all duration-300">
                    <IconComp className={`h-6 w-6 ${item.iconColor}`} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 4: Services
          ---------------------------------------------------- */}
      <section id="services" className="border-t border-white/5 py-20 md:py-28 relative bg-gradient-to-b from-transparent via-violet-950/[0.015] to-transparent">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Premium growth integrations.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We configure tailored technical modules and campaign engines, designed to scale with your organization.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6.5 shadow-xl transition-all duration-300 hover:border-blue-500/20 hover:bg-[#060814]/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-300 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                    <ServiceIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                  
                  {/* Detailed features bullet list */}
                  <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors">
                        <Check className="h-3.5 w-3.5 text-blue-400/80 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 5 & 6: Featured Projects & Case Studies
          ---------------------------------------------------- */}
      <section id="projects" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            
            {/* Left Column: Heading and Tabs for all 7 projects */}
            <div className="lg:col-span-5 space-y-6 sticky top-28">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span>Case Studies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Validated Commercial Solutions.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Click on the projects below to analyze the visual blueprint, target challenge, custom solution, and the resulting business impact.
              </p>

              {/* Project Navigation Selector Buttons */}
              <div className="flex flex-col gap-2.5 pt-4">
                {projectsData.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`group flex items-center justify-between text-left px-5 py-4 rounded-2xl border transition-all duration-300 ${
                      selectedProject.id === project.id
                        ? "bg-gradient-to-r from-violet-500/10 to-blue-500/10 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.1)] text-white"
                        : "bg-white/[0.01] border-white/5 text-slate-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{project.name}</span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-300 mt-1">
                        {project.tagline}
                      </span>
                    </div>
                    <ArrowUpRight className={`h-4 w-4 shrink-0 transition-transform ${
                      selectedProject.id === project.id ? "rotate-45 text-violet-400" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Case Study Detail Panel (Dynamic AnimatePresence) */}
            <div className="lg:col-span-7 lg:pl-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0a1a] via-[#04040a] to-[#0a0f1d] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
                >
                  {/* Glow corner overlay */}
                  <div className="absolute top-0 right-0 h-40 w-40 bg-violet-600/5 blur-3xl pointer-events-none" />

                  {/* Heading tag */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-300 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {selectedProject.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-widest text-violet-400 font-bold">
                    {selectedProject.tagline}
                  </p>

                  <div className="mt-8 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-rose-400" /> Challenge
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-blue-400" /> The Solution
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {selectedProject.solution}
                      </p>
                    </div>

                    <div className="space-y-2 bg-gradient-to-r from-violet-500/5 to-blue-500/5 rounded-2xl border border-violet-500/10 p-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-violet-400" /> Commercial Impact
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-200 mt-2 font-medium">
                        {selectedProject.impact}
                      </p>
                    </div>
                  </div>

                  {/* Visual Impact Metric Badge row */}
                  <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                    {selectedProject.metrics.map((metric, idx) => (
                      <div key={idx} className="rounded-2xl bg-[#020205]/60 border border-white/5 p-4 text-center">
                        <div className="text-2xl sm:text-3xl font-black text-white text-glow-purple">
                          {metric.value}
                        </div>
                        <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 7: Results & Impact
          ---------------------------------------------------- */}
      <section id="results" className="border-t border-white/5 py-20 md:py-28 relative bg-[#04040c]/30">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>Results & Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Proven results by the numbers.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every digital investment is tracked directly to measurable pipeline impact. We focus on business outcomes, not visual drafts.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {impactMetrics.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6 text-center shadow-lg hover:border-violet-500/20 transition-all"
              >
                <div className="text-3xl sm:text-4xl font-black text-white">
                  <Counter value={item.value} />
                </div>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 8: Technology Stack
          ---------------------------------------------------- */}
      <section id="technologies" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Side text */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>Technology Stack</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Modern tools mapped to scale.
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                I configure structured, low-latency framework architectures designed to prevent database bottleneck issues, optimize SEO organic rankings, and scale transaction capabilities.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/5 border border-white/5 px-4 py-1.5 text-xs text-slate-300">Clean Schema Mapping</span>
                <span className="rounded-full bg-white/5 border border-white/5 px-4 py-1.5 text-xs text-slate-300">API Speed Optimization</span>
                <span className="rounded-full bg-white/5 border border-white/5 px-4 py-1.5 text-xs text-slate-300">Conversion Event Tracking</span>
              </div>
            </div>

            {/* Right Side badging grouped by categories */}
            <div className="lg:col-span-7 space-y-6">
              {techStack.map((group, groupIdx) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: groupIdx * 0.15 }}
                  className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/5 pb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      {group.category}
                    </h3>
                    <span className="text-[10px] text-slate-500">{group.desc}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {group.items.map((tech) => (
                      <div
                        key={tech.name}
                        className="group relative flex items-center justify-between rounded-xl bg-gradient-to-r from-[#0d091a] to-[#040409] border border-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-300 hover:border-violet-500/20 hover:text-white"
                      >
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 9: Process / How I Work
          ---------------------------------------------------- */}
      <section id="process" className="border-t border-white/5 py-20 md:py-28 relative bg-gradient-to-b from-transparent via-[#04040c] to-transparent">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>Process Flow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Operational Roadmap.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Four structured phases mapped to transform basic templates into automated, high-converting digital properties.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-3xl border border-white/5 bg-white/[0.01] p-6.5 shadow-xl hover:border-violet-500/25 transition-all duration-300 hover:bg-[#0c0a1a]/40"
              >
                {/* Numeric top tag */}
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/10 text-xs font-black text-violet-300 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                  {step.step}
                </div>

                <h3 className="mt-5 text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  {step.description}
                </p>

                {/* Sub details bullet checklist */}
                <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-[10px] text-slate-500 group-hover:text-slate-400">
                      <CheckCircle2 className="h-3.5 w-3.5 text-violet-400/80 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 10: Industries Served
          ---------------------------------------------------- */}
      <section id="industries" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>Industries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Vertical expertise.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Structuring bespoke digital frameworks across high-growth industries that require robust performance.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, idx) => {
              const IndIcon = ind.icon;
              return (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent p-6 text-center shadow-lg hover:border-blue-500/25 hover:bg-[#060814]/30 transition-all duration-300"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-300 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                    <IndIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {ind.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                    {ind.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 11: Why Work With Me
          ---------------------------------------------------- */}
      <section id="why" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A partnership focused on scale.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Why leading startups and growing companies choose custom growth integrations over basic visual deliverables.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.01] shadow-2xl">
            <table className="min-w-full divide-y divide-white/5 text-left text-xs">
              <thead className="bg-[#0c0a1a]/40 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-5">Value Anchor</th>
                  <th scope="col" className="px-6 py-5 text-violet-300 bg-violet-500/[0.02]">Usman Farooqi (Growth Partner)</th>
                  <th scope="col" className="px-6 py-5">Traditional Agency / Contractor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-5 font-bold text-white max-w-[150px]">{row.feature}</td>
                    <td className="px-6 py-5 text-slate-200 bg-violet-500/[0.02] max-w-[320px] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                        <span>{row.usman}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 max-w-[320px] leading-relaxed">{row.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 12: Testimonials
          ---------------------------------------------------- */}
      <section id="testimonials" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trusted by commercial operators.
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial card with anim status */}
            <div className="glass-panel glass-panel-glow rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-blue-600/5 blur-3xl pointer-events-none" />

              {/* Quotation mark decoration */}
              <span className="absolute top-4 left-6 text-8xl font-serif text-white/5 select-none pointer-events-none">“</span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-slate-100">
                    “{testimonials[activeTestimonial].quote}”
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/5">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {testimonials[activeTestimonial].author}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {testimonials[activeTestimonial].company}
                      </p>
                    </div>
                    <span className="self-start sm:self-center rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      {testimonials[activeTestimonial].tag}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider navigation controllers */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleTestimonialChange(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? "w-8 bg-blue-500" : "w-2.5 bg-white/10 hover:bg-white/20"
                    }`}
                    aria-label={`Go to testimonial slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 13: Contact CTA
          ---------------------------------------------------- */}
      <section id="contact" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0c071a] via-[#020205] to-[#04091a] p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 h-96 w-96 bg-violet-600/[0.03] blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-96 w-96 bg-blue-600/[0.02] blur-3xl pointer-events-none" />

            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Call parameters info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Growth Strategy Call</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Let's construct your revenue engine.
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Have a platform project, CRM automation flow, or campaign budget you want to optimize? Book a consultation. I will audit your setup and mapping out growth options.
                </p>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email Direct</span>
                      <a href="mailto:hello@usmanfarooqi.com" className="text-sm font-semibold text-white hover:text-violet-400 transition-colors">
                        hello@usmanfarooqi.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300">
                      <ShieldCheck className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">Contract Security</span>
                      <span className="text-sm font-semibold text-slate-300">
                        Detailed NDA & Clear KPI Target Anchors
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form panel container */}
              <div className="lg:col-span-7">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 relative">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.form
                        key="contact-form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleFormSubmit}
                        className="space-y-5"
                      >
                        <h3 className="text-lg font-bold text-white">Book Your Audit Session</h3>
                        
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="form-name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                            <input
                              type="text"
                              id="form-name"
                              required
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              placeholder="Usman Farooqi"
                              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="form-email" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Corporate Email</label>
                            <input
                              type="email"
                              id="form-email"
                              required
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              placeholder="name@company.com"
                              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="form-type" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Growth Goal</label>
                          <select
                            id="form-type"
                            value={formState.projectType}
                            onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-slate-300 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
                          >
                            <option value="Growth System">Complete Growth System (Dev + CRM + Ads)</option>
                            <option value="Full Stack App">Bespoke Full Stack App / Next.js Development</option>
                            <option value="AI Automation">AI Agent Integration & Process Automation</option>
                            <option value="SEO & PPC">SEO Optimization & Google Ads Performance</option>
                            <option value="CRM Build">HubSpot / CRM Pipeline Integration</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="form-details" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Project Parameters & Timeline</label>
                          <textarea
                            id="form-details"
                            rows={4}
                            value={formState.details}
                            onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                            placeholder="Tell me about your business model, metrics bottlenecks, and growth schedule..."
                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg hover:shadow-violet-600/20 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                          Send Message / Request Strategy Session <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-10 space-y-4"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
                          <Check className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Strategy Request Confirmed</h3>
                        <p className="text-xs leading-relaxed text-slate-400 max-w-sm mx-auto">
                          Thank you! I have received your growth request. I will analyze your domain parameters and reach out within 1 business day with custom calendar bookings.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Footer
          ---------------------------------------------------- */}
      <footer className="border-t border-white/5 py-12 text-center text-xs text-slate-500 bg-[#020205]/80">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 p-[1px]">
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#020205] text-[10px] font-black text-white">
                UF
              </div>
            </div>
            <span className="font-semibold text-slate-300 text-xs">Usman Farooqi</span>
          </div>
          
          <p className="text-slate-600">
            © {new Date().getFullYear()} Usman Farooqi — Technology & Business Growth Specialist. Built with Next.js & Framer Motion.
          </p>

          <div className="flex justify-center gap-4 text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <span>•</span>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <span>•</span>
            <a href="#contact" className="hover:text-white transition-colors">Growth Call</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
