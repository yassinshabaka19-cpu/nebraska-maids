const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

// Find the closing of the main widget function and move body handler inside it
const bodyHandlerStart = `// Use event delegation for type buttons\ndocument.body.addEventListener('click', function(e){`;
const mainFuncClose = `    if(step2){ step2.classList.add('step-hidden'); step2.style.display=''; }\n    if(step1){ step1.classList.remove('step-hidden'); }\n  });\n}`;

if(!js.includes(bodyHandlerStart)){ console.log('handler not found'); process.exit(1); }
if(!js.includes(mainFuncClose)){ console.log('main close not found'); process.exit(1); }

// Extract the body handler block - from its start to });  (line 567 area)
const handlerStartIdx = js.indexOf(bodyHandlerStart);
// Find the closing }); of the body handler
let depth = 0, i = handlerStartIdx, handlerEnd = -1;
while(i < js.length){
  if(js[i] === '{') depth++;
  if(js[i] === '}') depth--;
  if(depth === 0 && js.substring(i, i+3) === '});'){
    handlerEnd = i + 3;
    break;
  }
  i++;
}
if(handlerEnd === -1){ console.log('handler end not found'); process.exit(1); }

const handlerBlock = js.substring(handlerStartIdx, handlerEnd);
// Remove handler from current position
js = js.slice(0, handlerStartIdx) + js.slice(handlerEnd);
// Insert it just before the main function closing
js = js.replace(mainFuncClose, `  ${handlerBlock}\n${mainFuncClose}`);

fs.writeFileSync('script.js', js, 'utf8');
console.log('DONE');
