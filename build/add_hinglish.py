"""Add the Hinglish (Roman Urdu) translation to every surah file as field "h".

Source: Abul A'la Maududi's Urdu translation in Roman script, from
github.com/fawazahmed0/quran-api (edition urd-abulaalamaududi-la).
Only typing slips are fixed here; the wording is the translator's.

    python3 build/add_hinglish.py [path/to/urd-abulaalamaududi-la.json]
"""
import json, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, '..', 'app', 'data')
URL = 'https://raw.githubusercontent.com/fawazahmed0/quran-api/1/editions/urd-abulaalamaududi-la.json'

# Hand fixes: broken brackets, and whole English sentences pasted into the Roman Urdu.
FIX = {
    (5, 69): [('kisi ka bhi nahin hai) musalman', 'kisi ka bhi nahin hai, musalman')],
    (9, 120): [('[adawat (dushmani) e haqq ka ) koi', 'adawat (dushmani) e haqq ka koi')],
    (14, 18): [('phal( na', 'phal na')],
    (21, 59): [('buthon[idols] ka yeh haal dekha to) kehne', 'buthon (idols) ka yeh haal dekha to kehne')],
    (23, 17): [(' (We are never unmindful of (our) Creation', '')],
    (27, 18): [('kar raha tha) yahan', 'kar raha tha, yahan')],
    (37, 28): [('pairvi karne waley apne peshwaon[leaders] se) kahenge', 'Pairvi karne waley apne peshwaon (leaders) se kahenge')],
    (48, 4): [('sakinat ((Tranquility)', 'sakinat (tranquility)')],
    (52, 21): [('.( Every person is pledged to what he did)', '.')],
    (54, 31): [(' (Lo! We sent upon them one Shout, and they became as the dry twigs (rejected by) the builder of a cattle-fold', '')],
    (55, 14): [(' (clay like [that of] pottery', '')],
    (56, 66): [(' (Lo! we are laden with debt)', '')],
}


def clean(t):
    t = t.replace('\xa0', ' ')
    t = re.sub(r'\[([^\[\]]*)\]', r'(\1)', t)          # [x] -> (x)
    t = re.sub(r'\(\s+', '(', t)
    t = re.sub(r'\s+\)', ')', t)
    t = re.sub(r'\s+([,.;:!?])', r'\1', t)             # no space before punctuation
    t = re.sub(r'([,;])(?=[A-Za-z“])', r'\1 ', t)      # space after comma
    t = re.sub(r'(?<=[A-Za-z0-9,.!?”])\(', ' (', t)    # space before (
    t = re.sub(r'\)(?=[A-Za-z0-9“])', ') ', t)        # space after )
    t = re.sub(r'“\s+', '“', t)
    t = re.sub(r'\s+”', '”', t)
    t = re.sub(r'\s{2,}', ' ', t).strip()
    t = re.sub(r'^([(“‘"]?)([a-z])', lambda m: m.group(1) + m.group(2).upper(), t)
    return t


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else None
    raw = json.load(open(src, encoding='utf-8')) if src else json.load(urllib.request.urlopen(URL))
    m = {(x['chapter'], x['verse']): x['text'] for x in raw['quran']}
    assert len(m) == 6236, len(m)
    for k, subs in FIX.items():
        for a, b in subs:
            assert a in m[k], (k, a)
            m[k] = m[k].replace(a, b)
    out = {k: clean(v) for k, v in m.items()}
    bad = [k for k, v in out.items() if v.count('(') != v.count(')') or not v]
    assert not bad, bad
    for s in range(1, 115):
        p = os.path.join(DATA, f'{s}.json')
        d = json.load(open(p, encoding='utf-8'))
        for i, v in enumerate(d['v'], 1):
            v['h'] = out[(s, i)]
        json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print('Hinglish added to 114 surahs,', len(out), 'ayahs')


if __name__ == '__main__':
    main()
