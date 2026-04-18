<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>BuildParty | Session Invitation</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "secondary-fixed-dim": "#d6d4d3",
                    "on-background": "#2d2f31",
                    "on-secondary": "#f5f2f1",
                    "tertiary-fixed-dim": "#eba60f",
                    "secondary-fixed": "#e4e2e1",
                    "surface": "#f6f6f8",
                    "outline": "#757779",
                    "on-tertiary": "#fff1df",
                    "inverse-surface": "#0c0e10",
                    "primary-fixed": "#ff7941",
                    "surface-container-low": "#f0f1f3",
                    "secondary": "#5c5b5b",
                    "on-primary-fixed-variant": "#531900",
                    "secondary-container": "#e4e2e1",
                    "on-secondary-fixed": "#3f3f3f",
                    "primary-dim": "#8f3000",
                    "tertiary-dim": "#6b4900",
                    "on-primary": "#ffefeb",
                    "on-error-container": "#520c00",
                    "on-surface-variant": "#5a5c5d",
                    "primary-container": "#ff7941",
                    "error-container": "#f95630",
                    "surface-container": "#e7e8ea",
                    "surface-bright": "#f6f6f8",
                    "inverse-primary": "#fc5b00",
                    "on-secondary-fixed-variant": "#5c5b5b",
                    "primary": "#a33800",
                    "surface-container-high": "#e1e2e5",
                    "on-surface": "#2d2f31",
                    "on-tertiary-fixed-variant": "#5e4000",
                    "secondary-dim": "#504f4f",
                    "on-error": "#ffefec",
                    "tertiary-fixed": "#fbb423",
                    "on-primary-fixed": "#000000",
                    "inverse-on-surface": "#9c9d9f",
                    "surface-variant": "#dbdde0",
                    "surface-tint": "#a33800",
                    "on-tertiary-container": "#523700",
                    "on-tertiary-fixed": "#372400",
                    "on-primary-container": "#431200",
                    "on-secondary-container": "#525151",
                    "primary-fixed-dim": "#ff5e07",
                    "tertiary": "#7a5400",
                    "surface-dim": "#d2d4d8",
                    "outline-variant": "#acadaf",
                    "surface-container-lowest": "#ffffff",
                    "error": "#b02500",
                    "tertiary-container": "#fbb423",
                    "background": "#f6f6f8",
                    "error-dim": "#b92902",
                    "surface-container-highest": "#dbdde0"
            },
            "borderRadius": {
                    "DEFAULT": "1rem",
                    "lg": "2rem",
                    "xl": "3rem",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Plus Jakarta Sans"],
                    "body": ["Plus Jakarta Sans"],
                    "label": ["Plus Jakarta Sans"]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .glass-panel {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px 0 rgba(163, 56, 0, 0.05);
        }
        .glossy-card {
            position: relative;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(24px);
        }
        .glossy-card::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%);
            pointer-events: none;
        }
        .rim-light {
            box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.8), 0 20px 40px rgba(163, 56, 0, 0.06);
        }
    </style>
</head>
<body class="bg-gradient-to-br from-[#fff7f0] to-[#fffaf5] text-on-background min-h-screen">
<!-- Header with Centered Logo -->
<header class="py-12 flex justify-center">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
<span class="material-symbols-outlined text-white" style="font-variation-settings: 'FILL' 1;">rocket_launch</span>
</div>
<div>
<h2 class="text-xl font-black text-orange-600 leading-none">BuildParty</h2>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="p-6 md:p-12 max-w-5xl mx-auto">
<!-- Hero Section -->
<header class="text-center mb-16 space-y-4">
<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background">
            Here's what we built for your launch, <span class="text-primary">Rustam.</span>
</h1>
<p class="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium">
            NovaVoice hit <span class="font-bold text-on-surface">#1 Product of the Day</span> on Product Hunt. Let's showcase the journey that got us here in a live session.
        </p>
</header>
<!-- Main Session Card -->
<section class="glass-panel rim-light rounded-xl p-8 md:p-10 mb-8 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
<div class="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
<div class="w-full lg:w-1/2 space-y-6">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
                Live Event
            </div>
<h2 class="text-4xl font-bold tracking-tighter">Build with Voice</h2>
<p class="text-on-surface-variant leading-relaxed">
                A deep dive into the engineering and design process of NovaVoice. We'll be live-coding a new feature based on community feedback.
            </p>
