const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');
js = js.replace(
  `          document.body.classList.add("modal-active");
          // Re-query addon grid after card is in DOM
          addonGridEl = document.getElementById('quote-addon-grid');`,
  `          document.body.classList.add("modal-active");
          // Re-query addon grid after card is in DOM
          setTimeout(function(){
            addonGridEl = document.getElementById('quote-addon-grid');
            console.log('addonGridEl after move:', addonGridEl);
          }, 400);`
);
fs.writeFileSync('script.js', js, 'utf8');
console.log('DONE');
