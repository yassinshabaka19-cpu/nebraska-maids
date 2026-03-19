const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// ── FIX 1: Button colors - change gold to lavender for selected state ──
css = css.replace(
`.quote-type-btn.selected{border-color:var(--gold);background:rgba(200,169,110,0.12)}
.quote-type-btn.selected strong{color:var(--gold)}`,
`.quote-type-btn.selected{border-color:var(--lavender);background:var(--lavender-subtle)}
.quote-type-btn.selected strong{color:var(--lavender)}`
);
css = css.replace(
`.quote-freq-btn.selected{border-color:var(--gold);background:rgba(200,169,110,0.12);color:var(--gold)}`,
`.quote-freq-btn.selected{border-color:var(--lavender);background:var(--lavender-subtle);color:var(--lavender)}`
);
console.log('Button colors fixed');

// ── FIX 2: Force modal to cover full page ──
css += `
/* FORCE FULLSCREEN MODAL */
body.modal-active{overflow:hidden!important}
body.modal-active .quote-modal-overlay{display:block!important;position:fixed!important;inset:0!important;background:rgba(0,0,0,0.85)!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important;z-index:9998!important}
body.modal-active .quote-modal-card{display:block!important;position:fixed!important;top:50%!important;left:50%!important;transform:translate(-50%,-50%)!important;z-index:9999!important;width:min(700px,92vw)!important;max-height:88vh!important;overflow-y:auto!important;background:var(--bg-base)!important;border:1px solid rgba(255,255,255,0.1)!important;border-radius:20px!important;box-shadow:0 32px 100px rgba(0,0,0,0.9)!important}
`;
fs.writeFileSync('style.css', css, 'utf8');
console.log('Modal fullscreen fixed');

// ── FIX 3: Fix addon grid - re-query element inside the click handler ──
const oldTypeHandler = `    widgetCleaningType = btn.getAttribute('data-value');
    // Build addons for selected type
    if(typeof buildAddonGrid === 'function') buildAddonGrid();`;
const newTypeHandler = `    widgetCleaningType = btn.getAttribute('data-value');
    // Re-query addon grid in case DOM updated
    addonGridEl = document.getElementById('quote-addon-grid');
    // Build addons for selected type
    if(typeof buildAddonGrid === 'function') buildAddonGrid();`;

if(js.includes(oldTypeHandler)){
  js = js.replace(oldTypeHandler, newTypeHandler);
  console.log('Addon grid re-query added');
} else {
  console.log('Type handler not found - searching alternate');
  // try without the comment
  js = js.replace(
    `widgetCleaningType = btn.getAttribute('data-value');`,
    `widgetCleaningType = btn.getAttribute('data-value');\n    addonGridEl = document.getElementById('quote-addon-grid');\n    if(typeof buildAddonGrid === 'function') buildAddonGrid();`
  );
  console.log('Fallback addon fix applied');
}

fs.writeFileSync('script.js', js, 'utf8');
console.log('ALL DONE');
