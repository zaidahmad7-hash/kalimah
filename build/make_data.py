import json, collections, os, sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import indopak
src='/tmp/qdata'; out=sys.argv[1]; os.makedirs(out+'/data',exist_ok=True)
wbw=json.load(open(f'{src}/kmaslesa-holy-quran-word-by-word-full-data-1.0.6/package/data.json'))
en=json.load(open(f'{src}/quran-json-3.1.2/package/dist/quran_en.json'))
tl={s['id']:s for s in json.load(open(f'{src}/quran-json-3.1.2/package/dist/quran_transliteration.json'))}
# Urdu: Fateh Muhammad Jalandhry (Tanzil) -- the translation read in Shamshad Ali Khan's Urdu audio
UR=json.load(open(f'{src}/x-ghoran-translation-0.0.10/package/json/ur/tanzil-jalandhry.json'))
assert len(UR)==6236
IPT=indopak.load(os.environ.get('INDOPAK','/tmp/qa/database/originals/ara-quranindopak.txt'))
URFIX=str.maketrans({'\u0674':'\u0654'})
g=0
W=collections.defaultdict(list)
for pg in wbw:
    for a in pg['ayahs']:
        for w in a['words'] or []:
            if w and w['char_type_name']=='word': W[w['parentAyahVerseKey']].append(w)
# token groups: list of (token-indices) per word, for the 10 ayahs whose spelling splits differently
MERGE_T={'2:181':[2],'8:6':[3],'13:37':[7],'37:130':[2]}   # merge token i with i+1
SPLIT_W={'15:7':[0],'27:20':[3],'36:22':[0],'37:164':[0],'41:47':[24]}  # word i and i+1 share one token
OPEN=str.maketrans({'\u0657':'\u08F0','\u065E':'\u08F1','\u0656':'\u08F2'})  # open tanween to standard code points
index=[]; total_w=0
for s in en:
    sid=s['id']; verses=[]
    for v in s['verses']:
        k=f"{sid}:{v['id']}"
        toks=[t for t in v['text'].replace('\u2009','').translate(OPEN).split(' ') if t]
        ws=[(x['translation']['text'] or '', x['transliteration']['text'] or '', x['position']) for x in W[k]]
        for i in sorted(MERGE_T.get(k,[]),reverse=True): toks[i:i+2]=[toks[i]+' '+toks[i+1]]
        for i in sorted(SPLIT_W.get(k,[]),reverse=True):
            a,b=ws[i],ws[i+1]; ws[i:i+2]=[(a[0]+' '+b[0], a[1]+' '+b[1], a[2])]
        assert len(toks)==len(ws),(k,len(toks),len(ws))
        total_w+=len(ws)
        verses.append({'a':toks,'w':[x[0] for x in ws],'t':[x[1] for x in ws],'p':[x[2] for x in ws],
                       'en':v['translation'],'ur':' '.join(UR[g].translate(URFIX).split()),'i':indopak.align(IPT[(sid,v['id'])],toks)[0]}); g+=1
    json.dump({'n':sid,'ar':s['name'],'name':s['transliteration'],'mean':s['translation'],'type':s['type'],'v':verses},
              open(f'{out}/data/{sid}.json','w'),ensure_ascii=False,separators=(',',':'))
    index.append([sid,s['name'],s['transliteration'],s['translation'],s['type'],s['total_verses']])
json.dump(index,open(f'{out}/data/index.json','w'),ensure_ascii=False,separators=(',',':'))
print('surahs',len(index),'words',total_w)
