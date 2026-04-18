<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ChatGPT Image Loading State</title>
<style>
  /* =====================
     RESET & PAGE
  ===================== */
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #212121;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  /* =====================
     GLOBAL PAGE GLOW (fixed overlay)
  ===================== */
  .page-glow {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    animation: claude-pulse 2s ease-in-out infinite;
  }

  @keyframes claude-pulse {
    0%, 100% {
      box-shadow:
        rgba(217, 119, 87, 0.5) 0px 0px 10px 0px inset,
        rgba(217, 119, 87, 0.3) 0px 0px 20px 0px inset,
        rgba(217, 119, 87, 0.1) 0px 0px 30px 0px inset;
    }
    50% {
      box-shadow:
        rgba(217, 119, 87, 0.7) 0px 0px 15px 0px inset,
        rgba(217, 119, 87, 0.5) 0px 0px 25px 0px inset,
        rgba(217, 119, 87, 0.2) 0px 0px 35px 0px inset;
    }
  }

  /* =====================
     ENTRY SURFACE WRAPPER
     (handles the "unzip from corner" reveal)
  ===================== */
  .entry-surface {
    position: relative;
    width: 480px;
    max-width: 90vw;
    will-change: opacity, clip-path, transform;
    /* Start hidden - animated via JS class toggle */
    opacity: 0;
    clip-path: inset(0% 100% 100% 0% round 36px);
    transform: scale(0.985);
    transform-origin: 0% 0%;
    transition:
      opacity 0.5s ease-out,
      clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.5s ease-out;
  }

  .entry-surface.revealed {
    opacity: 1;
    clip-path: inset(0% 0% 0% 0% round 36px);
    transform: scale(1);
  }

  /* =====================
     LOADING CARD
  ===================== */
  .loading-card {
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* Square ratio */
    border-radius: 36px;
    overflow: hidden;
    background: rgba(47, 47, 47, 0.7);
    color: rgba(255, 255, 255, 0.7);
    transition: background-color 0.2s ease-out;
    isolation: isolate;
  }

  /* =====================
     HEADLINE TEXT
  ===================== */
  .loading-headline {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 17px;
    line-height: 23px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    z-index: 10;
    pointer-events: none;
  }

  /* =====================
     DOTS CONTAINER
     (clips top 56px to make room for headline)
  ===================== */
  .dots-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    clip-path: inset(56px 0px 0px 0px);
  }

  .dots-wrapper {
    width: 100%;
    height: 100%;
    /* Slight opacity controlled by JS */
  }

  /* =====================
     CANVAS
     (dots are drawn here via JS)
  ===================== */
  .dots-canvas {
    display: block;
    width: 100%;
    height: 100%;
    /* Diagonal gradient mask: corners fade out */
    -webkit-mask-image: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 1) 70%,
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 1) 70%,
      rgba(0, 0, 0, 0) 100%
    );
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
</style>
</head>
<body>

<!-- Global orange border glow -->
<div class="page-glow"></div>

<!-- The loading widget -->
<div class="entry-surface" id="entrySurface">
  <div class="loading-card">
    <!-- Status text -->
    <p class="loading-headline" id="headline">Creating image</p>

    <!-- Dot grid container -->
    <div class="dots-container">
      <div class="dots-wrapper" id="dotsWrapper">
        <canvas class="dots-canvas" id="dotsCanvas"></canvas>
      </div>
    </div>
  </div>
</div>

<script>
  // =====================
  // CONFIG
  // =====================
  const DOT_COLOR    = 'rgba(255, 255, 255, 1)'; // Base dot color
  const DOT_RADIUS   = 1.5;   // px radius of each dot
  const DOT_SPACING  = 18;    // px between dot centers
  const DOT_OPACITY_MIN  = 0.08;
  const DOT_OPACITY_MAX  = 0.55;
  const ANIM_DURATION    = 2200; // ms for one pulse cycle
  const STAGGER_RANGE    = 2000; // ms max random stagger offset
  const PULSE_SCALE_MIN  = 1.1;
  const PULSE_SCALE_MAX  = 1.6;

  // Status text cycle
  const HEADLINES = [
    'Creating image',
    'Making a sketch',
    'Adding detail',
    'Refining'
  ];
  let headlineIndex = 0;

  // =====================
  // CANVAS SETUP
  // =====================
  const canvas = document.getElementById('dotsCanvas');
  const wrapper = document.getElementById('dotsWrapper');
  const ctx = canvas.getContext('2d');

  // Each dot has its own random animation parameters
  let dots = [];

  function setupCanvas() {
    const size = wrapper.clientWidth || 480;
    canvas.width  = size;
    canvas.height = size;

    // Build dot grid
    dots = [];
    const cols = Math.ceil(size / DOT_SPACING);
    const rows = Math.ceil(size / DOT_SPACING);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * DOT_SPACING + DOT_SPACING / 2,
          y: row * DOT_SPACING + DOT_SPACING / 2,
          // Random phase offset so dots don't all pulse together
          offset: Math.random() * STAGGER_RANGE,
          // Random max scale for variety
          pulseScale: PULSE_SCALE_MIN + Math.random() * (PULSE_SCALE_MAX - PULSE_SCALE_MIN)
        });
      }
    }
  }

  // =====================
  // ANIMATION LOOP
  // =====================
  let startTime = null;

  function easePulse(t) {
    // Replicates the pulse-dot keyframe:
    // 0%: opacity 0.1 scale 0.7
    // 50%: opacity 1.0 scale pulseScale
    // 100%: opacity 0.0 scale 0.7
    if (t < 0.5) {
      return {
        opacity: DOT_OPACITY_MIN + (DOT_OPACITY_MAX - DOT_OPACITY_MIN) * (t / 0.5),
        scale:   0.7 + (1.0 - 0.7) * (t / 0.5)  // 0.7 → 1.0 at midpoint
      };
    } else {
      return {
        opacity: DOT_OPACITY_MAX * (1 - (t - 0.5) / 0.5),
        scale:   1.0 + (1.0 - 1.0) * ((t - 0.5) / 0.5) // holds near 1 then drops
      };
    }
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const dot of dots) {
      // Normalize time for this dot (accounting for its random offset)
      const t = ((elapsed + dot.offset) % ANIM_DURATION) / ANIM_DURATION;
      const { opacity, scale } = easePulse(t);

      ctx.save();
      ctx.translate(dot.x, dot.y);
      ctx.scale(scale * dot.pulseScale * 0.8, scale * dot.pulseScale * 0.8);
      ctx.beginPath();
      ctx.arc(0, 0, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  // =====================
  // HEADLINE CYCLING
  // =====================
  const headlineEl = document.getElementById('headline');

  function cycleHeadline() {
    headlineIndex = (headlineIndex + 1) % HEADLINES.length;
    headlineEl.style.opacity = '0';
    headlineEl.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      headlineEl.textContent = HEADLINES[headlineIndex];
      headlineEl.style.opacity = '1';
    }, 300);
  }

  // =====================
  // INIT
  // =====================
  function init() {
    setupCanvas();
    requestAnimationFrame(animate);

    // Trigger entry animation after tiny delay
    setTimeout(() => {
      document.getElementById('entrySurface').classList.add('revealed');
    }, 50);

    // Cycle headline text every 2.5 seconds
    setInterval(cycleHeadline, 2500);
  }

  // Re-setup canvas on resize
  window.addEventListener('resize', () => {
    setupCanvas();
  });

  init();
</script>
</body>
</html>