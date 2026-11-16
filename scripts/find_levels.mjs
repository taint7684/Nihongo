import fs from 'node:fs';
const src=fs.readFileSync('scripts/done-gates.mjs','utf8');
const lines=src.split('\n');
let start=null;
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('const levels=')){start=i;break;}
}
if(start!==null){
  for(let i=start;i<Math.min(start+100,lines.length);i++){
    console.log('Line '+(i+1)+': '+lines[i].trim().substring(0,250));
  }
}