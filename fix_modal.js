const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let css = fs.readFileSync('style.css', 'utf8');
let js = fs.readFileSync('script.js', 'utf8');

// ── 1. FIX HTML: hide frequency/addons/contact initially ──
const oldBody = `                  <div class="quote-field-full">
                    <label>Cleaning Type* <span class="quote-choose-hint">(Choose one to continue)</span></label>
                    <div class="quote-type-btns" id="quote-type-btns">
                      <button type="button" class="quote-type-btn" data-value="Standard Clean"><strong>Standard Clean</strong><span>Regular maintenance</span></button>
                      <button type="button" class="quote-type-btn" data-value="Deep Clean"><strong>Deep Clean</strong><span>Thorough cleaning</span></button>
                      <button type="button" class="quote-type-btn" data-value="Move Out Clean"><strong>Move Out Clean</strong><span>Complete move-out</span></button>
                    </div>
                    <input type="hidden" id="quote-type" value="">
                  </div>
                  <div class="quote-field-full">
                    <label>How often do you need cleaning?*</label>
                    <div class="quote-freq-btns">
                      <button type="button" class="quote-freq-btn" data-value="One Time">One Time</button>
                      <button type="button" class="quote-freq-btn" data-value="Weekly">Weekly</button>
                      <button type="button" class="quote-freq-btn quote-freq-popular" data-value="Monthly"><span class="freq-popular-badge">MOST POPULAR</span>Monthly</button>
                      <button type="button" class="quote-freq-btn" data-value="Quarterly">Quarterly</button>
                    </div>
                    <input type="hidden" id="quote-frequency" value="">
                  </div>
                  <div class="quote-field-full">
                    <label>Add Extra Services <span class="quote-optional-hint">(Optional)</span></label>
                    <div class="addon-grid" id="quote-addon-grid" role="group" aria-label="Select add-on services"></div>
                  </div>
                  <div class="quote-field-full quote-contact-section">
                    <p class="quote-contact-label">Your Contact Information</p>
                    <div class="quote-contact-grid">
                      <div class="quote-field"><label for="quote-first-name">First Name*</label><input type="text" id="quote-first-name" class="quote-input" placeholder="ex. Jane" autocomplete="given-name"></div>
                      <div class="quote-field"><label for="quote-last-name">Last Name*</label><input type="text" id="quote-last-name" class="quote-input" placeholder="ex. Smith" autocomplete="family-name"></div>
                      <div class="quote-field quote-field-full-row"><label for="quote-email">Email*</label><input type="email" id="quote-email" class="quote-input" placeholder="email@example.com" autocomplete="email"></div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary btn-block quote-btn" id="quote-submit">Get My Free Quote →</button>
                  <p class="quote-privacy" style="text-align:center;margin-top:12px;">Need help? <a href="tel:+17373775656" style="color:var(--gold)">Text (737) 377-5656</a></p>`;

const newBody = `                  <div class="quote-field-full">
                    <label>Cleaning Type* <span class="quote-choose-hint">(Choose one to continue)</span></label>
                    <div class="quote-type-btns" id="quote-type-btns">
                      <button type="button" class="quote-type-btn" data-value="Standard Clean"><strong>Standard Clean</strong><span>Regular maintenance</span></button>
                      <button type="button" class="quote-type-btn" data-value="Deep Clean"><strong>Deep Clean</strong><span>Thorough cleaning</span></button>
                      <button type="button" class="quote-type-btn" data-value="Move Out Clean"><strong>Move Out Clean</strong><span>Complete move-out</span></button>
                    </div>
                    <input type="hidden" id="quote-type" value="">
                  </div>
                  <div class="quote-field-full quote-reveal-section" id="quote-reveal-section" style="display:none">
                    <div class="quote-field-full">
                      <label>How often do you need cleaning?*</label>
                      <div class="quote-freq-btns">
                        <button type="button" class="quote-freq-btn" data-value="One Time">One Time</button>
                        <button type="button" class="quote-freq-btn" data-value="Weekly">Weekly</button>
                        <button type="button" class="quote-freq-btn quote-freq-popular" data-value="Monthly"><span class="freq-popular-badge">MOST POPULAR</span>Monthly</button>
                        <button type="button" class="quote-freq-btn" data-value="Quarterly">Quarterly</button>
                      </div>
                      <input type="hidden" id="quote-frequency" value="">
                    </div>
                    <div class="quote-field-full">
                      <label>Add Extra Services <span class="quote-optional-hint">(Optional)</span></label>
                      <div class="addon-grid" id="quote-addon-grid" role="group" aria-label="Select add-on services"></div>
                    </div>
                    <div class="quote-field-full quote-contact-section">
                      <p class="quote-contact-label">Your Contact Information</p>
                      <div class="quote-contact-grid">
                        <div class="quote-field"><label for="quote-first-name">First Name*</label><input type="text" id="quote-first-name" class="quote-input" placeholder="ex. Jane" autocomplete="given-name"></div>
                        <div class="quote-field"><label for="quote-last-name">Last Name*</label><input type="text" id="quote-last-name" class="quote-input" placeholder="ex. Smith" autocomplete="family-name"></div>
                        <div class="quote-field quote-field-full-row"><label for="quote-email">Email*</label><input type="email" id="quote-email" class="quote-input" placeholder="email@example.com" autocomplete="email"></div>
                      </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-block quote-btn" id="quote-submit">Get My Free Quote →</button>
                    <p class="quote-privacy" style="text-align:center;margin-top:12px;">Need help? <a href="tel:+17373775656" style="color:var(--gold)">Text (737) 377-5656</a></p>
                  </div>`;

