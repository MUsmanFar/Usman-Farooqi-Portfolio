const fs = require('fs');

function refactorBackground() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  // 1. NetworkBackground updates
  let bgMatch = content.match(/(function NetworkBackground\(\) \{[\s\S]*?\n\})/);
  if (!bgMatch) throw new Error('NetworkBackground not found');
  let bgCode = bgMatch[1];

  // Remove useScroll hook usage
  bgCode = bgCode.replace(/  const \{ scrollY \} = useScroll\(\);\n  const scrollRef = useRef\(0\);\n\n  useEffect\(\(\) => \{\n    const unsub = scrollY\.on\("change", \(v\) => \{ scrollRef\.current = v; \}\);\n    return unsub;\n  \}, \[scrollY\]\);\n/, '');

  // Update COUNT
  bgCode = bgCode.replace('const COUNT = W < 768 ? 45 : 80;', 'const COUNT = W < 768 ? 60 : 120;');

  // Remove scrollOff from draw loop
  bgCode = bgCode.replace(/      \/\/ Parallax scroll offset — background drifts slowly\n      const scrollOff = scrollRef\.current \* 0\.04;\n/, '');
  // Also replace if the comment has hyphen instead of em-dash
  bgCode = bgCode.replace(/      \/\/ Parallax scroll offset - background drifts slowly\n      const scrollOff = scrollRef\.current \* 0\.04;\n/, '');
  bgCode = bgCode.replace(/ \+ scrollOff/g, '');

  // Enhance Fog opacity
  bgCode = bgCode.replace('rgba(99,102,241,0.12)', 'rgba(99,102,241,0.18)');
  bgCode = bgCode.replace('rgba(59,130,246,0.1)', 'rgba(59,130,246,0.16)');
  bgCode = bgCode.replace('rgba(14,165,233,0.07)', 'rgba(14,165,233,0.12)');
  bgCode = bgCode.replace('rgba(139,92,246,0.09)', 'rgba(139,92,246,0.14)');

  content = content.replace(bgMatch[1], bgCode);
  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Background updated successfully');
}

refactorBackground();
