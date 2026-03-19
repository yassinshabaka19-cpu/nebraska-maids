const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');
const old = `fd.append("cleaning_type", document.getElementById("quote-type") ? document.getElementById("quote-type").value : "");`;
const rep = `fd.append("cleaning_type", document.getElementById("quote-type") ? document.getElementById("quote-type").value : "");
      fd.append("frequency", document.getElementById("quote-frequency") ? document.getElementById("quote-frequency").value : "");
      fd.append("zip_code", document.getElementById("quote-zip") ? document.getElementById("quote-zip").value : "");`;
if(js.includes(old)){ js=js.replace(old,rep); fs.writeFileSync('script.js',js,'utf8'); console.log('SUCCESS'); }else{ console.log('NOT FOUND'); }
