<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>BuildParty - Here's what we built for your demo</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-variant": "#dbdde0",
                    "secondary-fixed": "#e4e2e1",
                    "error-container": "#f95630",
                    "on-tertiary-container": "#523700",
                    "tertiary-dim": "#6b4900",
                    "on-tertiary": "#fff1df",
                    "on-secondary-fixed-variant": "#5c5b5b",
                    "surface-dim": "#d2d4d8",
                    "on-primary-container": "#431200",
                    "on-primary-fixed-variant": "#531900",
                    "on-secondary-container": "#525151",
                    "tertiary-fixed": "#fbb423",
                    "secondary-dim": "#504f4f",
                    "secondary": "#5c5b5b",
                    "surface-container": "#e7e8ea",
                    "outline": "#757779",
                    "surface-tint": "#a33800",
                    "error": "#b02500",
                    "on-primary-fixed": "#000000",
                    "outline-variant": "#acadaf",
                    "surface-container-low": "#f0f1f3",
                    "on-primary": "#ffefeb",
                    "primary-fixed-dim": "#ff5e07",
                    "on-secondary-fixed": "#3f3f3f",
                    "primary-dim": "#8f3000",
                    "on-surface": "#2d2f31",
                    "on-error-container": "#520c00",
                    "on-error": "#ffefec",
                    "secondary-container": "#e4e2e1",
                    "surface-container-lowest": "#ffffff",
                    "inverse-on-surface": "#9c9d9f",
                    "tertiary-fixed-dim": "#eba60f",
                    "primary-fixed": "#ff7941",
                    "primary-container": "#ff7941",
                    "error-dim": "#b92902",
                    "tertiary": "#7a5400",
                    "inverse-primary": "#fc5b00",
                    "on-background": "#2d2f31",
                    "primary": "#a33800",
                    "tertiary-container": "#fbb423",
                    "secondary-fixed-dim": "#d6d4d3",
                    "surface": "#f6f6f8",
                    "on-tertiary-fixed-variant": "#5e4000",
                    "inverse-surface": "#0c0e10",
                    "background": "#f6f6f8",
                    "surface-container-high": "#e1e2e5",
                    "surface-bright": "#f6f6f8",
                    "on-tertiary-fixed": "#372400",
                    "on-surface-variant": "#5a5c5d",
                    "on-secondary": "#f5f2f1",
                    "surface-container-highest": "#dbdde0"
            },
            "borderRadius": {
                    "DEFAULT": "1rem",
                    "lg": "2rem",
                    "xl": "3rem",
                    "full": "9999px"
            },
            "spacing": {},
            "fontFamily": {
                    "headline": [
                            "Plus Jakarta Sans"
                    ],
                    "body": [
                            "Plus Jakarta Sans"
                    ],
                    "label": [
                            "Plus Jakarta Sans"
                    ]
            }
          }
        }
      }
    </script>
