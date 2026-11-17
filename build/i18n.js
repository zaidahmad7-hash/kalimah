/* ---------- app language: every word the app shows, in English and Urdu ---------- */
const L={
 en:{
  tabRead:'Read',tabSaved:'Saved',
  homeTitle:'Read the Qur’an and understand every word.',
  homeSub:'Each Arabic word has its meaning underneath, with the full translation below each ayah. Tap a word to hear it, and save any ayah to come back to.',
  continue:'Continue reading',ayahN:'ayah {0}',startHere:'Start here',allSurahs:'All 114 surahs',
  search:'Search by name, meaning or number',ayahs:'{0} ayahs',makkah:'Makkah',madinah:'Madinah',noMatch:'No surah matches that search.',
  yourSettings:'Your settings',allSettings:'All settings',appLang:'App language',listenTo:'Listen to',arabicStyle:'Arabic style',reciter:'Reciter',translationShown:'Translation shown',change:'Change',
  revealedM:'Revealed in Makkah',revealedMd:'Revealed in Madinah',
  save:'Save',saved:'Saved',listen:'Listen',pause:'Pause',more:'Show more ayahs',loading:'Loading…',
  loadErr:'This surah couldn’t load. Connect to the internet once and open it again; after that it works offline.',
  word:'word {0}',hearIt:'Hear it',saveAyah:'Save this ayah',ayahSaved:'Ayah saved',
  settingsTitle:'Reading and listening',contNext:'Keep playing into the next surah',wbw:'Word meanings under Arabic (English)',fullTx:'Full translation of each ayah',arSize:'Arabic size',
  offline:'Save whole Qur’an for offline',offlineSub:'About 8 MB. Surahs you open are saved automatically.',saveBtn:'Save',offSaving:'Saving… {0} of 114',offDone:'Done. The whole Qur’an is available offline.',offSaved:'Saved',
  removeQ:'Remove {0}?',noteRemoved:'Your note will be removed too.',canSaveAgain:'You can save it again any time.',keepIt:'Keep it',remove:'Remove',
  noteFor:'Note for {0}',noteHelp:'Why it matters to you, when to recite it, who to share it with.',notePh:'e.g. Recite before sleep',cancel:'Cancel',saveNote:'Save note',
  savedTitle:'Saved ayahs',savedOne:'1 ayah saved',savedN:'{0} ayahs saved',savedSub:'Your own collection. Play them all on the go in Arabic, English, Urdu or together.',
  playAllSaved:'Play all saved',openInSurah:'Open in surah',addNote:'Add note',editNote:'Edit note',
  emptySaved1:'No saved ayahs yet.',emptySaved2:'While reading, tap <b style="color:var(--gold)">Save</b> on any ayah to keep it here with its meaning.',startKursi:'Start with Āyat al-Kursī',
  toastSaved:'Saved. Find it in the Saved tab.',toastReciter:'{0} selected',toastLang:'App language: English',
  playing:'Playing {0}',paused:'Paused',savedOf:'Saved {0} of {1} · ',phoneVoice:' (phone voice)',bismillah:'Bismillah',
  credits:'Word meanings from the Quranic Arabic Corpus (Quran.com). Indo-Pak text and fonts: King Fahd Complex (KFGQPC). Translation: Saheeh International. Urdu: Fateh Muhammad Jalandhry (Tanzil). Recitation: Mishary Alafasy, Yasser Al-Dosari, Maher Al-Muaiqly, Nasser Al-Qatami, Abdul Basit (EveryAyah.com). Audio translations: Ibrahim Walk (English), Shamshad Ali Khan (Urdu).'
 },
 ur:{
  tabRead:'پڑھیں',tabSaved:'محفوظ',
  homeTitle:'قرآن پڑھیں اور ہر لفظ سمجھیں',
  homeSub:'ہر آیت کے نیچے اس کا اردو ترجمہ ہے۔ کسی لفظ پر ٹیپ کریں تو اس کی آواز سنیں، اور کوئی بھی آیت بعد کے لیے محفوظ کریں۔',
  continue:'جہاں چھوڑا تھا وہیں سے پڑھیں',ayahN:'آیت {0}',startHere:'یہاں سے شروع کریں',allSurahs:'تمام 114 سورتیں',
  search:'نام، معنی یا نمبر سے تلاش کریں',ayahs:'{0} آیات',makkah:'مکی',madinah:'مدنی',noMatch:'اس نام کی کوئی سورۃ نہیں ملی۔',
  yourSettings:'آپ کی سیٹنگز',allSettings:'تمام سیٹنگز',appLang:'ایپ کی زبان',listenTo:'کیا سنیں',arabicStyle:'عربی رسم الخط',reciter:'قاری',translationShown:'ترجمہ',change:'تبدیل کریں',
  revealedM:'مکہ میں نازل ہوئی',revealedMd:'مدینہ میں نازل ہوئی',
  save:'محفوظ کریں',saved:'محفوظ',listen:'سنیں',pause:'روکیں',more:'مزید آیات دکھائیں',loading:'لوڈ ہو رہا ہے…',
  loadErr:'یہ سورۃ لوڈ نہیں ہو سکی۔ ایک بار انٹرنیٹ سے جڑ کر دوبارہ کھولیں، اس کے بعد یہ بغیر انٹرنیٹ کے بھی چلے گی۔',
  word:'لفظ {0}',hearIt:'سنیں',saveAyah:'یہ آیت محفوظ کریں',ayahSaved:'آیت محفوظ ہے',
  settingsTitle:'پڑھنے اور سننے کی سیٹنگز',contNext:'اگلی سورۃ بھی خود چلتی رہے',wbw:'عربی الفاظ کے نیچے معنی (انگریزی میں)',fullTx:'ہر آیت کا مکمل ترجمہ',arSize:'عربی کا سائز',
  offline:'پورا قرآن آف لائن محفوظ کریں',offlineSub:'تقریباً 8 MB۔ جو سورتیں آپ کھولتے ہیں وہ خود محفوظ ہو جاتی ہیں۔',saveBtn:'محفوظ کریں',offSaving:'محفوظ ہو رہا ہے… 114 میں سے {0}',offDone:'مکمل۔ پورا قرآن اب بغیر انٹرنیٹ کے دستیاب ہے۔',offSaved:'محفوظ ہو گیا',
  removeQ:'{0} ہٹا دیں؟',noteRemoved:'آپ کا نوٹ بھی ہٹ جائے گا۔',canSaveAgain:'آپ اسے کبھی بھی دوبارہ محفوظ کر سکتے ہیں۔',keepIt:'رہنے دیں',remove:'ہٹائیں',
  noteFor:'{0} کے لیے نوٹ',noteHelp:'یہ آیت آپ کے لیے کیوں اہم ہے، کب پڑھنی ہے، کس کو بتانی ہے۔',notePh:'مثلاً سونے سے پہلے پڑھیں',cancel:'منسوخ',saveNote:'نوٹ محفوظ کریں',
  savedTitle:'محفوظ آیات',savedOne:'1 آیت محفوظ',savedN:'{0} آیات محفوظ',savedSub:'آپ کا اپنا مجموعہ۔ انہیں عربی، اردو یا دونوں میں ایک ساتھ سنیں۔',
  playAllSaved:'سب محفوظ آیات سنیں',openInSurah:'سورۃ میں کھولیں',addNote:'نوٹ لکھیں',editNote:'نوٹ بدلیں',
  emptySaved1:'ابھی کوئی آیت محفوظ نہیں۔',emptySaved2:'پڑھتے ہوئے کسی بھی آیت پر <b style="color:var(--gold)">محفوظ کریں</b> دبائیں، وہ اپنے ترجمے کے ساتھ یہاں آ جائے گی۔',startKursi:'آیت الکرسی سے شروع کریں',
  toastSaved:'محفوظ ہو گئی۔ یہ "محفوظ" ٹیب میں ملے گی۔',toastReciter:'{0} منتخب',toastLang:'ایپ کی زبان: اردو',
  playing:'{0}',paused:'رکا ہوا',savedOf:'محفوظ: {1} میں سے {0} · ',phoneVoice:' (فون کی آواز)',bismillah:'بسم اللہ',
  credits:'الفاظ کے معانی: قرآنی عربی کارپس (Quran.com)۔ انڈوپاک متن اور فونٹ: شاہ فہد قرآن کمپلیکس۔ انگریزی ترجمہ: صحیح انٹرنیشنل۔ اردو ترجمہ: مولانا فتح محمد جالندھری۔ تلاوت: مشاری العفاسی، یاسر الدوسری، ماہر المعیقلی، ناصر القطامی، عبد الباسط (EveryAyah.com)۔ ترجمے کی آواز: ابراہیم واک (انگریزی)، شمشاد علی خان (اردو)۔'
 }
};
const isUR=()=>PREF.lang==='ur';
const t=(k,...a)=>{let s=(L[PREF.lang]||L.en)[k];if(s===undefined)s=L.en[k]||k;return a.length?s.replace(/\{(\d)\}/g,(_,i)=>a[i]):s};
const LANGS={en:'English',ur:'اردو'};
const LISTEN=()=>isUR()?{ar:'عربی',en:'انگریزی',ur:'اردو',both:'عربی + انگریزی',arur:'عربی + اردو'}:{ar:'Arabic',en:'English',ur:'Urdu',both:'Ar + En',arur:'Ar + Ur'};
const TRANS=()=>isUR()?{en:'انگریزی',ur:'اردو',both:'دونوں'}:{en:'English',ur:'اردو',both:'Both'};
const PART_NAME=()=>isUR()?{ar:'عربی تلاوت',en:'انگریزی ترجمہ',ur:'اردو ترجمہ'}:{ar:'Arabic',en:'English',ur:'Urdu'};
const SCRIPT_UR={ip:{name:'انڈوپاک',sub:'نستعلیق، جیسا ہند و پاک کے قرآن میں چھپتا ہے'},hafs:{name:'عثمانی',sub:'مدینہ کا مصحف (شاہ فہد کمپلیکس)'},amiri:{name:'نسخ',sub:'کلاسیکی امیری فونٹ'}};
const REC_UR={alafasy:{name:'مشاری العفاسی',note:'صاف اور خوش الحان (کویت)'},dosari:{name:'یاسر الدوسری',note:'نرم اور پُراثر (سعودی عرب)'},muaiqly:{name:'ماہر المعیقلی',note:'امامِ مسجد الحرام، پُرسکون'},qatami:{name:'ناصر القطامی',note:'دھیمی اور دل کو چھو لینے والی (سعودی عرب)'},basit:{name:'عبد الباسط',note:'مرتّل، کلاسیکی آواز (مصر)'}};
const tScript=k=>isUR()?SCRIPT_UR[k]:SCRIPTS[k];
const tRec=k=>isUR()?REC_UR[k]:RECITERS[k];
const sname=n=>isUR()?S(n)[1]:S(n)[2];
const smean=n=>isUR()?(S(n)[6]||S(n)[3]):S(n)[3];
const BISM_EN2='In the name of Allah, the Most Gracious, the Most Merciful';
const BISM_UR='شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے';
function applyLang(){
  document.documentElement.lang=isUR()?'ur':'en';document.documentElement.dir=isUR()?'rtl':'ltr';
  document.body.classList.toggle('ui-ur',isUR());
  const r=document.getElementById('t-read-l'),s=document.getElementById('t-saved-l');if(r)r.textContent=t('tabRead');if(s)s.textContent=t('tabSaved');
}
