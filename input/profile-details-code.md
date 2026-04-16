<!DOCTYPE html>                                                      
  <html lang="en">                                                     
  <head>                                                               
    <meta charset="UTF-8" />                                           
    <meta name="viewport" content="width=device-width,                 
  initial-scale=1.0" />                                       
    <title>BuildParty — The Final Details</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400
  ;500;600;700&display=swap" rel="stylesheet" />
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0;
  padding: 0; }
      body { font-family: 'Inter', sans-serif; display: flex; height:
  100vh; overflow: hidden; }

      /* ── Left panel ── */
      .left {
        flex: 1;
        background: #FAFAF7;
        display: flex;
        flex-direction: column;
        padding: 32px 40px;
      }
      .logo { font-size: 18px; color: #0f172a; margin-bottom: 48px; }
      .logo strong { font-weight: 700; }

      .brand-center {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .brand-label {
        font-size: 13px;
        color: #767676;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 16px;
        font-weight: 500;
      }

      .preview-card {
        width: 340px;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 2px 16px rgba(0,0,0,0.08);
        background: #fff;
      }
      .card-header {
        background: #1A1A2E;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .card-header img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        object-fit: cover;
        background: #2a2a40;
      }
      .card-title { color: #fff; font-size: 15px; font-weight: 600;
  line-height: 1.3; }
      .card-sub { color: #aaa; font-size: 12px; margin-top: 2px; }

      .card-body { padding: 20px 24px; }
      .skeleton {
        height: 10px;
        background: #E8E4DC;
        border-radius: 4px;
        margin-bottom: 10px;
      }

      .card-footer {
        padding: 14px 24px 18px;
        border-top: 1px solid #E8E4DC;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .card-footer span { font-size: 13px; color: #767676; }
      .color-row { display: flex; align-items: center; gap: 8px; }
      .color-dot {
        width: 22px; height: 22px;
        border-radius: 50%;
        background: #FF6B35;
        border: 2px solid #E8E4DC;
      }

      /* ── Right panel ── */
      .right {
        flex: 1;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .form-box { width: 100%; max-width: 380px; padding: 0 24px; }

      h1 {
        font-size: 28px;
        font-weight: 700;
        color: #1A1A2E;
        margin-bottom: 32px;
      }

      .row { display: flex; gap: 12px; margin-bottom: 18px; }
      .field { flex: 1; margin-bottom: 18px; }
      .field:last-child { margin-bottom: 28px; }

      label {
        display: block;
        font-size: 13px;
        font-weight: 500;
        color: #767676;
        margin-bottom: 6px;
      }
      input {
        width: 100%;
        padding: 12px 14px;
        font-size: 15px;
        color: #1A1A2E;
        background: #FAFAF7;
        border: 1px solid #E8E4DC;
        border-radius: 10px;
        outline: none;
        font-family: 'Inter', sans-serif;
      }

      .btn-cta {
        width: 100%;
        padding: 14px 0;
        background: #FF6B35;
        color: #fff;
        font-size: 16px;
        font-weight: 600;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        margin-bottom: 20px;
        transition: transform 0.15s, box-shadow 0.15s;
        box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
      }
      .btn-cta:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.35);
      }

      .change-email {
        text-align: center;
        font-size: 13px;
        color: #767676;
      }
      .change-email a { color: #FF6B35; font-weight: 500; cursor:
  pointer; text-decoration: none; }
    </style>
  </head>
  <body>

    <!-- Left panel -->
    <div class="left">
      <div class="logo"><strong>Build</strong>Party</div>

      <div class="brand-center">
        <div class="brand-label">Your brand has been set up</div>

        <div class="preview-card">
          <div class="card-header">
            <img src="/assets/novavoice-logo.png" alt="NovaVoice" />
            <div>
              <div class="card-title">NovaVoice Live: Build with
  Voice</div>
              <div class="card-sub">Hosted on BuildParty</div>
            </div>
          </div>

          <div class="card-body">
            <div class="skeleton" style="width:100%"></div>
            <div class="skeleton" style="width:80%"></div>
            <div class="skeleton" style="width:60%"></div>
            <div class="skeleton" style="width:90%;
  margin-bottom:0"></div>
          </div>

          <div class="card-footer">
            <span>Upload logo</span>
            <div class="color-row">
              <span>Brand color</span>
              <div class="color-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right panel -->
    <div class="right">
      <div class="form-box">
        <h1>The final details</h1>

        <div class="row">
          <div style="flex:1">
            <label>First name</label>
            <input type="text" value="Rustam" readonly />
          </div>
          <div style="flex:1">
            <label>Last name</label>
            <input type="text" value="Khasanov" readonly />
          </div>
        </div>

        <div class="field">
          <label>Email</label>
          <input type="email" value="rustam@novavoice.app" readonly />
        </div>

        <div class="field">
          <label>Company</label>
          <input type="text" value="NovaVoice" readonly />
        </div>

        <div class="field" style="margin-bottom:28px">
          <label>Role</label>
          <input type="text" value="Co-founder & CEO" readonly />
        </div>

        <button class="btn-cta">Continue</button>

        <div class="change-email">
          rustam@novavoice.app <a href="#">Change email</a>
        </div>
      </div>
    </div>

  </body>
  </html>