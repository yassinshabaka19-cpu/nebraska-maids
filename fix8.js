const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');
const old = `    setTimeout(function(){\n      addonGridEl = document.getElementById('quote-addon-grid');\n      if(addonGridEl && typeof buildAddonGrid === 'function') buildAddonGrid();\n    }, 50);`;
const rep = `    var revealSection = document.getElementById('quote-reveal-section');\n    if(revealSection){ revealSection.style.display='block'; }\n    setTimeout(function(){\n      addonGridEl = document.getElementById('quote-addon-grid');\n      if(addonGridEl){ buildAddonGrid(); }\n      if(revealSection){ revealSection.scrollIntoView({behavior:'smooth',block:'nearest'}); }\n    }, 100);`;
if(js.includes(old)){ js=js.replace(old,rep); console.log('DONE'); }
else{ console.log('NOT FOUND - searching...'); console.log(js.substring(js.indexOf('widgetCleaningType = btn'),js.indexOf('widgetCleaningType = btn')+400)); }
fs.writeFileSync('script.js', js, 'utf8');
