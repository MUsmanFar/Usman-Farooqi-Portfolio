const fs = require('fs');

function replaceCaseStudies() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  // Add the import if not exists
  const importStatement = 'import { FeaturedProjects } from "@/components/FeaturedProjects";';
  if (!content.includes(importStatement)) {
    const importMatch = content.match(/(import \{ Preloader \} from "@\/components\/Preloader";)/);
    if (importMatch) {
      content = content.replace(importMatch[1], importMatch[1] + '\n' + importStatement);
    } else {
      content = importStatement + '\n' + content;
    }
  }

  // Regex replace Section 6 bounds
  const sectionRegex = /(\{\/\*\s*-+\s*Section 6: Interactive Case Studies Storytelling\s*-+\s*\*\/\})[\s\S]*?(?=\{\/\*\s*-+\s*Section 7: Achievements)/;
  
  if (!sectionRegex.test(content)) {
    throw new Error("Could not find boundaries for Section 6 using Regex");
  }

  const newSection6 = `{/* ----------------------------------------------------
          Section 6: Featured Projects
          ---------------------------------------------------- */}
      <span id="projects-anchor" className="block relative -top-24 pointer-events-none" />
      <section id="projects" className="border-t border-white/5 py-20 md:py-32 relative bg-[#020205]">
        
        {/* Background glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-400 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Portfolio Showcase</span>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Projects</span>
            </h2>
            <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              A curated selection of high-performance websites and digital solutions I've deployed across various industries. Click any project to view details.
            </p>
          </div>

          <FeaturedProjects />
        </div>
      </section>

      `;

  content = content.replace(sectionRegex, newSection6);
  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log("Featured projects integrated successfully!");
}

replaceCaseStudies();
