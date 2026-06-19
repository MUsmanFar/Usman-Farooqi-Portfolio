const fs = require('fs');

function refactorFooter() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  const footerMatch = content.match(/(\{\/\*\s*-+\s*Footer\s*-+\s*\*\/\}\s*<footer[\s\S]*?<\/footer>)/);

  if (!footerMatch) {
    throw new Error('Footer not found');
  }

  const newFooter = `{/* ----------------------------------------------------
          Footer
          ---------------------------------------------------- */}
      <footer className="border-t border-white/5 bg-[#020205] pt-20 pb-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-violet-600/10 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
            {/* COLUMN 1 */}
            <div className="flex flex-col items-center md:items-start space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 p-[1px] shadow-lg shadow-violet-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#020205] text-sm font-black text-white">
                    UF
                  </div>
                </div>
                <div className="text-left">
                  <span className="block font-bold text-slate-200">Usman Farooqi</span>
                  <span className="block text-[10px] uppercase tracking-wider text-violet-400 font-semibold mt-0.5">Project Manager & Web Development Lead</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 text-center md:text-left leading-relaxed max-w-sm">
                Helping businesses build websites, manage projects, and launch digital solutions.
              </p>
            </div>

            {/* COLUMN 2 */}
            <div className="flex flex-col items-center md:items-start space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200">Quick Links</h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                {['Home', 'About', 'Experience', 'Projects', 'Services', 'Contact'].map((link, idx) => (
                  <a key={idx} href={'#' + (link === 'Home' ? 'home' : link === 'Experience' ? 'expertise' : link.toLowerCase())} className="text-slate-400 hover:text-violet-400 text-sm font-medium transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* COLUMN 3 */}
            <div className="flex flex-col items-center md:items-start space-y-6 lg:ml-auto w-full md:w-auto">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-200">Contact Details</h4>
              <div className="space-y-4 w-full sm:max-w-[240px]">
                <a href="mailto:usmanfar2002@gmail.com" className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 w-full">
                  <Mail className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-violet-400 transition-colors" />
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors truncate">usmanfar2002@gmail.com</span>
                </a>
              <div className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-4 py-3 w-full">
                <Phone className="h-4 w-4 shrink-0 text-slate-400 transition-colors" />
                <span className="text-sm font-semibold text-slate-300 transition-colors">Available Upon Request</span>
              </div>
                <div className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-4 py-3 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 w-full">
                  <Compass className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Lahore, Pakistan</span>
                </div>
                <a href="https://www.linkedin.com/in/usman-farooqi-172b14248/" target="_blank" rel="noopener noreferrer" className="mt-4 group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/20 px-4 py-3 hover:from-blue-600/40 hover:to-violet-600/40 hover:border-blue-500/40 transition-all duration-300 w-full shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                  <span className="text-sm font-bold text-blue-200 group-hover:text-white transition-colors tracking-wide">Connect on LinkedIn</span>
                  <ArrowRight className="h-4 w-4 text-blue-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 font-medium">© {new Date().getFullYear()} Usman Farooqi. All rights reserved.</p>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              Built with Next.js, Framer Motion & Vercel
            </p>
          </div>
        </div>
      </footer>`;

  content = content.replace(footerMatch[1], newFooter);
  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Footer updated successfully');
}

refactorFooter();
