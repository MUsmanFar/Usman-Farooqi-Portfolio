const fs = require('fs');

function refactorFooterV2() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  const footerMatch = content.match(/(\{\/\*\s*-+\s*Footer\s*-+\s*\*\/\}\s*<footer[\s\S]*?<\/footer>)/);

  if (!footerMatch) {
    throw new Error('Footer not found');
  }

  const newFooter = `{/* ----------------------------------------------------
          Footer V2 (Floating)
          ---------------------------------------------------- */}
      <footer className="relative pb-10 pt-20 px-4 sm:px-6 lg:px-8 z-20">
        <div className="mx-auto max-w-[1400px]">
          {/* Floating Glass Card */}
          <div className="relative rounded-[32px] overflow-hidden glass-panel border border-white/10 p-8 sm:p-12 shadow-2xl bg-[#03040b]/80 backdrop-blur-xl">
            
            {/* Animated top glow border */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-70" />
            
            {/* Subtle gradient lighting */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Floating background particles specific to footer */}
            <div className="absolute top-[20%] right-[10%] w-2 h-2 rounded-full bg-violet-400/40 blur-[1px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[30%] left-[40%] w-1.5 h-1.5 rounded-full bg-blue-400/40 blur-[1px] animate-pulse pointer-events-none" style={{ animationDelay: "1s" }} />
            
            <div className="relative z-10 grid gap-12 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              
              {/* SECTION 1: Profile */}
              <div className="flex flex-col items-center md:items-start space-y-6">
                <div className="relative h-20 w-20 rounded-full p-[2px] bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/30">
                  <div className="relative h-full w-full rounded-full overflow-hidden bg-[#020205]">
                    <Image src="/usman-portrait.jpg" alt="Usman Farooqi" fill className="object-cover" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <span className="block text-2xl font-bold text-slate-100">Usman Farooqi</span>
                  <span className="block text-xs uppercase tracking-widest text-violet-400 font-bold mt-2">Web Development Lead</span>
                  <span className="block text-[10px] uppercase tracking-widest text-blue-400 font-semibold mt-1">Project Manager</span>
                </div>
                <p className="text-sm text-slate-400 text-center md:text-left leading-relaxed max-w-sm mt-2">
                  Helping businesses build websites, manage projects, and launch digital solutions.
                </p>
              </div>

              {/* SECTION 2: Navigation */}
              <div className="flex flex-col items-center md:items-start space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200">Navigation</h4>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  {['Home', 'About', 'Experience', 'Skills', 'Services', 'Projects', 'Contact'].map((link, idx) => (
                    <a key={idx} href={'#' + (link === 'Home' ? 'home' : link === 'Experience' ? 'expertise' : link.toLowerCase())} className="group flex items-center gap-2 text-slate-400 hover:text-violet-400 text-sm font-medium transition-colors">
                      <span className="h-1 w-1 rounded-full bg-slate-600 group-hover:bg-violet-400 transition-colors" />
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* SECTION 3: Contact */}
              <div className="flex flex-col items-center md:items-start space-y-6 lg:ml-auto w-full md:w-auto">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200">Contact</h4>
                <div className="space-y-4 w-full sm:max-w-[260px]">
                  <a href="mailto:usmanfar2002@gmail.com" className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 w-full">
                    <Mail className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-violet-400 transition-colors" />
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors truncate">usmanfar2002@gmail.com</span>
                  </a>
                <div className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 w-full">
                  <Phone className="h-4 w-4 shrink-0 text-slate-400 transition-colors" />
                  <span className="text-sm font-semibold text-slate-300 transition-colors">Available Upon Request</span>
                </div>
                  <div className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 w-full">
                    <Compass className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Lahore, Pakistan</span>
                  </div>
                  <a href="https://www.linkedin.com/in/usman-farooqi-172b14248/" target="_blank" rel="noopener noreferrer" className="mt-6 group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/20 px-4 py-3.5 hover:from-blue-600/40 hover:to-violet-600/40 hover:border-blue-500/40 transition-all duration-300 w-full shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                    <span className="text-sm font-bold text-blue-100 group-hover:text-white transition-colors tracking-wide">Connect on LinkedIn</span>
                    <ArrowRight className="h-4.5 w-4.5 text-blue-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>

            </div>

            {/* BOTTOM BAR */}
            <div className="relative z-10 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500 font-medium">© {new Date().getFullYear()} Usman Farooqi. All rights reserved.</p>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                Built with Next.js, Framer Motion & Vercel
              </p>
            </div>
          </div>
        </div>
      </footer>`;

  content = content.replace(footerMatch[1], newFooter);
  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Footer V2 updated successfully');
}

refactorFooterV2();
