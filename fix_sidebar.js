const fs = require('fs');

function fixSidebar() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  const fixTarget = `      <NetworkBackground />
      <MouseSpotlight />

          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] transition-all duration-300"
          title="Usman Farooqi"
        >`;

  const properCode = `      <NetworkBackground />
      <MouseSpotlight />

      {/* ============================================================
          FLOATING GLASS SIDEBAR - Desktop Navigation
          ============================================================ */}
      <motion.nav
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1 group/sidebar"
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: activeSection === "contact" ? 0 : 1, 
          x: activeSection === "contact" ? -20 : 0 
        }}
        style={{ pointerEvents: activeSection === "contact" ? "none" : "auto" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo pill at top */}
        <a
          href="#home"
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] transition-all duration-300"
          title="Usman Farooqi"
        >`;

  if (content.includes(fixTarget)) {
    content = content.replace(fixTarget, properCode);
    fs.writeFileSync('app/page.tsx', content, 'utf8');
    console.log("Sidebar fixed!");
  } else {
    console.log("Could not find fix target, let's look for a looser match.");
    // looser match
    const backupTarget = `      <MouseSpotlight />\r\n\r\n          className="mb-3`;
    if(content.includes(backupTarget)){
      console.log("Found backup target.");
    }
    
    // just use replace with regex
    content = content.replace(/<MouseSpotlight \/>[\s\S]*?className="mb-3 flex h-10 w-10 items-center justify-center/, `<MouseSpotlight />\n\n      {/* ============================================================\n          FLOATING GLASS SIDEBAR - Desktop Navigation\n          ============================================================ */}\n      <motion.nav\n        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1 group/sidebar"\n        initial={{ opacity: 0, x: -20 }}\n        animate={{ \n          opacity: activeSection === "contact" ? 0 : 1, \n          x: activeSection === "contact" ? -20 : 0 \n        }}\n        style={{ pointerEvents: activeSection === "contact" ? "none" : "auto" }}\n        transition={{ duration: 0.5, ease: "easeOut" }}\n      >\n        {/* Logo pill at top */}\n        <a\n          href="#home"\n          className="mb-3 flex h-10 w-10 items-center justify-center`);
    fs.writeFileSync('app/page.tsx', content, 'utf8');
    console.log("Sidebar fixed via regex!");
  }
}

fixSidebar();
