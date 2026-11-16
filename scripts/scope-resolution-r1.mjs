// Scope comparison only. Never modifies curriculum, R1/R2, review keys or learner state.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {lessons} from '../src/content.js';
import {referenceGapDecisions as gap} from '../src/reference-gap-decisions.js';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const digest=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const paths={r1:'reference/working-scope-r1.json',r2:'reference/vocabulary-scope-proposal-r2.json',register:'public/lexical-register.json',research:'evaluation/vocabulary-source-gap-research.json',dictionary:'.sources/edrdg-20261109/jmdict-eng.json',irodori:'.sources/irodori-20261112/wordlist_all.json'};
const r1=read(paths.r1),r2=read(paths.r2),register=read(paths.register),research=read(paths.research),dictionary=read(paths.dictionary);
assert.equal(digest(paths.r1),fs.readFileSync('reference/working-scope-r1.sha256','utf8').trim(),'Frozen R1 changed');
assert.equal(digest(paths.r1),r2.baseline.sha256,'R2 points to a different R1');
assert.equal(digest(paths.dictionary),research.sources.find(s=>s.id==='jmdict').sha256,'Frozen dictionary changed');
assert.equal(digest(paths.irodori),research.sources.find(s=>s.id==='jf-wordlist').sha256,'Bounded JF source changed');
const byId=new Map(dictionary.words.map(w=>[w.id,w])),bySurface=new Map();
for(const w of dictionary.words)for(const text of new Set([...w.kanji,...w.kana].map(x=>x.text))){const bucket=bySurface.get(text)||[];bucket.push(w);bySurface.set(text,bucket);}
const coreUses=register.uses.filter(u=>/^mnn-\d{2}$/.test(u.lessonId));
const liveUsages=lessons.filter(l=>l.referenceLesson).flatMap(l=>l.words.map(w=>({id:l.id+':'+w.text,reading:w.reading,meaning:w.meaning})));
assert.equal(coreUses.length,liveUsages.length,'Lexical register is stale relative to live curriculum; regenerate it before resolution');
for(const live of liveUsages){const use=coreUses.find(u=>u.id===live.id);assert(use&&use.reading===live.reading&&use.meaning.vietnamese===live.meaning,'Stale lexical register usage '+live.id);}
const usesFor=(text,reading)=>coreUses.filter(u=>u.writing===text&&(!reading||u.reading===reading));
const senseExists=(id,sense)=>{const w=byId.get(id),i=Number(sense.slice(sense.lastIndexOf('-s')+2));return sense===id+'-s'+i&&Boolean(w?.sense[i]);};
const referenceClass=(stage,text)=>stage==='N4'&&gap.grammar.includes(text)?'grammar-use':stage==='N4'&&gap.glossary.includes(text)?'metalinguistic-glossary':'lexical-item';
const explicitSenseChoices={
 'ことば':{group:'identity-contact',entryId:'1264540',senseIds:['1264540-s1'],meaningVi:'từ, cách diễn đạt',reason:'Select word/term for basic language/contact labels, not every sense of speech or language acquisition.'},
 '違う':{group:'interaction-repair',entryId:'1158880',senseIds:['1158880-s1'],meaningVi:'không đúng như vậy',reason:'Repairing a mistaken interpretation requires incorrect/not so; this does not license every sense of differ.'},
 '勉強':{group:'work-school-basics',entryId:'1512670',senseIds:['1512670-s0'],meaningVi:'việc học',reason:'Study/school functional group needs study, not discount or generalized future experience.'},
 'コピー':{group:'work-school-basics',entryId:'1050590',senseIds:['1050590-s0'],meaningVi:'bản sao/sao chụp',reason:'Work/school object and task refer to copy/photocopy, not an advertising slogan or book blurb.'},
 '案内':{group:'public-procedures',entryId:'1154860',senseIds:['1154860-s1'],meaningVi:'thông tin/thông báo hướng dẫn',reason:'Reading administrative information/notice requires information/notification, distinct from current leading/showing-around usage.'},
 '切る':{group:'cooking-waste',entryId:'1384830',senseIds:['1384830-s0'],meaningVi:'cắt',reason:'Preparation procedure needs physical cutting, not switching off, hanging up or discarding; restrict to food/object context.'},
 '始まる':{group:'work-study-development',entryId:'1307500',senseIds:['1307500-s0'],meaningVi:'bắt đầu (tự động từ)',reason:'A notice or event beginning requires intransitive begin/start, not date/originate from.'},
 '覚える':{group:'work-study-development',entryId:'1206050',senseIds:['1206050-s0'],meaningVi:'ghi nhớ',reason:'Study/task learning needs commit to memory/remember, not feel or regard.'},
 '覚えている':{group:'work-study-development',entryId:'1206050',senseIds:['1206050-s0'],meaningVi:'đang nhớ/nhớ được',reason:'Explicit te-iru form of memory use of 覚える; keep separate grammatical practice but never count it as a new headword.'},
 '最後':{group:'discourse-reading',entryId:'1293810',senseIds:['1293810-s1'],meaningVi:'cuối cùng trong trình tự',reason:'Procedural/discourse ordering needs last/final, not death or the conditional once construction.'},
 'そば':{group:'food-orders',entryId:'1238460',senseIds:['1238460-s1'],meaningVi:'mì soba',reason:'Food ordering group requires the noodle dish, not the plant or spatial 側/傍. The dictionary separately distinguishes all three.'},
 'せき':{group:'medical-communication',entryId:'1204300',senseIds:['1204300-s0'],meaningVi:'ho',reason:'Symptom reporting requires cough, not seat/registry/barrier/counter homophones.'},
 'ソース':{group:'cooking-waste',entryId:'1075270',senseIds:['1075270-s0'],meaningVi:'nước xốt',reason:'Cooking ingredient group requires sauce; do not reuse the separate information/source-code entry.'},
 'ビザ':{group:'public-procedures',entryId:'1104720',senseIds:['1104720-s0'],meaningVi:'thị thực',reason:'Administrative/travel procedure requires visa, not the separate Visa-brand entry.'}
};
const senses=w=>w.sense.map((s,i)=>({id:w.id+'-s'+i,english:s.gloss.filter(g=>g.lang==='eng').map(g=>g.text)}));
function describeUse(u){return {usageId:u.id,lessonId:u.lessonId,writing:u.writing,reading:u.reading,form:u.form,lexemeId:u.lexemeId,selectedSourceSenses:u.meaning?.selectedSourceSenses||[],meaningVi:u.meaning?.vietnamese||'',reviewKey:u.reviewKey,unitKind:u.unitKind};}
function exactCandidates(text,reading){return (bySurface.get(text)||[]).filter(w=>!reading||w.kana.some(k=>k.text===reading&&(w.kanji.some(x=>x.text===text)?k.appliesToKanji.includes('*')||k.appliesToKanji.includes(text):true)));}
function resolve(target){
 const {surface,reading,stage,origin,kind}=target;
 const direct=usesFor(surface,reading),aliasKeys=target.aliasKeys||[];
 // Explicit old matcher/reuse decisions are audited; they never rewrite a target or review key.
 const oldLink=stage==='N4'&&(gap.matcher[surface]||gap.reuse[surface]);
 const linked=oldLink?coreUses.filter(u=>u.lessonId===oldLink[0]&&u.writing===oldLink[1]):[];
 const aliases=aliasKeys.flatMap(key=>usesFor(key));
 let candidates=exactCandidates(target.lookupSurface||surface,reading);
 const choice=target.group&&explicitSenseChoices[surface]?.group===target.group?explicitSenseChoices[surface]:null;
 if(choice){assert(candidates.some(w=>w.id===choice.entryId),surface+' selected entry absent');for(const sid of choice.senseIds)assert(senseExists(choice.entryId,sid),sid+' absent');candidates=candidates.filter(w=>w.id===choice.entryId);}
 // A validated current inflection link may locate the dictionary lemma for an unchanged R1 key.
 if(!candidates.length&&direct.length){const ids=[...new Set(direct.map(u=>u.lexemeId?.replace(/^jmdict:/,'')).filter(id=>byId.has(id)))];candidates=ids.map(id=>byId.get(id));}
 const ids=new Set(candidates.map(w=>w.id));
 const lemmaUses=coreUses.filter(u=>ids.has(u.lexemeId?.replace(/^jmdict:/,'')));
 let selectedUses=direct.length?direct:linked.length?linked:aliases.length?aliases:[];
 let decision,reason;
 if(kind==='grammar-use'||kind==='metalinguistic-glossary'){
  decision='not-a-new-lexeme';reason=kind==='grammar-use'?'Frozen target is a construction/usage, kept in grammar scope rather than inflating vocabulary.':'Frozen target is a metalinguistic explanation term, kept in glossary scope.';selectedUses=[];
 }else if(selectedUses.length){
  decision=direct.length?'reuse':'matcher-error';reason=direct.length?'Exact existing teaching usage is available. Reuse it; presence alone does not close assessment or semantic sufficiency.':'Explicitly reviewed spelling/form/prior-stage mapping locates existing teaching usage; exact-surface absence was not missing content.';
 }else if(choice){
  selectedUses=lemmaUses.filter(u=>(u.meaning?.selectedSourceSenses||[]).some(s=>choice.senseIds.includes(s)));
  if(selectedUses.length){decision='matcher-error';reason='Selected intended sense is already taught under a source-identified spelling/form; keep old keys and reuse the usage.';}
  else if(lemmaUses.length){decision='new-sense';reason='Dictionary headword exists in teaching but not the explicitly selected intended sense. Add a contextual sense-use, not a new headword.';}
  else{decision='missing';reason='Intended source sense is selected for this functional group; no current 50-lesson teaching usage links it.';}
 }else if(lemmaUses.length&&candidates.length===1&&candidates[0].sense.length===1){
  selectedUses=lemmaUses;decision='matcher-error';reason='One source entry and one source sense match an existing source-identified form. This is a spelling/inflection mismatch, not a new headword.';
 }else if(lemmaUses.length){
  decision='sense-review-required';reason='A shared dictionary candidate is not enough: the intended reference sense is not selected. Do not merge homophones/polysemy or call it missing/new-sense automatically.';
 }else if(candidates.length){decision='missing';reason='No current source-identified teaching usage for the candidate(s). Select the intended sense before authoring; candidate presence is not semantic approval.';
 }else{decision='form-review-required';reason='No exact source candidate and no reviewed current-form link. Do not invent a lemma, select the first candidate or inflate canonical counts.';}
 const sourceSenseStatus=choice?'explicit-functional-sense-selection-by-authoring-assistant':kind!=='lexical-item'&&kind!=='fixed-expression'?'not-lexical':selectedUses.length?'existing-usage-sense-only; reference-intent-not-independently-reviewed':'reference-intended-sense-not-selected';
 const placementNeedsEarlierSupport=stage==='N5'&&selectedUses.length>0&&selectedUses.every(u=>u.level!=='N5');
 return {...target,decision,reason,placementNeedsEarlierSupport,placementNote:placementNeedsEarlierSupport?'Existing material appears only in the N4 stage; reuse is a content identity decision, not evidence that N5 already teaches it. Add an earlier explanation/context without moving existing lesson IDs.':null,sourceSenseStatus,intendedSense:choice?{...choice,review:'Source comparison by authoring AI; not independent academic approval'}:null,canonicalCandidateId:candidates.length===1&&kind==='lexical-item'?'jmdict:'+candidates[0].id:null,candidateEntryIds:candidates.map(w=>w.id),candidates:candidates.map(w=>({id:w.id,spellings:w.kanji.map(k=>k.text),readings:w.kana.map(k=>k.text),senses:senses(w)})),existingUsages:[...new Map(selectedUses.map(u=>[u.id,describeUse(u)])).values()],otherCandidateUsages:lemmaUses.filter(u=>!selectedUses.includes(u)).map(describeUse),semanticallyClosed:false,historyPolicy:'Do not rewrite source lists, lesson IDs, state keys, historical sense-less evidence or review schedules.'};
}
const r1targets=[];
for(const [stage,l]of Object.entries(r1.levels)){const map=new Map();for(const group of l.vocabulary||[])for(const surface of group.words){const x=map.get(surface)||{origin:'R1',id:'R1:'+stage+':'+surface,stage,surface,kind:referenceClass(stage,surface),referenceLessons:[],sourceBasis:r1.sources};x.referenceLessons.push(group.referenceLesson);map.set(surface,x);}r1targets.push(...map.values());}
const r2targets=r2.entries.map(e=>({origin:'R2',id:'R2:'+e.proposedStage+':'+e.group+':'+e.key,stage:e.proposedStage,surface:e.key,reading:e.reading,kind:e.kind,group:e.group,referenceLessons:e.minnaFunctionalLinks,sourceCoordinates:e.sourceCoordinates,rationale:e.rationale,aliasKeys:e.status==='resolved-existing-alias'?e.possibleFrozenAliases:[],originalResearchStatus:e.status}));
const unresolvedTargets=research.unmatchedCuratedRequests.map(e=>({origin:'unmatched-bounded-JF-request',id:'JF-request:'+e.group+':'+e.term,stage:null,surface:e.term,...(e.term==='覚えている'?{lookupSurface:'覚える',explicitInflection:'覚える + ている; reviewed memory-use form, not a new lexeme'}:{}),kind:'lexical-item',group:e.group,referenceLessons:[],sourceCoordinateStatus:'No exact-surface match in bounded Irodori; not evidence of missing JMdict. Not added to R1/R2 target counts or assigned a JLPT level.'}));
const rows=[...r1targets,...r2targets,...unresolvedTargets].map(resolve);
const counts=items=>Object.fromEntries([...new Set(items.map(x=>x.decision))].map(k=>[k,items.filter(x=>x.decision===k).length]));
const inventoryByOrigin=Object.fromEntries(['R1','R2','unmatched-bounded-JF-request'].map(o=>[o,{targets:rows.filter(x=>x.origin===o).length,decisions:counts(rows.filter(x=>x.origin===o))}]));
const lexicalRows=rows.filter(x=>x.origin!=='unmatched-bounded-JF-request'&&x.kind==='lexical-item');
const n5=new Set(lexicalRows.filter(x=>x.stage==='N5'&&x.canonicalCandidateId).map(x=>x.canonicalCandidateId));
const n4=new Set(lexicalRows.filter(x=>x.stage==='N4'&&x.canonicalCandidateId).map(x=>x.canonicalCandidateId));
const union=new Set([...n5,...n4]);
const candidateCounts={N5:n5.size,N4InStage:n4.size,N4New:[...n4].filter(id=>!n5.has(id)).length,cumulative:union.size,countUnit:'unambiguous dictionary-entry candidate only, not verified sense/teaching coverage; fixed expressions, grammar, glossary and multi-entry unresolved surfaces excluded',projectMinimum:{N5:800,cumulativeN4:1500},minimumMet:false};
// Focused regressions protect the known dangerous cases and unchanged history contract.
const focused=[];const check=(name,ok)=>{assert(ok,name);focused.push({name,status:'pass'});};
for(const [surface,choice]of Object.entries(explicitSenseChoices)){const x=rows.find(x=>(x.origin==='R2'||x.origin==='unmatched-bounded-JF-request')&&x.surface===surface&&x.group===choice.group);check('selected sense '+surface,x?.intendedSense?.entryId===choice.entryId&&x.candidateEntryIds.length===1&&x.intendedSense.senseIds.every(s=>senseExists(choice.entryId,s)));}
check('のに remains grammar, never auto picks concessive JMdict sense',rows.filter(x=>x.origin==='R1'&&x.stage==='N4'&&x.surface==='のに').every(x=>x.decision==='not-a-new-lexeme'&&!x.canonicalCandidateId));
for(const surface of ['選ぶ','終わる','もういちど','受け付け'])check('reviewed alias reuses actual current usage '+surface,rows.some(x=>x.origin==='R2'&&x.surface===surface&&x.decision==='matcher-error'&&x.existingUsages.length));
check('source-backed existing telephone target is reused, not authored twice',rows.some(x=>x.origin==='R2'&&x.surface==='電話番号'&&x.decision==='reuse'));
check('no semantically certified counts or learner-state changes',rows.every(x=>x.semanticallyClosed===false)&&candidateCounts.minimumMet===false);
check('R1 hash preserved after computation',digest(paths.r1)===r2.baseline.sha256);
const evidence={version:'scope-resolution-r1-2026-11-13',generatedAt:new Date().toISOString(),command:'node scripts/scope-resolution-r1.mjs',G3closed:false,sufficiencyEstablished:false,sourceInputs:Object.entries(paths).map(([role,path])=>({role,path,sha256:digest(path)})),liveCurriculumComparison:{usageCount:liveUsages.length,source:'src/content.js runtime import; each word reading/meaning must match the source register before resolution',status:'pass'},rights:'JMdict derived facts/senses: EDRDG/scriptin CC BY-SA4.0, preserve source attribution/terms in dictionary manifest. JF factual coordinates only for research; no copyrighted lesson/translation/audio reproduced.',independence:research.independence,inventoryByOrigin,candidateCounts,focusedRegressions:focused,scopeDecisions:rows,placementGaps:rows.filter(x=>x.placementNeedsEarlierSupport).map(x=>({id:x.id,surface:x.surface,existingLessons:x.existingUsages.map(u=>u.lessonId)})),remaining:['R1/R2 do not yet establish the required >=800 N5 and >=1500 cumulative appropriate lexical items. Do not replace the target by current inventory.','Most R2 reference-intended senses still require explicit functional selection; multi-entry/polysemous candidates cannot be silently treated as covered.','Single entry identity does not certify every meaning, contextual application, audio, assessment or lesson placement.','Grammar groups and Kanji selection require their own provenance/resolution; this artifact is lexical scope only.','No learner histories, source denominators or application review keys modified.']};
fs.writeFileSync('reference/scope-resolution-r1.json',JSON.stringify(evidence,null,2)+'\n');
fs.writeFileSync('reference/scope-resolution-r1.md',`# Scope resolution R1/R2 — 13/11/2026\n\n**G3 chưa đạt.** Script chạy: \`node scripts/scope-resolution-r1.mjs\`. Không thay mẫu số, R1 hash hoặc dữ liệu học.\n\n## Quyết định\n\n| Nguồn | Số yêu cầu | Phân loại |\n|---|---:|---|\n${Object.entries(inventoryByOrigin).map(([o,v])=>`| ${o} | ${v.targets} | ${Object.entries(v.decisions).map(([k,n])=>k+': '+n).join('; ')} |`).join('\n')}\n\nỨng viên entry đã loại trùng: N5 ${candidateCounts.N5}; N4 trong chặng ${candidateCounts.N4InStage}; N4 mới ${candidateCounts.N4New}; tích lũy ${candidateCounts.cumulative}. **Không phải số từ đã xác nhận đủ chương trình:** chưa chọn đủ nghĩa, loại trừ expression/grammar/glossary và trường hợp nhiều entry. Chưa đạt mục tiêu800/1500.\n\nCác ca đa nghĩa rủi ro đã chọn nghĩa theo nhóm chức năng: そば = mì soba (1238460-s1), せき = ho (1204300-s0), ソース = nước xốt (1075270-s0), ビザ = thị thực (1104720-s0). Ngoài ra đã chọn rõ nghĩa cho ことば, 違う, 勉強, コピー, 案内, 切る, 始まる, 覚える, 最後 và dạng 覚えている. 案内 đọc thông báo là nghĩa mới s1; 案内します dẫn đường đang dạy s0 không thay thế. Đây là đối chiếu của AI biên soạn, không duyệt học thuật độc lập. Các nghĩa/source-code, chỗ ngồi, bên cạnh, Visa nhãn hiệu không tự trộn.\n\nN4 のに giữ trong nhóm ngữ pháp: mục đích bài42 và nhượng bộ bài45 không được tự gom vào nghĩa nhượng bộ của một mục từ điển. Bốn alias đã rà (もういちど/もう一度, 受け付け/受付, 選ぶ/選びます, 終わる/終わります) tái sử dụng usage có thật; không tạo từ mới hoặc sửa lịch ôn.\n\nMỗi dòng JSON có quyết định, lý do, ID nguồn/các nghĩa ứng viên và usage thực tế. \`missing\` nghĩa thiếu usage khớp, không chứng minh mọi candidate là mục cần thêm. \`sense-review-required\` để mở thay vì giả là nghĩa mới hoặc đã có. Cờ placementNeedsEarlierSupport báo riêng khi target N5 mới chỉ có học liệu N4; không giả đã có học liệu đúng chặng. Hai nghĩa trong cùng entry có thể cần hai học liệu nhưng không được đếm hai headword.\n\nNguồn độc lập và giới hạn giữ từ báo cáo nghiên cứu: Minna/3A (phạm vi chức năng), JF Irodori (tọa độ/Can-do), EDRDG JMdict (định danh/nghĩa, không nhãn JLPT). Không sao chép giáo trình/đề/audio. Chỉ tệp mới này được ghi; nguồn và dữ liệu học không thay đổi.\n`);
console.log(JSON.stringify({inventoryByOrigin,candidateCounts,placementGaps:evidence.placementGaps,focusedRegressions:focused.length,G3closed:false}));
