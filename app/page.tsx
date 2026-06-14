"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CustomSelect } from "@/components/CustomSelect";
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
  ShieldCheck,
  Zap,
  Laptop,
  Users,
  Compass,
  Mail,
  Phone,
  Sparkles,
  Award,
  Layers,
  Star,
  Activity,
  ArrowRight,
  CheckCircle2,
  Home as HomeIcon,
  FolderOpen,
  Briefcase,
  X,
  Database,
  ArrowDown
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
    title: "Project Management",
    description: "Steering cross-functional technical teams to deliver high-performance web applications and systems on schedule.",
    icon: Compass,
    accent: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400"
  },
  {
    title: "WordPress & Web Development",
    description: "Designing fast, responsive websites using WordPress, Gutenberg, and element builders optimized for conversions.",
    icon: Laptop,
    accent: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400"
  },
  {
    title: "AI-Assisted Operations",
    description: "Utilizing modern AI tools, agent systems, and prompt engineering to scale development speed and team leverage.",
    icon: Brain,
    accent: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400"
  },
  {
    title: "Sales & CRM Operations",
    description: "Configuring CRM databases (HubSpot, Salesforce) and automated triggers to track leads from intake to close.",
    icon: Workflow,
    accent: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-400"
  },
  {
    title: "Team Leadership & Hiring",
    description: "Screening, recruiting, and managing distributed developers, designers, and specialists to support agency scale.",
    icon: Users,
    accent: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400"
  },
  {
    title: "Client & Project Success",
    description: "Gathering project parameters, managing expectations, and maintaining detailed transparency anchors throughout builds.",
    icon: Award,
    accent: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400"
  }
];

const services = [
  {
    title: "Digital Project Management",
    description: "Leading web and application builds from initial user story discovery to roadmap design, sprints, QA, and deployment.",
    details: ["Agile/Scrum Sprint Coordination", "Scope & Resource Planning", "QA Auditing & Performance Checks", "Detailed Status Reporting"],
    icon: Compass
  },
  {
    title: "WordPress Development",
    description: "Building landing pages, corporate portals, and marketing sites designed to convert visitors into business leads.",
    details: ["Custom Block & Builder Frameworks", "Theme Setup & Site Migrations", "Google Core Web Vitals Optimization", "Plugin Security & Backups"],
    icon: Laptop
  },
  {
    title: "Operations Automation",
    description: "Stitching automated alerts, CRM updates, and AI qualifiers together to remove manual drag and backend delays.",
    details: ["Zapier & Make Automation Maps", "AI Prompt Engineering Tools", "Automated Slack/Email Alerts", "Process Audit & Templates"],
    icon: Brain
  },
  {
    title: "CRM Setup & Pipeline Config",
    description: "Setting up database schemas, scoring fields, and automated routing rules in HubSpot and Salesforce.",
    details: ["CRM Contact Database Mapping", "Automated Lead Distribution Routing", "Email Nurturing Sequence Setup", "Pipeline Analytics Dashboards"],
    icon: Workflow
  },
  {
    title: "Team Hiring & Structure",
    description: "Helping agencies scale operations by auditing bottlenecks, setting up vetting channels, and hiring talent.",
    details: ["Developer Skill Assessment Vetting", "Onboarding Systems & Docs", "Resource Capability Planning", "Freelancer & Contractor Hubs"],
    icon: Users
  },
  {
    title: "Digital Operations Consulting",
    description: "Analyzing business technology stacks to reduce subscription waste, improve coordination, and clear delivery bottlenecks.",
    details: ["Tech Stack Consolidation Audit", "Standard Operating Procedures (SOPs)", "Time Tracker & Task Management Setup", "Cross-Team Workflow Mapping"],
    icon: Sparkles
  }
];

const impactMetrics = [
  { label: "Websites Coordinated", value: "32+" },
  { label: "Industries Served", value: "6" },
  { label: "Operations Campaigns", value: "120+" },
  { label: "AI & Automation Flows", value: "45+" },
  { label: "Project Solutions", value: "85+" }
];

