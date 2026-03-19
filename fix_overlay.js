const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');
let css = fs.readFileSync('style.css', 'utf8');

// Fix 1: Override showStep to add 'modal-active' class on body when step 2 shows
const oldShowStep = `  function showStep(n) {
    quoteSteps.forEach(function (step) {
      if (!step) return;
      step.classList.add("step-hidden");
      step.style.display = "";
      step.style.opacity = "";
    });
    if (quoteSuccessEl) {
      quoteSuccessEl.classList.add("step-hidden");
      quoteSuccessEl.style.display = "";
    }
    setTimeout(function () {
      var step = quoteSteps[n - 1];
      if (step) {
        step.classList.remove("step-hidden");
        step.style.display = "block";
        step.offsetHeight;
        step.style.opacity = "1";
        step.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 350);
  }`;

const newShowStep = `  function showStep(n) {
    quoteSteps.forEach(function (step) {
      if (!step) return;
      step.classList.add("step-hidden");
      step.style.display = "";
      step.style.opacity = "";
    });
    if (quoteSuccessEl) {
      quoteSuccessEl.classList.add("step-hidden");
      quoteSuccessEl.style.display = "";
    }
    // Remove modal-active when going back to step 1
    if (n === 1) { document.body.classList.remove("modal-active"); }
    setTimeout(function () {
      var step = quoteSteps[n - 1];
      if (step) {
        step.classList.remove("step-hidden");
        step.style.display = "block";
        step.offsetHeight;
        step.style.opacity = "1";
        if (n === 1) { step.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
        // Activate modal overlay for step 2
        if (n === 2) { document.body.classList.add("modal-active"); }
      }
    }, 350);
  }`;

if(js.includes(oldShowStep)){
  js = js.replace(oldShowStep, newShowStep);
  console.log('showStep fixed');
} else {
  console.log('showStep not found');
  process.exit(1);
}

fs.writeFileSync('script.js', js, 'utf8');

// Fix 2: CSS - use body.modal-active instead of :not(.step-hidden)
css += `
/* MODAL OVERLAY FIX */
body.modal-active { overflow: hidden; }
body.modal-active .quote-modal-overlay { display: block !important; }
body.modal-active .quote-modal-card { display: block !important; }
.quote-modal-overlay {
  position: fixed !important;
  inset: 0 !important;
  background: rgba(0,0,0,0.82) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  z-index: 998 !important;
}
.quote-modal-card {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 999 !important;
  width: min(700px, 92vw) !important;
  max-height: 88vh !important;
  overflow-y: auto !important;
  background: var(--bg-base) !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 20px !important;
  box-shadow: 0 32px 100px rgba(0,0,0,0.8) !important;
}
`;

fs.writeFileSync('style.css', css, 'utf8');
console.log('CSS overlay fixed');
console.log('ALL DONE');
