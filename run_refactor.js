const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Add state
const stateBlock = `  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");`;
  
const newStateBlock = `  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);`;

content = content.replace(stateBlock, newStateBlock);

// 2. Wrap the form
const formStart = '<div className="lg:col-span-7">';
const sIdx = content.indexOf(formStart);
if (sIdx === -1) throw new Error('not found formStart');

// Find the end of this div manually
let openDivs = 0;
let ptr = sIdx;
while (ptr < content.length) {
  if (content.substring(ptr, ptr + 4) === '<div') openDivs++;
  else if (content.substring(ptr, ptr + 5) === '</div') {
    openDivs--;
    if (openDivs === 0) {
      ptr += 6; // Include closing tag
      break;
    }
  }
  ptr++;
}

const originalColSpan = content.substring(sIdx, ptr);

const panelStart = originalColSpan.indexOf('<div className="glass-panel');
const panelEnd = originalColSpan.lastIndexOf('</div>', originalColSpan.lastIndexOf('</div>') - 1) + 6;
const formPanelHtml = originalColSpan.substring(panelStart, panelEnd).trim();

const desktopWrapper = `
              <div className="lg:col-span-7">
                {/* Desktop view */}
                <div className="hidden lg:block">
                  {renderContactForm()}
                </div>
                {/* Mobile view */}
                <div className="block lg:hidden mt-8 sm:mt-10">
                  <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 py-4.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transform transition-all duration-300">
                    Book Strategy Session <ArrowRight className="h-4.5 w-4.5 shrink-0" />
                  </button>
                </div>
              </div>`;

content = content.substring(0, sIdx) + desktopWrapper + content.substring(ptr);

const renderFunction = `
  const renderContactForm = () => (
    ${formPanelHtml}
  );

  return (`;

content = content.replace('  return (', renderFunction);

const returnStart = content.indexOf('<div className="relative isolate min-h-screen');
const endOfMainDivTag = content.indexOf('>', returnStart) + 1;

const modalHtml = `
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#020205]/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg relative max-h-[95vh] overflow-y-auto custom-scrollbar rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-50 text-slate-400 hover:text-white transition-colors p-2 bg-[#0a0a16]/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg"
              >
                <X className="h-5 w-5" />
              </button>
              {renderContactForm()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
`;

content = content.substring(0, endOfMainDivTag) + modalHtml + content.substring(endOfMainDivTag);

fs.writeFileSync('app/page.tsx', content, 'utf8');
console.log('Done!');
