<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Select Date &amp; Time | BuildParty</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "surface-container-low": "#f0f1f3",
                        "secondary-fixed-dim": "#d6d4d3",
                        "tertiary-container": "#fbb423",
                        "tertiary-fixed-dim": "#eba60f",
                        "on-secondary": "#f5f2f1",
                        "primary": "#a33800",
                        "surface-container": "#e7e8ea",
                        "error": "#b02500",
                        "on-secondary-fixed-variant": "#5c5b5b",
                        "background": "#f6f6f8",
                        "surface": "#f6f6f8",
                        "surface-dim": "#d2d4d8",
                        "outline": "#757779",
                        "on-primary-fixed": "#000000",
                        "on-background": "#2d2f31",
                        "on-tertiary": "#fff1df",
                        "on-error": "#ffefec",
                        "on-secondary-container": "#525151",
                        "primary-container": "#ff7941",
                        "on-surface-variant": "#5a5c5d",
                        "surface-container-high": "#e1e2e5",
                        "secondary-container": "#e4e2e1",
                        "primary-fixed-dim": "#ff5e07",
                        "on-tertiary-fixed-variant": "#5e4000",
                        "outline-variant": "#acadaf",
                        "error-dim": "#b92902",
                        "on-tertiary-fixed": "#372400",
                        "on-primary-container": "#431200",
                        "error-container": "#f95630",
                        "primary-fixed": "#ff7941",
                        "on-surface": "#2d2f31",
                        "secondary-fixed": "#e4e2e1",
                        "secondary-dim": "#504f4f",
                        "inverse-primary": "#fc5b00",
                        "surface-container-highest": "#dbdde0",
                        "tertiary-fixed": "#fbb423",
                        "primary-dim": "#8f3000",
                        "inverse-surface": "#0c0e10",
                        "on-primary": "#ffefeb",
                        "on-tertiary-container": "#523700",
                        "tertiary-dim": "#6b4900",
                        "tertiary": "#7a5400",
                        "inverse-on-surface": "#9c9d9f",
                        "on-secondary-fixed": "#3f3f3f",
                        "surface-variant": "#dbdde0",
                        "surface-tint": "#a33800",
                        "on-primary-fixed-variant": "#531900",
                        "secondary": "#5c5b5b",
                        "surface-container-lowest": "#ffffff",
                        "on-error-container": "#520c00",
                        "surface-bright": "#f6f6f8"
                    },
                    borderRadius: {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
                    },
                    fontFamily: {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Plus Jakarta Sans"],
                        "label": ["Plus Jakarta Sans"]
                    }
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: radial-gradient(circle at top right, #fff5f0 0%, #fffbf8 50%, #f6f6f8 100%);
            min-height: 100vh;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px 0 rgba(163, 56, 0, 0.04);
        }
        .vitreous-divider {
            background: linear-gradient(to bottom, transparent, rgba(172, 173, 175, 0.15), transparent);
            width: 1px;
        }
        .rim-light {
            box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.8), 0px 20px 40px rgba(163, 56, 0, 0.06);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="flex flex-col items-center justify-center p-6 text-on-surface">
