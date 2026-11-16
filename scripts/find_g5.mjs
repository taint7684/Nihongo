import fs from 'node:fs';
const src=fs.readFileSync('scripts/done-gates.mjs','utf8');
const lines=src.split('\n');
let inG5=false;
for(let i=0;i<lines.length;i++){
  if(lines[i].includes("gate('G5'")){inG5=true;}
  if(inG5){
    console.log('Line '+(i+1)+': '+lines[i].trim().substring(0,250));
  }
}