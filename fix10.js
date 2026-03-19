const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

// Add a one-time init function that runs after modal opens
const old = `          document.body.classList.add("modal-active");`;
const rep = `          document.body.classList.add("modal-active");
          // Pre-populate addon grid with Standard Clean as default after modal opens
          setTimeout(function(){
            var grid = document.getElementById('quote-addon-grid');
            var reveal = document.getElementById('quote-reveal-section');
            console.log('MODAL OPEN - grid:', grid, 'reveal:', reveal);
          }, 500);`;

if(js.includes(old)){
  js = js.replace(old, rep);
  console.log('DONE');
} else {
  console.log('NOT FOUND');
}
fs.writeFileSync('script.js', js, 'utf8');