<style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass-panel {
            background-color: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0px 20px 40px rgba(163, 56, 0, 0.06);
        }
        .btn-primary {
            background: linear-gradient(135deg, #a33800 0%, #ff7941 100%);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .pastel-glow-card {
            background: linear-gradient(135deg, #fffcf0 0%, #fff2e0 33%, #ffe8d1 66%, #fff7ed 100%);
            position: relative;
            box-shadow: 0 10px 30px -5px rgba(255, 107, 0, 0.1), inset 0 0 0 1px rgba(255,255,255,0.7);
        }
    </style>
</head>
<body class="bg-gradient-to-br from-[#fff7f0] to-[#fffaf5] text-on-surface antialiased min-h-screen flex flex-col relative overflow-x-hidden">
<!-- Background Gradient Pulse -->
<div class="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
<div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-container/20 blur-[100px]"></div>
<div class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-tertiary-container/10 blur-[120px]"></div>
</div>
<!-- Main Container - Centered Email Layout -->
<main class="flex-grow flex flex-col items-center justify-center md:p-12 w-full mx-auto z-10 max-w-5xl p-4">
<!-- Header / Logo -->
<header class="w-full text-center mb-12 mt-8">
<h1 class="text-3xl font-black text-primary tracking-tight">BuildParty</h1>
</header>
<!-- Email Body Canvas -->
<article class="w-full glass-panel rounded-xl flex flex-col gap-8 relative overflow-hidden p-6 md:p-10 border-white/40">
<!-- Top Inner Glow Line -->
<div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
<!-- Unified Hero Header Card -->
<section class="pastel-glow-card rounded-2xl p-8 md:p-10 relative z-10 flex flex-col gap-8">
<div class="flex justify-between items-start w-full">
<div class="flex items-center gap-4">
<!-- Velo Live Logo -->
<div class="w-16 h-16 rounded-2xl bg-[#231f1e] flex items-center justify-center shadow-lg border border-white/10">
<span class="material-symbols-outlined text-primary-fixed font-bold text-4xl">expand_more</span>
</div>
<div class="flex flex-col text-left">
<h3 class="text-2xl font-extrabold text-on-surface tracking-tight leading-none">Velo Live</h3>
<p class="text-base text-on-surface font-semibold opacity-70">Async Video AI</p>
</div>
</div>
<!-- Product Hunt Badge -->
<div class="flex flex-col items-center justify-center border border-primary/20 rounded-xl px-4 py-2 shadow-sm bg-white/40 backdrop-blur-sm">
<span class="text-xl font-black text-primary leading-none mb-0.5">#1</span>
<span class="text-[9px] font-bold text-primary uppercase tracking-widest leading-tight text-center">Product<br/>Hunt</span>
</div>
</div>
<!-- Headline Content -->
<div class="text-left flex flex-col gap-2">
<h2 class="font-extrabold tracking-[-0.02em] text-on-surface leading-tight max-w-2xl text-2xl md:text-4xl">
            We decoded your product.<br/> Here's what we built <span class="text-primary">for your live demo.</span>
</h2>
</div>
</section>
<!-- Vitreous Cards Grid: The Build -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10 mt-4">
<!-- Card 1 -->
<div class="bg-surface-container-lowest rounded-lg p-6 flex flex-col items-center text-center shadow-[0px_20px_40px_rgba(163,56,0,0.04)] border relative group overflow-hidden transition-all hover:scale-[1.02] border-white/40">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 relative z-10 shadow-inner">
<span class="material-symbols-outlined text-3xl text-primary text-5xl" style="font-variation-settings: 'FILL' 1;">graphic_eq</span>
</div>
<h3 class="text-lg font-bold text-on-surface mb-2 relative z-10">Build with Voice</h3>
<p class="text-sm text-on-surface-variant relative z-10">LAUNCH AGENT</p>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest rounded-lg p-6 flex flex-col items-center text-center shadow-[0px_20px_40px_rgba(163,56,0,0.04)] border relative group overflow-hidden transition-all hover:scale-[1.02] border-white/40">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 relative z-10 shadow-inner">
<span class="material-symbols-outlined text-3xl text-primary text-5xl" style="font-variation-settings: 'FILL' 1;">description</span>
</div>
<h3 class="text-lg font-bold text-on-surface mb-2 relative z-10">NovaVoice Decode File</h3>
<p class="text-sm text-on-surface-variant relative z-10">LAUNCH AGENT</p>
</div>
<!-- Card 3 -->
<div class="bg-surface-container-lowest rounded-lg p-6 flex flex-col items-center text-center shadow-[0px_20px_40px_rgba(163,56,0,0.04)] border relative group overflow-hidden transition-all hover:scale-[1.02] border-white/40">
<div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-4 relative z-10 shadow-inner">
<span class="material-symbols-outlined text-3xl text-primary text-5xl" style="font-variation-settings: 'FILL' 1;">school</span>
</div>
<h3 class="text-lg font-bold text-on-surface mb-2 relative z-10">NovaVoice Course File</h3>
<p class="text-sm text-on-surface-variant relative z-10">LAUNCH AGENT</p>
</div>
</section>
<!-- Spacer / Divider implicit through whitespace -->
<div class="h-4 w-full"></div>
<!-- Your AI Team Section -->
<section class="flex flex-col gap-6 w-full relative z-10 bg-surface-container-low p-8 rounded-xl border border-white/40 shadow-inner">
<header class="mb-2">
<h3 class="text-xl font-bold text-on-surface">Your AI Team</h3>
<p class="text-sm text-on-surface-variant">LAUNCH AGENT</p>
</header>
<div class="flex flex-col gap-4">
<!-- Agent: Nova -->
<div class="bg-surface-container-lowest rounded-lg p-4 flex items-center gap-4 shadow-sm border border-white/40">
<img alt="Nova Agent Avatar" class="w-12 h-12 rounded-full object-cover border-2 border-surface" data-alt="Abstract glowing orb of warm orange light against a deep background, ethereal and futuristic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDCwf2hrXezbgSEZgSw7s97B-JyeN7hEWEjoY56p6B6CrpKQK9R7IRd97agP7xnlODf7FU4v744Obhmb_lnwRzrlIGCXy9k5zM_pHiY31Ln_4OrH1yPJFd6PFnFTZtrHabGcNJYjlKdHIgxa1zF6UuJlpGUt4hzmdBNG6wzU8Aqd3SsOSEeA3qPRDRBVawG5WsAIN95mvv2WecnwFhHOXv-73Fr9-Sv-3ksEiGew4Ghv9Dqjy-fJsSPEpyTmv7ocxO8oCj14dQ5DY"/>
<div class="flex-grow">
<h4 class="font-bold text-on-surface">Nova</h4>
<p class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">LAUNCH AGENT</p>
</div>
<span class="material-symbols-outlined text-primary">chevron_right</span>
</div>
<!-- Agent: Echo -->
<div class="bg-surface-container-lowest rounded-lg p-4 flex items-center gap-4 shadow-sm border border-white/40">
<img alt="Echo Agent Avatar" class="w-12 h-12 rounded-full object-cover border-2 border-surface" data-alt="Smooth metallic sphere reflecting soft studio lighting, high-end 3D render feel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFGH3nc2j9VXpl8NH43qnZCZ3OtbBl7RYZgLLOZTxbAVoU6zhnZ4CCtRgJjxnqAwYEmCBNKCYy0AqB7lCUBkSUgneLT8YNS5YbtKeTunRqRyEyAh0xiezXs9eXQm1l8IJYHLpvlq83X_K7wIs6JeCDtZxE6FBvnLEwT8M_9xqNzC8bDZwBC_ZionZopeV-Ji7hIr1ioIICa5Cs8UVdFG0KcTqY2R2NIT5m9YY9JT_u6fcyxIcYZdP0B6n4_WTDaDlQTkGlEYcrXcA"/>
<div class="flex-grow">
<h4 class="font-bold text-on-surface">Echo</h4>
<p class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">LAUNCH AGENT</p>
</div>
<span class="material-symbols-outlined text-primary">chevron_right</span>
</div>
<!-- Agent: Apex -->
<div class="bg-surface-container-lowest rounded-lg p-4 flex items-center gap-4 shadow-sm border border-white/40">
<img alt="Apex Agent Avatar" class="w-12 h-12 rounded-full object-cover border-2 border-surface" data-alt="Geometric prism refracting soft pastel light, clean modernist 3D design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3136-rlLIhs6Du41I31rQ9QRJ1QVTz5N2Wo2DPvaicoWBhF6ABIRVwDdM7hcl8XcSS1OOxKs3Wm861yd8QKXTFt6tQbB0NdG4OdGEFoCxika_t7cL6sHwL1H7i3aK-6D8Vjc6bShK2ru8D4Kjh7F-ztYfojtTE3WRzBlLfGu9J5kyLyS3COrcgwQDDVqF4FW7di93IcRRRKtG4n9QMnaKd5HUvqwt5qj1bPgiLJDUZNONVSuEDyNY-pMiwQxAwmJDdMriwnfDGUI"/>
<div class="flex-grow">
<h4 class="font-bold text-on-surface">Apex</h4>
<p class="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">LAUNCH AGENT</p>
</div>
<span class="material-symbols-outlined text-primary">chevron_right</span>
</div>
</div>
</section>
<!-- Call to Action -->
<section class="mt-8 relative z-10 w-full"><div class="w-full bg-surface-container-lowest/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0px_20px_40px_rgba(163,56,0,0.04)]">
<div>
<h3 class="font-headline font-bold text-xl text-on-surface">Build with Video AI</h3>
<p class="text-sm text-on-surface-variant mt-1 flex items-center gap-2 font-medium">
<span class="material-symbols-outlined text-[18px]">schedule</span> 45 min session
        </p>
</div>
<button class="w-full md:w-auto px-10 py-4 bg-gradient-to-br from-primary to-primary-fixed text-white font-bold rounded-full shadow-[0_12px_24px_rgba(163,56,0,0.2)] hover:scale-[0.98] transition-transform duration-200 text-lg border-t border-white/20">
        Accept Invite
    </button>
</div></section>
</article>
</main>
<!-- Footer Component from JSON -->
<footer class="bg-zinc-50 dark:bg-zinc-950 text-orange-600 font-['Plus_Jakarta_Sans'] text-sm uppercase tracking-widest w-full border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-center gap-6 py-12 z-10 relative mt-auto">
<div class="text-lg font-bold text-zinc-900 dark:text-zinc-100">BuildParty</div>
<nav class="flex gap-6">
<a class="text-zinc-400 hover:text-orange-600 transition-colors opacity-80 hover:opacity-100" href="#">Privacy</a>
<a class="text-zinc-400 hover:text-orange-600 transition-colors opacity-80 hover:opacity-100" href="#">Terms</a>
<a class="text-zinc-400 hover:text-orange-600 transition-colors opacity-80 hover:opacity-100" href="#">Support</a>
</nav>
<p class="text-zinc-400 opacity-80 mt-2">© 2024 BuildParty AI. Machined in the Digital Vitreous.</p>
</footer>
</body></html>