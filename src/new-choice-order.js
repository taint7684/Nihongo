// Stable before initial publication only; never apply to legacy question IDs.
export function arrangeNewChoices(q,seed){if(q.kind==='recall'||q.kind==='order')return q;const offset=seed%q.choices.length;if(!offset)return q;return {...q,choices:q.choices.slice(offset).concat(q.choices.slice(0,offset)),answer:(q.answer-offset+q.choices.length)%q.choices.length};}
