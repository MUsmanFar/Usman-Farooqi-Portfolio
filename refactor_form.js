const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const formStartMarker = '{/* Form card */}';
const formEndMarker = '              </div>\n            </div>\n          </div>\n        </div>\n      </section>';

const startIndex = content.indexOf(formStartMarker);
const endIndex = content.indexOf(formEndMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const originalFormCode = content.substring(startIndex, endIndex);
  
  // We extract the actual form panel div to a function before the return
  const panelStartIndex = originalFormCode.indexOf('<div className="glass-panel');
  const panelEndIndex = originalFormCode.lastIndexOf('</div>\n              </div>') + 6; // up to the closing of the glass-panel
  
  const formPanelHtml = originalFormCode.substring(panelStartIndex, panelEndIndex).trim();
  
  const desktopWrapper = `
              {/* Form card */}
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

  content = content.substring(0, startIndex) + desktopWrapper + "\n" + content.substring(endIndex);
  
  const renderFunction = `
  const renderContactForm = () => (
    ${formPanelHtml}
  );

  return (`;
  
  content = content.replace('  return (', renderFunction);
  
  // Add modal right inside the main div return
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
  console.log('Form refactored successfully.');
} else {
  console.log("Could not find form markers. Start: " + startIndex + " End: " + endIndex);
}
