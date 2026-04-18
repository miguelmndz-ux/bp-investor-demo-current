import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

new_email_body = """<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<div style="background: linear-gradient(135deg, #fff7f0 0%, #fffaf5 100%); padding: 40px 24px 80px; font-family: 'Plus Jakarta Sans', 'Google Sans', Roboto, sans-serif; color: #2d2f31;">
  <div style="max-width: 740px; margin: 0 auto;">

    <!-- BuildParty logo (matches signup screen: Build bold + Party regular, near-black) -->
    <div style="text-align: center; margin-bottom: 32px; margin-top: 8px;">
      <span style="font-size: 22px; font-weight: 900; color: #0f172a; letter-spacing: -0.03em;">Build</span><span style="font-size: 22px; font-weight: 400; color: #0f172a; letter-spacing: -0.02em;">Party</span>
    </div>

    <!-- Glass email card -->
    <div style="background: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 20px 40px rgba(163,56,0,0.08); border-radius: 24px; overflow: hidden;">
      <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);"></div>

      <!-- Hero card -->
      <div style="background: linear-gradient(135deg, #fffcf0 0%, #fff2e0 40%, #ffe8d1 70%, #fff7ed 100%); margin: 20px; border-radius: 20px; padding: 30px 30px 28px; box-shadow: 0 8px 24px -4px rgba(255,107,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.7);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 22px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <!-- Velo logo: no border, soft shadow -->
            <div style="width: 62px; height: 62px; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.12); flex-shrink: 0;">
              <img src="https://ph-files.imgix.net/35242a30-6f23-4a79-aa44-0a1752c38f00.png" alt="Velo" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.parentElement.style.background='#231f1e';this.style.display='none'">
            </div>
            <div>
              <div style="font-size: 21px; font-weight: 900; color: #1a0a00; letter-spacing: -0.04em; line-height: 1.1;">Velo</div>
              <div style="font-size: 12px; color: #9f6c47; font-weight: 600; margin-top: 3px;">Async Video AI</div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(163,56,0,0.2); border-radius: 12px; padding: 8px 14px; background: rgba(255,255,255,0.45); flex-shrink: 0;">
            <span style="font-size: 22px; font-weight: 900; color: #9c3f00; line-height: 1;">#1</span>
            <span style="font-size: 8px; font-weight: 700; color: #9c3f00; text-transform: uppercase; letter-spacing: 0.1em; text-align: center; margin-top: 2px; line-height: 1.3;">Product<br>Hunt</span>
          </div>
        </div>
        <!-- Headline -->
        <div style="font-size: 26px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; line-height: 1.2; margin-bottom: 14px;">We decoded your product.<br>Here's what we built <span style="color: #a33800;">for your live demo.</span></div>
        <!-- Subheadline -->
        <p style="font-size: 14px; color: #7a4a28; line-height: 1.65; margin: 0; font-weight: 500; max-width: 560px;">You demo Velo in a real async video workflow — 50 AI builders ask questions live, see it in action, and walk away knowing how to use it. Nova hosts, Echo captures every insight, and Apex handles the broadcast.</p>
      </div>

      <!-- Combined Decode + Course card -->
      <div style="margin: 0 20px 20px; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(163,56,0,0.06); border: 1px solid rgba(230,220,210,0.5);">
        <!-- Split screenshot view -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px 10px 0;">
          <!-- Decode sub-card -->
          <div style="border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <div style="background: rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 5px 8px; display: flex; align-items: center; gap: 4px;">
              <div style="width: 5px; height: 5px; border-radius: 50%; background: rgba(0,0,0,0.15);"></div>
              <div style="width: 5px; height: 5px; border-radius: 50%; background: rgba(0,0,0,0.1);"></div>
              <div style="width: 5px; height: 5px; border-radius: 50%; background: rgba(0,0,0,0.07);"></div>
              <div style="flex: 1; height: 8px; border-radius: 9999px; background: rgba(0,0,0,0.06); margin-left: 4px;"></div>
            </div>
            <img src="http://localhost:3000/apex/velo-decode-preview.png" alt="Velo Decoded" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; object-position: top; display: block;" onerror="this.style.background='linear-gradient(135deg,#0f1432,#1e2b6e)';this.style.height='100px';this.removeAttribute('src')">
          </div>
          <!-- Course sub-card -->
          <div style="border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <div style="background: rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 5px 8px; display: flex; align-items: center; gap: 4px;">
              <div style="width: 5px; height: 5px; border-radius: 50%; background: rgba(0,0,0,0.15);"></div>
              <div style="width: 5px; height: 5px; border-radius: 50%; background: rgba(0,0,0,0.1);"></div>
              <div style="width: 5px; height: 5px; border-radius: 50%; background: rgba(0,0,0,0.07);"></div>
              <div style="flex: 1; height: 8px; border-radius: 9999px; background: rgba(0,0,0,0.06); margin-left: 4px;"></div>
            </div>
            <img src="http://localhost:3000/apex/velo-microcourse-preview.png" alt="Velo Course" style="width: 100%; aspect-ratio: 4/3; object-fit: cover; object-position: top; display: block;" onerror="this.style.background='linear-gradient(135deg,#0f2d1a,#1a5c36)';this.style.height='100px';this.removeAttribute('src')">
          </div>
        </div>
        <!-- Labels row -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 14px 14px 18px;">
          <div style="padding: 0 4px;">
            <div style="display: inline-block; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; border-radius: 9999px; padding: 3px 10px; background: rgba(37,99,235,0.09); color: #2563eb; margin-bottom: 7px;">Decode</div>
            <div style="font-size: 14px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 5px;">Velo Decoded</div>
            <div style="font-size: 12px; color: #7a4a28; line-height: 1.6; font-weight: 500;">A technical teardown of your AI video pipeline — architecture, browser agent capture, and avatar synthesis — so builders understand it before they build with it.</div>
          </div>
          <div style="padding: 0 4px;">
            <div style="display: inline-block; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; border-radius: 9999px; padding: 3px 10px; background: rgba(16,185,129,0.09); color: #059669; margin-bottom: 7px;">Course</div>
            <div style="font-size: 14px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 5px;">Velo Course</div>
            <div style="font-size: 12px; color: #7a4a28; line-height: 1.6; font-weight: 500;">Three hands-on modules where builders replicate your async video workflow using real tools — ending with a working prototype they built live.</div>
          </div>
        </div>
      </div>

      <!-- AI Team: 3-column grid like What to Expect, not a vertical list -->
      <div style="margin: 0 20px 20px;">
        <p style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.22em; color: #9e6b47; text-align: center; margin-bottom: 16px;">Managed by Your AI Team</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">

          <!-- Nova -->
          <div style="background: rgba(255,255,255,0.72); border: 1px solid rgba(255,255,255,0.55); box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-radius: 20px; padding: 24px 18px; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="position: relative; margin-bottom: 16px;">
              <div style="position: absolute; inset: -8px; background: rgba(147,197,253,0.28); filter: blur(20px); border-radius: 50%;"></div>
              <div style="width: 68px; height: 68px; border-radius: 50%; background: #dbeafe; border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; position: relative;">
                <svg viewBox="0 0 24 24" style="width: 32px; height: 32px;"><path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z" fill="#2563eb"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#2563eb"/></svg>
              </div>
            </div>
            <div style="font-size: 16px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; margin-bottom: 3px;">Nova</div>
            <div style="font-size: 10px; font-weight: 700; color: #2563eb; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">AI Host</div>
            <p style="font-size: 12px; color: #7a4a28; line-height: 1.6; font-weight: 500; margin: 0;">Runs the live session — managing the flow, fielding questions, and keeping 50 builders engaged.</p>
            <div style="margin-top: 14px; width: 100%; height: 3px; background: rgba(0,0,0,0.05); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; background: #2563eb; width: 100%; border-radius: 9999px; opacity: 0.7;"></div>
            </div>
          </div>

          <!-- Echo -->
          <div style="background: rgba(255,255,255,0.72); border: 1px solid rgba(255,255,255,0.55); box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-radius: 20px; padding: 24px 18px; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="position: relative; margin-bottom: 16px;">
              <div style="position: absolute; inset: -8px; background: rgba(110,231,183,0.28); filter: blur(20px); border-radius: 50%;"></div>
              <div style="width: 68px; height: 68px; border-radius: 50%; background: #d1fae5; border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; position: relative;">
                <svg viewBox="0 0 24 24" style="width: 32px; height: 32px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z" fill="#059669"/></svg>
              </div>
            </div>
            <div style="font-size: 16px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; margin-bottom: 3px;">Echo</div>
            <div style="font-size: 10px; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Session Memory</div>
            <p style="font-size: 12px; color: #7a4a28; line-height: 1.6; font-weight: 500; margin: 0;">Captures every insight — generating searchable notes and highlight clips from your session automatically.</p>
            <div style="margin-top: 14px; width: 100%; height: 3px; background: rgba(0,0,0,0.05); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; background: #059669; width: 100%; border-radius: 9999px; opacity: 0.7;"></div>
            </div>
          </div>

          <!-- Apex -->
          <div style="background: rgba(255,255,255,0.72); border: 1px solid rgba(255,255,255,0.55); box-shadow: 0 4px 20px rgba(0,0,0,0.05); border-radius: 20px; padding: 24px 18px; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="position: relative; margin-bottom: 16px;">
              <div style="position: absolute; inset: -8px; background: rgba(251,191,36,0.28); filter: blur(20px); border-radius: 50%;"></div>
              <div style="width: 68px; height: 68px; border-radius: 50%; background: #fef3c7; border: 1px solid rgba(255,255,255,0.7); box-shadow: 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; position: relative;">
                <svg viewBox="0 0 24 24" style="width: 32px; height: 32px;"><path d="M7 2v11h3v9l7-12h-4l4-8z" fill="#c2780a"/></svg>
              </div>
            </div>
            <div style="font-size: 16px; font-weight: 900; color: #1a0a00; letter-spacing: -0.03em; margin-bottom: 3px;">Apex</div>
            <div style="font-size: 10px; font-weight: 700; color: #c2780a; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">Launch Agent</div>
            <p style="font-size: 12px; color: #7a4a28; line-height: 1.6; font-weight: 500; margin: 0;">Amplifies your broadcast across Product Hunt and builder communities — tracking reach and engagement in real time.</p>
            <div style="margin-top: 14px; width: 100%; height: 3px; background: rgba(0,0,0,0.05); border-radius: 9999px; overflow: hidden;">
              <div style="height: 100%; background: #c2780a; width: 100%; border-radius: 9999px; opacity: 0.7;"></div>
            </div>
          </div>

        </div>
      </div>

      <!-- CTA section -->
      <div style="margin: 0 20px 24px;">
        <div style="background: linear-gradient(135deg, #fffcf0 0%, #fff2e0 40%, #ffe8d1 70%, #fff7ed 100%); border-radius: 16px; padding: 20px 24px; box-shadow: 0 8px 24px -4px rgba(255,107,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: space-between; gap: 16px;">
          <div>
            <div style="font-size: 16px; font-weight: 800; color: #1a0a00; letter-spacing: -0.02em; margin-bottom: 5px;">Build with Video AI</div>
            <div style="font-size: 12px; color: #9f6c47; font-weight: 600; display: flex; align-items: center; gap: 5px;">
              <svg viewBox="0 0 24 24" style="width: 13px; height: 13px; flex-shrink: 0;"><circle cx="12" cy="12" r="9" stroke="#9f6c47" stroke-width="2" fill="none"/><polyline points="12 7 12 12 15.5 14" stroke="#9f6c47" stroke-width="2" stroke-linecap="round" fill="none"/></svg>
              60 min session
            </div>
          </div>
          <a href="#" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #a33800 0%, #ff7941 100%); color: white; font-weight: 800; font-size: 14px; border-radius: 9999px; text-decoration: none; box-shadow: 0 10px 24px rgba(163,56,0,0.22); white-space: nowrap; letter-spacing: -0.01em; border-top: 1px solid rgba(255,255,255,0.2);">Accept Invite</a>
        </div>
      </div>

    </div>
  </div>
</div>"""

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'r', encoding='utf-8') as f:
    content = f.read()

email_body_start = 6091681
email_body_end = 6103810

new_content = content[:email_body_start] + new_email_body + content[email_body_end:]

with open('C:/Users/mmcon/Documents/Code/bp-investor-demo-current/web/public/gmail-flow/email.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done. New file size:', len(new_content))
print('Replaced', email_body_end - email_body_start, 'chars with', len(new_email_body), 'chars')
