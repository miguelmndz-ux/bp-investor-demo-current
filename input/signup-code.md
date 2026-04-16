<!DOCTYPE html>                                                      
  <html lang="en">                                                     
  <head>                                                               
    <meta charset="UTF-8" />                                           
    <meta name="viewport" content="width=device-width,        
  initial-scale=1.0" />                                              
    <title>BuildParty — Sign Up</title>                              
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400
  ;500;600;700&display=swap" rel="stylesheet" />
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0;
  padding: 0; }
      body { font-family: 'Inter', sans-serif; min-height: 100vh;
  display: flex; }

      /* ── Left panel ── */
      .left {
        flex: 1;
        background: #FAFAF7;
        display: flex;
        flex-direction: column;
        padding: 36px 40px;
        overflow: hidden;
      }
      .logo { font-size: 18px; color: #0f172a; margin-bottom: 40px; }
      .logo strong { font-weight: 700; }
      .logo span { font-weight: 400; }

      .grid {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        align-content: center;
        max-width: 480px;
        margin: 0 auto;
        width: 100%;
      }
      .card {
        border-radius: 14px;
        display: flex;
        align-items: flex-end;
        padding: 14px 16px;
        position: relative;
        overflow: hidden;
      }
      .card::before {
        content: '';
        position: absolute;
        top: 14px; right: 14px;
        width: 28px; height: 28px;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
      }
      .card::after {
        content: '';
        position: absolute;
        top: 16px; left: 16px;
        width: 50%; height: 6px;
        border-radius: 3px;
        background: rgba(0,0,0,0.06);
      }
      .card-label {
        font-size: 12px;
        font-weight: 600;
        color: rgba(0,0,0,0.4);
        letter-spacing: 0.01em;
        position: relative;
        z-index: 1;
      }

      .partners {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 28px;
        padding-top: 36px;
        flex-wrap: wrap;
      }
      .partners span {
        font-size: 13px;
        font-weight: 500;
        color: #a1a1aa;
        letter-spacing: 0.01em;
        white-space: nowrap;
      }

      /* ── Right panel ── */
      .right {
        flex: 1;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px 40px;
      }
      .form-box { width: 100%; max-width: 380px; }

      h1 {
        font-size: 28px;
        font-weight: 700;
        color: #1A1A2E;
        margin-bottom: 10px;
        letter-spacing: -0.02em;
        line-height: 1.2;
      }
      .subtitle {
        font-size: 15px;
        color: #767676;
        line-height: 1.5;
        margin-bottom: 32px;
      }

      .btn-google {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 12px 0;
        background: #FFFFFF;
        border: 1px solid #E8E4DC;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 500;
        color: #1A1A2E;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        transition: background 0.15s;
      }
      .btn-google:hover { background: #FAFAF7; }

      .divider {
        display: flex;
        align-items: center;
        gap: 16px;
        margin: 24px 0;
      }
      .divider hr { flex: 1; border: none; border-top: 1px solid
  #E8E4DC; }
      .divider span { font-size: 13px; color: #a1a1aa; font-weight:
  500; }

      input[type="email"] {
        width: 100%;
        padding: 12px 16px;
        font-size: 15px;
        color: #1A1A2E;
        border: 1px solid #E8E4DC;
        border-radius: 10px;
        outline: none;
        font-family: 'Inter', sans-serif;
        background: #FAFAF7;
        margin-bottom: 16px;
      }

      .btn-cta {
        width: 100%;
        padding: 14px 0;
        background: #FF6B35;
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
        transition: transform 0.15s, box-shadow 0.15s;
      }
      .btn-cta:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.35);
      }

      .terms {
        font-size: 13px;
        color: #a1a1aa;
        text-align: center;
        margin-top: 16px;
        line-height: 1.5;
      }
      .login-link {
        font-size: 14px;
        color: #767676;
        text-align: center;
        margin-top: 28px;
      }
      .login-link a { color: #FF6B35; font-weight: 500; cursor:
  pointer; text-decoration: none; }
    </style>
  </head>
  <body>

    <!-- Left panel -->
    <div class="left">
      <div class="logo"><strong>Build</strong><span>Party</span></div>

      <div class="grid">
        <div class="card" style="background:#FFF5F1;
  height:120px;"><span class="card-label">Live Build
  Session</span></div>
        <div class="card" style="background:#E8F4FD;
  height:90px;"><span class="card-label">Voice AI Workshop</span></div>
        <div class="card" style="background:#F0FDF4;
  height:100px;"><span class="card-label">Launch Day Demo</span></div>
        <div class="card" style="background:#FEF3C7;
  height:80px;"><span class="card-label">CoBuild: RAG
  Pipeline</span></div>
        <div class="card" style="background:#F3E8FF;
  height:110px;"><span class="card-label">Agent Showcase</span></div>
        <div class="card" style="background:#FFF1F2;
  height:95px;"><span class="card-label">Community Kickoff</span></div>
      </div>

      <div class="partners">
        <span>ElevenLabs</span>
        <span>LiveKit</span>
        <span>LangChain</span>
        <span>Anthropic</span>
        <span>AI Collective</span>
      </div>
    </div>

    <!-- Right panel -->
    <div class="right">
      <div class="form-box">
        <h1>Launch on BuildParty</h1>
        <p class="subtitle">Go live with your builder community. No
  setup required.</p>

        <button class="btn-google">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21
  3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56
  13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98
  24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78
   7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53
  28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92
  16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13
  15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26
  0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Get started with Google
        </button>

        <div class="divider">
          <hr /><span>or</span><hr />
        </div>

        <input type="email" value="rustam@novavoice.app" readonly />

        <button class="btn-cta">Get started</button>

        <p class="terms">Signing up means you agree with our terms and
  conditions</p>

        <p class="login-link">Already have an account? <a href="#">Log
  in</a></p>
      </div>
    </div>

  </body>
  </html>