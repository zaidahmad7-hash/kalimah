# Surah list for the app: [n, Arabic name, name, English meaning, type, ayahs, Urdu meaning]
import json,os,sys
B=os.path.dirname(os.path.abspath(__file__))
src=sys.argv[1] if len(sys.argv)>1 else '/tmp/qdata/quran-json-3.1.2/package/dist'
idx=json.load(open(os.path.join(B,'index_inline.json')))
ur={x['id']:x['translation'] for x in json.load(open(f'{src}/chapters/ur/index.json'))}
idx=[r[:6]+[ur[r[0]]] for r in idx]
json.dump(idx,open(os.path.join(B,'index_inline.json'),'w'),ensure_ascii=False,separators=(',',':'))
print(len(idx),idx[0])