<!-- Header Logo -->
<header class="mb-12">
<h1 class="text-2xl font-black tracking-tighter text-secondary/40">BuildParty</h1>
</header>
<!-- Main Scheduler Container -->
<main class="w-full max-w-6xl glass-panel rim-light rounded-xl overflow-hidden flex flex-col md:flex-row relative">
<!-- Subtle Orange Glow Highlights -->
<div class="absolute -top-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
<div class="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
<!-- 1. Left Information Panel -->
<section class="flex-1 p-10 flex flex-col justify-between relative z-10">
<div>
<div class="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
<span class="material-symbols-outlined text-white text-3xl" style="font-variation-settings: 'FILL' 1;">graphic_eq</span>
</div>
<h2 class="text-3xl font-extrabold tracking-tight text-on-surface mb-6 leading-tight">NovaVoice Live: Build with Voice</h2>
<div class="space-y-4">
<div class="flex items-center gap-3 text-on-surface-variant font-medium">
<span class="material-symbols-outlined text-lg">schedule</span>
<span>50 min</span>
</div>
<div class="flex items-center gap-3 text-on-surface-variant font-medium">
<span class="material-symbols-outlined text-lg">public</span>
<span>buildparty.ai</span>
</div>
</div>
</div>
<div class="mt-12 flex items-center gap-4">
<img alt="Rustam Khasanov" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" data-alt="Professional headshot of a smiling man with a neat beard in a light gray studio background, warm lighting, high quality" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM6hapb2kip66g62z74e9-7qUuyYRMIQYYQnVlmvc7xrOJAU89DsMKuPPNXayhTyKh-g-wMREvYh0_Pvd4r1lEmsESjlKDPoaEcyPVagfBv8Ps9A2SO2DA7P6QfTffdkSqMkF_0FwGIc8MtlGZ5BR9h1KllV5RWhxu5-GWkFqcNO_VrxcWmF7MOp9FIRtZ9N1tiQoQjlgcYPDKTGYFwJXG-d92CxZvIUYA7YA7m06hVnUIzeHaH7ThtiyOlqNCt4ZZOOVoA8MIMw4"/>
<div class="flex flex-col">
<span class="text-sm font-bold text-on-surface">Rustam Khasanov</span>
<span class="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Host &amp; Architect</span>
</div>
</div>
</section>
<!-- Vitreous Divider -->
<div class="hidden md:block vitreous-divider my-10"></div>
<!-- 2. Center Calendar Panel -->
<section class="flex-[1.2] p-10 flex flex-col items-center relative z-10">
<header class="w-full mb-8">
<h3 class="text-xl font-bold text-on-surface">Select a Date &amp; Time</h3>
</header>
<div class="w-full">
<!-- Calendar Header -->
<div class="flex justify-between items-center mb-8 px-4">
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all active:scale-90">
<span class="material-symbols-outlined">chevron_left</span>
</button>
<span class="font-bold text-on-surface">April 2026</span>
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all active:scale-90">
<span class="material-symbols-outlined">chevron_right</span>
</button>
</div>
<!-- Calendar Grid -->
<div class="grid grid-cols-7 gap-y-2 text-center">
<!-- Days Label -->
<div class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Mon</div>
<div class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Tue</div>
<div class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Wed</div>
<div class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Thu</div>
<div class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Fri</div>
<div class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Sat</div>
<div class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Sun</div>
<!-- Dates -->
<!-- Week 1 Empty -->
<div></div><div></div><div></div><div></div>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">1</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">2</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">3</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">4</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">5</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">6</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">7</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">8</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">9</button>
<!-- Active Date -->
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-bold bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-lg shadow-primary/20 scale-110">10</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">11</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">12</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">13</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">14</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">15</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">16</button>
<button class="w-10 h-10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">17</button>
</div>
</div>
<div class="mt-auto pt-12 w-full">
<div class="flex items-center gap-2 text-on-surface-variant font-medium justify-center bg-surface-container-low py-3 rounded-full">
<span class="material-symbols-outlined text-lg">language</span>
<span class="text-xs uppercase tracking-wider font-bold">GMT +5 (Tashkent Time)</span>
<span class="material-symbols-outlined text-lg">arrow_drop_down</span>
</div>
</div>
</section>
<!-- Vitreous Divider -->
<div class="hidden md:block vitreous-divider my-10"></div>
<!-- 3. Right Slot Panel -->
<section class="flex-[0.8] p-10 flex flex-col relative z-10">
<header class="mb-10 text-center md:text-left">
<h3 class="text-xl font-bold text-on-surface">Friday, April 10</h3>
</header>
<div class="flex flex-col gap-4">
<!-- Slot Buttons -->
<button class="w-full py-4 px-6 rounded-full glass-panel border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all hover:scale-[1.02] active:scale-95 text-center">
                    10:00am
                </button>
<button class="w-full py-4 px-6 rounded-full glass-panel border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all hover:scale-[1.02] active:scale-95 text-center">
                    3:00pm
                </button>
<button class="w-full py-4 px-6 rounded-full glass-panel border border-primary/20 text-primary font-bold hover:bg-primary/5 transition-all hover:scale-[1.02] active:scale-95 text-center">
                    5:00pm
                </button>
<!-- Next Button (Appears on selection) -->
<button class="mt-4 w-full py-5 px-6 rounded-full bg-primary text-white font-black tracking-tight hover:bg-primary-dim transition-all shadow-xl shadow-primary/20 active:scale-95 text-center">
                    Next
                </button>
</div>
<div class="mt-auto pt-8 text-center md:text-left">
<p class="text-[11px] text-on-surface-variant font-medium leading-relaxed">
                    By confirming, you agree to our <br class="hidden md:block"/>Terms of Service and Privacy Policy.
                </p>
</div>
</section>
</main>
<!-- Footer Decoration -->
<footer class="mt-12 opacity-30">
<p class="text-[10px] uppercase tracking-[0.2em] font-black text-secondary">A Premium Scheduling Experience</p>
</footer>
</body></html>