if(html.includes(oldBody)){
  html = html.replace(oldBody, newBody);
  console.log('HTML updated');
} else {
  console.log('HTML body not found');
  process.exit(1);
}
fs.writeFileSync('index.html', html, 'utf8');

// ── 2. FIX CSS: background color + input styling ──
const oldModalCSS = `.quote-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;width:min(680px,95vw);max-height:90vh;overflow-y:auto;background:var(--bg-card);border:1px solid var(--moss-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-hover);display:none}`;
const newModalCSS = `.quote-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;width:min(700px,95vw);max-height:90vh;overflow-y:auto;background:var(--bg-base);border:1px solid var(--moss-border);border-radius:var(--radius-lg);box-shadow:0 24px 80px rgba(0,0,0,0.7);display:none}
.quote-modal-header{background:var(--bg-base)!important}`;

if(css.includes(oldModalCSS)){
  css = css.replace(oldModalCSS, newModalCSS);
  console.log('CSS modal bg fixed');
} else {
  console.log('CSS modal not found - appending fix');
  css += `\n.quote-modal-card{background:var(--bg-base)!important}\n.quote-modal-header{background:var(--bg-base)!important}\n`;
}

// Fix input fields looking like dropdowns
css += `
.quote-modal-body .quote-input{appearance:none!important;-webkit-appearance:none!important;background:var(--bg-elevated)!important;border:1.5px solid var(--moss-border)!important;border-radius:var(--radius-sm)!important;color:var(--white)!important;padding:12px 14px!important;width:100%!important;font-size:14px!important}
.quote-modal-body .quote-input:focus{border-color:var(--lavender)!important;outline:none!important}
.quote-reveal-section{animation:revealDown 0.35s ease}
@keyframes revealDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
`;
fs.writeFileSync('style.css', css, 'utf8');
console.log('CSS updated');

// ── 3. FIX JS: trigger reveal + buildAddonGrid on type select ──
const oldTypeHandler = `// Cleaning type buttons
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
});`;

const newTypeHandler = `// Cleaning type buttons
var typeBtns = document.querySelectorAll('.quote-type-btn');
typeBtns.forEach(function(btn){
  btn.addEventListener('click', function(){
    typeBtns.forEach(function(b){ b.classList.remove('selected'); });
    btn.classList.add('selected');
    var typeInput = document.getElementById('quote-type');
    if(typeInput) typeInput.value = btn.getAttribute('data-value');
    widgetCleaningType = btn.getAttribute('data-value');
    // Build addons for selected type
    buildAddonGrid();
    // Reveal frequency/addons/contact section
    var revealSection = document.getElementById('quote-reveal-section');
    if(revealSection){
      revealSection.style.display = 'block';
      setTimeout(function(){ revealSection.scrollIntoView({behavior:'smooth', block:'nearest'}); }, 100);
    }
  });
});`;

if(js.includes(oldTypeHandler)){
  js = js.replace(oldTypeHandler, newTypeHandler);
  console.log('JS type handler updated');
} else {
  console.log('JS type handler not found - appending');
  js += `\n// Fix type btn reveal\ndocument.querySelectorAll('.quote-type-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.quote-type-btn').forEach(function(b){b.classList.remove('selected')});btn.classList.add('selected');var t=document.getElementById('quote-type');if(t)t.value=btn.getAttribute('data-value');widgetCleaningType=btn.getAttribute('data-value');buildAddonGrid();var r=document.getElementById('quote-reveal-section');if(r){r.style.display='block';setTimeout(function(){r.scrollIntoView({behavior:'smooth',block:'nearest'})},100);}});});\n`;
}

fs.writeFileSync('script.js', js, 'utf8');
console.log('JS updated');
console.log('ALL DONE');