<div class="grid grid-cols-2 gap-6 pt-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'opsz' 20;">play_circle</span>
</div>
<span class="text-sm font-semibold">Live Demo</span>
</div>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'opsz' 20;">forum</span>
</div>
<span class="text-sm font-semibold">Q&amp;A</span>
</div>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'opsz' 20;">construction</span>
</div>
<span class="text-sm font-semibold">Builder Challenge</span>
</div>
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span class="material-symbols-outlined" style="font-variation-settings: 'opsz' 20;">video_library</span>
</div>
<span class="text-sm font-semibold">Recap</span>
</div>
</div>
</div>
<div class="w-full lg:w-1/2">
<div class="aspect-video rounded-lg overflow-hidden glass-panel rim-light relative group cursor-pointer">
<img alt="Session Preview" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK8F6yi8oPiHBC5zvZD_H9NZpUCtPnzUOpPOwCzDRnpJxIltbpofhjQnDakHjoxjko_kdNYcD-qatgc7UZrQDVWR8TIyu0dOf8XqXSryTVNBddTrWb9-mgPvNjxgXurIFcXFPY4g8NyU4nCXiERq8Ks3Un1Apvt_XXlwtnvF6oKGjP642ZVXIdxBexKShuO_0l-rCinguBBB2tS_Fi41XRHoyy6Tgv2ko3cibNv0neVTtrQhhcO2fGUYQpbB3kqZccoa5Jj0TVA7I"/>
<div class="absolute inset-0 flex items-center justify-center">
<div class="w-20 h-20 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center rim-light transition-transform group-hover:scale-110">
<span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
</div>
</div>
</div>
</div>
</section>
<!-- NovaVoice Decode File Section -->
<section class="glass-panel rim-light rounded-xl p-8 md:p-10 mb-8 flex flex-col lg:flex-row-reverse items-center gap-12 relative overflow-hidden">
<div class="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
<div class="w-full lg:w-1/2 space-y-6">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold uppercase tracking-widest">
                Decode Theme
            </div>
<h2 class="text-3xl font-bold tracking-tighter">NovaVoice Decode File</h2>
<p class="text-on-surface-variant leading-relaxed">
                A technical breakdown of the NovaVoice product architecture, designed to give builders a clear understanding of the stack and logic.
            </p>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
<div class="flex flex-col items-center p-4 rounded-xl bg-white/20 border border-white/30 text-center space-y-2">
<span class="material-symbols-outlined text-blue-500" style="font-variation-settings: 'opsz' 24, 'FILL' 1;">account_tree</span>
<span class="text-xs font-bold uppercase tracking-tight">System Architecture</span>
</div>
<div class="flex flex-col items-center p-4 rounded-xl bg-white/20 border border-white/30 text-center space-y-2">
<span class="material-symbols-outlined text-blue-500" style="font-variation-settings: 'opsz' 24, 'FILL' 1;">rebase_edit</span>
<span class="text-xs font-bold uppercase tracking-tight">Logic Flow</span>
</div>
<div class="flex flex-col items-center p-4 rounded-xl bg-white/20 border border-white/30 text-center space-y-2">
<span class="material-symbols-outlined text-blue-500" style="font-variation-settings: 'opsz' 24, 'FILL' 1;">api</span>
<span class="text-xs font-bold uppercase tracking-tight">API Docs</span>
</div>
</div>
</div>
<div class="w-full lg:w-1/2">
<div class="aspect-[4/3] rounded-lg overflow-hidden glossy-card rim-light flex items-center justify-center p-12">
<div class="relative w-full h-full flex items-center justify-center">
<div class="absolute w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
<span class="material-symbols-outlined text-blue-500 text-9xl opacity-80" style="font-variation-settings: 'wght' 200;">developer_board</span>
</div>
</div>
</div>
</section>
<!-- NovaVoice Course File Section -->
<section class="glass-panel rim-light rounded-xl p-8 md:p-10 mb-12 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full"></div>
<div class="w-full lg:w-1/2 space-y-6">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase tracking-widest">
                Learning &amp; Interaction
            </div>
<h2 class="text-3xl font-bold tracking-tighter">NovaVoice Course File</h2>
<p class="text-on-surface-variant leading-relaxed">
                An interactive course where participants can engage with microexperiences on the PreParty stage to learn the product's core features.
            </p>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
