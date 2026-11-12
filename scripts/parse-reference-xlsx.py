"""Local comparison only. Standard library; ignore Excel phonetic guides (rPh)."""
import zipfile,xml.etree.ElementTree as E,json,pathlib,sys
NS={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
def richtext(node):
 return ''.join(t.text or '' for t in node.findall('m:t',NS)+node.findall('m:r/m:t',NS))
def parse(f):
 with zipfile.ZipFile(f) as z:
  if any(x.file_size>20000000 for x in z.infolist()):raise ValueError('Oversize worksheet')
  strings=[richtext(x) for x in E.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si',NS)] if 'xl/sharedStrings.xml' in z.namelist() else []
  rels={x.attrib['Id']:x.attrib['Target'] for x in E.fromstring(z.read('xl/_rels/workbook.xml.rels'))};out=[]
  for sh in E.fromstring(z.read('xl/workbook.xml')).findall('m:sheets/m:sheet',NS):
   target=rels[sh.attrib['{'+NS['r']+'}id']];target=target.lstrip('/') if target.startswith('/') else 'xl/'+target
   if '..' in target.split('/'):raise ValueError('Unsafe worksheet path')
   rows=[]
   for row in E.fromstring(z.read(target)).findall('m:sheetData/m:row',NS):
    cells={}
    for c in row.findall('m:c',NS):
     v=c.find('m:v',NS);val=v.text if v is not None else ''
     if c.attrib.get('t')=='s' and val:val=strings[int(val)]
     elif c.attrib.get('t')=='inlineStr':val=richtext(c.find('m:is',NS))
     if val:cells[c.attrib['r']]=val
    if cells:rows.append(cells)
   out.append({'sheet':sh.attrib['name'],'rows':rows})
  return out
if __name__=='__main__':
 # Actual past failure: itertext() adds rPh furigana to the headword.
 sample=E.fromstring('<si xmlns="'+NS['m']+'"><t>名前</t><rPh sb="0" eb="2"><t>なまえ</t></rPh></si>')
 assert richtext(sample)=='名前'
 for f in pathlib.Path(sys.argv[1] if len(sys.argv)>1 else '.sources/irodori-20261112').glob('*.xlsx'):
  out=parse(f);f.with_suffix('.json').write_text(json.dumps(out,ensure_ascii=False),encoding='utf8');print(f.name,[(x['sheet'],len(x['rows'])) for x in out]);print(json.dumps(out[0]['rows'][2:4],ensure_ascii=False))
