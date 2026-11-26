"""Corrections to the word-by-word source data. Run after make_data.py (and add_hinglish.py).

    python3 build/post_fixes.py
"""
import json, os, re

DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'app', 'data')

# (surah, ayah, word index) -> correct English meaning
WORD_MEANING = {
    # 27:20 مَالِيَ = mā ("Why") + liya ("(is it) for me"); the source repeats "Why" for both halves.
    (27, 20, 3): 'Why (is it) for me',
    # 4:91 typo in the source
    (4, 91, 7): 'Every time',
}

tidied = 0
for s in range(1, 115):
    p = os.path.join(DATA, f'{s}.json')
    d = json.load(open(p, encoding='utf-8'))
    for a, v in enumerate(d['v'], 1):
        for f in ('w', 't'):                      # stray spaces in the source
            for i, x in enumerate(v[f]):
                y = re.sub(r'\s{2,}', ' ', x).strip()
                if y != x:
                    v[f][i] = y; tidied += 1
        for i in range(len(v['w'])):
            if (s, a, i) in WORD_MEANING:
                v['w'][i] = WORD_MEANING[(s, a, i)]
    json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print('post fixes applied:', len(WORD_MEANING), 'meanings corrected,', tidied, 'stray spaces removed')
