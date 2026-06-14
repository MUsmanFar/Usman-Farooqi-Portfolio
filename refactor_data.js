const fs = require('fs');

function updateDataArrays() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  // 1. SKILLS
  content = content.replace(/"AI-assisted Operations"/g, '"Website Deployment & Management"');
  content = content.replace(/"CRM Schema & Pipelines"/g, '"Domain, Hosting & Business Email Setup"');
  content = content.replace(/"Team Hiring & Vetting"/g, '"AI-Assisted Website Creation"');

  // 2. ACHIEVEMENTS
  content = content.replace(/"15\+", label: "Websites Delivered"/g, '"20+", label: "WordPress Websites Built"');
  content = content.replace(/"4\+", label: "Industries Served"/g, '"10+", label: "AI Business Websites Created"');
  content = content.replace(/"3\+", label: "Years Experience"/g, '"3+", label: "Years Experience"');
  content = content.replace(/"Multiple", label: "International Clients"/g, '"5+", label: "Industries Served"');

  // 3. EXPERTISE CARDS (SERVICES)
  // Sales & CRM Operations -> Website Deployment & Management
  content = content.replace(
    /title: "Sales & CRM Operations",[\s\S]*?description: "Architecting high-converting pipelines[\s\S]*?",/,
    `title: "Website Deployment & Management",\n    description: "Managing website deployment, hosting configuration, business email setup, migrations, and ongoing website maintenance.",`
  );
  // Team Leadership & Hiring -> Domain, Hosting & Email Management
  content = content.replace(
    /title: "Team Leadership & Hiring",[\s\S]*?description: "Managing cross-functional digital teams[\s\S]*?",/,
    `title: "Domain, Hosting & Email Management",\n    description: "Configuring domains, DNS records, cPanel hosting, business emails, and website infrastructure.",`
  );

  // WordPress Development Checklist
  content = content.replace(
    /features: \["Custom Themes", "WooCommerce", "Custom Blocks", "Theme Modifications"\]/,
    `features: ["Elementor Development", "WooCommerce Setup", "Plugin Configuration", "Responsive Website Design"]`
  );

  // AI-Powered Website Creation Checklist
  content = content.replace(
    /features: \["Rapid Prototyping", "Prompt Engineering", "Vercel Deployment", "Next\.js Turbo"\]/,
    `features: ["Google AI Studio", "Antigravity IDE", "Hostinger Horizons", "AI Website Workflows"]`
  );

  // 4. WE/OUR -> I/MY (Global Replacements on specific sections)
  content = content.replace(/We build/g, 'I build');
  content = content.replace(/We create/g, 'I create');
  content = content.replace(/We manage/g, 'I manage');
  content = content.replace(/Our solutions/gi, 'My solutions');
  content = content.replace(/we build/g, 'I build');
  content = content.replace(/we create/g, 'I create');
  content = content.replace(/we manage/g, 'I manage');
  content = content.replace(/our solutions/gi, 'my solutions');
  
  // Also specific intro text fixes if there are any remaining 'We'
  content = content.replace(/We transform complex requirements/g, 'I transform complex requirements');

  // 5. PROVEN RESULTS (Stats Section)
  content = content.replace(/"Multiple", label: "International Clients"/g, '"Multiple", label: "International Projects"'); // fallback
  content = content.replace(/>Multiple</g, '>5+<');
  content = content.replace(/>International Clients</g, '>International Projects<');

  // Fix Alignment of Stats section (around line 1850)
  // Look for: className="grid gap-6 grid-cols-2 md:grid-cols-4"
  // Make sure it centers properly.
  content = content.replace(
    /className="grid gap-6 grid-cols-2 md:grid-cols-4"/g,
    'className="grid gap-6 grid-cols-2 md:grid-cols-4 w-full"'
  );
  // Look for the individual stat box: className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl
  content = content.replace(
    /className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl/g,
    'className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl w-full h-full text-center'
  );

  // 6. TIMELINE LEFT ALIGNMENT
  // Currently the Experience cards have a description that is center aligned. Let's force text-left.
  // The `<p className="mt-4 text-sm text-slate-400">`
  content = content.replace(
    /<p className="mt-4 text-sm text-slate-400 leading-relaxed">/g,
    '<p className="mt-4 text-sm text-slate-400 leading-relaxed text-left">'
  );
  content = content.replace(
    /<p className="mt-4 text-sm text-slate-400">/g,
    '<p className="mt-4 text-sm text-slate-400 text-left">'
  );
  // Also bullet points inside timeline
  content = content.replace(
    /<ul className="mt-6 space-y-3">/g,
    '<ul className="mt-6 space-y-3 text-left">'
  );
  content = content.replace(
    /<ul className="mt-4 space-y-2">/g,
    '<ul className="mt-4 space-y-2 text-left">'
  );

  // 7. INDUSTRIES SERVED
  // Remove subtext
  content = content.replace(/description: "HIPAA-compliant workflows & lead generation",/g, '');
  content = content.replace(/description: "Custom booking engines & itinerary portals",/g, '');
  content = content.replace(/description: "Fleet management & automated reservations",/g, '');
  content = content.replace(/description: "Digital showrooms & secure payments",/g, '');
  content = content.replace(/description: "High-converting corporate landing pages",/g, '');
  content = content.replace(/description: "Applicant tracking & CRM pipelines",/g, '');
  // Replace Recruitment & Placement -> Digital Marketing Agencies
  content = content.replace(/"Recruitment & Placement"/g, '"Digital Marketing Agencies"');
  // Inside the map loop, the subtext paragraph might be rendered. Let's remove the <p> tag inside the industries loop.
  // The structure is roughly: <p className="mt-2 text-xs text-slate-400">industry.description</p>
  content = content.replace(/<p className="mt-2 text-xs text-slate-400">.*?<\/p>/g, '');

  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Data arrays and alignments updated successfully');
}

updateDataArrays();
