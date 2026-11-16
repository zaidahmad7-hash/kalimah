# MyQuranApp

A calm black-and-gold Quran reader for iPhone. Every Arabic word shows its English meaning underneath, so you can follow what you recite.

- All 114 surahs, ayah by ayah, with word-by-word meanings and a full translation
- Tap any word to hear it
- Save any ayah (with an optional personal note) and play your saved ayahs as a playlist
- Translation shown in English, Urdu (Nastaliq) or both
- Listen in Arabic (Mishary Alafasy), English (Saheeh International, read by Ibrahim Walk), Urdu (Jalandhry, read by Shamshad Ali Khan), or Arabic followed by English or Urdu
- Play bar with lock-screen and headphone controls; optional auto-continue into the next surah
- Remembers where you stopped; works offline

## Install on iPhone
Open https://zaidahmad7-hash.github.io/kalimah/ in Safari → Share → Add to Home Screen.

## Sources
- Word-by-word meanings: Quranic Arabic Corpus / Quran.com (via `@kmaslesa/holy-quran-word-by-word-full-data`)
- Urdu translation: Fateh Muhammad Jalandhry (Tanzil.net, via `@ghoran/translation`)
- Urdu font: Noto Nastaliq Urdu (SIL Open Font License)
- Arabic text and Saheeh International translation: `quran-json` by Risan Bagja Pradana (CC BY-SA 4.0)
- Font: Amiri Quran (SIL Open Font License)
- Audio: everyayah.com, cdn.islamic.network and Quran.com CDN

`build/` holds the scripts that generate `data/` and `index.html`.
