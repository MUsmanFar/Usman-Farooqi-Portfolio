const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const replacements = [
  // Ring dots (angle only, map needs index)
  { from: /ring1Dots\.map\(\(angle\) => \(\s*<div\s*key=\{angle\}/g, to: 'ring1Dots.map((angle, i) => (\n            <div\n              key={`ring1-${angle}-${i}`}' },
  { from: /ring2Dots\.map\(\(angle\) => \(\s*<div\s*key=\{angle\}/g, to: 'ring2Dots.map((angle, i) => (\n            <div\n              key={`ring2-${angle}-${i}`}' },
  { from: /ring3Dots\.slice\(0, 3\)\.map\(\(angle\) => \(\s*<div\s*key=\{angle\}/g, to: 'ring3Dots.slice(0, 3).map((angle, i) => (\n            <div\n              key={`ring3-${angle}-${i}`}' },
  
  // sideNavLinks
  { from: /sideNavLinks\.map\(\(\{ label, id, icon: Icon \}\) => \(\s*<a\s*key=\{id\}/g, to: 'sideNavLinks.map(({ label, id, icon: Icon }, idx) => (\n            <a\n              key={`${id}-${idx}`}' },
  { from: /sideNavLinks\.map\(\(\{ label, id, icon: Icon \}, idx\) => \(\s*<motion\.a\s*key=\{id\}/g, to: 'sideNavLinks.map(({ label, id, icon: Icon }, idx) => (\n                    <motion.a\n                      key={`${id}-${idx}`}' },
  
  // Checklists mapped by item
  { from: /\.map\(\(item\) => \(\s*<div key=\{item\}/g, to: '.map((item, idx) => (\n                <div key={`${item.substring(0,10)}-${idx}`}' },
  
  // Stats
  { from: /\.map\(\(stat, i\) => \(\s*<div\s*key=\{i\}/g, to: '.map((stat, i) => (\n                <div\n                  key={`${stat.label}-${i}`}' },
  
  // expertiseAreas
  { from: /expertiseAreas\.map\(\(item, index\) => \{\s*const IconComp = item\.icon;\s*return \(\s*<motion\.article\s*key=\{item\.title\}/g, to: 'expertiseAreas.map((item, index) => {\n              const IconComp = item.icon;\n              return (\n                <motion.article\n                  key={`${item.title}-${index}`}' },
  
  // services
  { from: /services\.map\(\(service, index\) => \{\s*const ServiceIcon = service\.icon;\s*return \(\s*<motion\.div\s*key=\{service\.title\}/g, to: 'services.map((service, index) => {\n              const ServiceIcon = service.icon;\n              return (\n                <motion.div\n                  key={`${service.title}-${index}`}' },
  
  // project details
  { from: /service\.details\.map\(\(detail, idx\) => \(\s*<li key=\{idx\}/g, to: 'service.details.map((detail, idx) => (\n                      <li key={`${detail.substring(0,10)}-${idx}`}' },
  
  // projectsData
  { from: /projectsData\.map\(\(project, idx\) => \(\s*<motion\.article\s*key=\{project\.id\}/g, to: 'projectsData.map((project, idx) => (\n              <motion.article\n                key={`${project.id}-${idx}`}' },
  { from: /projectsData\.map\(\(project\) => \(\s*<button\s*key=\{project\.id\}/g, to: 'projectsData.map((project, idx) => (\n                  <button\n                    key={`${project.id}-${idx}`}' },
  
  // project tags and metrics
  { from: /project\.tags\.slice\(0, 2\)\.map\(\(tag\) => \(\s*<span key=\{tag\}/g, to: 'project.tags.slice(0, 2).map((tag, idx) => (\n                      <span key={`${tag}-${idx}`}' },
  { from: /project\.metrics\.map\(\(metric, mIdx\) => \(\s*<div key=\{mIdx\}/g, to: 'project.metrics.map((metric, mIdx) => (\n                      <div key={`${metric.label}-${mIdx}`}' },
  { from: /selectedProject\.tags\.map\(\(tag\) => \(\s*<span key=\{tag\}/g, to: 'selectedProject.tags.map((tag, idx) => (\n                      <span key={`${tag}-${idx}`}' },
  { from: /selectedProject\.metrics\.map\(\(metric, idx\) => \(\s*<div key=\{idx\}/g, to: 'selectedProject.metrics.map((metric, idx) => (\n                      <div key={`${metric.label}-${idx}`}' },
  
  // impactMetrics
  { from: /impactMetrics\.map\(\(item, idx\) => \(\s*<motion\.div\s*key=\{item\.label\}/g, to: 'impactMetrics.map((item, idx) => (\n              <motion.div\n                key={`${item.label}-${idx}`}' },
  
  // processSteps
  { from: /processSteps\.map\(\(step, idx\) => \(\s*<motion\.div\s*key=\{step\.step\}/g, to: 'processSteps.map((step, idx) => (\n                <motion.div\n                  key={`${step.title}-${idx}`}' },
  { from: /step\.details\.map\(\(detail, dIdx\) => \(\s*<li key=\{dIdx\}/g, to: 'step.details.map((detail, dIdx) => (\n                      <li key={`${detail.substring(0,10)}-${dIdx}`}' },
  
  // techStack
  { from: /techStack\.map\(\(group, groupIdx\) => \(\s*<motion\.div\s*key=\{group\.category\}/g, to: 'techStack.map((group, groupIdx) => (\n                <motion.div\n                  key={`${group.category}-${groupIdx}`}' },
  { from: /group\.items\.map\(\(tech\) => \(\s*<div\s*key=\{tech\.name\}/g, to: 'group.items.map((tech, idx) => (\n                      <div\n                        key={`${tech.name}-${idx}`}' },
  
  // industries
  { from: /industries\.map\(\(ind, idx\) => \{\s*const IndIcon = ind\.icon;\s*return \(\s*<motion\.div\s*key=\{ind\.title \|\| ind\.name\}/g, to: 'industries.map((ind, idx) => {\n              const IndIcon = ind.icon;\n              return (\n                <motion.div\n                  key={`${ind.name}-${idx}`}' },
  
  // p array at 886
  { from: /\.map\(\(p, i\) => \(\s*<motion\.div\s*key=\{i\}/g, to: '.map((p, i) => (\n          <motion.div\n            key={`p-${i}`}' }
];

let modified = content;
for (const r of replacements) {
  const original = modified;
  modified = modified.replace(r.from, r.to);
  if (original !== modified) {
    console.log(`Replaced: ${r.from}`);
  } else {
    console.log(`Failed to match: ${r.from}`);
  }
}

fs.writeFileSync('app/page.tsx', modified, 'utf8');
console.log('Done!');