const projectsData: Project[] = [
  {
    id: "ann",
    name: "America Needs Nurses",
    tagline: "Healthcare Recruitment Platform Project",
    challenge: "Fragmented applicant tracking and manual placements delayed nurse staffing while organic site traffic lagged in a competitive sector.",
    solution: "Directed custom recruitment portal development, structured automatic applicant tracking system (ATS) syncs, and coordinated the local SEO roadmap.",
    impact: "Accelerated placement velocity by 30% and increased organic search lead impressions by 250% within 6 months.",
    tags: ["Project Management", "WordPress CMS", "CRM Operations", "Healthcare"],
    metrics: [{ label: "Lead Growth", value: "+250%" }, { label: "Placement Velocity", value: "-30%" }]
  },
  {
    id: "acr",
    name: "Atlanta Car Rental",
    tagline: "Luxury Vehicle Reservation Portal",
    challenge: "A crowded regional travel market demanded a high-end booking platform with a lower lead cost than aggregate platforms.",
    solution: "Managed the luxury fleet booking project, structured Google Ads campaigns with optimized landing pages, and implemented automated CRM lead scoring.",
    impact: "Boosted direct bookings by 180% and reduced lead acquisition cost by 45% using automated operations.",
    tags: ["Digital Operations", "Google Ads Strategy", "Client Management", "Travel"],
    metrics: [{ label: "Direct Bookings", value: "+180%" }, { label: "CPA Reduction", value: "-45%" }]
  },
  {
    id: "yr",
    name: "YalaRide",
    tagline: "Transportation Dispatch Onboarding App",
    challenge: "Scaling demand across regional hubs created a massive onboarding bottleneck for driver credentials.",
    solution: "Supervised web platform delivery and custom CRM workflows, integrating screening automation and automated team alerts.",
    impact: "Helped secure 10,000+ driver sign-ups and cut screening onboarding time in half using automated tools.",
    tags: ["Process Automation", "Team Coordination", "Project Delivery", "Automotive"],
    metrics: [{ label: "Driver Sign-ups", value: "10K+" }, { label: "Onboarding Time", value: "-50%" }]
  },
  {
    id: "adt",
    name: "Arrowhead DigiTech",
    tagline: "Lead Acquisition Agency Site Release",
    challenge: "The digital growth agency required a high-converting web platform to establish authority and capture inbound leads.",
    solution: "Managed Next.js platform design and development, oversaw HubSpot pipeline mappings, and audited site performance scores.",
    impact: "Increased inbound lead conversion rates from 1.2% to 4.8% and established a premium visual system.",
    tags: ["Project Management", "Web Operations", "Conversion Optimization", "Marketing"],
    metrics: [{ label: "Conversion Rate", value: "4.8x" }, { label: "Inbound Leads", value: "+220%" }]
  },
  {
    id: "cc",
    name: "Cars Compound",
    tagline: "Automotive Catalog & CRM Integration",
    challenge: "Low-speed catalog searches caused high user bounce rates and lost lead submissions for the dealership network.",
    solution: "Oversaw lightning-fast inventory catalog delivery and connected multi-channel lead routing triggers with CRM routing rules.",
    impact: "Reduced site search load times under 1s, leading to a 65% bounce reduction and 80% higher lead submissions.",
    tags: ["Project Management", "CRM Integrations", "Operations", "Automotive"],
    metrics: [{ label: "Bounce Rate", value: "-65%" }, { label: "Lead Submissions", value: "+80%" }]
  },
  {
    id: "gjt",
    name: "Go-Jetter Travel & Tours",
    tagline: "Interactive Tour Builder & AI Sync",
    challenge: "Complex custom tour bookings required extensive manual sales support, limiting booking volume.",
    solution: "Supervised developer execution on an interactive package builder, linked to an automated AI assistant that qualifies travel preferences.",
    impact: "Automated 70% of pre-sales trip customization, increasing custom package sales by 95%.",
    tags: ["AI Operations", "Team Leadership", "Client Success", "Travel"],
    metrics: [{ label: "Automated Prep", value: "70%" }, { label: "Sales Growth", value: "+95%" }]
  },
  {
    id: "it",
    name: "Ihawa Travel",
    tagline: "Custom Travel Booking Hub Release",
    challenge: "Capturing search market share for custom global travel destinations without high ad spending.",
    solution: "Managed structured content hub development and mapped search keywords, optimizing booking engine interface flows.",
    impact: "Attained top 3 rankings for 40+ high-intent search queries, bringing in consistent monthly bookings organically.",
    tags: ["SEO Strategy", "Web Development", "Project Delivery", "Travel"],
    metrics: [{ label: "Search Ranking", value: "Top 3" }, { label: "Organic Bookings", value: "+140%" }]
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Blueprinting",
    description: "We audit your current site metrics, outline project parameters, CRM schema, and design a detailed scope of work (SOP) mapped to business goals.",
    details: ["Competitor Gap Audits", "Tech Stack Inspections", "CRM Schema Planning", "Commercial Goal Mapping"]
  },
  {
    step: "02",
    title: "Development Coordination",
    description: "I manage developers and designers to build high-performance web properties using WordPress or custom frontend frameworks.",
    details: ["Agile Sprint Planning", "Conversion-Focused Direction", "Responsive Design Checks", "WordPress Theme Customization"]
  },
  {
    step: "03",
    title: "AI & Workflow Automation",
    description: "Operational bottlenecks are removed by stitching CRM pipelines, email triggers, lead qualifiers, and automated AI assistance together.",
    details: ["CRM Syncing & Setup", "AI Automated Funnel Qualifiers", "Intelligent Notifications & Alert Triggers", "Multi-Source Lead Routing"]
  },
  {
    step: "04",
    title: "Quality Audit & Release",
    description: "We run comprehensive speed, conversion tracking, and responsive compatibility tests to verify that the build is ready for launch.",
    details: ["Google Tag Manager Setup", "Continuous Conversion Optimizations", "TypeScript & Build Sanity checks", "Operational Handover Documentation"]
  }
];

const techStack = [
  {
    category: "Project & Team Management",
    desc: "Methodologies and tools used to coordinate digital teams and delivery",
    items: [
      { name: "Agile / Scrum Coordination", level: 95 },
      { name: "Scope & Requirement Analysis", level: 95 },
      { name: "Hiring & Talent Screening", level: 90 },
      { name: "JIRA / Trello / ClickUp", level: 95 },
      { name: "Client Relations & Support", level: 95 },
      { name: "Standard Operating Procedures (SOPs)", level: 92 },
      { name: "Quality Assurance (QA) Auditing", level: 90 }
    ]
  },
  {
    category: "Web & CMS Development",
    desc: "Designing and releasing high-converting web properties",
    items: [
      { name: "WordPress & Elementor", level: 95 },
      { name: "Gutenberg Block Customization", level: 90 },
      { name: "Next.js (Team Delivery)", level: 85 },
      { name: "React / HTML5 / CSS3", level: 85 },
      { name: "Speed & Core Web Vitals Opt.", level: 92 },
      { name: "Domain & Site Migrations", level: 94 }
    ]
  },
  {
    category: "AI Tools & Digital Operations",
    desc: "Streamlining workflow speeds and lead generation databases",
    items: [
      { name: "AI-assisted coding (Cursor/LLMs)", level: 90 },
      { name: "Workflow Automation (Zapier/Make)", level: 95 },
      { name: "CRM Setup (HubSpot/Salesforce)", level: 92 },
      { name: "Google Tag Manager / GA4", level: 90 },
      { name: "Google Ads Strategy Setup", level: 92 },
      { name: "Automated Lead Routing Setup", level: 95 }
    ]
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
    quote: "Usman managed the America Needs Nurses recruitment platform release flawlessly. His coordination between our frontend team, our ATS synchronization flows, and our SEO roadmap created a highly reliable source of qualified candidates.",
    author: "Founder & Director",
    company: "America Needs Nurses",
    rating: 5,
    tag: "Healthcare Operations"
  },
  {
    quote: "We were struggling to organize leads and schedule bookings without burning through our ad spend. Usman coordinated the booking system project, set up HubSpot CRM pipelines, and optimized our Google Ads layout, driving a 180% reservation growth.",
    author: "Operations Director",
    company: "Atlanta Car Rental",
    rating: 5,
    tag: "Luxury Travel Ops"
  },
  {
    quote: "Usman's project management and operations insight transformed our driver intake speed. He structured driver vetting roadmaps and Slack automation alerts, helping us scale to over 10,000 driver registrations while saving our dispatch teams hundreds of hours.",
    author: "CEO & Founder",
    company: "YalaRide",
    rating: 5,
    tag: "Automotive Logistics"
  }
];

const comparisons = [
  {
    feature: "Strategic Scope",
    usman: "Steers cross-functional projects, coordinating developers, CRM systems, and automations.",
    agency: "Writes code or edits basic page templates with no operational or scheduling scope."
  },
  {
    feature: "Delivery Quality",
    usman: "Ensures sub-second speed audits, robust CRM data flows, and thorough QA checks.",
    agency: "Installs heavy plugin themes with slow loads, fragile databases, and high bounce rates."
  },
  {
    feature: "Operational Leverage",
    usman: "Saves manual back-office hours using custom AI prompt scripts and Zapier integrations.",
    agency: "No automation or workflow scaling strategy; relies on manual manual actions."
  },
  {
    feature: "Accountability",
    usman: "Provides detailed sprints, clear KPI indicators, transparent communications, and NDAs.",
    agency: "Fails to meet schedules, lacks structured project tracking, and has poor updates."
  }
];

