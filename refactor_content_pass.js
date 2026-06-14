const fs = require('fs');

function runFixPass() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  // 1. SECTION BACKGROUND WIDTH FIX
  // Remove md:pl-20 from the main wrapper
  content = content.replace(
    /className="relative isolate min-h-screen bg-\[#04050f\] text-slate-100 overflow-x-hidden \s*bg-grid-pattern md:pl-20"/g,
    'className="relative isolate min-h-screen bg-[#04050f] text-slate-100 overflow-x-hidden bg-grid-pattern"'
  );
  content = content.replace(
    /className="relative isolate min-h-screen bg-\[#04050f\] text-slate-100 overflow-x-hidden bg-grid-pattern md:pl-20"/g,
    'className="relative isolate min-h-screen bg-[#04050f] text-slate-100 overflow-x-hidden bg-grid-pattern"'
  );

  // 2. WORDING CHANGE
  content = content.replace(/WordPress & Web Development/g, 'WordPress Website Creation');

  // 3. ABOUT SECTION CONTENT FIX
  // Remove content inside FOCUS POINT and GROWTH PHILOSOPHY
  // Search for FOCUS POINT
  content = content.replace(
    /FOCUS POINT<\/h4>\s*<p className="text-sm text-slate-400 leading-relaxed">[\s\S]*?<\/p>/g,
    'FOCUS POINT</h4>'
  );
  // Search for GROWTH PHILOSOPHY
  content = content.replace(
    /GROWTH PHILOSOPHY<\/h4>\s*<p className="text-sm text-slate-400 leading-relaxed">[\s\S]*?<\/p>/g,
    'GROWTH PHILOSOPHY</h4>'
  );

  // 4. ABOUT SECTION STAT CARDS
  // Look for the stats in the about section.
  content = content.replace(
    /<div className="text-3xl font-black text-white">4\+<\/div>\s*<div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Years Exp<\/div>/g,
    '<div className="text-3xl font-black text-white">3+</div>\n                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Years Experience</div>'
  );
  content = content.replace(
    /<div className="text-3xl font-black text-white">30\+<\/div>\s*<div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Projects Delivered<\/div>/g,
    '<div className="text-3xl font-black text-white">20+</div>\n                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">WordPress Websites Built</div>'
  );
  content = content.replace(
    /<div className="text-3xl font-black text-white">100%<\/div>\s*<div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Client Success<\/div>/g,
    '<div className="text-3xl font-black text-white">10+</div>\n                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Business Websites Created</div>'
  );
  content = content.replace(
    /<div className="text-3xl font-black text-white">24\/7<\/div>\s*<div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Support<\/div>/g,
    '<div className="text-3xl font-black text-white">5+</div>\n                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Industries Served</div>'
  );

  // 5. CORE EXPERTISE CARD FIXES
  // (In case my previous regex didn't catch them or they are elsewhere)
  content = content.replace(/Sales & CRM Operations/g, 'Website Deployment & Management');
  content = content.replace(/Architecting high-converting pipelines and managing B2B\/B2C sales operations for optimal growth\./g, 'Managing website deployment, hosting configuration, business email setup, migrations, and ongoing website maintenance.');
  
  content = content.replace(/Team Leadership & Hiring/g, 'Domain, Hosting & Email Management');
  content = content.replace(/Managing cross-functional digital teams and vetting technical talent for high-performance delivery\./g, 'Configuring domains, DNS records, cPanel hosting, business emails, and website infrastructure.');

  // 6. GLOBAL PERSONAL BRANDING FIX
  content = content.replace(/\bWe build\b/g, 'I build');
  content = content.replace(/\bWe create\b/g, 'I create');
  content = content.replace(/\bWe manage\b/g, 'I manage');
  content = content.replace(/\bWe deliver\b/g, 'I deliver');
  content = content.replace(/\bwe build\b/g, 'I build');
  content = content.replace(/\bwe create\b/g, 'I create');
  content = content.replace(/\bwe manage\b/g, 'I manage');
  content = content.replace(/\bwe deliver\b/g, 'I deliver');
  content = content.replace(/\bOur solutions\b/g, 'My solutions');
  content = content.replace(/\bOur process\b/g, 'My process');
  content = content.replace(/\bOur team\b/g, 'I');
  content = content.replace(/\bour solutions\b/g, 'my solutions');
  content = content.replace(/\bour process\b/g, 'my process');
  content = content.replace(/\bour team\b/g, 'me');

  // 7. CONTENT ACCURACY REVIEW
  // Remove exaggerated titles
  content = content.replace(/Full Stack Developer/g, 'Project Manager');
  content = content.replace(/AI Solutions Specialist/g, 'AI-assisted Website Creation');
  content = content.replace(/Digital Growth Strategist/g, 'Web Development Lead');
  content = content.replace(/CRM Architect/g, 'Website Deployment & Operations');

  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Fix pass completed successfully!');
}

runFixPass();
