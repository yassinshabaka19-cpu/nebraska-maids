const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// ── FIX 1: buildAddonGrid - always re-query element ──
js = js.replace(
  `  function buildAddonGrid() {
    if (!addonGridEl) return;`,
  `  function buildAddonGrid() {
    addonGridEl = document.getElementById("quote-addon-grid");
    if (!addonGridEl) return;`
);
console.log('buildAddonGrid fixed');

// ── FIX 2: Gold color on most popular badge and freq buttons ──
css = css.replace(`.freq-popular-badge{font-size:9px;font-weight:700;background:var(--gold);color:#111;border-radius:99px;padding:2px 7px;letter-spacing:0.05em}`,
`.freq-popular-badge{font-size:9px;font-weight:700;background:var(--lavender);color:#111;border-radius:99px;padding:2px 7px;letter-spacing:0.05em}`);

// ── FIX 3: Complete modal CSS rewrite to match San Jose Maids style ──
css += `
/* ── MODAL FINAL FIX ── */
body.modal-active { overflow: hidden !important; }
body.modal-active .quote-modal-overlay {
  display: block !important;
  position: fixed !important;
  inset: 0 !important;
  background: rgba(0,0,0,0.72) !important;
  backdrop-filter: blur(5px) !important;
  -webkit-backdrop-filter: blur(5px) !important;
  z-index: 9990 !important;
}
body.modal-active .quote-modal-card {
  display: flex !important;
  flex-direction: column !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  z-index: 9999 !important;
  width: min(620px, 90vw) !important;
  max-height: 85vh !important;
  overflow-y: auto !important;
  background: rgba(30,40,30,0.97) !important;
  border: 1px solid rgba(255,255,255,0.12) !important;
  border-radius: 18px !important;
  box-shadow: 0 24px 80px rgba(0,0,0,0.8) !important;
}
/* Make the step-2 div itself invisible/non-blocking */
#quote-step-2 {
  position: static !important;
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
}
@media(max-width:600px){
  body.modal-active .quote-modal-card {
    width: 94vw !important;
    max-height: 92vh !important;
    top: 50% !important;
  }
}
`;

fs.writeFileSync('style.css', css, 'utf8');
fs.writeFileSync('script.js', js, 'utf8');
console.log('ALL DONE');
