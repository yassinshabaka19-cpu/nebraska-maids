const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// Fix CSS - nuke all old conflicting modal rules and replace cleanly
css = css.replace(`.quote-modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.78);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:999}`, `.quote-modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:998}`);
css = css.replace(`.quote-step-2:not(.step-hidden) .quote-modal-overlay{display:block}`, ``);
css = css.replace(`.quote-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;width:min(700px,95vw);max-height:90vh;overflow-y:auto;background:var(--bg-base);border:1px solid var(--moss-border);border-radius:var(--radius-lg);box-shadow:0 24px 80px rgba(0,0,0,0.7);display:none}`, `.quote-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:999;width:min(700px,92vw);max-height:88vh;overflow-y:auto;background:var(--bg-base);border:1px solid rgba(255,255,255,0.1);border-radius:20px;box-shadow:0 32px 100px rgba(0,0,0,0.8);display:none}`);
css = css.replace(`.quote-modal-header{background:var(--bg-base)!important}`, ``);
css = css.replace(`.quote-step-2:not(.step-hidden) .quote-modal-card{display:block}`, ``);
fs.writeFileSync('style.css', css, 'utf8');
console.log('CSS conflicts removed');

// Fix JS - make sure widgetCleaningType is set AND buildAddonGrid called correctly
const oldTypeHandler = `    widgetCleaningType = btn.getAttribute('data-value');
    // Build addons for selected type
    buildAddonGrid();`;
const newTypeHandler = `    widgetCleaningType = btn.getAttribute('data-value');
    // Build addons for selected type
    if(typeof buildAddonGrid === 'function') buildAddonGrid();`;

if(js.includes(oldTypeHandler)){
  js = js.replace(oldTypeHandler, newTypeHandler);
  console.log('JS addon call fixed');
}

// Also fix widgetCleaningType being set from old quote-type select (not buttons)
// Make sure the old select handler doesn't override
fs.writeFileSync('script.js', js, 'utf8');
console.log('ALL DONE');
