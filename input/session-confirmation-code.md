<!DOCTYPE html>                                                      
  <html lang="en">
  <head>                                                               
    <meta charset="UTF-8" />                                           
    <meta name="viewport" content="width=device-width,                 
  initial-scale=1.0" />                                                
    <title>BuildParty — You're Confirmed</title>              
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400
  ;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      *, *::before, *::after { box-sizing: border-box; margin: 0;
  padding: 0; }
      body { font-family: 'Inter', sans-serif; background: #FAFAF7;
  min-height: 100vh; }

      /* Nav */
      nav {
        height: 52px;
        background: #FFFFFF;
        border-bottom: 1px solid #E8E4DC;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo { font-size: 18px; color: #0f172a; }
      .logo strong { font-weight: 700; }

      /* Page */
      .page {
        max-width: 680px;
        margin: 0 auto;
        padding: 48px 24px 80px;
      }

      /* Success header */
      .success-header { text-align: center; margin-bottom: 40px; }
      .check-circle {
        width: 64px; height: 64px; border-radius: 50%;
        background: linear-gradient(135deg, #15803d, #22c55e);
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 20px;
        box-shadow: 0 4px 20px rgba(21, 128, 61, 0.25);
      }
      .check-circle svg { color: #fff; }
      h1 {
        font-size: 32px; font-weight: 800; color: #1A1A2E;
        line-height: 1.2; margin-bottom: 10px; letter-spacing: -0.02em;
      }
      .subtitle { font-size: 16px; color: #767676; line-height: 1.6;
  max-width: 440px; margin: 0 auto; }

      /* Cards */
      .card {
        background: #FFFFFF;
        border: 1px solid #E8E4DC;
        border-radius: 16px;
        padding: 24px 28px;
        margin-bottom: 32px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      }

      /* Session details */
      .session-header {
        display: flex; align-items: center; gap: 16px;
        margin-bottom: 20px; padding-bottom: 18px;
        border-bottom: 1px solid #E8E4DC;
      }
      .session-header img {
        width: 48px; height: 48px; border-radius: 10px;
        object-fit: cover; flex-shrink: 0;
      }
      .session-title { font-size: 17px; font-weight: 700; color:
  #1A1A2E; margin-bottom: 2px; }
      .session-sub { font-size: 13px; color: #767676; }

      .meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 16px;
      }
      .meta-item { display: flex; align-items: center; gap: 10; }
      .meta-icon {
        width: 36px; height: 36px; border-radius: 10px;
        background: #FFF5F1;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .meta-icon svg { width: 16px; height: 16px; stroke: #FF6B35;
  fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin:
  round; }
      .meta-label {
        font-size: 11px; color: #767676; margin-bottom: 2px;
        text-transform: uppercase; letter-spacing: 0.04em; font-weight:
   600;
      }
      .meta-value { font-size: 13px; font-weight: 600; color: #1A1A2E;
  }

      .calendar-hint {
        display: flex; align-items: center; gap: 8px;
        margin-top: 18px; padding-top: 16px;
        border-top: 1px solid #E8E4DC;
      }
      .calendar-hint svg { width: 14px; height: 14px; stroke: #16a34a;
  fill: none; stroke-width: 2.5; stroke-linecap: round;
  stroke-linejoin: round; }
      .calendar-hint span { font-size: 12px; color: #16a34a;
  font-weight: 500; }

      /* What happens next */
      .next-title { font-size: 15px; font-weight: 700; color: #1A1A2E;
  margin-bottom: 18px; }
      .steps { display: flex; flex-direction: column; gap: 14px; }
      .step { display: flex; align-items: flex-start; gap: 14px; }
      .step-num {
        width: 26px; height: 26px; border-radius: 50%;
        background: #FFF5F1;
        display: flex; align-items: center; justify-content: center;
        font-size: 13px; font-weight: 700; color: #FF6B35;
        flex-shrink: 0;
      }
      .step-text { font-size: 14px; color: #374151; line-height: 1.6;
  padding-top: 2px; }

      /* CTA */
      .cta-wrap { text-align: center; }
      .btn-cta {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 16px 36px;
        background: #FF6B35; color: #FFFFFF;
        font-size: 16px; font-weight: 600;
        border: none; border-radius: 12px;
        cursor: pointer; font-family: 'Inter', sans-serif;
        box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
        transition: transform 0.15s, box-shadow 0.15s;
      }
      .btn-cta:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(255, 107, 53, 0.35);
      }
      .btn-cta svg { width: 18px; height: 18px; stroke: #fff; fill:
  none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
   }
      .cta-hint { font-size: 13px; color: #767676; margin-top: 12px; }
    </style>
  </head>
  <body>

    <nav>
      <div class="logo"><strong>Build</strong>Party</div>
    </nav>

    <div class="page">

      <!-- Success header -->
      <div class="success-header">
        <div class="check-circle">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" 
  stroke="white" stroke-width="3" stroke-linecap="round" 
  stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1>You're confirmed, Rustam.</h1>
        <p class="subtitle">Your BuildParty launch session is locked
  in. Here's what happens next.</p>
      </div>

      <!-- Session details card -->
      <div class="card">
        <div class="session-header">
          <img src="/assets/novavoice-logo.png" alt="NovaVoice" />
          <div>
            <div class="session-title">NovaVoice Live: Build with
  Voice</div>
            <div class="session-sub">A BuildParty Launch Session</div>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-item">
            <div class="meta-icon">
              <!-- Calendar icon -->
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" 
  height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line
   x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" 
  y2="10"/></svg>
            </div>
            <div>
              <div class="meta-label">Date</div>
              <div class="meta-value">Thu, April 10</div>
            </div>
          </div>

          <div class="meta-item">
            <div class="meta-icon">
              <!-- Clock icon -->
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" 
  r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <div class="meta-label">Time</div>
              <div class="meta-value">3:00 PM PT</div>
            </div>
          </div>

          <div class="meta-item">
            <div class="meta-icon">
              <!-- Users icon -->
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0
  0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23
  21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <div class="meta-label">Duration</div>
              <div class="meta-value">50 min</div>
            </div>
          </div>
        </div>

        <div class="calendar-hint">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4
  12"/></svg>
          <span>Calendar invite sent to rustam@novavoice.app</span>
        </div>
      </div>

      <!-- What happens next -->
      <div class="card">
        <div class="next-title">What happens next</div>
        <div class="steps">
          <div class="step">
            <div class="step-num">1</div>
            <div class="step-text">Apex is building your shareable
  event page with your decoded profile, session agenda, and speaker
  bio.</div>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <div class="step-text">We'll send you a link to review and
  share on Product Hunt and socials.</div>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <div class="step-text">Nova will brief you in the green
  room 15 minutes before your session.</div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-wrap">
        <button class="btn-cta">
          <!-- UserPlus icon -->
          <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4
   4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" 
  x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Create your BuildParty account
          <!-- ArrowRight icon -->
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" 
  y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
        <div class="cta-hint">We'll pre-fill everything from your
  Product Hunt launch.</div>
      </div>

    </div>

  </body>
  </html>