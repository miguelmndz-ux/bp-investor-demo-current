import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_style = 'font-size: 13px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em;'
new_style = 'font-size: 16px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; font-family: \'Plus Jakarta Sans\', sans-serif;'

count = content.count(old_style)
print(f'Found {count} occurrence(s)')
content = content.replace(old_style, new_style)

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done.')
