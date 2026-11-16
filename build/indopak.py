# Indo-Pak (KFGQPC Quran Nastaleeq) text, split so each piece lines up with one word-by-word meaning.
# The Indo-Pak and Uthmani texts split a few words differently, so the pieces are aligned by their letters.
import re
LET=re.compile(r'[ء-يٱ-ۓۺ-ۿ]')
MARKS=re.compile(r'[ؐ-ًؚ-ٰٟۖ-ۭ࣓-ࣿـ‏‎۞۩]')
def load(path):
    L=[l.rstrip('\n').split('|',2) for l in open(path,encoding='utf-8')][:6236]
    return {(int(s),int(v)):t for s,v,t in L}
def skel(w):
    w=MARKS.sub('',w)
    for a,b in [('أ','ا'),('إ','ا'),('آ','ا'),('ٱ','ا'),('ء',''),('ؤ','و'),('ئ','ي'),('ى','ي'),('ی','ي'),('ة','ه'),('ا','')]:
        w=w.replace(a,b)
    return w
def ed(a,b):
    p=list(range(len(b)+1))
    for i,x in enumerate(a,1):
        c=[i]
        for j,y in enumerate(b,1): c.append(min(p[j]+1,c[j-1]+1,p[j-1]+(x!=y)))
        p=c
    return p[-1]
def pieces(t):
    out=[]
    for w in t.replace('‏','').replace('‎','').split():
        if not LET.search(w):
            if out: out[-1]+=w
            else: out.append(w)
        else: out.append(w)
    # a stray mark carried over from the previous ayah at the very start is dropped
    if out and not LET.search(out[0]) and len(out)>1: out=out[1:]
    if out: out[0]=re.sub(r'^[\u06D6-\u06ED\u08D3-\u08FF]+','',out[0])
    return out
def align(ip_text, ut_words):
    P=pieces(ip_text); U=[skel(w) for w in ut_words]; S=[skel(p) for p in P]
    n,m=len(P),len(U); INF=10**9
    dp=[[INF]*(m+1) for _ in range(n+1)]; bk=[[None]*(m+1) for _ in range(n+1)]; dp[0][0]=0
    for i in range(n+1):
        for j in range(m+1):
            if dp[i][j]>=INF: continue
            if i<n and j<m:  # one piece = one word
                c=dp[i][j]+ed(S[i],U[j])
                if c<dp[i+1][j+1]: dp[i+1][j+1]=c; bk[i+1][j+1]=(1,1)
            if i+1<n and j<m:  # two pieces = one word
                c=dp[i][j]+ed(S[i]+S[i+1],U[j])
                if c<dp[i+2][j+1]: dp[i+2][j+1]=c; bk[i+2][j+1]=(2,1)
            if i<n and j+1<m:  # one piece = two words
                c=dp[i][j]+ed(S[i],U[j]+U[j+1])+1
                if c<dp[i+1][j+2]: dp[i+1][j+2]=c; bk[i+1][j+2]=(1,2)
    i,j=n,m; res=[]
    while i or j:
        a,b=bk[i][j]
        if (a,b)==(1,1): res.append([P[i-1]])
        elif (a,b)==(2,1): res.append([P[i-2]+' '+P[i-1]])
        else: res.append(['',P[i-1]])   # one piece covering two words: shown on the second, the first left empty
        i-=a; j-=b
    out=[x for g in reversed(res) for x in g]
    assert len(out)==m
    return out, dp[n][m]
