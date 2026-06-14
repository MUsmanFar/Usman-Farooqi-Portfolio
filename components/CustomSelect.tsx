import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  label: string;
}

export function CustomSelect({ value, onChange, options, label }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || "Select an option";

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-1">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-gradient-to-b from-[#0a0a16]/80 to-[#020205]/90 px-4 py-3.5 text-base sm:text-sm text-slate-200 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 shadow-lg shadow-black/20 transition-all hover:border-violet-500/30 hover:shadow-violet-900/10"
      >
        <span className="break-words whitespace-normal text-left font-medium">{selectedLabel}</span>
        <div className={`flex items-center justify-center h-6 w-6 rounded-md bg-white/5 transition-transform duration-300 ${isOpen ? "rotate-180 bg-violet-500/10 text-violet-400" : "text-slate-400"}`}>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute z-50 w-full mt-2 rounded-2xl border border-white/10 bg-[#060814]/80 backdrop-blur-2xl shadow-2xl overflow-hidden shadow-violet-900/30"
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none" />
            
            <div className="max-h-60 overflow-y-auto p-2 relative z-10 custom-scrollbar">
              {options.map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between text-left px-3 py-3 rounded-xl text-sm transition-all duration-200 mb-1 last:mb-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-violet-500/20 to-blue-500/10 text-violet-200 border border-violet-500/20 shadow-sm shadow-violet-500/5"
                        : "text-slate-300 hover:bg-white/[0.04] hover:text-white border border-transparent"
                    }`}
                  >
                    <span className="break-words whitespace-normal pr-2">{opt.label}</span>
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20"
                      >
                        <Check className="h-3 w-3 text-violet-400" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
