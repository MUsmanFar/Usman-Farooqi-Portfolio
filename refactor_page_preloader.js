const fs = require('fs');

function refactorPage() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  // 1. Import Preloader
  const importMatch = content.match(/(import \{ CustomSelect \} from "@\/components\/CustomSelect";)/);
  if (importMatch) {
    if (!content.includes('import { Preloader }')) {
      content = content.replace(importMatch[1], importMatch[1] + '\nimport { Preloader } from "@/components/Preloader";');
    }
  } else {
    // fallback
    content = 'import { Preloader } from "@/components/Preloader";\n' + content;
  }

  // 2. Add isLoading State to Home
  const homeMatch = content.match(/(export default function Home\(\) \{)/);
  if (!homeMatch) throw new Error("Home function not found");
  
  if (!content.includes('const [isLoading, setIsLoading] = useState(true);')) {
    content = content.replace(homeMatch[1], homeMatch[1] + '\n  const [isLoading, setIsLoading] = useState(true);');
  }

  // 3. Render Preloader
  const returnMatch = content.match(/(return \([\s\S]*?<div className="relative isolate min-h-screen[^>]*>)/);
  if (returnMatch) {
    const preloaderHtml = `
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
`;
    if (!content.includes('<Preloader onComplete')) {
      content = content.replace(returnMatch[1], returnMatch[1] + preloaderHtml);
    }
  } else {
    throw new Error("Could not find main return div");
  }

  // 4. Clean up Footer text
  const footerText = 'Built with Next.js, Framer Motion & Vercel';
  if (content.includes(footerText)) {
    const pTagRegex = /<p[^>]*>\s*Built with Next\.js, Framer Motion & Vercel\s*<\/p>/;
    content = content.replace(pTagRegex, '');
  }

  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Page updated successfully');
}

refactorPage();
