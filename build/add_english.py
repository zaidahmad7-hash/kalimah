"""Extra English translations, one small file per surah, downloaded only when someone picks that translation.

    python3 build/add_english.py [folder with the edition .json files]

Writes app/data/tr/<id>/<surah>.json, each a list of ayah texts in order.
Source: github.com/fawazahmed0/quran-api editions. Wording is the translator's; only typing slips are fixed.
"""
import json, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'app', 'data', 'tr')
URL = 'https://raw.githubusercontent.com/fawazahmed0/quran-api/1/editions/{}.json'
COUNTS = [7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6]

TRANSLATIONS = {
    # Mufti Muhammad Taqi Usmani, "The Meanings of the Noble Qur'an"
    'usmani': ('eng-muftitaqiusmani', {
        (20, 121): [('(Eve)]', '(Eve)')],
        (30, 18): [('àuhr', 'Ẓuhr')],
    }),
    # Dr Mustafa Khattab, "The Clear Quran" (Allah edition). ˹ ˺ mark his clarifying additions.
    'khattab': ('eng-mustafakhattaba', {}),
}


def clean(t):
    t = t.replace('\xa0', ' ').replace('Ȃ', 'Â')
    t = re.sub(r'\s{2,}', ' ', t).strip()
    return t


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else None
    for tid, (edition, fixes) in TRANSLATIONS.items():
        raw = json.load(open(os.path.join(src, edition + '.json'), encoding='utf-8')) if src else json.load(urllib.request.urlopen(URL.format(edition)))
        m = {(x['chapter'], x['verse']): x['text'] for x in raw['quran']}
        assert len(m) == 6236, (tid, len(m))
        for k, subs in fixes.items():
            for a, b in subs:
                assert a in m[k], (tid, k, a)
                m[k] = m[k].replace(a, b)
        os.makedirs(os.path.join(OUT, tid), exist_ok=True)
        for s in range(1, 115):
            ayahs = [clean(m[(s, v)]) for v in range(1, COUNTS[s - 1] + 1)]
            assert all(ayahs), (tid, s)
            json.dump(ayahs, open(os.path.join(OUT, tid, f'{s}.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
        print(tid, 'written: 114 surahs, 6236 ayahs')


if __name__ == '__main__':
    main()