// ----------------------------------------------------
// Project CSS Preview Components
// ----------------------------------------------------

function AmericaNeedsNursesPreview() {
  return (
    <div className="w-full h-44 bg-[#05030e] rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative group/preview">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 z-10">
        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Nurse Placements Tracker</span>
        <span className="text-[8px] font-extrabold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">ATS Sync Active</span>
      </div>
      <div className="space-y-2 py-2 z-10">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-400">Sarah Jenkins (ICU Specialist)</span>
          <span className="text-emerald-400 font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">Placed</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-400">Michael Chang (Emergency Room)</span>
          <span className="text-blue-400 font-bold bg-blue-500/5 px-1.5 py-0.5 rounded border border-blue-500/10">Interviewing</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-400">Elena Rostova (Pediatrics Nurse)</span>
          <span className="text-violet-400 font-bold bg-violet-500/5 px-1.5 py-0.5 rounded border border-violet-500/10">Verified</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[9px] text-slate-500 pt-2 border-t border-white/5 z-10">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-slate-400">Placement velocity accelerated by 30%</span>
      </div>
    </div>
  );
}

function AtlantaCarRentalPreview() {
  return (
    <div className="w-full h-44 bg-[#02040c] rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative group/preview">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 z-10">
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Luxury Booking Fleet</span>
        <span className="text-[8px] font-extrabold bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Reservation API</span>
      </div>
      <div className="grid grid-cols-2 gap-2 py-1.5 z-10">
        <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">
          <div className="text-[8px] uppercase tracking-wider text-slate-400">Porsche 911 GT3</div>
          <div className="text-[10px] font-extrabold text-white mt-0.5">$399/day</div>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">
          <div className="text-[8px] uppercase tracking-wider text-slate-400">Tesla Roadster</div>
          <div className="text-[10px] font-extrabold text-white mt-0.5">$249/day</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/5 pt-2 z-10">
        <span className="font-bold text-emerald-400">+180% Reservations</span>
        <span className="text-[8px] text-slate-500">Ad CPA Reduced by 45%</span>
      </div>
    </div>
  );
}

function YalaRidePreview() {
  return (
    <div className="w-full h-44 bg-[#020509] rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative group/preview">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 z-10">
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">On-Demand Dispatch Map</span>
        <span className="text-[8px] font-extrabold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Hub Active</span>
      </div>
      <div className="absolute inset-x-0 bottom-6 top-12 opacity-20 flex items-center justify-center pointer-events-none">
        <svg className="w-[80%] h-[80%]" viewBox="0 0 100 50">
          <path d="M 10 10 L 40 35 L 75 15 L 95 30" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" fill="none" />
          <circle cx="10" cy="10" r="3" fill="#ef4444" />
          <circle cx="40" cy="35" r="4" fill="#3b82f6" />
          <circle cx="75" cy="15" r="3.5" fill="#10b981" />
          <circle cx="95" cy="30" r="3" fill="#f59e0b" />
        </svg>
      </div>
      <div className="z-10 bg-[#020205]/80 backdrop-blur-md p-2 rounded-xl border border-white/5 text-[9px] flex items-center justify-between mt-auto">
        <span className="text-slate-400">Drivers: <strong className="text-white">1,402 Online</strong></span>
        <span className="text-emerald-400 font-extrabold">-50% Onboarding Drag</span>
      </div>
    </div>
  );
}

function ArrowheadDigiTechPreview() {
  return (
    <div className="w-full h-44 bg-[#0a0516] rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative group/preview">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 z-10">
        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">LCR Optimization Dashboard</span>
        <span className="text-[8px] font-extrabold bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">Conversion Run</span>
      </div>
      <div className="flex items-end justify-between gap-1.5 h-16 px-4 py-1 z-10">
        <div className="w-6 bg-violet-500/10 h-5 rounded-md transition-all duration-300 group-hover/preview:h-8" />
        <div className="w-6 bg-violet-500/20 h-10 rounded-md transition-all duration-300 group-hover/preview:h-12" />
        <div className="w-6 bg-blue-500/30 h-12 rounded-md transition-all duration-300 group-hover/preview:h-14" />
        <div className="w-6 bg-violet-500/50 h-14 rounded-md transition-all duration-300 group-hover/preview:h-10" />
        <div className="w-6 bg-gradient-to-t from-violet-500 to-blue-500 h-16 rounded-md" />
      </div>
      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/5 pt-2 z-10">
        <span>Conversion: <strong className="text-white">1.2% → 4.8%</strong></span>
        <span className="text-violet-400 font-extrabold">+220% Leads</span>
      </div>
    </div>
  );
}

function CarsCompoundPreview() {
  return (
    <div className="w-full h-44 bg-[#020509] rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative group/preview">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 z-10">
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Fast Inventory catalog</span>
        <span className="text-[8px] font-extrabold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">0.8s Load</span>
      </div>
      <div className="space-y-1.5 py-1 z-10">
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/5">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-md shrink-0" />
          <div className="flex-1 text-[9px] text-slate-200 font-bold truncate">Audi R8 Coupe Quattro</div>
          <div className="text-[9px] text-emerald-400 font-bold shrink-0">$158,000</div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/5">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-md shrink-0" />
          <div className="flex-1 text-[9px] text-slate-200 font-bold truncate">BMW M4 Competition</div>
          <div className="text-[9px] text-emerald-400 font-bold shrink-0">$89,500</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/5 pt-2 z-10">
        <span>Bounce Rate: <strong className="text-white">-65%</strong></span>
        <span className="text-blue-400 font-extrabold">+80% Leads</span>
      </div>
    </div>
  );
}

function GoJetterTravelPreview() {
  return (
    <div className="w-full h-44 bg-[#0a0314] rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative group/preview">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 z-10">
        <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">AI Tour Customizer</span>
        <span className="text-[8px] font-extrabold bg-pink-500/10 border border-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full">LLM Agent Live</span>
      </div>
      <div className="space-y-1.5 py-1 z-10">
        <div className="text-[9px] text-slate-500 italic">"Design a premium Tokyo vacation package"</div>
        <div className="bg-violet-950/20 border border-violet-500/10 p-2 rounded-xl text-[9px] text-violet-200 leading-relaxed">
          🇯🇵 Tokyo/Kyoto: 6 nights, luxury ryokan, bullet train passes, food tour. Est: $3,120.
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/5 pt-2 z-10">
        <span>AI Automated: <strong className="text-white">70%</strong></span>
        <span className="text-pink-400 font-extrabold">+95% Package Sales</span>
      </div>
    </div>
  );
}

