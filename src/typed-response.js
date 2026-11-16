export const normalizeTyped=s=>s.normalize('NFKC').replace(/\s/g,'').trim();
export function typedVerdict(q,response){if(q.accepted?.some(a=>normalizeTyped(a)===normalizeTyped(response)))return 'matched';return q.kind==='recall'&&!q.wordKey&&(q.responseNote||q.responseMode==='open-sentence')?'unconfirmed':'incorrect';}
