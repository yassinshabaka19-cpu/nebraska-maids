const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let css = fs.readFileSync('style.css', 'utf8');

// Fix step 1 label
html = html.replace('STEP 1 OF 4', 'STEP 1 OF 2');

// Find start and end of old steps 2-4
const start = html.indexOf('<div class="widget-step quote-step quote-step-2 step-hidden"');
const end = html.indexOf('<div class="widget-success quote-success');
if(start === -1 || end === -1){ console.log('ERROR: markers not found', start, end); process.exit(1); }

const newSteps = `<div class="widget-step quote-step quote-step-2 step-hidden" id="quote-step-2" data-step="2">
              <div class="quote-modal-overlay" id="quote-modal-overlay"></div>
              <div class="quote-modal-card">
                <div class="quote-modal-header">
                  <button type="button" class="quote-modal-back" id="quote-back-2">← Back</button>
                  <div class="quote-progress-wrap">
                    <div class="quote-progress-bar"><div class="quote-progress-fill" style="width:100%"></div></div>
                    <p class="widget-step-label quote-label">STEP 2 OF 2</p>
                  </div>
                </div>
                <div class="quote-modal-body">
                  <h3 class="quote-title">Tell us about your home</h3>
                  <p class="quote-subtext">We'll prepare your personalized estimate</p>
                  <div class="quote-grid-2">
                    <div class="quote-field"><label for="quote-bedrooms">Bedrooms*</label><select id="quote-bedrooms" class="quote-select"><option value="">Select</option><option value="Studio">Studio</option><option value="1">1 Bedroom</option><option value="2">2 Bedrooms</option><option value="3">3 Bedrooms</option><option value="4">4 Bedrooms</option><option value="5+">5+ Bedrooms</option></select></div>
                    <div class="quote-field"><label for="quote-bathrooms">Bathrooms*</label><select id="quote-bathrooms" class="quote-select"><option value="">Select</option><option value="1">1 Bathroom</option><option value="1.5">1.5 Bathrooms</option><option value="2">2 Bathrooms</option><option value="2.5">2.5 Bathrooms</option><option value="3">3 Bathrooms</option><option value="4+">4+ Bathrooms</option></select></div>
                    <div class="quote-field"><label for="quote-size">Square Footage*</label><select id="quote-size" class="quote-select"><option value="">Select</option><option value="Under 1,000 sqft">Under 1,000 sqft</option><option value="1,000-2,000 sqft">1,000-2,000 sqft</option><option value="2,000-3,000 sqft">2,000-3,000 sqft</option><option value="3,000+ sqft">3,000+ sqft</option></select></div>
                    <div class="quote-field"><label for="quote-zip">Zip Code*</label><input type="text" id="quote-zip" class="quote-input" placeholder="78701" maxlength="5"></div>
                  </div>
                  <div class="quote-field-full">
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
                  <p class="quote-privacy" style="text-align:center;margin-top:12px;">Need help? <a href="tel:+17373775656" style="color:var(--gold)">Text (737) 377-5656</a></p>
                </div>
              </div>
            </div>
            <div class="widget-step quote-step quote-step-3 step-hidden" id="quote-step-3" data-step="3" style="display:none"></div>
            <div class="widget-step quote-step quote-step-4 step-hidden" id="quote-step-4" data-step="4" style="display:none"></div>
            `;

html = html.slice(0, start) + newSteps + html.slice(end);
fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML done');

const newCSS = `
/* NEW 2-STEP MODAL */
.quote-progress-wrap{text-align:center;margin-bottom:4px}
.quote-progress-bar{width:120px;height:4px;background:rgba(255,255,255,0.12);border-radius:99px;margin:0 auto 6px}
.quote-progress-fill{height:100%;background:var(--gold);border-radius:99px;transition:width 0.4s}
.quote-modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.78);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:999}
.quote-step-2:not(.step-hidden) .quote-modal-overlay{display:block}
.quote-modal-card{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1000;width:min(680px,95vw);max-height:90vh;overflow-y:auto;background:var(--bg-card);border:1px solid var(--moss-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-hover);display:none}
.quote-step-2:not(.step-hidden) .quote-modal-card{display:block}
.quote-modal-card::-webkit-scrollbar{width:4px}
.quote-modal-card::-webkit-scrollbar-thumb{background:var(--moss-border);border-radius:99px}
.quote-modal-header{position:sticky;top:0;background:var(--bg-card);border-bottom:1px solid var(--moss-border);padding:16px 24px 12px;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:10}
.quote-modal-back{align-self:flex-start;background:none;border:none;color:var(--text-muted);font-size:14px;cursor:pointer;padding:0}
.quote-modal-back:hover{color:var(--white)}
.quote-modal-body{padding:24px 28px 32px}
.quote-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
.quote-field label{display:block;font-size:13px;font-weight:600;color:var(--white);margin-bottom:6px}
.quote-field-full{margin-bottom:20px}
.quote-field-full>label{display:block;font-size:13px;font-weight:600;color:var(--white);margin-bottom:10px}
.quote-choose-hint,.quote-optional-hint{font-weight:400;color:var(--gold);font-size:12px;margin-left:6px}
.quote-type-btns{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.quote-type-btn{background:var(--bg-elevated);border:1.5px solid var(--moss-border);border-radius:var(--radius-md);padding:14px 10px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s;color:var(--white)}
.quote-type-btn strong{font-size:13px;font-weight:700}
.quote-type-btn span{font-size:11px;color:var(--text-muted)}
.quote-type-btn:hover{border-color:var(--lavender);background:var(--lavender-subtle)}
.quote-type-btn.selected{border-color:var(--gold);background:rgba(200,169,110,0.12)}
.quote-type-btn.selected strong{color:var(--gold)}
.quote-freq-btns{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.quote-freq-btn{background:var(--bg-elevated);border:1.5px solid var(--moss-border);border-radius:var(--radius-md);padding:12px 8px;cursor:pointer;font-size:13px;font-weight:600;color:var(--white);display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s}
.quote-freq-btn:hover{border-color:var(--lavender);background:var(--lavender-subtle)}
.quote-freq-btn.selected{border-color:var(--gold);background:rgba(200,169,110,0.12);color:var(--gold)}
.freq-popular-badge{font-size:9px;font-weight:700;background:var(--gold);color:#111;border-radius:99px;padding:2px 7px;letter-spacing:0.05em}
.quote-contact-section{border-top:1px solid var(--moss-border);padding-top:20px;margin-top:8px}
.quote-contact-label{font-size:15px!important;font-weight:700!important;color:var(--white)!important;margin-bottom:14px!important;display:block}
.quote-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px}
.quote-field-full-row{grid-column:1/-1}
@media(max-width:600px){
  .quote-modal-body{padding:20px 16px 28px}
  .quote-grid-2{grid-template-columns:1fr 1fr;gap:10px}
  .quote-type-btns{grid-template-columns:repeat(3,1fr);gap:6px}
  .quote-type-btn{padding:10px 4px}
  .quote-type-btn strong{font-size:11px}
  .quote-freq-btns{grid-template-columns:repeat(2,1fr)}
  .quote-contact-grid{grid-template-columns:1fr}
  .quote-field-full-row{grid-column:1}
  .quote-modal-card{width:96vw;max-height:95vh;border-radius:var(--radius-md)}
}
`;
css += newCSS;
fs.writeFileSync('style.css', css, 'utf8');
console.log('CSS done');
console.log('ALL DONE');
