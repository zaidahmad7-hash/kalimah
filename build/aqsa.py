# Masjid al-Aqsa (Dome of the Rock) mark. One source for the icons and the in-app animation.
BG='#0B0B0C'; GOLD='#C8A862'; GOLD_HI='#E6CF8F'; GOLD_LO='#9E7E3E'; TILE='#A9C5D6'; TILE_DK='#7FA3B8'
def arches(x0,x1,n,y_top,y_bot,w,cls=''):
    out=[];step=(x1-x0)/n
    for i in range(n):
        cx=x0+step*(i+.5);r=w/2
        out.append(f'<path class="{cls}" d="M{cx-r:.2f} {y_bot} V{y_top+r:.2f} A{r:.2f} {r:.2f} 0 0 1 {cx+r:.2f} {y_top+r:.2f} V{y_bot} Z" fill="{BG}"/>')
    return ''.join(out)
def svg(size=None, animated=False, uid='a', pad=1.0, shimmer=False):
    s=f' width="{size}" height="{size}"' if size else ''
    # scale around centre for icon padding
    tf=f' transform="translate(50 50) scale({pad}) translate(-50 -44)"'
    dome='M33 47 C33 31 41 23.5 50 22 C59 23.5 67 31 67 47 Z'
    g=f'''<svg{s} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="aqsa{' anim' if animated else ''}">
<defs><linearGradient id="dg-{uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{GOLD_HI}"/><stop offset=".55" stop-color="{GOLD}"/><stop offset="1" stop-color="{GOLD_LO}"/></linearGradient>
{f'<linearGradient id="sh-{uid}" x1="-1" y1="0" x2="0" y2="0" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/><animate attributeName="x1" values="-1;2" dur="7s" repeatCount="indefinite"/><animate attributeName="x2" values="0;3" dur="7s" repeatCount="indefinite"/></linearGradient>' if shimmer else ''}
<clipPath id="dc-{uid}"><path d="{dome}"/></clipPath></defs>
<g{tf}>
 <g class="walls">
  <rect x="14" y="76.5" width="72" height="2.2" rx="1" fill="{GOLD}"/>
  <rect x="19" y="58" width="62" height="18.5" fill="{TILE}"/>
  <rect x="17.5" y="55.6" width="65" height="2.6" rx=".6" fill="{TILE_DK}"/>
  {arches(19,81,7,62,73,4.2)}
  <path d="M45.5 76.5 V64 A4.5 4.5 0 0 1 54.5 64 V76.5 Z" fill="{BG}"/>
  <rect x="34" y="47" width="32" height="8.6" fill="{TILE}"/>
  <rect x="33" y="46" width="34" height="1.6" rx=".5" fill="{GOLD}"/>
  {arches(34,66,6,48.6,54,2.2)}
 </g>
 <g class="dome"><path d="{dome}" fill="url(#dg-{uid})"/>{f'<rect x="30" y="20" width="40" height="28" fill="url(#sh-{uid})" clip-path="url(#dc-{uid})"/>' if shimmer else ''}
  <path class="dome-line" d="{dome}" fill="none" stroke="{GOLD_HI}" stroke-width=".6" opacity="0"/></g>
 <g class="crest"><rect x="49.4" y="11.6" width="1.2" height="11" fill="{GOLD}"/><circle cx="50" cy="16" r="1.3" fill="{GOLD}"/>
  <path d="M46.2 9.4 A3.8 3.8 0 0 0 53.8 9.4 A5 5 0 0 1 46.2 9.4 Z" fill="{GOLD_HI}"/></g>
</g></svg>'''
    return g
if __name__=='__main__':
    import sys
    open(sys.argv[1],'w').write(svg(512,uid='p'))
