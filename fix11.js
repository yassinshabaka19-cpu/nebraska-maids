const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

// Move the body click delegation INSIDE the main widget init scope
// Find where exclusions is defined and add a global reference
const old = `  var exclusions = {`;
const rep = `  window._exclusions = exclusions = {`;

if(js.includes(old)){
  js = js.replace(old, rep);
  console.log('DONE');
} else {
  console.log('NOT FOUND');
}

// Also fix the reference in the body handler
js = js.replace(
  `    var excluded = exclusions[widgetCleaningType] || [];`,
  `    var excluded = (window._exclusions || {})[widgetCleaningType] || [];`
);

// Also expose allAddons and widgetAddons globally
js = js.replace(
  `  var allAddons = [`,
  `  window._allAddons = allAddons = [`
);
js = js.replace(
  `    var filtered = allAddons.filter(function(a){ return excluded.indexOf(a.id) === -1; });`,
  `    var filtered = (window._allAddons || allAddons || []).filter(function(a){ return excluded.indexOf(a.id) === -1; });`
);

fs.writeFileSync('script.js', js, 'utf8');
console.log('ALL DONE');
