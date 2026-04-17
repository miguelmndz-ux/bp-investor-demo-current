<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Velo - Everything you need to know</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-variant": "#dbdde0",
                      "surface-container-lowest": "#ffffff",
                      "surface-container": "#e7e8ea",
                      "secondary-fixed-dim": "#d6d4d3",
                      "secondary-fixed": "#e4e2e1",
                      "secondary": "#5c5b5b",
                      "on-secondary": "#f5f2f1",
                      "secondary-dim": "#504f4f",
                      "inverse-surface": "#0c0e10",
                      "on-tertiary": "#fff1df",
                      "on-secondary-fixed-variant": "#5c5b5b",
                      "inverse-on-surface": "#9c9d9f",
                      "surface-container-low": "#f0f1f3",
                      "tertiary-dim": "#6b4900",
                      "on-tertiary-fixed-variant": "#5e4000",
                      "outline-variant": "#acadaf",
                      "error-dim": "#b92902",
                      "on-surface": "#2d2f31",
                      "tertiary-container": "#fbb423",
                      "on-primary": "#ffefeb",
                      "inverse-primary": "#fc5b00",
                      "primary-fixed": "#ff7941",
                      "on-error": "#ffefec",
                      "error-container": "#f95630",
                      "on-error-container": "#520c00",
                      "outline": "#757779",
                      "surface-dim": "#d2d4d8",
                      "primary-container": "#ff7941",
                      "surface-container-high": "#e1e2e5",
                      "background": "#f6f6f8",
                      "secondary-container": "#e4e2e1",
                      "primary": "#a33800",
                      "tertiary-fixed": "#fbb423",
                      "on-secondary-container": "#525151",
                      "on-background": "#2d2f31",
                      "on-primary-container": "#431200",
                      "on-tertiary-fixed": "#372400",
                      "on-secondary-fixed": "#3f3f3f",
                      "tertiary": "#7a5400",
                      "on-surface-variant": "#5a5c5d",
                      "on-tertiary-container": "#523700",
                      "surface-container-highest": "#dbdde0",
                      "error": "#b02500",
                      "tertiary-fixed-dim": "#eba60f",
                      "on-primary-fixed-variant": "#531900",
                      "primary-fixed-dim": "#ff5e07",
                      "primary-dim": "#8f3000",
                      "on-primary-fixed": "#000000",
                      "surface": "#f6f6f8",
                      "surface-bright": "#f6f6f8",
                      "surface-tint": "#a33800"
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
      },
          },
        }
      </script>
