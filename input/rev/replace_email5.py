import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Condense subheadline
old_sub = (
    'You demo Velo live in front of an audience of AI builders \u2014 they ask questions, go hands-on, and leave knowing how to use it.'
    '<br>'
    'A dedicated team of AI agents runs the room, captures every session insight, and amplifies your broadcast across communities.'
)
new_sub = (
    'Demo your product live to a room of AI builders who ask questions and go hands-on.'
    '<br>'
    'Our team of AI agents runs the session, captures every insight, and amplifies your reach.'
)
if old_sub in content:
    content = content.replace(old_sub, new_sub, 1)
    print('Subheadline replaced OK')
else:
    print('Subheadline NOT FOUND')

# 2. Strip badges + descriptions from labels row, keep only centered titles
old_labels = (
    '<!-- Labels row -->\n'
    '        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 14px 14px 18px;">\n'
    '          <div style="padding: 0 4px;">\n'
    '            <div style="display: inline-block; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; border-radius: 9999px; padding: 3px 10px; background: rgba(37,99,235,0.09); color: #2563eb; margin-bottom: 7px;">Decode</div>\n'
    '            <div style="font-size: 14px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 5px;">Velo Decoded</div>\n'
    '            <div style="font-size: 12px; color: #7a4a28; line-height: 1.6; font-weight: 500;">A technical teardown of your AI video pipeline \u2014 architecture, browser agent capture, and avatar synthesis \u2014 so builders understand it before they build with it.</div>\n'
    '          </div>\n'
    '          <div style="padding: 0 4px;">\n'
    '            <div style="display: inline-block; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; border-radius: 9999px; padding: 3px 10px; background: rgba(16,185,129,0.09); color: #059669; margin-bottom: 7px;">Course</div>\n'
    '            <div style="font-size: 14px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 5px;">Velo Course</div>\n'
    '            <div style="font-size: 12px; color: #7a4a28; line-height: 1.6; font-weight: 500;">Three hands-on modules where builders replicate your async video workflow using real tools \u2014 ending with a working prototype they built live.</div>\n'
    '          </div>\n'
    '        </div>'
)
new_labels = (
    '<!-- Labels row -->\n'
    '        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px 10px 16px;">\n'
    '          <div style="text-align: center;">\n'
    '            <div style="font-size: 13px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em;">Velo Decoded</div>\n'
    '          </div>\n'
    '          <div style="text-align: center;">\n'
    '            <div style="font-size: 13px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em;">Velo Course</div>\n'
    '          </div>\n'
    '        </div>'
)
if old_labels in content:
    content = content.replace(old_labels, new_labels, 1)
    print('Labels row replaced OK')
else:
    print('Labels row NOT FOUND')

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done. Size:', len(content))
