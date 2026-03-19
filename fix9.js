const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

// Remove the whole duplicate type button handler block and replace with one clean version
const old = `// ── NEW MODAL HANDLERS ──
// Cleaning type buttons
var typeBtns = document.querySelectorAll('.quote-type-btn');
typeBtns.forEach(function(btn){
  btn.addEventListener('click', function(){
    typeBtns.forEach(function(b){ b.classList.remove('selected'); });
    btn.classList.add('selected');
    var typeInput = document.getElementById('quote-type');
    if(typeInput) typeInput.value = btn.getAttribute('data-value');
    widgetCleaningType = btn.getAttribute('data-value');
    // Re-query and build after short delay to ensure card is in DOM
    var revealSection = document.getElementById('quote-reveal-section');
    if(revealSection){ revealSection.style.display='block'; }
    setTimeout(function(){
      addonGridEl = document.getElementById('quote-addon-grid');
      if(addonGridEl){ buildAddonGrid(); }
      if(revealSection){ revealSection.scrollIntoView({behavior:'smooth',block:'nearest'}); }
    }, 100);
    // Reveal frequency/addons/contact section
    var revealSection = document.getElementById('quote-reveal-section');
    if(revealSection){
      revealSection.style.display = 'block';
      setTimeout(function(){ revealSection.scrollIntoView({behavior:'smooth', block:'nearest'}); }, 100);
    }
  });
});`;

const rep = `// ── NEW MODAL HANDLERS ──
// Use event delegation on body for type buttons (added after modal moves to body)
document.body.addEventListener('click', function(e){
  var btn = e.target.closest('.quote-type-btn');
  if(!btn) return;
  document.querySelectorAll('.quote-type-btn').forEach(function(b){ b.classList.remove('selected'); });
  btn.classList.add('selected');
  var typeInput = document.getElementById('quote-type');
  if(typeInput) typeInput.value = btn.getAttribute('data-value');
  widgetCleaningType = btn.getAttribute('data-value');
  var revealSection = document.getElementById('quote-reveal-section');
  if(revealSection){ revealSection.style.display='block'; }
  addonGridEl = document.getElementById('quote-addon-grid');
  if(addonGridEl){ buildAddonGrid(); }
  setTimeout(function(){
    var rs = document.getElementById('quote-reveal-section');
    if(rs) rs.scrollIntoView({behavior:'smooth',block:'nearest'});
  }, 150);
});`;

if(js.includes(old)){
  js = js.replace(old, rep);
  console.log('DONE');
} else {
  console.log('NOT FOUND');
}
fs.writeFileSync('script.js', js, 'utf8');
