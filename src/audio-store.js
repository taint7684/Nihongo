// Only the compact local manifest is loaded on demand; WAV files remain preload=none.
export function createAudioStore(fetcher=(...args)=>fetch(...args)){
 let snapshot={items:[],status:'idle',error:''},pending=null;const listeners=new Set();
 const publish=value=>{snapshot=value;for(const listener of listeners)listener();};
 return {getSnapshot:()=>snapshot,subscribe:listener=>{listeners.add(listener);return()=>listeners.delete(listener);},load(force=false){
  if(pending)return pending;if(snapshot.status==='ready'||snapshot.status==='error'&&!force)return Promise.resolve(snapshot);
  publish({...snapshot,status:'loading',error:''});pending=(async()=>{try{const response=await fetcher('/audio/tts/index.json');if(!response.ok)throw Error('Không tải được chỉ mục audio ('+response.status+').');const items=await response.json();if(!Array.isArray(items)||items.some(a=>!a||typeof a.id!=='string'||typeof a.text!=='string'||!/^\/audio\/tts\/[a-f0-9]+\.wav$/.test(a.path)||!Array.isArray(a.taskIds)))throw Error('Chỉ mục audio không đúng định dạng.');publish({items,status:'ready',error:''});}catch(e){publish({items:[],status:'error',error:e.message||'Không tải được chỉ mục audio.'});}finally{pending=null;}return snapshot;})();return pending;}
 };
}
export const audioStore=createAudioStore();
export function lookupAudio(kind,text,reading){return audioStore.getSnapshot().items.find(a=>a.kind===kind&&a.text===text&&(!reading||a.reading===reading));}
