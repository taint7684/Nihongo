export function normalizeKanaReading(text){return text.normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)).replace(/[\s。]/g,'');}
export function matchesWordReading(word,response){return normalizeKanaReading(word.reading)===normalizeKanaReading(response);}
