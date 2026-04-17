import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the email body start marker
marker = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans'
start = content.find(marker)
if start == -1:
    print('START MARKER NOT FOUND')
    sys.exit(1)

print(f'Found start at: {start}')

# Find the closing </div> that wraps the outermost email div
# The email body is wrapped in a single root div — find its end by counting div nesting
# First find where the root div starts
div_start = content.find('<div', start)
print(f'Root div starts at: {div_start}')

# Count nested divs to find the matching close
depth = 0
i = div_start
while i < len(content):
    if content[i:i+5] == '<div ':
        depth += 1
        i += 5
    elif content[i:i+4] == '<div':
        depth += 1
        i += 4
    elif content[i:i+6] == '</div>':
        depth -= 1
        if depth == 0:
            end = i + 6
            break
        i += 6
    else:
        i += 1

print(f'Root div ends at: {end}')
email_body_html = content[start:end]
print(f'Email body length: {len(email_body_html)}')

# Write as standalone HTML file
standalone = f'''<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{ background: transparent; }}
  </style>
</head>
<body>
{email_body_html}
</body>
</html>'''

out_path = 'C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email-body.html'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(standalone)

print(f'Written to {out_path}')
