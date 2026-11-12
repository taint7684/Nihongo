// Curated, sense-safe spelling alias only. JMdict 1311110, reading わたし, English I/me.
// Other inflection/dictionary candidates are NOT auto-merged.
export const spellingGroups={私:['私','わたし']};
export const wordReviewKey=key=>Object.entries(spellingGroups).find(([,keys])=>keys.includes(key))?.[0]||key;
export const wordAliases=key=>spellingGroups[wordReviewKey(key)]||[key];
export function getWordReview(state,key){const rows=wordAliases(key).map(k=>state.wordReviews?.[k]).filter(Boolean);if(!rows.length)return undefined;const latest=[...rows].sort((a,b)=>b.last-a.last)[0],canonical=state.wordReviews?.[wordReviewKey(key)];if(canonical&&canonical.last>=latest.last)return {...canonical};return {...latest,due:Math.min(...rows.map(r=>r.due))};}
export function wordEvidenceFor(state,key){const seen=new Set();return wordAliases(key).flatMap(k=>state.wordEvidence?.[k]||[]).filter(a=>{const id=JSON.stringify(a);if(seen.has(id))return false;seen.add(id);return true}).sort((a,b)=>a.at-b.at);}
export const hasSavedWord=(state,key)=>wordAliases(key).some(k=>state.savedWords?.includes(k));
export function wordNote(state,key){const exact=state.wordNotes?.[key];return exact!==undefined?exact:wordAliases(key).map(k=>state.wordNotes?.[k]).find(x=>x!==undefined)||'';}

export const wordUsageId=(lessonId,key)=>lessonId+':'+key;
export const wordEvidencePath=(lessonId,key)=>'/dictionaries/words/'+lessonId+'-'+[...key].map(c=>c.codePointAt(0).toString(16)).join('-')+'.json';
