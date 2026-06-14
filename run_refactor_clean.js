const fs = require('fs');

function refactorForm() {
  let content = fs.readFileSync('app/page.tsx', 'utf8');

  // 1. Add isModalOpen State
  const oldState = `  const [submitError, setSubmitError] = useState("");`;
  const newState = `  const [submitError, setSubmitError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);`;
  content = content.replace(oldState, newState);

  // 2. Extract the form panel
  const glassMatch = content.match(/(<div className="glass-panel[\s\S]*?<\/AnimatePresence>\s*<\/div>)/);
  if (!glassMatch) throw new Error("Could not find glass panel");
  
  const formHtml = glassMatch[1];

  // 3. Replace the original form occurrence with conditional wrapper FIRST
  const replacementHtml = `
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
  `;
  content = content.replace(formHtml, replacementHtml);
  
  // 4. Create renderContactForm right before the Home component's return
  const returnMatch = content.match(/(\s*return \(\s*<div className="relative isolate min-h-screen)/);
  if (!returnMatch) throw new Error("Could not find main return");

  const renderFunc = `
  const renderContactForm = () => (
    ${formHtml}
  );\n`;

  content = content.replace(returnMatch[1], renderFunc + returnMatch[1]);

  // 5. Append Modal right inside the main return wrapper
  const mainDivRegex = /(<div className="relative isolate min-h-screen[^>]*>\s*)/;
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
  content = content.replace(mainDivRegex, '$1' + modalHtml);

  fs.writeFileSync('app/page.tsx', content, 'utf8');
  console.log('Form refactored successfully!');
}

refactorForm();
