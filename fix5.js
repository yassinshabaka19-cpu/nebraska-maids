const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// ── FIX 1: Remove overlay and card from inside step-2, leave step-2 empty ──
html = html.replace(
`            <div class="widget-step quote-step quote-step-2 step-hidden" id="quote-step-2" data-step="2">
              <div class="quote-modal-overlay" id="quote-modal-overlay"></div>
              <div class="quote-modal-card">`,
`            <div class="widget-step quote-step quote-step-2 step-hidden" id="quote-step-2" data-step="2">
              <div class="quote-modal-card" id="quote-modal-card-placeholder">`
);
fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML fixed');

// ── FIX 2: In JS, on showStep(2), move overlay+card to body ──
const oldShowStep2 = `        if (n === 2) { document.body.classList.add("modal-active"); }`;
const newShowStep2 = `        if (n === 2) {
          // Move modal card to body so it isn't trapped in hero layout
          var overlay = document.getElementById('quote-modal-overlay');
          var card = document.querySelector('.quote-modal-card');
          if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'quote-modal-overlay';
            overlay.className = 'quote-modal-overlay';
            document.body.appendChild(overlay);
            overlay.addEventListener('click', function(){ showStep(1); });
          }
          if (card && card.parentElement !== document.body) {
            document.body.appendChild(card);
          }
          document.body.classList.add("modal-active");
          // Re-query addon grid after card is in DOM
          addonGridEl = document.getElementById('quote-addon-grid');
        }`;

if(js.includes(oldShowStep2)){
  js = js.replace(oldShowStep2, newShowStep2);
  console.log('showStep2 modal move fixed');
} else {
  console.log('showStep2 not found');
  process.exit(1);
}

// ── FIX 3: buildAddonGrid always re-queries ──
js = js.replace(
  `  function buildAddonGrid() {
    addonGridEl = document.getElementById("quote-addon-grid");
    if (!addonGridEl) return;`,
  `  function buildAddonGrid() {
    addonGridEl = document.getElementById("quote-addon-grid");
    if (!addonGridEl) { console.warn("addon grid not found"); return; }`
);

fs.writeFileSync('script.js', js, 'utf8');
console.log('ALL DONE');
