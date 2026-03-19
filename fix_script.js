const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

// Replace step navigation - skip steps 3 and 4, go straight from step 1 to step 2
// Also add handlers for new type/freq buttons and zip field

const addOn = `
// ── NEW MODAL HANDLERS ──
// Cleaning type buttons
var typeBtns = document.querySelectorAll('.quote-type-btn');
typeBtns.forEach(function(btn){
  btn.addEventListener('click', function(){
    typeBtns.forEach(function(b){ b.classList.remove('selected'); });
    btn.classList.add('selected');
    var typeInput = document.getElementById('quote-type');
    if(typeInput) typeInput.value = btn.getAttribute('data-value');
    // re-render addons based on type
    if(typeof renderAddons === 'function') renderAddons();
  });
});

// Frequency buttons
var freqBtns = document.querySelectorAll('.quote-freq-btn');
freqBtns.forEach(function(btn){
  btn.addEventListener('click', function(){
    freqBtns.forEach(function(b){ b.classList.remove('selected'); });
    btn.classList.add('selected');
    var freqInput = document.getElementById('quote-frequency');
    if(freqInput) freqInput.value = btn.getAttribute('data-value');
  });
});

// Back button on modal
var modalBack = document.getElementById('quote-back-2');
if(modalBack){
  modalBack.addEventListener('click', function(){
    var step2 = document.getElementById('quote-step-2');
    var step1 = document.getElementById('quote-step-1');
    if(step2){ step2.classList.add('step-hidden'); step2.style.display=''; }
    if(step1){ step1.classList.remove('step-hidden'); }
  });
}
`;

js += addOn;
fs.writeFileSync('script.js', js, 'utf8');
console.log('script.js updated');