<div class="flex flex-col items-center p-4 rounded-xl bg-white/20 border border-white/30 text-center space-y-2">
<span class="material-symbols-outlined text-emerald-500" style="font-variation-settings: 'opsz' 24, 'FILL' 1;">touch_app</span>
<span class="text-xs font-bold uppercase tracking-tight">Interactive Demos</span>
</div>
<div class="flex flex-col items-center p-4 rounded-xl bg-white/20 border border-white/30 text-center space-y-2">
<span class="material-symbols-outlined text-emerald-500" style="font-variation-settings: 'opsz' 24, 'FILL' 1;">military_tech</span>
<span class="text-xs font-bold uppercase tracking-tight">Live Challenges</span>
</div>
<div class="flex flex-col items-center p-4 rounded-xl bg-white/20 border border-white/30 text-center space-y-2">
<span class="material-symbols-outlined text-emerald-500" style="font-variation-settings: 'opsz' 24, 'FILL' 1;">verified</span>
<span class="text-xs font-bold uppercase tracking-tight">Skill Badge</span>
</div>
</div>
</div>
<div class="w-full lg:w-1/2">
<div class="aspect-[4/3] rounded-lg overflow-hidden glossy-card rim-light flex items-center justify-center p-12">
<div class="relative w-full h-full flex items-center justify-center">
<div class="absolute w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl"></div>
<span class="material-symbols-outlined text-emerald-500 text-9xl opacity-80" style="font-variation-settings: 'wght' 200;">school</span>
</div>
</div>
</div>
</section>
<!-- AI Team Grid (Glossy Cards) -->
<h3 class="text-sm font-black uppercase tracking-[0.3em] text-on-surface-variant mb-8 text-center">Managed by Your AI Team</h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
<!-- Nova -->
<div class="glossy-card rim-light rounded-xl p-8 flex flex-col items-center text-center group">
<div class="relative mb-8">
<div class="absolute inset-0 bg-blue-400 blur-[40px] opacity-20 rounded-full"></div>
<div class="w-24 h-24 bg-gradient-to-b from-blue-50 to-blue-100 rounded-full flex items-center justify-center relative z-10 rim-light">
<span class="material-symbols-outlined text-blue-500 text-5xl" style="font-variation-settings: 'FILL' 1;">mic</span>
</div>
</div>
<h4 class="text-xl font-extrabold mb-2">Nova</h4>
<p class="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">AI Host</p>
<p class="text-on-surface-variant text-sm leading-relaxed">Nova manages the live flow, handling moderation and audience engagement seamlessly.</p>
<div class="mt-6 w-full h-1 bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-blue-500 w-full group-hover:animate-pulse"></div>
</div>
</div>
<!-- Echo -->
<div class="glossy-card rim-light rounded-xl p-8 flex flex-col items-center text-center group">
<div class="relative mb-8">
<div class="absolute inset-0 bg-emerald-400 blur-[40px] opacity-20 rounded-full"></div>
<div class="w-24 h-24 bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-full flex items-center justify-center relative z-10 rim-light">
<span class="material-symbols-outlined text-emerald-500 text-5xl" style="font-variation-settings: 'FILL' 1;">psychology</span>
</div>
</div>
<h4 class="text-xl font-extrabold mb-2">Echo</h4>
<p class="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Session Memory</p>
<p class="text-on-surface-variant text-sm leading-relaxed">Echo captures every insight, automatically generating searchable notes and clips.</p>
<div class="mt-6 w-full h-1 bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-emerald-500 w-full group-hover:animate-pulse"></div>
</div>
</div>
<!-- Apex -->
<div class="glossy-card rim-light rounded-xl p-8 flex flex-col items-center text-center group">
<div class="relative mb-8">
<div class="absolute inset-0 bg-orange-400 blur-[40px] opacity-20 rounded-full"></div>
<div class="w-24 h-24 bg-gradient-to-b from-orange-50 to-orange-100 rounded-full flex items-center justify-center relative z-10 rim-light">
<span class="material-symbols-outlined text-orange-500 text-5xl" style="font-variation-settings: 'FILL' 1;">bolt</span>
</div>
</div>
<h4 class="text-xl font-extrabold mb-2">Apex</h4>
<p class="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">Launch Agent</p>
<p class="text-on-surface-variant text-sm leading-relaxed">Apex optimizes the broadcast for maximum reach and tracks viral engagement metrics.</p>
<div class="mt-6 w-full h-1 bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-orange-500 w-full group-hover:animate-pulse"></div>
</div>
</div>
</div>
<!-- Next Steps & CTA -->
<div class="flex flex-col md:flex-row gap-12 items-start mb-24">
<div class="w-full md:w-1/2 space-y-8">
<h3 class="text-2xl font-bold tracking-tight">What you need to do</h3>
<div class="space-y-4">
<div class="flex items-center gap-4 p-4 rounded-lg bg-white/40 border border-white/50">
<div class="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
<span class="material-symbols-outlined text-xs font-black text-primary">check</span>
</div>
<span class="font-medium">Pick a time from the availability window</span>
</div>
<div class="flex items-center gap-4 p-4 rounded-lg bg-white/40 border border-white/50">
<div class="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center"></div>
<span class="font-medium text-on-surface-variant">Show up 5 mins early for AI calibration</span>
</div>
<div class="flex items-center gap-4 p-4 rounded-lg bg-white/40 border border-white/50">
<div class="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center"></div>
<span class="font-medium text-on-surface-variant">Prepare your local demo environment</span>
</div>
</div>
</div>
<div class="w-full md:w-1/2 flex flex-col justify-end">
<div class="glass-panel rim-light p-10 rounded-xl space-y-6">
<div class="flex justify-between items-end">
<div>
<p class="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2">Availability</p>
<p class="text-2xl font-bold">Nov 12 — Nov 15</p>
</div>
<div class="text-right">
<p class="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2">Duration</p>
<p class="text-lg font-bold">60 Mins</p>
</div>
</div>
<button class="w-full py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-extrabold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                        Pick your time
                        <span class="material-symbols-outlined">calendar_today</span>
</button>
<p class="text-center text-xs text-on-surface-variant font-medium">No account required. Apex handles the calendar sync.</p>
</div>
</div>
</div>
</main>
<!-- Floating Background Elements -->
<div class="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
<div class="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>
</body></html>