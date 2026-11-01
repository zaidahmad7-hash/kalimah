# Kalimah · Quran Word Trainer

A minimalist black-and-gold web app for learning the most frequent words of the Quran, starting with every word of Al-Fātiḥah.

- **Daily session** with spaced repetition (10 new words a day)
- **Quiz** in both directions, Arabic → English and English → Arabic
- **Word list** with search and progress status
- Works offline and installs to the iPhone home screen

## Install on iPhone

1. Open the GitHub Pages link in **Safari**.
2. Tap **Share**, then **Add to Home Screen**.
3. Open Kalimah from its icon. It runs full-screen, like a native app.

Progress is stored on the device, inside the installed app.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app: words, screens and logic |
| `manifest.webmanifest` | App name, colours, icons, full-screen mode |
| `sw.js` | Offline support |
| `*.png` | Home-screen and browser icons |

To add or edit words, change the `RAW` list (and the `AY` example ayahs) in `index.html`.