function IhawaTravelPreview() {
  return (
    <div className="w-full h-44 bg-[#010609] rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden relative group/preview">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 z-10">
        <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">SEO Organic Positioning</span>
        <span className="text-[8px] font-extrabold bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full">Google Rank</span>
      </div>
      <div className="space-y-2 py-1.5 z-10">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-400">"luxury safari tanzania"</span>
          <span className="text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded">Rank #1</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-400">"maldives private yacht charters"</span>
          <span className="text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded">Rank #2</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] text-slate-400 border-t border-white/5 pt-2 z-10">
        <span>Top 3 Queries: <strong className="text-white">40+ Keywords</strong></span>
        <span className="text-teal-400 font-extrabold">+140% Bookings</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Helper Subcomponents
// ----------------------------------------------------


// Count-up counter utilizing framer motion hook
function Counter({ value, duration = 2.5 }: { value: string; duration?: number }) {
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
    <motion.span ref={ref} className="font-bold tracking-tight">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </motion.span>
  );
}

// ============================================================
// NETWORK PARTICLE BACKGROUND — Canvas-based connected nodes
// ============================================================
function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const { scrollY } = useScroll();
  const scrollRef = useRef(0);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => { scrollRef.current = v; });
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; });

    // Node count — fewer on mobile for perf
    const COUNT = W < 768 ? 45 : 80;
    const CONNECT_DIST = W < 768 ? 100 : 140;
    const MOUSE_DIST = 160;

    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      color: string;
      pulse: number; pulseDir: number;
    };

    const palette = [
      "rgba(96,165,250,",   // electric blue
      "rgba(139,92,246,",   // violet
      "rgba(167,139,250,",  // lavender
      "rgba(59,130,246,",   // blue
      "rgba(14,165,233,",   // sky
    ];

    const nodes: Node[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.5 + Math.random() * 2,
      color: palette[Math.floor(Math.random() * palette.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Parallax scroll offset — background drifts slowly
      const scrollOff = scrollRef.current * 0.04;

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025 * n.pulseDir;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      // Mouse attraction
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ay = a.y + scrollOff;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const by = b.y + scrollOff;
          const dx = a.x - b.x;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(b.x, by);
            const grad = ctx.createLinearGradient(a.x, ay, b.x, by);
            grad.addColorStop(0, a.color + alpha + ")");
            grad.addColorStop(1, b.color + alpha + ")");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Mouse-node connections
        const dxm = a.x - mx;
        const dym = (a.y + scrollOff) - my;
        const mdist = Math.sqrt(dxm * dxm + dym * dym);
        if (mdist < MOUSE_DIST) {
          const alpha = (1 - mdist / MOUSE_DIST) * 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y + scrollOff);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = 0.6 + Math.sin(n.pulse) * 0.4;
        const ny = n.y + scrollOff;

        // Outer glow ring
        const grd = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, n.r * 4);
        grd.addColorStop(0, n.color + (0.6 * pulse) + ")");
        grd.addColorStop(1, n.color + "0)");
        ctx.beginPath();
        ctx.arc(n.x, ny, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, ny, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color + (0.85 * pulse) + ")";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none" style={{ background: "linear-gradient(135deg, #04050f 0%, #060d1f 30%, #080c1e 60%, #04050f 100%)" }}>
      {/* Deep navy gradient blobs — give the background life and depth */}
      <div className="absolute top-[-5%] left-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_65%)] blur-[120px] animate-blob-1" />
      <div className="absolute top-[20%] right-[-15%] h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_65%)] blur-[130px] animate-blob-2" />
      <div className="absolute bottom-[15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.07),transparent_60%)] blur-[110px] animate-blob-3" />
      <div className="absolute bottom-[-5%] right-[-5%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.09),transparent_60%)] blur-[100px] animate-blob-4" />
      {/* Network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.75 }} />
    </div>
  );
}

// Mouse spotlight overlay — separate from fixed background
function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none transition-opacity duration-500"
      style={{
        background: `radial-gradient(700px at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.07), transparent 70%), radial-gradient(350px at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.06), transparent 65%)`
      }}
    />
  );
}

// Legacy stub — kept for backwards compat if referenced
const bgParticles = [
  { x: 12, y: 15, size: 2, duration: 18, delay: 0, depth: -0.05 },
  { x: 35, y: 8, size: 3, duration: 25, delay: 2, depth: 0.1 },
  { x: 55, y: 22, size: 1.5, duration: 15, delay: 1, depth: -0.15 },
  { x: 78, y: 12, size: 2.5, duration: 22, delay: 4, depth: 0.08 },
  { x: 92, y: 28, size: 2, duration: 20, delay: 3, depth: -0.07 },
  { x: 8, y: 45, size: 1.5, duration: 16, delay: 5, depth: 0.12 },
  { x: 28, y: 55, size: 3.5, duration: 28, delay: 1, depth: -0.1 },
  { x: 48, y: 38, size: 2, duration: 19, delay: 2, depth: 0.05 },
  { x: 68, y: 62, size: 2.5, duration: 24, delay: 6, depth: -0.12 },
  { x: 88, y: 48, size: 1.5, duration: 14, delay: 0, depth: 0.09 },
  { x: 15, y: 72, size: 2.5, duration: 21, delay: 3, depth: -0.08 },
  { x: 42, y: 85, size: 2, duration: 23, delay: 7, depth: 0.11 },
  { x: 62, y: 78, size: 3, duration: 26, delay: 1, depth: -0.14 },
  { x: 82, y: 88, size: 1.5, duration: 17, delay: 4, depth: 0.06 },
  { x: 95, y: 68, size: 2, duration: 19, delay: 2, depth: -0.11 },
  { x: 22, y: 92, size: 2.5, duration: 24, delay: 5, depth: 0.07 },
  { x: 74, y: 94, size: 2, duration: 20, delay: 0, depth: -0.05 },
  { x: 50, y: 50, size: 3, duration: 27, delay: 3, depth: 0.13 },
  { x: 10, y: 60, size: 1.5, duration: 15, delay: 1, depth: -0.09 },
  { x: 90, y: 10, size: 2.5, duration: 22, delay: 2, depth: 0.08 }
];

// ============================================================
// HERO VISUAL — Orbital portrait with tech rings & particles
// ============================================================


function HeroVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-300, 300], [10, -10]);
  const rotateY = useTransform(mx, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    animate(mx, 0, { type: "spring", stiffness: 180, damping: 22 });
    animate(my, 0, { type: "spring", stiffness: 180, damping: 22 });
  };

  // Orbital particle positions (angle in degrees for each dot on each ring)
  const ring1Dots = [0, 90, 180, 270];
  const ring2Dots = [45, 135, 225, 315];
  const ring3Dots = [20, 110, 200, 290, 60, 150];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[480px] w-full items-center justify-center overflow-visible cursor-pointer select-none"
      style={{ perspective: 1400 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex items-center justify-center"
      >
        {/* ── DEEP AMBIENT GLOW LAYERS ── */}
        <div className="absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.18),transparent_65%)] blur-[60px] pointer-events-none" />
        <div className="absolute h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_60%)] blur-[50px] pointer-events-none" />
        <div className="absolute h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.2),transparent_55%)] blur-[40px] pointer-events-none" />

        {/* ── RING 1 — outermost slow spin ── */}
        <div className="absolute h-[390px] w-[390px] rounded-full border border-blue-400/10 animate-spin-slow" style={{ transform: "translateZ(-20px)" }} />
        <div className="absolute h-[390px] w-[390px] rounded-full" style={{ transform: "translateZ(-20px)" }}>
          {ring1Dots.map((angle) => (
            <div
              key={angle}
              className="absolute h-[390px] w-[390px] rounded-full animate-spin-slow"
              style={{ animationDuration: "40s" }}
            >
              <div
                className="absolute h-2.5 w-2.5 rounded-full bg-blue-400/60 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translateX(195px) translateY(-50%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* ── RING 2 — mid reverse spin ── */}
        <svg className="absolute h-[300px] w-[300px] animate-spin-reverse" style={{ transform: "translateZ(0px)" }} viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="150" cy="150" r="148" fill="none" stroke="rgba(96,165,250,0.08)" strokeWidth="0.5" />
        </svg>
        <div className="absolute h-[300px] w-[300px] rounded-full" style={{ transform: "translateZ(0px)" }}>
          {ring2Dots.map((angle) => (
            <div
              key={angle}
              className="absolute h-[300px] w-[300px] rounded-full animate-spin-reverse"
            >
              <div
                className="absolute h-3 w-3 rounded-full bg-violet-400/70 shadow-[0_0_10px_rgba(139,92,246,0.9)]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translateX(150px) translateY(-50%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* ── RING 3 — inner fast spin, tilted ellipse ── */}
        <svg className="absolute h-[210px] w-[210px] animate-spin-slow-mid" style={{ transform: "translateZ(15px) rotateX(60deg)" }} viewBox="0 0 210 210">
          <ellipse cx="105" cy="105" rx="103" ry="40" fill="none" stroke="rgba(96,165,250,0.2)" strokeWidth="1" />
        </svg>
        <div className="absolute h-[210px] w-[210px]" style={{ transform: "translateZ(15px) rotateX(60deg)" }}>
          {ring3Dots.slice(0, 3).map((angle) => (
            <div
              key={angle}
              className="absolute h-[210px] w-[210px] rounded-full animate-spin-slow-mid"
            >
              <div
                className="absolute h-2 w-2 rounded-full bg-sky-300/80 shadow-[0_0_8px_rgba(14,165,233,1)]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${angle}deg) translateX(103px) translateY(-50%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* ── RING 4 — tiny inner energy ring ── */}
        <svg className="absolute h-[160px] w-[160px] animate-spin-reverse-fast" style={{ transform: "translateZ(25px)" }} viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="78" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="3 5" />
        </svg>

        {/* ── NETWORK SVG LINES — abstract digital connections ── */}
        <svg className="absolute h-[420px] w-[420px] opacity-20" viewBox="0 0 420 420" fill="none">
          <line x1="210" y1="80" x2="340" y2="160" stroke="rgba(96,165,250,0.6)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="210" y1="80" x2="80" y2="155" stroke="rgba(139,92,246,0.6)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="340" y1="160" x2="360" y2="290" stroke="rgba(59,130,246,0.5)" strokeWidth="0.5" strokeDasharray="3 7" />
          <line x1="80" y1="155" x2="60" y2="285" stroke="rgba(167,139,250,0.5)" strokeWidth="0.5" strokeDasharray="3 7" />
          <line x1="60" y1="285" x2="130" y2="360" stroke="rgba(96,165,250,0.4)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="360" y1="290" x2="290" y2="355" stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" strokeDasharray="4 6" />
          <circle cx="210" cy="80" r="3" fill="rgba(96,165,250,0.5)" />
          <circle cx="340" cy="160" r="2.5" fill="rgba(139,92,246,0.6)" />
          <circle cx="80" cy="155" r="2.5" fill="rgba(167,139,250,0.6)" />
          <circle cx="360" cy="290" r="2" fill="rgba(59,130,246,0.5)" />
          <circle cx="60" cy="285" r="2" fill="rgba(96,165,250,0.5)" />
          <circle cx="130" cy="360" r="2" fill="rgba(139,92,246,0.4)" />
          <circle cx="290" cy="355" r="2" fill="rgba(167,139,250,0.4)" />
        </svg>

        {/* ── FLOATING PARTICLE CLUSTER — scattered micro-dots ── */}
        {[
          { top: "8%", left: "18%", size: 3, color: "rgba(96,165,250,0.7)", delay: 0, duration: 7 },
          { top: "14%", left: "75%", size: 2, color: "rgba(139,92,246,0.8)", delay: 1, duration: 9 },
          { top: "78%", left: "12%", size: 2.5, color: "rgba(167,139,250,0.7)", delay: 2, duration: 6 },
          { top: "82%", left: "80%", size: 3, color: "rgba(59,130,246,0.7)", delay: 0.5, duration: 8 },
          { top: "50%", left: "5%", size: 2, color: "rgba(14,165,233,0.6)", delay: 1.5, duration: 10 },
          { top: "48%", left: "92%", size: 2, color: "rgba(139,92,246,0.6)", delay: 3, duration: 7.5 },
          { top: "28%", left: "88%", size: 1.5, color: "rgba(96,165,250,0.5)", delay: 0.8, duration: 11 },
          { top: "70%", left: "88%", size: 2, color: "rgba(167,139,250,0.6)", delay: 2.2, duration: 8 },
          { top: "35%", left: "8%", size: 1.5, color: "rgba(59,130,246,0.5)", delay: 1.2, duration: 9.5 },
          { top: "60%", left: "50%", size: 1, color: "rgba(96,165,250,0.4)", delay: 4, duration: 13 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top, left: p.left,
              width: p.size, height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            }}
            animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── PORTRAIT FRAME — glowing gradient border ── */}
        <div
          className="relative z-10 flex h-[220px] w-[220px] items-center justify-center rounded-[28px] p-[2px]"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.8), rgba(59,130,246,0.7), rgba(139,92,246,0.8))",
            boxShadow: "0 0 40px rgba(99,102,241,0.3), 0 0 80px rgba(59,130,246,0.15), 0 20px 60px rgba(0,0,0,0.5)",
            transform: "translateZ(30px)",
          }}
        >
          <div className="relative h-full w-full rounded-[26px] overflow-hidden bg-[#04050f]">
            <Image
              src="/usman-portrait.jpg"
              alt="Usman Farooqi"
              fill
              priority
              quality={95}
              sizes="220px"
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Portrait inner glow overlay */}
          <div className="absolute inset-0 rounded-[26px] bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── ENERGY ARC — SVG light trail around portrait ── */}
        <svg className="absolute h-[260px] w-[260px] animate-spin-slow" style={{ transform: "translateZ(20px)", animationDuration: "20s" }} viewBox="0 0 260 260">
          <path
            d="M 130 5 A 125 125 0 0 1 255 130"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(96,165,250,0)" />
              <stop offset="50%" stopColor="rgba(96,165,250,0.8)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="absolute h-[260px] w-[260px] animate-spin-reverse" style={{ transform: "translateZ(20px)", animationDuration: "15s" }} viewBox="0 0 260 260">
          <path
            d="M 130 255 A 125 125 0 0 1 5 130"
            fill="none"
            stroke="url(#arcGrad2)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="arcGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139,92,246,0)" />
              <stop offset="50%" stopColor="rgba(167,139,250,0.6)" />
              <stop offset="100%" stopColor="rgba(96,165,250,0)" />
            </linearGradient>
          </defs>
        </svg>

      </motion.div>
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
  const [formState, setFormState] = useState({ name: "", email: "", projectType: "Web Project", details: "" });

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

  // Testimonials Carousel Auto Rotation Hook (Rotates every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer to track active section in viewport
  useEffect(() => {
    const sections = ["home", "about", "projects", "expertise", "contact"];
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE", // Replace with your Web3Forms access key
          name: formState.name,
          email: formState.email,
          projectType: formState.projectType,
          message: formState.details
        })
      });
    } catch (err) {
      console.error(err);
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: "", email: "", projectType: "Web Project", details: "" });
    }, 4500);
  };

  const renderProjectPreview = (id: string) => {
    switch (id) {
      case "ann": return <AmericaNeedsNursesPreview />;
      case "acr": return <AtlantaCarRentalPreview />;
      case "yr": return <YalaRidePreview />;
      case "adt": return <ArrowheadDigiTechPreview />;
      case "cc": return <CarsCompoundPreview />;
      case "gjt": return <GoJetterTravelPreview />;
      case "it": return <IhawaTravelPreview />;
      default: return <AmericaNeedsNursesPreview />;
    }
  };

  // Sidebar nav config
  const sideNavLinks = [
    { label: "Home", id: "home", icon: HomeIcon },
    { label: "About", id: "about", icon: Users },
    { label: "Projects", id: "projects", icon: FolderOpen },
    { label: "Experience", id: "expertise", icon: Briefcase },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  return (
    <div className="relative isolate min-h-screen bg-[#04050f] text-slate-100 overflow-x-hidden bg-grid-pattern md:pl-20">
      
      {/* Canvas network background + mouse spotlight */}
      <NetworkBackground />
      <MouseSpotlight />

      {/* ============================================================
          FLOATING GLASS SIDEBAR — Desktop Navigation
          ============================================================ */}
      <motion.nav
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1 group/sidebar"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo pill at top */}
        <a
          href="#home"
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] transition-all duration-300"
          title="Usman Farooqi"
        >
          <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#020205] text-[11px] font-black text-white">
            UF
          </div>
        </a>

        {/* Glass sidebar pill — collapses to icons, expands to icons+labels on hover */}
        <div className="flex flex-col gap-1 rounded-2xl border border-white/8 bg-[#06040f]/70 backdrop-blur-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
          {sideNavLinks.map(({ label, id, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`group/link relative flex items-center gap-0 w-10 hover:w-36 overflow-hidden rounded-xl px-2.5 py-2.5 transition-all duration-300 ease-out ${
                activeSection === id
                  ? "bg-gradient-to-r from-violet-500/15 to-blue-500/10 border border-violet-500/20 text-white w-36"
                  : "text-slate-400 hover:text-white border border-transparent hover:border-white/8 hover:bg-white/5"
              }`}
              title={label}
            >
              {activeSection === id && (
                <motion.span
                  layoutId="activeSideLink"
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-violet-500/10 to-blue-500/10"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <Icon className={`h-4 w-4 shrink-0 transition-colors duration-200 ${
                activeSection === id ? "text-violet-400" : "text-slate-400 group-hover/link:text-white"
              }`} />
              <span className="ml-2.5 text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover/link:opacity-100 transition-opacity duration-200">
                {label}
              </span>
              {/* Active dot indicator */}
              {activeSection === id && (
                <span className="ml-auto mr-0.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
              )}
            </a>
          ))}
        </div>

        {/* Contact CTA button at bottom */}
        <a
          href="#contact"
          className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/80 to-blue-600/80 border border-violet-500/30 text-white shadow-lg hover:shadow-violet-600/30 hover:scale-105 transition-all duration-300"
          title="Get in Touch"
        >
          <Mail className="h-4 w-4" />
        </a>
      </motion.nav>

      {/* ============================================================
          MOBILE NAVIGATION — Floating hamburger + slide-out drawer
          ============================================================ */}
      <div className="md:hidden">
        {/* Floating hamburger button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-[0_8px_30px_rgba(139,92,246,0.4)] border border-violet-500/30 text-white"
          aria-label="Toggle Navigation"
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="h-6 w-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col gap-1 items-center justify-center w-5"
              >
                <span className="block h-0.5 w-5 bg-white rounded" />
                <span className="block h-0.5 w-3.5 bg-white rounded" />
                <span className="block h-0.5 w-5 bg-white rounded" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Slide-out drawer overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
              />
              {/* Drawer panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 35 }}
                className="fixed right-0 top-0 bottom-0 z-[58] w-72 bg-[#080614]/95 backdrop-blur-2xl border-l border-white/8 shadow-2xl flex flex-col"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 p-[1px]">
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#020205] text-[10px] font-black text-white">UF</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Usman Farooqi</div>
                      <div className="text-[9px] uppercase tracking-widest text-slate-400">Digital Ops Lead</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                  {sideNavLinks.map(({ label, id, icon: Icon }, idx) => (
                    <motion.a
                      key={id}
                      href={`#${id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07, duration: 0.3 }}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                        activeSection === id
                          ? "bg-gradient-to-r from-violet-500/15 to-blue-500/10 text-white border border-violet-500/20"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${ activeSection === id ? "text-violet-400" : "text-slate-500" }`} />
                      {label}
                      {activeSection === id && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                      )}
                    </motion.a>
                  ))}
                </nav>

                {/* Bottom CTA */}
                <div className="px-4 py-6 border-t border-white/5">
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-950/30"
                  >
                    Book Strategy Call <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <div className="mt-4 text-center text-[10px] text-slate-500">
                    <a href="mailto:usmanfar2002@gmail.com" className="hover:text-slate-300 transition-colors">usmanfar2002@gmail.com</a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>


      {/* ----------------------------------------------------
          Section 1: Hero
          ---------------------------------------------------- */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center pt-16 pb-16 md:pt-0 md:pb-0">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          
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
              <span>PROJECT MANAGER • WEB DEVELOPMENT & DIGITAL OPERATIONS LEAD</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] lg:max-w-[640px]">
              Strategic execution that turns technology into{" "}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent text-glow-purple">
                business growth.
              </span>
            </h1>

            {/* Sub-Headline description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-[560px]">
              Hi, I am <strong className="text-white font-semibold">Usman Farooqi</strong>. I bridge web development with digital and sales operations, leading teams to build high-performance sites (WordPress & custom), automate workflows, and scale client delivery using AI-assisted efficiency.
            </p>

            {/* Target capabilities checklist */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-w-[480px]">
              {[
                "Project Management & Sprints",
                "WordPress CMS Development",
                "AI-assisted Operations",
                "CRM Schema & Pipelines",
                "Team Hiring & Vetting",
                "Client Relationship Success"
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

          {/* Right Portrait Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4 text-violet-500" />
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
                An operations lead focused on the ultimate outcome:{" "}
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Execution & Delivery.
                </span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-base">
                I do not just deliver lines of code. I manage and deliver cohesive digital operations. By blending web project management, team leadership, CRM pipelines, and AI-assisted workflows, I help agencies scale operations and build stable websites that convert interest into revenue.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                Whether coordinating developers to build custom platforms or designing automated workflows to qualify driver intakes for ride companies, my systems have one core mission: to optimize delivery, remove back-office overhead, and align tech to business goals.
              </p>

              {/* Approach Badges */}
              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <div className="rounded-2xl border border-white/5 bg-[#0a0715]/60 p-5 shadow-lg relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-violet-300 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-violet-400" /> Focus Point
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Business KPIs, resource scheduling, custom LLM tool integration, and CRM system mapping.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-[#050b18]/60 p-5 shadow-lg relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-400" /> Growth Philosophy
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Execution alignment. Directing projects from concept to launch with clear goals, team coordination, and client updates.
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
                { label: "AI systems built", count: "45+", color: "from-violet-500/20 to-purple-500/5", border: "hover:border-violet-500/30 shadow-violet-500/[0.02]" },
                { label: "Managed web projects", count: "32+", color: "from-blue-500/20 to-indigo-500/5", border: "hover:border-blue-500/30 shadow-blue-500/[0.02]" },
                { label: "Operations Campaigns", count: "120+", color: "from-pink-500/20 to-rose-500/5", border: "hover:border-pink-500/30 shadow-pink-500/[0.02]" },
                { label: "Satisfied Partners", count: "99%", color: "from-emerald-500/20 to-teal-500/5", border: "hover:border-emerald-500/30 shadow-emerald-500/[0.02]" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br ${stat.color} p-6 shadow-xl text-center backdrop-blur-md transition-all duration-300 ${stat.border}`}
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    <Counter value={stat.count} />
                  </div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
              Strategic operations capability.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We coordinate engineering and media marketing disciplines into a single growth force to power your acquisition.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseAreas.map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-6.5 shadow-lg transition-all duration-300 hover:border-violet-500/25 hover:bg-white/[0.04] hover:-translate-y-1"
                >
                  {/* Glass Top Gradient Effect */}
                  <div className={`absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-slate-300 group-hover:bg-violet-500/10 group-hover:text-violet-400 transition-all duration-300">
                    <IconComp className={`h-6 w-6 ${item.iconColor} transition-transform duration-500 group-hover:rotate-12`} />
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
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6.5 shadow-xl transition-all duration-300 hover:border-blue-500/20 hover:bg-[#060814]/40"
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
          Section 5: Featured Projects Grid (Visual Showcase)
          ---------------------------------------------------- */}
      <section id="projects" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>Coordinated Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Validated digital transformations.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Analyze the functional interfaces and direct commercial results constructed under my coordination.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#0c0a1f]/40 to-transparent p-5 shadow-2xl transition-all duration-300 hover:border-violet-500/20 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* CSS Project dashboard preview */}
                <div className="mb-5 bg-[#020205] rounded-2xl border border-white/5 p-1">
                  {renderProjectPreview(project.id)}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[9px] uppercase tracking-wider font-extrabold text-slate-500 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {project.challenge}
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex-1 text-center bg-white/[0.01] border border-white/5 py-2 rounded-xl">
                        <div className="text-base font-extrabold text-white text-glow-purple">{metric.value}</div>
                        <div className="text-[8px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Detail link callback to update case study section below */}
                  <a
                    href="#case-studies-anchor"
                    onClick={() => setSelectedProject(project)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/20 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all mt-4"
                  >
                    View Operational Case Study <ArrowUpRight className="h-3 w-3 text-violet-400" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          Section 6: Interactive Case Studies Storytelling
          ---------------------------------------------------- */}
      <span id="case-studies-anchor" className="block relative -top-24 pointer-events-none" />
      <section id="projects-case-studies" className="border-t border-white/5 py-20 md:py-28 relative bg-[#04040c]/20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            
            {/* Left Column: Heading and Selector Tabs */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span>Deep Dive Case Studies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Delivery and outcome logs.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Click on the systems below to analyze the challenge diagnostics, custom engineering roadmap, and final impact details.
              </p>

              {/* Selector Tabs */}
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

            {/* Right Column: Dynamic Case Study Detail Timeline */}
            <div className="lg:col-span-7 lg:pl-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0c0a1a] via-[#020205] to-[#04091a] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 h-40 w-40 bg-violet-600/5 blur-3xl pointer-events-none" />

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {selectedProject.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-widest text-violet-400 font-extrabold">
                    {selectedProject.tagline}
                  </p>

                  {/* Connected Vertical Timeline Road */}
                  <div className="relative border-l border-white/10 pl-6 ml-4 space-y-8 mt-10">
                    {/* Node 1 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500/25 border border-rose-500" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <span>01. Project Bottleneck</span>
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-300 mt-2">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    {/* Node 2 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/25 border border-blue-500" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                        <span>02. Management & Dev Coordination</span>
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-300 mt-2">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* Node 3 */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/25 border border-emerald-500" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <span>03. Final Outcome & Metrics</span>
                      </h4>
                      <div className="mt-2 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-2xl border border-emerald-500/20 p-4.5">
                        <p className="text-sm leading-relaxed text-slate-200 font-medium">
                          {selectedProject.impact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom metrics grid */}
                  <div className="grid grid-cols-2 gap-4 mt-10 pt-6 border-t border-white/5">
                    {selectedProject.metrics.map((metric, idx) => (
                      <div key={idx} className="rounded-2xl bg-[#020205]/80 border border-white/5 p-4 text-center">
                        <div className="text-3xl font-black text-white text-glow-purple">
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
                <span>Skills & Tools</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Modern tools mapped to scale.
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                I configure structured task pipelines and templates to ensure quality releases, low latency, and consistent tracking.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/5 border border-white/5 px-4 py-1.5 text-xs text-slate-300">Sprint Planning</span>
                <span className="rounded-full bg-white/5 border border-white/5 px-4 py-1.5 text-xs text-slate-300">WordPress builds</span>
                <span className="rounded-full bg-white/5 border border-white/5 px-4 py-1.5 text-xs text-slate-300">CRM Automation</span>
              </div>
            </div>

            {/* Right Side grouping */}
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
                    <span className="text-[10px] text-slate-500 font-semibold">{group.desc}</span>
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

          <div className="relative max-w-5xl mx-auto">
            {/* Connected horizontal background roadmap connector line */}
            <div className="hidden xl:block absolute top-[44px] left-8 right-8 h-[1px] bg-gradient-to-r from-violet-500/10 via-blue-500/30 to-violet-500/10 z-0" />
            
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6 text-center shadow-lg hover:border-violet-500/20 transition-all"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-xs font-black text-violet-300 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                    {step.step}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-400">
                    {step.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-[10px] text-slate-500 group-hover:text-slate-400">
                        <CheckCircle2 className="h-3.5 w-3.5 text-violet-400/85 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent p-6 text-center shadow-lg hover:border-blue-500/25 hover:bg-[#060814]/30 transition-all duration-300"
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
          Section 11: Why Work With Me (Grid Table)
          ---------------------------------------------------- */}
      <section id="why" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>Comparison</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A partnership focused on delivery.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Why leading startups and growing companies choose coordinated operations over basic visual placeholders.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.01] shadow-2xl">
            <table className="min-w-full divide-y divide-white/5 text-left text-xs">
              <thead className="bg-[#0c0a1a]/40 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-5">Value Anchor</th>
                  <th scope="col" className="px-6 py-5 text-violet-300 bg-violet-500/[0.02]">Usman Farooqi (Operations Lead)</th>
                  <th scope="col" className="px-6 py-5">Traditional Contractor / Freelancer</th>
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
            <div className="glass-panel glass-panel-glow rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-blue-600/5 blur-3xl pointer-events-none" />
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
                  {/* Star Ratings */}
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

            {/* Indicator dots navigation */}
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
          Section 13: Contact CTA Strategy terminal
          ---------------------------------------------------- */}
      <section id="contact" className="border-t border-white/5 py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0c071a] via-[#020205] to-[#04091a] p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-96 w-96 bg-violet-600/[0.03] blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-96 w-96 bg-blue-600/[0.02] blur-3xl pointer-events-none" />

            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Context guidelines */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Growth Strategy Call</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Let's construct your project roadmap.
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Have a web development project, CRM setup, or operations drag you want to clear? Book a consultation. I will audit your parameters and map out delivery paths.
                </p>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email Direct</span>
                      <a href="mailto:usmanfar2002@gmail.com" className="text-sm font-semibold text-white hover:text-violet-400 transition-colors">
                        usmanfar2002@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">Phone / WhatsApp</span>
                      <a href="tel:+923024422053" className="text-sm font-semibold text-white hover:text-violet-400 transition-colors">
                        +92 302 4422053
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
                        Detailed NDA & Clear Delivery Anchors
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form card */}
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
                              className="w-full rounded-xl border border-white/10 bg-[#020205]/60 px-4 py-3.5 text-base sm:text-sm text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
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
                              className="w-full rounded-xl border border-white/10 bg-[#020205]/60 px-4 py-3.5 text-base sm:text-sm text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all"
                            />
                          </div>
                        </div>

                          <CustomSelect
                            label="Growth Goal"
                            value={formState.projectType}
                            onChange={(val) => setFormState({ ...formState, projectType: val })}
                            options={[
                              { value: "Web Project", label: "WordPress / Web Development Project" },
                              { value: "Project Management", label: "Full Project Delivery & Sprint Coordination" },
                              { value: "AI & Automation", label: "AI Integration & Process Automation Flow" },
                              { value: "CRM Build", label: "HubSpot / Salesforce Pipeline Config" },
                              { value: "Team Scale", label: "Team Structuring & Hiring Support" }
                            ]}
                          />

                        <div className="space-y-2">
                          <label htmlFor="form-details" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Project Parameters & Timeline</label>
                          <textarea
                            id="form-details"
                            rows={4}
                            value={formState.details}
                            onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                            placeholder="Tell me about your business model, metrics bottlenecks, and growth schedule..."
                            className="w-full rounded-xl border border-white/10 bg-[#020205]/60 px-4 py-3.5 text-base sm:text-sm text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
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
                          Thank you! I have received your growth request. I will analyze your parameters and reach out within 1 business day with custom calendar bookings.
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
      <footer className="border-t border-white/5 py-16 bg-gradient-to-b from-[#020205] to-[#010103] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-12 sm:grid-cols-3 items-center text-center sm:text-left">
            
            {/* Left: Branding */}
            <div className="space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 p-[1px] shadow-lg shadow-violet-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#020205] text-sm font-black text-white">
                    UF
                  </div>
                </div>
                <div className="text-left">
                  <span className="block font-bold text-slate-200">Usman Farooqi</span>
                  <span className="block text-[10px] uppercase tracking-wider text-violet-400 font-semibold mt-0.5">Project Manager & Web Lead</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto sm:mx-0 leading-relaxed">
                Structuring bespoke digital frameworks across high-growth industries that require robust performance.
              </p>
            </div>

            {/* Center: Contact Info */}
            <div className="flex flex-col items-center justify-center gap-3">
              <a href="mailto:usmanfar2002@gmail.com" className="group flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                <Mail className="h-3.5 w-3.5 text-slate-400 group-hover:text-violet-400 transition-colors" />
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">usmanfar2002@gmail.com</span>
              </a>
              <a href="tel:+923024422053" className="group flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                <Phone className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">+92 302 4422053</span>
              </a>
            </div>

            {/* Right: Links */}
            <div className="flex flex-col items-center sm:items-end justify-center gap-4">
              <div className="flex items-center gap-4">
                <a href="#projects" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Portfolio</a>
                <a href="https://www.linkedin.com/in/usman-farooqi-172b14248/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">LinkedIn</a>
              </div>
              <p className="text-[10px] text-slate-600 font-medium">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
