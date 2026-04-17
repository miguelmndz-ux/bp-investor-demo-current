import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix "Managed by Your AI Team" label — remove all-caps, match design system
old_label = '<p style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.22em; color: #9e6b47; text-align: center; margin-bottom: 16px;">Managed by Your AI Team</p>'
new_label = '<p style="font-size: 13px; font-weight: 700; color: #9e6b47; text-align: center; margin-bottom: 16px; letter-spacing: -0.01em;">Managed by your AI team</p>'
if old_label in content:
    content = content.replace(old_label, new_label, 1)
    print('Label fixed OK')
else:
    print('Label NOT FOUND')

# 2. Remove the three bottom color bar divs (one per agent card)
old_bar = (
    '\n            <div style="margin-top: 14px; width: 100%; height: 3px; background: rgba(0,0,0,0.05); border-radius: 9999px; overflow: hidden;">\n'
    '              <div style="height: 100%; background: #2563eb; width: 100%; border-radius: 9999px; opacity: 0.7;"></div>\n'
    '            </div>'
)
if old_bar in content:
    content = content.replace(old_bar, '', 1)
    print('Nova bar removed OK')
else:
    print('Nova bar NOT FOUND')

old_bar2 = (
    '\n            <div style="margin-top: 14px; width: 100%; height: 3px; background: rgba(0,0,0,0.05); border-radius: 9999px; overflow: hidden;">\n'
    '              <div style="height: 100%; background: #059669; width: 100%; border-radius: 9999px; opacity: 0.7;"></div>\n'
    '            </div>'
)
if old_bar2 in content:
    content = content.replace(old_bar2, '', 1)
    print('Echo bar removed OK')
else:
    print('Echo bar NOT FOUND')

old_bar3 = (
    '\n            <div style="margin-top: 14px; width: 100%; height: 3px; background: rgba(0,0,0,0.05); border-radius: 9999px; overflow: hidden;">\n'
    '              <div style="height: 100%; background: #c2780a; width: 100%; border-radius: 9999px; opacity: 0.7;"></div>\n'
    '            </div>'
)
if old_bar3 in content:
    content = content.replace(old_bar3, '', 1)
    print('Apex bar removed OK')
else:
    print('Apex bar NOT FOUND')

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done. Size:', len(content))
