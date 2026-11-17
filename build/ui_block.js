/* ---------- home ---------- */
function settingsCard(){
  return `<section class="scard" aria-label="${t('yourSettings')}">
    <div class="sc-head"><span class="eyebrow">${t('yourSettings')}</span><button class="mini" data-act="settings">${ICON.aa}${t('allSettings')}</button></div>
    <div class="sc-row"><span class="sc-l">${t('appLang')}</span><div class="seg lang">${Object.entries(LANGS).map(([k,l])=>`<button class="${PREF.lang===k?'on':''}" data-act="lang" data-m="${k}"${k==='ur'?' lang="ur"':''}>${l}</button>`).join('')}</div></div>
    <div class="sc-row"><span class="sc-l">${t('listenTo')}</span><div class="seg">${listenButtons()}</div></div>
    <button class="sc-sum" data-act="settings">
      <span><small>${t('arabicStyle')}</small><b>${tScript(PREF.script).name}</b></span>
      <span><small>${t('reciter')}</small><b>${tRec(PREF.reciter).name}</b></span>
      <span><small>${t('translationShown')}</small><b>${TRANS()[PREF.trans]}</b></span>
      <span class="sc-go">${t('change')}</span>
    </button>
  </section>`;
}
function renderHome(){
  const qq=q.toLowerCase().replace(/[-'’ʿ\s]/g,'');
  const list=INDEX.filter(x=>!q||(x[0]+' '+x[2]+' '+x[3]).toLowerCase().replace(/[-'’ʿ\s]/g,'').includes(qq)||x[1].includes(q)||(x[6]||'').includes(q));
  const cont=LAST&&S(LAST.s)?`<a class="cont" href="#surah-${LAST.s}-${LAST.v}"><span class="t"><span class="eyebrow">${t('continue')}</span><b>${sname(LAST.s)} · ${t('ayahN',LAST.v)}</b><span class="muted" style="font-size:.85rem">${smean(LAST.s)}</span></span><span class="go">${ICON.arrow}</span></a>`:'';
  $v.innerHTML=`<div class="bar"><span class="brand">${MOSQUE}MyQuranApp<span class="ar">قُرْآنِي</span></span><button class="ib" data-act="settings" aria-label="${t('allSettings')}">${ICON.aa}</button></div>
  <div class="stack" style="padding-top:14px">
    <div><h1>${t('homeTitle')}</h1><p class="muted" style="margin:8px 0 0">${t('homeSub')}</p></div>
    ${cont}
    ${settingsCard()}
    <div class="stack" style="gap:10px"><div class="eyebrow">${t('startHere')}</div><div class="picks">${PICKS.map(p=>`<a class="pick" href="#surah-${p[0]}${p[3]?'-'+p[3]:''}"><span class="ar">${p[4]||S(p[0])[1]}</span><b>${isUR()?(p[5]||S(p[0])[1]):p[1]}</b><span>${p[3]?'2 : 255':smean(p[0])}</span></a>`).join('')}</div></div>
    <div class="stack" style="gap:12px"><div class="eyebrow">${t('allSurahs')}</div>
      <input class="search" id="q" type="search" placeholder="${t('search')}" value="${esc(q)}" autocomplete="off">
      <div class="list">${list.map(x=>`<a class="srow" href="#surah-${x[0]}"><span class="no"><i>${x[0]}</i></span><span><b>${sname(x[0])}</b><small>${smean(x[0])} · ${t('ayahs',x[5])} · <span class="tag" style="--c:${x[4]==='meccan'?'var(--sand)':'var(--sky)'}">${t(x[4]==='meccan'?'makkah':'madinah')}</span></small></span><span class="ar">${isUR()?'':x[1]}</span></a>`).join('')||`<p class="muted">${t('noMatch')}</p>`}</div>
    </div>
    <p class="foot">${t('credits')}<br>Version 2.9 · ${isUR()?'اردو':'English'}</p>
  </div>`;
}

/* ---------- reader ---------- */
function ayahHTML(s,d,v){
  const a=d.v[v-1];
  const sv=isSaved(s,v);
  const T=isIP()&&a.i?a.i:a.a;
  const words=T.map((ar,i)=>{
    if(ar==='')return '';   // Indo-Pak writes this word together with the next one
    const mean=i>0&&T[i-1]===''?a.w[i-1]+' '+a.w[i]:a.w[i];
    return `<button class="w" data-act="word" data-v="${v}" data-i="${i}"><span class="wa">${ar}</span><span class="we" dir="ltr">${esc(mean)}</span></button>`}).join('');
  return `<article class="ayah" id="a-${v}" data-v="${v}">
    <div class="ah"><span class="num">${s}:${v}</span><span class="sp"></span><button class="mini${sv?' saved':''}" data-act="save-ayah" data-v="${v}">${sv?ICON.bmf+t('saved'):ICON.bm+t('save')}</button><button class="mini" data-act="ayah-play" data-v="${v}">${ICON.play}${t('listen')}</button></div>
    <div class="words">${words}</div>
    <p class="tx" dir="ltr">${esc(a.en)}</p>${a.ur?`<p class="txu" lang="ur">${esc(a.ur)}</p>`:''}</article>`;
}
function ensureRendered(upto){
  if(!cur||upto<=shown)return;const box=document.getElementById('ayahs');if(!box)return;
  let h='';const end=Math.min(cur.d.v.length,upto);for(let v=shown+1;v<=end;v++)h+=ayahHTML(cur.s,cur.d,v);
  box.insertAdjacentHTML('beforeend',h);shown=end;observe();
  const m=document.getElementById('more');if(m)m.style.display=shown<cur.d.v.length?'':'none';
  const nx=document.getElementById('nextnav');if(nx)nx.style.display=shown<cur.d.v.length?'none':'';
  markPlaying();
}
async function renderRead(){
  const s=R.s,meta=S(s);
  $v.innerHTML=`<div class="bar line"><a class="ib flip" href="#" aria-label="${t('allSurahs')}">${ICON.back}</a><span class="title"><b>${sname(s)}</b><span>${smean(s)} · ${t('ayahs',meta[5])}</span></span>
    <button class="ib" id="playall" data-act="playall" aria-label="${t('listen')}">${ICON.play}</button><button class="ib" data-act="settings" aria-label="${t('allSettings')}">${ICON.aa}</button></div>
    <div id="rbody"><p class="muted" style="padding:40px 0;text-align:center">${t('loading')}</p></div>`;
  let d;try{d=await loadSurah(s)}catch(e){document.getElementById('rbody').innerHTML=`<div class="empty" style="margin-top:30px">${t('loadErr')}</div>`;return}
  if(R.view!=='read'||R.s!==s)return;
  cur={s,d};shown=0;
  const prev=s>1?`<a class="btn ghost" href="#surah-${s-1}"><span class="flip">${ICON.back}</span> ${sname(s-1)}</a>`:'<span></span>';
  const next=s<114?`<a class="btn gold" href="#surah-${s+1}">${sname(s+1)} <span class="flip">${ICON.arrow}</span></a>`:'<span></span>';
  const bt=PREF.trans==='ur'?`<p class="txu bt" lang="ur">${BISM_UR}</p>`:PREF.trans==='both'?`<p class="muted bt" dir="ltr">${BISM_EN2}</p><p class="txu bt" lang="ur">${BISM_UR}</p>`:`<p class="muted bt" dir="ltr">${BISM_EN2}</p>`;
  document.getElementById('rbody').innerHTML=`<div class="shead"><span class="ar">${meta[1]}</span><p>${t(meta[4]==='meccan'?'revealedM':'revealedMd')}</p></div>
    ${s!==1&&s!==9?'<p class="bism" id="bism">'+SCRIPTS[PREF.script].bism+'</p>'+bt:''}
    <div id="ayahs"></div><div class="more" id="more"><button class="btn ghost" data-act="more">${t('more')}</button></div>
    <div class="next" id="nextnav" style="display:none">${prev}${next}</div>`;
  ensureRendered(Math.max(30,R.v+10));
  if(R.v>1){const el=document.getElementById('a-'+R.v);if(el)requestAnimationFrame(()=>el.scrollIntoView({block:'start'}))}else scrollTo(0,0);
  if(!R.v||R.v===1){LAST={s,v:1};store.set('last',LAST)}
}
function observe(){
  if(obs)obs.disconnect();if(!('IntersectionObserver' in window))return;
  let tm=null;
  obs=new IntersectionObserver(es=>{
    for(const e of es){
      if(e.target.id==='more'&&e.isIntersecting){ensureRendered(shown+30);continue}
      if(e.isIntersecting&&e.target.dataset.v){clearTimeout(tm);const v=+e.target.dataset.v;tm=setTimeout(()=>{if(cur){LAST={s:cur.s,v};store.set('last',LAST)}},400)}
    }
  },{rootMargin:'-20% 0px -70% 0px'});
  document.querySelectorAll('.ayah').forEach(a=>obs.observe(a));
  const m=document.getElementById('more');if(m){const o2=new IntersectionObserver(es=>{if(es[0].isIntersecting)ensureRendered(shown+30)},{rootMargin:'600px'});o2.observe(m)}
}

/* ---------- sheet ---------- */
const sheet=document.getElementById('sheet'),scrim=document.getElementById('scrim');
let sheetKind=null;
function openSheet(html,kind){sheetKind=kind||null;sheet.innerHTML='<div class="grab"></div>'+html;sheet.classList.add('on');scrim.classList.add('on')}
function closeSheet(){sheetKind=null;sheet.classList.remove('on');scrim.classList.remove('on');document.querySelectorAll('.w.sel').forEach(e=>e.classList.remove('sel'))}
scrim.onclick=closeSheet;
let selW=null;
function wordSheet(s,v,i){
  const a=cur.d.v[v-1],k=s+':'+v+':'+i,sv=isSaved(s,v);
  const T=isIP()&&a.i?a.i:a.a,joined=i>0&&T[i-1]==='';
  selW={k,s,v,i,a:T[i],w:joined?a.w[i-1]+' '+a.w[i]:a.w[i],t:joined?a.t[i-1]+' '+a.t[i]:a.t[i],p:joined?a.p[i-1]:a.p[i]};
  const n=T.slice(0,i+1).filter(Boolean).length;
  openSheet(`<div class="sw"><span class="ar">${selW.a}</span><span class="tr" dir="ltr">${esc(selW.t)}</span><span class="en" dir="ltr">${esc(selW.w)}</span><span class="ref">${sname(s)} ${s}:${v} · ${t('word',n)}</span></div>
    <div class="row2"><button class="btn ghost" data-act="wplay">${ICON.play}${t('hearIt')}</button><button class="btn ${sv?'saved':'gold'}" data-act="save-ayah" data-v="${v}">${sv?ICON.bmf+t('ayahSaved'):ICON.bm+t('saveAyah')}</button></div>`,'word');
}
function settingsSheet(){
  const keep=sheet.classList.contains('on')&&sheetKind==='settings'?sheet.scrollTop:0;
  openSheet(`<h2 style="margin-bottom:6px">${t('settingsTitle')}</h2><div class="set">
    <div class="r" style="flex-direction:column;align-items:stretch"><span>${t('appLang')}</span><div class="seg lang">${Object.entries(LANGS).map(([k,l])=>`<button class="${PREF.lang===k?'on':''}" data-act="lang" data-m="${k}"${k==='ur'?' lang="ur"':''}>${l}</button>`).join('')}</div></div>
    <div class="r" style="flex-direction:column;align-items:stretch"><span>${t('arabicStyle')}</span><div class="styles">${Object.keys(SCRIPTS).map(k=>{const f=SCRIPTS[k],tf=tScript(k);return `<button class="style ${PREF.script===k?'on':''}" data-act="script" data-m="${k}"><span><b>${tf.name}</b><small>${tf.sub}</small></span><span class="smp" style="font-family:${f.ff.replace(/"/g,"'")}">${k==='ip'?'بِسۡمِ اللّٰهِ':'بِسۡمِ ٱللَّهِ'}</span></button>`}).join('')}</div></div>
    <div class="r" style="flex-direction:column;align-items:stretch"><span>${t('reciter')}</span><div class="styles">${Object.keys(RECITERS).map(k=>{const r=tRec(k);return `<button class="style ${PREF.reciter===k?'on':''}" data-act="reciter" data-m="${k}"><span><b>${r.name}</b><small>${r.note}</small></span><span class="rplay" aria-hidden="true">${PREF.reciter===k?CHECK:''}</span></button>`}).join('')}</div></div>
    <div class="r" style="flex-direction:column;align-items:stretch"><span>${t('listenTo')}</span><div class="seg">${listenButtons()}</div></div>
    <div class="r"><span>${t('contNext')}</span><button class="tog ${PREF.cont?'on':''}" data-act="pref" data-k="cont" aria-label="${t('contNext')}"></button></div>
    <div class="r" style="flex-direction:column;align-items:stretch"><span>${t('translationShown')}</span><div class="seg">${Object.entries(TRANS()).map(([k,l])=>`<button class="${PREF.trans===k?'on':''}" data-act="trans" data-m="${k}"${k==='ur'?' lang="ur"':''}>${l}</button>`).join('')}</div></div>
    <div class="r"><span>${t('fullTx')}</span><button class="tog ${PREF.tx?'on':''}" data-act="pref" data-k="tx" aria-label="${t('fullTx')}"></button></div>
    <div class="r"><span>${t('wbw')}</span><button class="tog ${PREF.wbw?'on':''}" data-act="pref" data-k="wbw" aria-label="${t('wbw')}"></button></div>
    <div class="r"><span>${t('arSize')}</span><span class="steps"><button data-act="size" data-d="-1" aria-label="−">ا−</button><button data-act="size" data-d="1" aria-label="+">ا+</button></span></div>
    <div class="r"><span><span>${t('offline')}</span><br><small class="muted" id="offl">${t('offlineSub')}</small></span><button class="btn ghost" style="height:38px" data-act="offline">${t('saveBtn')}</button></div>
  </div>`,'settings');
  sheet.scrollTop=keep;
}
function listenButtons(){return Object.entries(LISTEN()).map(([k,l])=>`<button class="${PREF.listen===k?'on':''}" data-act="listen" data-m="${k}">${l}</button>`).join('')}

/* ---------- saved ---------- */
function savedSheet(i,mode){
  const x=AYAHS[i];if(!x)return;const ref=sname(x.s)+' '+x.s+':'+x.v;
  if(mode==='remove'){openSheet(`<h2>${t('removeQ',ref)}</h2><p class="muted" style="margin:6px 0 0">${x.note?t('noteRemoved'):t('canSaveAgain')}</p>
    <div class="row2"><button class="btn ghost" data-act="close">${t('keepIt')}</button><button class="btn gold" data-act="sv-remove-yes" data-i="${i}">${t('remove')}</button></div>`);return}
  openSheet(`<h2>${t('noteFor',ref)}</h2><p class="muted" style="margin:4px 0 12px;font-size:.88rem">${t('noteHelp')}</p>
    <textarea id="note-text" class="note-in" rows="4" placeholder="${t('notePh')}" dir="auto">${esc(x.note||'')}</textarea>
    <div class="row2"><button class="btn ghost" data-act="close">${t('cancel')}</button><button class="btn gold" data-act="sv-note-save" data-i="${i}">${t('saveNote')}</button></div>`);
  setTimeout(()=>{const n=document.getElementById('note-text');if(n)n.focus()},280);
}
function renderSaved(){
  const n=AYAHS.length;
  $v.innerHTML=`<div class="bar"><span class="brand">${MOSQUE}${t('savedTitle')}</span><button class="ib" data-act="settings" aria-label="${t('allSettings')}">${ICON.aa}</button></div>
   <div class="stack" style="padding-top:14px">
   ${n?`<div><h1>${t(n===1?'savedOne':'savedN',n)}</h1><p class="muted" style="margin:8px 0 0">${t('savedSub')}</p></div>
     <button class="btn gold" data-act="sv-playall">${ICON.play}${t('playAllSaved')}</button>
     <div class="list">${AYAHS.map((x,i)=>`<article class="sa" id="sv-${x.s}-${x.v}">
        <div class="ah"><a class="num" href="#surah-${x.s}-${x.v}">${sname(x.s)} ${x.s}:${x.v}</a><span class="sp"></span><button class="mini" data-act="sv-play" data-i="${i}">${ICON.play}${t('listen')}</button></div>
        <p class="sar">${isIP()&&x.ai?x.ai:x.ar}</p><p class="tx" dir="ltr" style="display:block">${esc(x.en)}</p>${x.ur?`<p class="txu" lang="ur">${esc(x.ur)}</p>`:''}
        ${x.note?`<p class="note" dir="auto">${esc(x.note)}</p>`:''}
        <div class="sacts"><a class="mini" href="#surah-${x.s}-${x.v}">${t('openInSurah')}</a><button class="mini" data-act="sv-note" data-i="${i}">${t(x.note?'editNote':'addNote')}</button><button class="mini" data-act="sv-remove" data-i="${i}">${t('remove')}</button></div>
      </article>`).join('')}</div>`
   :`<div class="empty"><p style="margin:0 0 6px;color:var(--text)">${t('emptySaved1')}</p>${t('emptySaved2')}</div><a class="btn gold" href="#surah-2-255">${t('startKursi')}</a>`}
   </div>`;
  markPlaying();
}

let toastT=null;function toast(m){const e=document.getElementById('toast');e.textContent=m;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove('on'),2200)}

