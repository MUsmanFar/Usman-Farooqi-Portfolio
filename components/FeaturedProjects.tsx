"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Image as ImageIcon } from "lucide-react";

const projectsData = [
  {
    id: "arrowhead",
    name: "Arrowhead Digital Marketing",
    industry: "Digital Marketing Agencies",
    url: "https://arrowheaddigitalmarketing.com",
    description: "A comprehensive digital agency website built with WordPress, focusing on high-converting service landing pages and seamless appointment scheduling workflows.",
    image: "/file.svg" // Placeholder
  },
  {
    id: "america-needs-nurses",
    name: "America Needs Nurses",
    industry: "Healthcare & MedTech",
    url: "https://americaneedsnurses.com",
    description: "Healthcare platform facilitating connections between nursing professionals and medical facilities, featuring secure application forms and a clean, accessible UI.",
    image: "/file.svg"
  },
  {
    id: "atlanta-car-rental",
    name: "Atlanta Car Rental",
    industry: "Car Rental Systems",
    url: "https://atlantacarrental.com",
    description: "A robust automotive rental portal integrated with real-time fleet management, booking engines, and secure payment processing.",
    image: "/file.svg"
  },
  {
    id: "go-jetter",
    name: "Go-Jetter Travel & Tours",
    industry: "Travel & Hospitality",
    url: "https://go-jetter.com",
    description: "Travel agency website featuring dynamic itinerary displays, custom booking inquiries, and high-performance visual storytelling.",
    image: "/file.svg"
  },
  {
    id: "ihawa-travel",
    name: "Ihawa Travel",
    industry: "Travel & Hospitality",
    url: "https://ihawatravel.com",
    description: "An elegant portal for a boutique travel firm, equipped with responsive galleries, custom CRM integration, and mobile-optimized search.",
    image: "/file.svg"
  },
  {
    id: "priceless",
    name: "Priceless Car Rental USA",
    industry: "Car Rental Systems",
    url: "https://pricelesscarrental.com",
    description: "A large-scale multi-location car rental franchise website, featuring complex reservation logic, location finders, and dynamic pricing integration.",
    image: "/file.svg"
  }
];

export function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
        {projectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 cursor-pointer shadow-lg"
            onClick={() => setSelectedProject(project)}
          >
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 w-full bg-[#0a0a14] flex items-center justify-center overflow-hidden border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020205] to-transparent opacity-60 z-10" />
              {project.image === "/file.svg" ? (
                <div className="flex flex-col items-center justify-center text-slate-600 gap-2 z-0 group-hover:scale-105 transition-transform duration-500">
                  <ImageIcon className="w-8 h-8 opacity-50" />
                  <span className="text-xs uppercase tracking-widest font-semibold">Screenshot Pending</span>
                </div>
              ) : (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                />
              )}
              
              <div className="absolute top-4 right-4 z-20">
                <span className="px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-[10px] uppercase font-bold text-violet-300 backdrop-blur-md">
                  {project.industry}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              <p className="mt-3 text-sm text-slate-400 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mt-auto pt-6 flex items-center text-xs font-semibold text-violet-400 uppercase tracking-wider group-hover:text-white transition-colors">
                View Details
                <motion.span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#020205]/90 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative w-full max-w-5xl bg-[#0a0a14] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white/10 hover:text-red-400 transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Pane */}
              <div className="w-full md:w-3/5 h-64 md:h-auto min-h-[300px] bg-[#05050a] flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative">
                {selectedProject.image === "/file.svg" ? (
                  <div className="flex flex-col items-center justify-center text-slate-600 gap-3">
                    <ImageIcon className="w-12 h-12 opacity-40" />
                    <span className="text-sm uppercase tracking-widest font-semibold">Screenshot Placeholder</span>
                  </div>
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Content Pane */}
              <div className="w-full md:w-2/5 p-8 sm:p-10 flex flex-col justify-center bg-gradient-to-br from-[#06040f] to-[#020205]">
                <span className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs uppercase font-bold text-blue-400 tracking-wider w-fit">
                  {selectedProject.industry}
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {selectedProject.name}
                </h2>
                
                <p className="mt-6 text-sm text-slate-300 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-200 transition-colors"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
