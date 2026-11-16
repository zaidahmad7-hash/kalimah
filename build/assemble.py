# Builds app/index.html from the template, the surah index and the logo.
import os
B=os.path.dirname(os.path.abspath(__file__)); A=os.path.join(B,'..','app')
t=open(f'{B}/template.html').read()
t=t.replace('__INDEX__',open(f'{B}/index_inline.json').read().strip())
t=t.replace('__MOSQUE__',open(f'{B}/logo_header.svg').read().replace("'","\\'"))
t=t.replace('__SPLASH__',open(f'{B}/logo_splash.svg').read())
assert '__' not in ''.join(x for x in ['__INDEX__','__MOSQUE__','__SPLASH__'] if x in t)
open(f'{A}/index.html','w').write(t)
print('built')
