import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

new_email_body = """<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<div style="background: linear-gradient(135deg, #fff7f0 0%, #fffaf5 100%); padding: 40px 24px 80px; font-family: 'Plus Jakarta Sans', 'Google Sans', Roboto, sans-serif; color: #2d2f31;">
  <div style="max-width: 580px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 32px; margin-top: 8px;">
      <span style="font-size: 24px; font-weight: 900; color: #9c3f00; letter-spacing: -0.04em;">BuildParty</span>
    </div>
    <div style="background: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 20px 40px rgba(163,56,0,0.08); border-radius: 24px; overflow: hidden;">
      <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);"></div>
      <div style="background: linear-gradient(135deg, #fffcf0 0%, #fff2e0 40%, #ffe8d1 70%, #fff7ed 100%); margin: 20px; border-radius: 20px; padding: 28px 28px 24px; box-shadow: 0 8px 24px -4px rgba(255,107,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.7);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 62px; height: 62px; border-radius: 16px; background: #231f1e; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;">
              <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 30px; height: 30px;"><path d="M5 7L15 23L25 7" stroke="#ff7a2f" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div>
              <div style="font-size: 21px; font-weight: 900; color: #1a0a00; letter-spacing: -0.04em; line-height: 1.1;">Velo Live</div>
              <div style="font-size: 12px; color: #9f6c47; font-weight: 600; margin-top: 3px;">Async Video AI</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(163,56,0,0.2); border-radius: 12px; padding: 8px 14px; background: rgba(255,255,255,0.45); flex-shrink: 0;">
            <span style="font-size: 22px; font-weight: 900; color: #9c3f00; line-height: 1;">#1</span>
            <span style="font-size: 8px; font-weight: 700; color: #9c3f00; text-transform: uppercase; letter-spacing: 0.1em; text-align: center; margin-top: 2px; line-height: 1.3;">Product<br>Hunt</span>
          </div>
        </div>
        <div style="font-size: 26px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; line-height: 1.2; margin: 0;">We decoded your product.<br>Here's what we built <span style="color: #a33800;">for your live demo.</span></div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding: 4px 20px 20px;">
        <div style="background: white; border-radius: 16px; padding: 18px 14px; text-align: center; box-shadow: 0 4px 20px rgba(163,56,0,0.05); border: 1px solid rgba(230,220,210,0.5);">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: #f0f1f3; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;"><svg viewBox="0 0 24 24" style="width: 26px; height: 26px;"><path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" fill="#9c3f00"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#9c3f00"/></svg></div>
          <div style="font-size: 12px; font-weight: 800; color: #1a0a00; line-height: 1.3; margin-bottom: 4px;">Build with Voice</div>
          <div style="font-size: 9px; font-weight: 700; color: #9f6c47; text-transform: uppercase; letter-spacing: 0.08em;">Launch Agent</div>
        </div>
        <div style="background: white; border-radius: 16px; padding: 18px 14px; text-align: center; box-shadow: 0 4px 20px rgba(163,56,0,0.05); border: 1px solid rgba(230,220,210,0.5);">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: #f0f1f3; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;"><svg viewBox="0 0 24 24" style="width: 26px; height: 26px;"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="#9c3f00"/></svg></div>
          <div style="font-size: 12px; font-weight: 800; color: #1a0a00; line-height: 1.3; margin-bottom: 4px;">Velo Decoded</div>
          <div style="font-size: 9px; font-weight: 700; color: #9f6c47; text-transform: uppercase; letter-spacing: 0.08em;">Launch Agent</div>
        </div>
        <div style="background: white; border-radius: 16px; padding: 18px 14px; text-align: center; box-shadow: 0 4px 20px rgba(163,56,0,0.05); border: 1px solid rgba(230,220,210,0.5);">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: #f0f1f3; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;"><svg viewBox="0 0 24 24" style="width: 26px; height: 26px;"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 16.5L4 14v4.5l8 4.5 8-4.5V14l-8 5.5z" fill="#9c3f00"/></svg></div>
          <div style="font-size: 12px; font-weight: 800; color: #1a0a00; line-height: 1.3; margin-bottom: 4px;">Velo Course</div>
          <div style="font-size: 9px; font-weight: 700; color: #9f6c47; text-transform: uppercase; letter-spacing: 0.08em;">Launch Agent</div>
        </div>
      </div>
      <div style="margin: 0 20px 20px; background: #f0f1f3; border-radius: 16px; padding: 22px; border: 1px solid rgba(255,255,255,0.5);">
        <div style="margin-bottom: 16px;">
          <div style="font-size: 16px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em;">Your AI Team</div>
          <div style="font-size: 9px; font-weight: 700; color: #9f6c47; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 3px;">Running Your Session</div>
        </div>
        <div style="background: white; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="width: 42px; height: 42px; border-radius: 50%; background: #dbeafe; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" fill="#2563eb"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#2563eb"/></svg></div>
          <div style="flex: 1;"><div style="font-size: 13px; font-weight: 700; color: #1a0a00;">Nova</div><div style="font-size: 10px; color: #9f6c47; font-weight: 600; margin-top: 1px;">AI Host &amp; Room Orchestration</div></div>
          <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; flex-shrink: 0;"><path d="M9 18l6-6-6-6" stroke="#c0a08a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
        </div>
        <div style="background: white; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="width: 42px; height: 42px; border-radius: 50%; background: #d1fae5; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="#059669"/></svg></div>
          <div style="flex: 1;"><div style="font-size: 13px; font-weight: 700; color: #1a0a00;">Echo</div><div style="font-size: 10px; color: #9f6c47; font-weight: 600; margin-top: 1px;">Session Memory &amp; Recaps</div></div>
          <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; flex-shrink: 0;"><path d="M9 18l6-6-6-6" stroke="#c0a08a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
        </div>
        <div style="background: white; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <div style="width: 42px; height: 42px; border-radius: 50%; background: #fef3c7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><path d="M7 2v11h3v9l7-12h-4l4-8z" fill="#c2780a"/></svg></div>
          <div style="flex: 1;"><div style="font-size: 13px; font-weight: 700; color: #1a0a00;">Apex</div><div style="font-size: 10px; color: #9f6c47; font-weight: 600; margin-top: 1px;">Launch Agent &amp; Outreach</div></div>
          <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; flex-shrink: 0;"><path d="M9 18l6-6-6-6" stroke="#c0a08a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
        </div>
      </div>
      <div style="margin: 0 20px 24px;">
        <div style="background: rgba(255,255,255,0.6); border-radius: 16px; padding: 18px 22px; border: 1px solid rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: 0 4px 16px rgba(163,56,0,0.05);">
          <div>
            <div style="font-size: 15px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em;">Build with Video AI</div>
            <div style="font-size: 11px; color: #9f6c47; margin-top: 3px; font-weight: 600;">45 min session</div>
          </div>
          <a href="#" style="display: inline-block; padding: 13px 26px; background: linear-gradient(135deg, #a33800 0%, #ff7941 100%); color: white; font-weight: 800; font-size: 14px; border-radius: 9999px; text-decoration: none; box-shadow: 0 10px 24px rgba(163,56,0,0.22); white-space: nowrap; letter-spacing: -0.01em; border-top: 1px solid rgba(255,255,255,0.2);">Accept Invite</a>
        </div>
      </div>
    </div>
  </div>
</div>"""

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'r', encoding='utf-8') as f:
    content = f.read()

email_body_start = 6091681
email_body_end = 6094527

new_content = content[:email_body_start] + new_email_body + content[email_body_end:]

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done. New file size:', len(new_content))
print('Replaced', email_body_end - email_body_start, 'chars with', len(new_email_body), 'chars')