<style>
        .glass-panel {
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 20px 40px rgba(163, 56, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
        .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: linear-gradient(135deg, theme('colors.primary'), theme('colors.primary-container'));
        }
        .btn-primary-glow {
            background-image: linear-gradient(135deg, theme('colors.primary'), theme('colors.primary-container'));
            box-shadow: 0 10px 20px rgba(163, 56, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .icon-3d {
            background: linear-gradient(135deg, theme('colors.surface-container-lowest'), theme('colors.surface-container-low'));
            box-shadow: 
                -2px -2px 6px rgba(255, 255, 255, 0.8),
                2px 2px 6px rgba(163, 56, 0, 0.1),
                inset 1px 1px 2px rgba(255, 255, 255, 1);
        }
      </style>
</head>
<body class="bg-surface text-on-background font-body antialiased relative overflow-x-hidden">
<!-- Ambient Background Gradients -->
<div class="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-container/10 blur-[120px] pointer-events-none -z-10"></div>
<div class="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-tertiary-container/10 blur-[120px] pointer-events-none -z-10"></div>
<div class="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[150px] pointer-events-none -z-10"></div>
<!-- TopNavBar -->
<nav class="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl text-orange-600 dark:text-orange-500 Plus Jakarta Sans, font-bold, tracking-tight docked full-width top-0 sticky z-50 tonal shift via surface-container-low shadow-[0_20_40px_rgba(163,56,0,0.06)]">
<div class="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
<div class="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter">Velo</div>
<div class="hidden md:flex space-x-8 items-center">
<a class="text-orange-600 dark:text-orange-500 font-bold border-b-2 border-orange-500 pb-1 hover:text-orange-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="#">Features</a>
<a class="text-zinc-500 dark:text-zinc-400 font-medium hover:text-orange-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="#">Solutions</a>
<a class="text-zinc-500 dark:text-zinc-400 font-medium hover:text-orange-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="#">Learn</a>
<a class="text-zinc-500 dark:text-zinc-400 font-medium hover:text-orange-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform" href="#">Pricing</a>
</div>
<div class="hidden md:flex space-x-4">
<button class="text-zinc-500 dark:text-zinc-400 font-medium hover:text-orange-500 transition-colors duration-300 scale-95 active:scale-90 transition-transform">Log In</button>
<button class="btn-primary-glow text-surface-container-lowest px-6 py-2 rounded-xl font-bold tracking-wide scale-95 active:scale-90 transition-transform">Get Started</button>
</div>
</div>
</nav>
<main class="max-w-7xl mx-auto px-6 sm:px-8 py-24 space-y-40">
<!-- 1. Hero -->
<section class="relative pt-20 pb-16 flex flex-col items-center text-center">
<h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-on-background max-w-4xl leading-tight mb-6">
                Everything you need to know about <span class="text-gradient">Velo</span>
</h1>
<p class="text-xl md:text-2xl text-on-surface-variant max-w-2xl mb-12">
                The AI-native video messaging platform designed for speed, precision, and flawless communication.
            </p>
<div class="flex flex-col sm:flex-row gap-4 mb-20">
<button class="btn-primary-glow text-surface-container-lowest px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300">Try Velo</button>
<button class="bg-surface-container-highest text-on-background px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-high transition-colors duration-300 border border-outline-variant/15">View Documentation</button>
</div>
<!-- 4-stat ribbon -->
<div class="glass-panel rounded-xl w-full max-w-5xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/15">
<div class="px-4">
<p class="text-3xl font-bold text-primary mb-1">5+</p>
<p class="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">Input modes</p>
</div>
<div class="px-4">
<p class="text-3xl font-bold text-primary mb-1">20+</p>
<p class="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">Editor tools</p>
</div>
<div class="px-4">
<p class="text-3xl font-bold text-primary mb-1">60%</p>
<p class="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">Time saved</p>
</div>
<div class="px-4">
<p class="text-3xl font-bold text-primary mb-1">3</p>
<p class="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">Pricing tiers</p>
</div>
</div>
</section>
<!-- 2. AI End-to-End Grid -->
<section class="space-y-12 relative">
<div class="absolute inset-0 bg-surface-container-low rounded-[4rem] -z-10 transform scale-105 opacity-50"></div>
<div class="text-center max-w-3xl mx-auto">
<h2 class="text-4xl font-extrabold tracking-tight mb-4">AI-native video messaging, end to end</h2>
<p class="text-lg text-on-surface-variant">Seamlessly integrated artificial intelligence at every step of your workflow.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Tile 1 -->
<div class="glass-panel rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
<div class="w-16 h-16 rounded-2xl icon-3d flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</div>
<h3 class="text-xl font-bold mb-2">Auto Script</h3>
<p class="text-on-surface-variant text-sm">Instantly generate perfectly paced scripts from brief outlines.</p>
</div>
<!-- Tile 2 -->
<div class="glass-panel rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
<div class="w-16 h-16 rounded-2xl icon-3d flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings: 'FILL' 1;">public</span>
</div>
<h3 class="text-xl font-bold mb-2">Browser Agent</h3>
<p class="text-on-surface-variant text-sm">Navigate and record your screen with intelligent AI guidance.</p>
</div>
<!-- Tile 3 -->
<div class="glass-panel rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
<div class="w-16 h-16 rounded-2xl icon-3d flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings: 'FILL' 1;">person_play</span>
</div>
<h3 class="text-xl font-bold mb-2">VeloTwin</h3>
<p class="text-on-surface-variant text-sm">Deploy a photorealistic AI avatar to present your content.</p>
</div>
<!-- Tile 4 -->
<div class="glass-panel rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
<div class="w-16 h-16 rounded-2xl icon-3d flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings: 'FILL' 1;">edit_document</span>
</div>
<h3 class="text-xl font-bold mb-2">Smart Edit</h3>
<p class="text-on-surface-variant text-sm">Automatically remove filler words and dead space from recordings.</p>
</div>
<!-- Tile 5 -->
<div class="glass-panel rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
<div class="w-16 h-16 rounded-2xl icon-3d flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings: 'FILL' 1;">translate</span>
</div>
<h3 class="text-xl font-bold mb-2">Auto Translate</h3>
<p class="text-on-surface-variant text-sm">Instantly dub your videos into over 40 languages with voice cloning.</p>
</div>
<!-- Tile 6 -->
<div class="glass-panel rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
<div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
<div class="w-16 h-16 rounded-2xl icon-3d flex items-center justify-center mb-6">
<span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings: 'FILL' 1;">analytics</span>
</div>
<h3 class="text-xl font-bold mb-2">Deep Insights</h3>
<p class="text-on-surface-variant text-sm">Track viewer engagement and retention with AI-driven analytics.</p>
</div>
</div>
</section>
<!-- 3. Users -->
<section class="space-y-12">
<h2 class="text-4xl font-extrabold tracking-tight mb-12 border-l-4 border-primary pl-6">Who uses Velo?</h2>
<div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
<!-- User Cards -->
<div class="glass-panel rounded-xl p-6 flex flex-col items-start hover:bg-surface-container-lowest transition-colors">
<span class="material-symbols-outlined text-4xl text-primary mb-4" style="font-variation-settings: 'FILL' 1;">storefront</span>
<h3 class="text-lg font-bold">Sales</h3>
<p class="text-sm text-on-surface-variant mt-2">Personalized outreach at scale.</p>
</div>
<div class="glass-panel rounded-xl p-6 flex flex-col items-start hover:bg-surface-container-lowest transition-colors">
<span class="material-symbols-outlined text-4xl text-primary mb-4" style="font-variation-settings: 'FILL' 1;">view_quilt</span>
<h3 class="text-lg font-bold">Product</h3>
<p class="text-sm text-on-surface-variant mt-2">Clear feature demos and updates.</p>
</div>
<div class="glass-panel rounded-xl p-6 flex flex-col items-start hover:bg-surface-container-lowest transition-colors">
<span class="material-symbols-outlined text-4xl text-primary mb-4" style="font-variation-settings: 'FILL' 1;">support_agent</span>
<h3 class="text-lg font-bold">Support</h3>
<p class="text-sm text-on-surface-variant mt-2">Visual bug reproduction and help.</p>
</div>
<div class="glass-panel rounded-xl p-6 flex flex-col items-start hover:bg-surface-container-lowest transition-colors">
<span class="material-symbols-outlined text-4xl text-primary mb-4" style="font-variation-settings: 'FILL' 1;">videocam</span>
<h3 class="text-lg font-bold">Creators</h3>
<p class="text-sm text-on-surface-variant mt-2">Rapid content generation.</p>
</div>
<div class="glass-panel rounded-xl p-6 flex flex-col items-start hover:bg-surface-container-lowest transition-colors">
<span class="material-symbols-outlined text-4xl text-primary mb-4" style="font-variation-settings: 'FILL' 1;">campaign</span>
<h3 class="text-lg font-bold">Marketing</h3>
<p class="text-sm text-on-surface-variant mt-2">Engaging campaign assets.</p>
</div>
<div class="glass-panel rounded-xl p-6 flex flex-col items-start hover:bg-surface-container-lowest transition-colors">
<span class="material-symbols-outlined text-4xl text-primary mb-4" style="font-variation-settings: 'FILL' 1;">school</span>
<h3 class="text-lg font-bold">Educators</h3>
<p class="text-sm text-on-surface-variant mt-2">Interactive lesson modules.</p>
</div>
</div>
</section>
<!-- 8. Proficiency -->
<section class="space-y-12">
<h2 class="text-4xl font-extrabold tracking-tight mb-12 text-center">How long to become a Velo expert?</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
<div class="glass-panel rounded-xl p-10 flex flex-col items-center text-center relative overflow-hidden">
<div class="absolute inset-0 border-t-4 border-surface-variant rounded-xl opacity-50"></div>
<p class="text-5xl font-extrabold text-primary mb-4">3-5<span class="text-2xl text-on-surface-variant ml-1">hrs</span></p>
<h3 class="text-xl font-bold mb-2">Proficient</h3>
<p class="text-sm text-on-surface-variant">Master the basics of recording, editing, and sharing.</p>
</div>
<div class="glass-panel rounded-xl p-10 flex flex-col items-center text-center relative overflow-hidden border-outline-variant/30">
<div class="absolute inset-0 border-t-4 border-primary-container rounded-xl opacity-50"></div>
<p class="text-5xl font-extrabold text-primary mb-4">12-20<span class="text-2xl text-on-surface-variant ml-1">hrs</span></p>
<h3 class="text-xl font-bold mb-2">Advanced</h3>
<p class="text-sm text-on-surface-variant">Utilize AI tools, custom branding, and advanced timeline editing.</p>
</div>
<div class="glass-panel rounded-xl p-10 flex flex-col items-center text-center relative overflow-hidden">
<div class="absolute inset-0 border-t-4 border-primary rounded-xl opacity-50"></div>
<p class="text-5xl font-extrabold text-primary mb-4">40-60<span class="text-2xl text-on-surface-variant ml-1">hrs</span></p>
<h3 class="text-xl font-bold mb-2">Expert</h3>
<p class="text-sm text-on-surface-variant">Fluidly orchestrate complex workflows, custom VeloTwins, and API integrations.</p>
</div>
</div>
</section>
<!-- 9. Pricing -->
<section class="space-y-12 mb-32">
<div class="text-center max-w-3xl mx-auto mb-16">
<h2 class="text-4xl font-extrabold tracking-tight mb-4">Plans &amp; Velo Minutes</h2>
<p class="text-lg text-on-surface-variant">Simple, transparent pricing designed to scale with your ambition.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
<!-- Free Tier -->
<div class="glass-panel rounded-xl p-8 flex flex-col">
<h3 class="text-2xl font-bold mb-2">Free</h3>
<p class="text-4xl font-extrabold text-primary mb-6">$0<span class="text-lg text-on-surface-variant font-medium">/mo</span></p>
<ul class="space-y-4 mb-8 flex-grow">
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>10 Velo Minutes / mo</li>
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>Basic editing tools</li>
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>Standard export</li>
</ul>
<button class="w-full bg-surface-container-highest text-on-background px-4 py-3 rounded-xl font-bold hover:bg-surface-container-high transition-colors border border-outline-variant/15">Start Free</button>
</div>
<!-- Pro Tier (Highlighted) -->
<div class="glass-panel rounded-xl p-10 flex flex-col relative transform md:-translate-y-4 shadow-2xl border-primary/20">
<div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">Most Popular</div>
<h3 class="text-2xl font-bold mb-2">Pro</h3>
<p class="text-5xl font-extrabold text-primary mb-6">$20<span class="text-lg text-on-surface-variant font-medium">/mo</span></p>
<ul class="space-y-4 mb-8 flex-grow">
<li class="flex items-center text-sm font-semibold"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>100 Velo Minutes / mo</li>
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>Advanced AI Editor</li>
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>4K Export</li>
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>Custom Branding</li>
</ul>
<button class="w-full btn-primary-glow text-surface-container-lowest px-4 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">Upgrade to Pro</button>
</div>
<!-- Ultra Tier -->
<div class="glass-panel rounded-xl p-8 flex flex-col">
<h3 class="text-2xl font-bold mb-2">Ultra</h3>
<p class="text-4xl font-extrabold text-primary mb-6">$200<span class="text-lg text-on-surface-variant font-medium">/mo</span></p>
<ul class="space-y-4 mb-8 flex-grow">
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>Unlimited Velo Minutes</li>
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>Custom VeloTwins</li>
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>API Access</li>
<li class="flex items-center text-sm"><span class="material-symbols-outlined text-primary mr-2 text-sm">check_circle</span>Dedicated Support</li>
</ul>
<button class="w-full bg-surface-container-highest text-on-background px-4 py-3 rounded-xl font-bold hover:bg-surface-container-high transition-colors border border-outline-variant/15">Contact Sales</button>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-zinc-50 dark:bg-zinc-950 text-orange-600 dark:text-orange-500 Plus Jakarta Sans, text-sm, tracking-wide full-width py-16 px-8 border-t border-zinc-200/20 tonal shift using surface-container-high flat">
<div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
<div>
<div class="text-xl font-black text-zinc-900 dark:text-white mb-6">Velo</div>
<p class="text-zinc-500 mb-4 opacity-80 hover:opacity-100">© 2024 Velo AI. Machined with precision.</p>
</div>
<div class="flex flex-col space-y-3">
<a class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
<a class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
</div>
<div class="flex flex-col space-y-3">
<a class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Security</a>
<a class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Status</a>
</div>
<div class="flex flex-col space-y-3">
<a class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">Twitter</a>
<a class="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100" href="#">LinkedIn</a>
</div>
</div>
</footer>
</body></html>