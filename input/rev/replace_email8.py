import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'r', encoding='utf-8') as f:
    content = f.read()

old = (
    '<!-- Labels row -->\n'
    '        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px 10px 16px;">\n'
    '          <div style="text-align: center;">\n'
    '            <div style="font-size: 16px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; font-family: \'Plus Jakarta Sans\', sans-serif;">Velo Decoded</div>\n'
    '          </div>\n'
    '          <div style="text-align: center;">\n'
    '            <div style="font-size: 16px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; font-family: \'Plus Jakarta Sans\', sans-serif;">Velo Course</div>\n'
    '          </div>\n'
    '        </div>'
)
new = (
    '<!-- Labels row -->\n'
    '        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px 10px 16px;">\n'
    '          <div style="text-align: left; padding-left: 2px;">\n'
    '            <div style="font-size: 16px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; font-family: \'Plus Jakarta Sans\', sans-serif;">Velo Decoded</div>\n'
    '          </div>\n'
    '          <div style="text-align: left; padding-left: 2px;">\n'
    '            <div style="font-size: 16px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; font-family: \'Plus Jakarta Sans\', sans-serif;">Velo Course</div>\n'
    '          </div>\n'
    '        </div>'
)

if old in content:
    content = content.replace(old, new, 1)
    print('OK')
else:
    print('NOT FOUND')

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'w', encoding='utf-8') as f:
    f.write(content)
