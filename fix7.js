const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');
js = js.replace(
  `    widgetCleaningType = btn.getAttribute('data-value');\n    // Re-query addon grid in case DOM updated\n    addonGridEl = document.getElementById('quote-addon-grid');\n    // Build addons for selected type\n    if(typeof buildAddonGrid === 'function') buildAddonGrid();`,
  `    widgetCleaningType = btn.getAttribute('data-value');\n    // Re-query and build after short delay to ensure card is in DOM\n    setTimeout(function(){\n      addonGridEl = document.getElementById('quote-addon-grid');\n      if(addonGridEl && typeof buildAddonGrid === 'function') buildAddonGrid();\n    }, 50);`
);
fs.writeFileSync('script.js', js, 'utf8');
console.log('DONE - lines changed: ' + (js.includes('setTimeout') ? 'YES' : 'NO'));
