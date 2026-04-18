<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>BuildParty Lobby - Apex Gloss</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "primary-dim": "#8f3000",
                        "primary-fixed-dim": "#ff5e07",
                        "on-surface": "#2d2f31",
                        "secondary-fixed-dim": "#d6d4d3",
                        "surface-container": "#e7e8ea",
                        "on-primary-container": "#431200",
                        "on-background": "#2d2f31",
                        "error-dim": "#b92902",
                        "background": "#f6f6f8",
                        "on-error": "#ffefec",
                        "outline": "#757779",
                        "surface-bright": "#f6f6f8",
                        "error-container": "#f95630",
                        "error": "#b02500",
                        "on-tertiary-fixed": "#372400",
                        "on-surface-variant": "#5a5c5d",
                        "surface": "#f6f6f8",
                        "inverse-primary": "#fc5b00",
                        "primary": "#a33800",
                        "primary-fixed": "#ff7941",
                        "surface-dim": "#d2d4d8",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#f0f1f3",
                        "secondary-container": "#e4e2e1",
                        "on-tertiary": "#fff1df",
                        "tertiary-fixed": "#fbb423",
                        "on-secondary-fixed": "#3f3f3f",
                        "on-error-container": "#520c00",
                        "secondary-dim": "#504f4f",
                        "on-primary": "#ffefeb",
                        "tertiary": "#7a5400",
                        "outline-variant": "#acadaf",
                        "surface-tint": "#a33800",
                        "inverse-surface": "#0c0e10",
                        "on-primary-fixed-variant": "#531900",
                        "on-secondary": "#f5f2f1",
                        "surface-container-high": "#e1e2e5",
                        "secondary-fixed": "#e4e2e1",
                        "tertiary-fixed-dim": "#eba60f",
                        "tertiary-dim": "#6b4900",
                        "surface-container-highest": "#dbdde0",
                        "on-tertiary-container": "#523700",
                        "on-primary-fixed": "#000000",
                        "on-secondary-container": "#525151",
                        "primary-container": "#ff7941",
                        "on-tertiary-fixed-variant": "#5e4000",
                        "tertiary-container": "#fbb423",
                        "secondary": "#5c5b5b",
                        "on-secondary-fixed-variant": "#5c5b5b",
                        "inverse-on-surface": "#9c9d9f",
                        "surface-variant": "#dbdde0"
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
                    },
                    "aspectRatio": {
                        "16/9": "16 / 9",
                        "4/3": "4 / 3",
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; height: 100vh; overflow: hidden; }
        
        .glass-panel {
            background: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(40px);
            border-right: 1px solid rgba(255, 255, 255, 0.3);
            border-left: 1px solid rgba(255, 255, 255, 0.3);
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .active-icon {
            font-variation-settings: 'FILL' 1, 'wght' 400;
        }

        .gloss-rim {
            border-top: 1px solid rgba(255, 255, 255, 0.6);
        }

        .l-shell-curve {
            position: absolute;
            top: 80px;
            left: 80px;
            width: 48px;
            height: 48px;
            background: white;
            pointer-events: none;
        }
        .l-shell-curve::after {
            content: '';
            position: absolute;
            inset: 0;
            background: #f6f6f8; /* Matches page background */
            border-top-left-radius: 32px;
        }

        ::-webkit-scrollbar { width: 0px; background: transparent; }

        .control-dock-glass {
            background: rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(25px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 
                0 4px 30px rgba(0, 0, 0, 0.05),
                inset 0 1px 1px rgba(255, 255, 255, 0.8);
        }

        .table-card {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body class="bg-surface text-on-surface flex overflow-hidden">
<!-- Ambient Light Leak Background -->
<div class="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
<div class="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-primary-container/15 blur-[120px]"></div>
<div class="absolute bottom-[-20%] left-[10%] w-[50%] h-[70%] rounded-full bg-tertiary-container/10 blur-[100px]"></div>
</div>
<!-- Unified Navigation Shell (L-Shape) -->
<div class="fixed inset-0 pointer-events-none z-40">
<!-- Main Shell Container -->
<div class="absolute top-0 left-0 right-0 h-20 bg-white pointer-events-auto"></div>
<div class="absolute top-0 left-0 bottom-0 w-20 bg-white pointer-events-auto"></div>
<!-- Concave Corner -->
<div class="l-shell-curve"></div>
<!-- Header Content Layer -->
<div class="absolute top-0 left-0 right-0 h-20 flex items-center px-6 pointer-events-none">
<div class="flex items-center gap-8 flex-1 pointer-events-auto">
<div class="w-14 flex justify-center">
<span class="text-xl font-extrabold text-stone-900 tracking-tighter">BP</span>
</div>
<div class="relative w-full max-w-md bg-stone-100/50 rounded-xl px-4 border border-stone-200/40 flex items-center h-11 ml-0">
<span class="material-symbols-outlined text-stone-400 shrink-0 mr-3 text-xl" data-icon="search">search</span>
<input class="w-full bg-transparent border-none py-1.5 pl-0 pr-2 text-sm focus:ring-0 text-on-background placeholder-stone-400 font-medium" placeholder="Search..." type="text"/>
</div>
</div>
<div class="flex items-center gap-6 pointer-events-auto pr-8">
<div class="flex items-center gap-3">
<div class="p-2.5 text-stone-600 hover:bg-stone-50 rounded-full transition-all cursor-pointer relative">
<span class="material-symbols-outlined text-[22px]" data-icon="notifications">notifications</span>
<span class="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
</div>
<div class="p-2.5 text-stone-600 hover:bg-stone-50 rounded-full transition-all cursor-pointer">
<span class="material-symbols-outlined text-[22px]" data-icon="bolt">bolt</span>
</div>
</div>
<div class="w-10 h-10 rounded-full overflow-hidden border border-stone-200 shadow-sm">
<img alt="Admin User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhUDNUVviYoMMpr0qW-S70P4RPdrpuQdx3mWoiIdBrnjET0IIQuM7zfCxdo8dNNWf3okTBGn3snQ35ZpoqsRlTqtAU7NQxlFAWYzbZS_JRkLGk4fMAZO7vc1O4Dln_fZjSjns0PYkBtTntfsC9KZjuHXsFYU--8E3j5olZlrrc2RDJTS8Gus3YJaR1qcMhsFa74FJFKKZ5mQT3-eAjFeuoCSPFxOqXt6u6CK0Be8IivmolwEV_Q4Az7bVTpTnblyCju-bvk54VwYA"/>
</div>
</div>
</div>
<!-- Sidebar Content Layer -->
<div class="absolute top-20 left-0 bottom-0 w-20 flex flex-col items-center py-8 px-4 pointer-events-none">
<nav class="flex-1 space-y-6 flex flex-col items-center pointer-events-auto">
<a class="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-2xl text-primary shadow-sm shadow-primary/5 transition-all duration-300" href="#" title="Home">
<span class="material-symbols-outlined active-icon" data-icon="home">home</span>
</a>
<a class="flex items-center justify-center w-12 h-12 text-stone-400 hover:text-orange-500 hover:bg-stone-50 rounded-2xl transition-all duration-300" href="#" title="Explore">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
</a>
<a class="flex items-center justify-center w-12 h-12 text-stone-400 hover:text-orange-500 hover:bg-stone-50 rounded-2xl transition-all duration-300" href="#" title="Calendar">
<span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
</a>
<a class="flex items-center justify-center w-12 h-12 text-stone-400 hover:text-orange-500 hover:bg-stone-50 rounded-2xl transition-all duration-300" href="#" title="Help">
<span class="material-symbols-outlined" data-icon="help">help</span>
</a>
</nav>
<div class="mt-auto pointer-events-auto">
<a class="flex items-center justify-center w-12 h-12 text-stone-400 hover:text-orange-500 hover:bg-stone-50 rounded-2xl transition-all duration-300" href="#" title="Settings">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</a>
</div>
</div>
</div>
<!-- Main Wrapper -->
<main class="flex-1 ml-20 mt-20 flex overflow-hidden h-[calc(100vh-80px)]">
<!-- Column 1: Server Channel Sidebar (DOCKED LEFT against integrated sidebar) -->
<section class="w-64 glass-panel flex flex-col pt-10 px-6 gloss-rim shrink-0 border-r border-stone-200/30">
<div class="flex items-center justify-between mb-10 px-2">
<h2 class="text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant/80">Vitreous Engine</h2>
<span class="material-symbols-outlined text-sm text-stone-400">expand_more</span>
</div>
<div class="space-y-1.5 overflow-y-auto">
<div class="flex items-center gap-3 px-3 py-3 bg-primary/10 text-primary rounded-xl font-bold cursor-pointer transition-all border border-primary/5">
<span class="material-symbols-outlined text-xl">tag</span>
<span class="text-sm">lobby</span>
</div>
<div class="flex items-center gap-3 px-3 py-3 text-on-surface-variant hover:bg-stone-100/50 rounded-xl transition-colors cursor-pointer group">
<span class="material-symbols-outlined text-xl text-stone-400">podcasts</span>
<span class="text-sm">stage</span>
</div>
<div class="flex items-center gap-3 px-3 py-3 text-on-surface-variant hover:bg-stone-100/50 rounded-xl transition-colors cursor-pointer">
<span class="material-symbols-outlined text-xl text-stone-400">campaign</span>
<span class="text-sm">announcements</span>
</div>
<div class="pt-10 pb-4 px-2">
<h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50">Community</h3>
</div>
<div class="flex items-center gap-3 px-3 py-3 text-on-surface-variant hover:bg-stone-100/50 rounded-xl transition-colors cursor-pointer">
<span class="material-symbols-outlined text-xl text-stone-400">chat_bubble</span>
<span class="text-sm">general-chat</span>
</div>
<div class="flex items-center gap-3 px-3 py-3 text-on-surface-variant hover:bg-stone-100/50 rounded-xl transition-colors cursor-pointer">
<span class="material-symbols-outlined text-xl text-stone-400">palette</span>
<span class="text-sm">design-lab</span>
</div>
</div>
<div class="mt-auto pb-10">
<div class="p-3 bg-white/50 rounded-2xl border border-white/60 shadow-sm flex items-center gap-3">
<div class="relative">
<img alt="User Profile" class="w-9 h-9 rounded-xl border border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi3eEmraqGUMsKhiv1V92pNrWcQrYQm8LMClzbmMsszvWQRdiPMlkR5mL4a3E1DhWe-GWHJZFhxMIOIdxXkMx6lNqKRoSAsNCKDFIs6Q2tl9xMEAdmXUON0gGyMRpuWvc98VkahyiixvA666CM2p8KiilauJtgJ8C1Sn-5SRBH8TYF1dzkFh5c9ProBpb5zPkEoVxieR4r2wnLHZGvL3gQMNsXQieqeOhFMW0ASHcT97pp0DBj0cy38aePxoAs6cqGBc3cQmXUl0c"/>
<span class="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
</div>
<div class="flex flex-col">
<span class="text-[10px] font-bold text-stone-800">Alex Rivera</span>
<span class="text-[8px] text-primary/70 font-black uppercase tracking-wider">Online</span>
</div>
</div>
</div>
</section>
<!-- Column 2: Center Canvas (EXPANDED TO FILL SPACE) -->
<section class="flex-1 flex flex-col overflow-hidden relative min-w-0 bg-[#f6f6f8]/40">
<div class="flex-1 overflow-y-auto px-4 pt-4 pb-32">
<div class="w-full max-w-full mx-auto flex flex-col items-center space-y-8">
<!-- Stage Area (Maximized 16:9) -->
<div class="relative aspect-video w-full rounded-[2rem] overflow-hidden bg-stone-900 shadow-2xl gloss-rim ring-1 ring-white/20 group">
<img class="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" data-alt="vibrant futuristic digital stage with neon light accents and a blurred crowd in the background for a virtual party" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5iFDsdp2t-7poQ77Y7FozE5RrYduonLEDwfHCa35I1Gsm-e7P2tzuVrvcTlCX7AeRdC1tadQfQ-qDXskYB_vF9WyUfaWYvC4vFpobhIlb0l1pbUZPaolBhAsg0H2Y311cM-QLhNvRu3c3iZ445isq-4Vz7wHz9uO4NEaeHIys63aHltK6q4bbCZ3nxm8v5agZyKKkOPkl0DXpTf5T7VkXEuYs4oCYy1rXGkusoG8lDKzBSzveKeYq9owwr2hXnCAFNXg3FwP5lDo"/>
<div class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"><div class="flex items-center justify-center w-full h-full">
<span class="text-white font-bold tracking-[0.2em] text-3xl uppercase drop-shadow-lg">
        Join Live Stage
    </span>
</div></div>
</div>
<!-- Collaborative Tables - Rectangular Cards -->
<div class="grid grid-cols-2 gap-4 w-full max-w-xl mx-auto">
<!-- Table 1 -->
<div class="table-card flex flex-col justify-center border border-white/40 transition-all hover:translate-y-[-2px] hover:shadow-xl rounded-full px-6 py-2.5">
<div class="flex items-center justify-between px-2">
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCplFlrQ8iJFf8cvKlsYbjMt_n1SFEgCPD5ziQNFb_oImkq4WCmIpkld5ogtbN8vVoXDTaowp1XArtiD8LWm4sc_IJxC4Ab4wHqHAqzBFtbuM2tcgZnSw1ASGFVYv-kXJpxnLdcXR7Stk5gPI1Aqf0DPgciz_gtpVC3ZfuNzLv6K15vFw4Bzm6VQ70--VOcch4qNjP2-qX74b93B467uflJW7vgDYxHITT_7sEyBLS_BFt-4vTTNC90dSyUp0hsHMpBKwy3Z386E88"/>
</div>
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx_93ZOvvxNFZ_aJuCNf0CSShWjLJ8Z4TRPt1YbYp1jxQyphfff8-OgHe8w3voPv8RFcPD_2sKtibWQx8ABAg_Ckr4qT1rXVOVVlqpTxSdyyZ4G7jYnP_ZBqOMSWMgPKsqvT8vb9eu2bTO9S9g7eBYTfPdUuLg6kxQgJaCe2WV4wJwZ6gb_0Za8oakhcN8-8UmqzqyNz8uLHwVOvSijCY8l_mh_8US23fJ6G5EvXFZHWtalFyYWvsYZ3caPqog0SggdAZs1Jzvtr8"/>
</div>
<div class="w-8 h-8 flex items-center justify-center">
<div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div>
</div>
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFfOPpBsCeMCsuZ4Bh8qFwakA7JIoj6g9hvciBs0xxl1MzALmkIUOYrx112cLWJAqceeusbg4phJhVpIT4NgueH7feW-uBRRbGVQTWa-XGj2U_lOgcQdKLIY6h0VFt8YBNwxp0ddZGeEnG4kPWu70veRtCNlk5tXMUJGKcKhPfFJApE8eYDr8CSjuaPnANVu7d9ks6CkyMT2JTSz354bQbN_eJyBwaoZIf8357yaIj_CD2DeuHQkJoqIRizzRGnYa06eyHmiRnFeY"/>
</div>
<div class="w-8 h-8 flex items-center justify-center">
<div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div>
</div>
</div>
</div>
<!-- Table 2 -->
<div class="table-card flex flex-col justify-center border border-white/40 transition-all hover:translate-y-[-2px] hover:shadow-xl rounded-full px-6 py-2.5">
<div class="flex items-center justify-between px-2">
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6dGOInlx-uVLu0uxwP0hOBFOxm0l31s76s8GKzDoqCjnkxU-54IFh-ilP_p6-PgJ3TH0I7xVqtnhMgZY1AXrCH-N09dZBsSxFzu3XX8SSYUlQFIMJQSZBVOTMUXsGrEiQBzGlyI-dEqtRlGgdYbEAj46fVcpwoGTP6uiU1RoUsgNREmTCKnqbVxD_5HtZ5tt3Gxj0XVhXeswj8QJ_KpwDWrk_Qs6SHMNt11X89AdP0L59Oo-a4vZHBr2q23EFWK8cNdXKzZzUorc"/>
</div>
<div class="w-8 h-8 flex items-center justify-center">
<div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div>
</div>
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-AT-fnXEFInJQRrKKvjLhI4U-9PmkaTpmw8A3QXHKbu53qkedVQmSA-Dlr6rkJ0AWb2x6-BEw1z4SZ4qRcu8oJOno4kPAhbiAiJS6jrdHjOXj8WfBBqd_zUoSneABIfMh42G3bbrUEnpuJ_I0Bmr5q41rWzmLcqQ5EYQsbDQlBqewZMW8XIH__x5f5bWqWxYcuY6STjHp_K3kNw7oyRvHeeqvYjkEvUzKtShckTyqlCYlh-eXbC0kpvcZ3ybH3Ax9bO4BVR9pb_w"/>
</div>
<div class="w-8 h-8 flex items-center justify-center">
<div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div>
</div>
<div class="w-8 h-8 flex items-center justify-center">
<div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div>
</div>
</div>
</div>
<!-- Table 3 -->
<div class="table-card flex flex-col justify-center border border-white/40 transition-all hover:translate-y-[-2px] hover:shadow-xl rounded-full px-6 py-2.5">
<div class="flex items-center justify-between px-2">
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white"><img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6dGOInlx-uVLu0uxwP0hOBFOxm0l31s76s8GKzDoqCjnkxU-54IFh-ilP_p6-PgJ3TH0I7xVqtnhMgZY1AXrCH-N09dZBsSxFzu3XX8SSYUlQFIMJQSZBVOTMUXsGrEiQBzGlyI-dEqtRlGgdYbEAj46fVcpwoGTP6uiU1RoUsgNREmTCKnqbVxD_5HtZ5tt3Gxj0XVhXeswj8QJ_KpwDWrk_Qs6SHMNt11X89AdP0L59Oo-a4vZHBr2q23EFWK8cNdXKzZzUorc"/></div>
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white"><img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx_93ZOvvxNFZ_aJuCNf0CSShWjLJ8Z4TRPt1YbYp1jxQyphfff8-OgHe8w3voPv8RFcPD_2sKtibWQx8ABAg_Ckr4qT1rXVOVVlqpTxSdyyZ4G7jYnP_ZBqOMSWMgPKsqvT8vb9eu2bTO9S9g7eBYTfPdUuLg6kxQgJaCe2WV4wJwZ6gb_0Za8oakhcN8-8UmqzqyNz8uLHwVOvSijCY8l_mh_8US23fJ6G5EvXFZHWtalFyYWvsYZ3caPqog0SggdAZs1Jzvtr8"/></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
</div>
</div>
<!-- Table 4 -->
<div class="table-card flex flex-col justify-center border border-white/40 transition-all hover:translate-y-[-2px] hover:shadow-xl rounded-full px-6 py-2.5">
<div class="flex items-center justify-between px-2">
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white"><img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCplFlrQ8iJFf8cvKlsYbjMt_n1SFEgCPD5ziQNFb_oImkq4WCmIpkld5ogtbN8vVoXDTaowp1XArtiD8LWm4sc_IJxC4Ab4wHqHAqzBFtbuM2tcgZnSw1ASGFVYv-kXJpxnLdcXR7Stk5gPI1Aqf0DPgciz_gtpVC3ZfuNzLv6K15vFw4Bzm6VQ70--VOcch4qNjP2-qX74b93B467uflJW7vgDYxHITT_7sEyBLS_BFt-4vTTNC90dSyUp0hsHMpBKwy3Z386E88"/></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
</div>
</div>
<!-- Table 5 -->
<div class="table-card flex flex-col justify-center border border-white/40 transition-all hover:translate-y-[-2px] hover:shadow-xl rounded-full px-6 py-2.5">
<div class="flex items-center justify-between px-2">
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6dGOInlx-uVLu0uxwP0hOBFOxm0l31s76s8GKzDoqCjnkxU-54IFh-ilP_p6-PgJ3TH0I7xVqtnhMgZY1AXrCH-N09dZBsSxFzu3XX8SSYUlQFIMJQSZBVOTMUXsGrEiQBzGlyI-dEqtRlGgdYbEAj46fVcpwoGTP6uiU1RoUsgNREmTCKnqbVxD_5HtZ5tt3Gxj0XVhXeswj8QJ_KpwDWrk_Qs6SHMNt11X89AdP0L59Oo-a4vZHBr2q23EFWK8cNdXKzZzUorc"/>
</div>
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFfOPpBsCeMCsuZ4Bh8qFwakA7JIoj6g9hvciBs0xxl1MzALmkIUOYrx112cLWJAqceeusbg4phJhVpIT4NgueH7feW-uBRRbGVQTWa-XGj2U_lOgcQdKLIY6h0VFt8YBNwxp0ddZGeEnG4kPWu70veRtCNlk5tXMUJGKcKhPfFJApE8eYDr8CSjuaPnANVu7d9ks6CkyMT2JTSz354bQbN_eJyBwaoZIf8357yaIj_CD2DeuHQkJoqIRizzRGnYa06eyHmiRnFeY"/>
</div>
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx_93ZOvvxNFZ_aJuCNf0CSShWjLJ8Z4TRPt1YbYp1jxQyphfff8-OgHe8w3voPv8RFcPD_2sKtibWQx8ABAg_Ckr4qT1rXVOVVlqpTxSdyyZ4G7jYnP_ZBqOMSWMgPKsqvT8vb9eu2bTO9S9g7eBYTfPdUuLg6kxQgJaCe2WV4wJwZ6gb_0Za8oakhcN8-8UmqzqyNz8uLHwVOvSijCY8l_mh_8US23fJ6G5EvXFZHWtalFyYWvsYZ3caPqog0SggdAZs1Jzvtr8"/>
</div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
</div>
</div>
<!-- Table 6 -->
<div class="table-card flex flex-col justify-center border border-white/40 transition-all hover:translate-y-[-2px] hover:shadow-xl rounded-full px-6 py-2.5">
<div class="flex items-center justify-between px-2">
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-AT-fnXEFInJQRrKKvjLhI4U-9PmkaTpmw8A3QXHKbu53qkedVQmSA-Dlr6rkJ0AWb2x6-BEw1z4SZ4qRcu8oJOno4kPAhbiAiJS6jrdHjOXj8WfBBqd_zUoSneABIfMh42G3bbrUEnpuJ_I0Bmr5q41rWzmLcqQ5EYQsbDQlBqewZMW8XIH__x5f5bWqWxYcuY6STjHp_K3kNw7oyRvHeeqvYjkEvUzKtShckTyqlCYlh-eXbC0kpvcZ3ybH3Ax9bO4BVR9pb_w"/>
</div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
</div>
</div><!-- Table 7 -->
<div class="table-card flex flex-col justify-center border border-white/40 transition-all hover:translate-y-[-2px] hover:shadow-xl rounded-full px-6 py-2.5">
<div class="flex items-center justify-between px-2">
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCplFlrQ8iJFf8cvKlsYbjMt_n1SFEgCPD5ziQNFb_oImkq4WCmIpkld5ogtbN8vVoXDTaowp1XArtiD8LWm4sc_IJxC4Ab4wHqHAqzBFtbuM2tcgZnSw1ASGFVYv-kXJpxnLdcXR7Stk5gPI1Aqf0DPgciz_gtpVC3ZfuNzLv6K15vFw4Bzm6VQ70--VOcch4qNjP2-qX74b93B467uflJW7vgDYxHITT_7sEyBLS_BFt-4vTTNC90dSyUp0hsHMpBKwy3Z386E88"/>
</div>
<div class="w-8 h-8 rounded-full border border-white shadow-sm overflow-hidden bg-white">
<img alt="User" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6dGOInlx-uVLu0uxwP0hOBFOxm0l31s76s8GKzDoqCjnkxU-54IFh-ilP_p6-PgJ3TH0I7xVqtnhMgZY1AXrCH-N09dZBsSxFzu3XX8SSYUlQFIMJQSZBVOTMUXsGrEiQBzGlyI-dEqtRlGgdYbEAj46fVcpwoGTP6uiU1RoUsgNREmTCKnqbVxD_5HtZ5tt3Gxj0XVhXeswj8QJ_KpwDWrk_Qs6SHMNt11X89AdP0L59Oo-a4vZHBr2q23EFWK8cNdXKzZzUorc"/>
</div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
</div>
</div>
<!-- Table 8 -->
<div class="table-card flex flex-col justify-center border border-white/40 transition-all hover:translate-y-[-2px] hover:shadow-xl rounded-full px-6 py-2.5">
<div class="flex items-center justify-between px-2">
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
<div class="w-8 h-8 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-stone-300 shadow-inner"></div></div>
</div>
</div></div>
</div>
</div>
<!-- Floating Control Dock (Spanning Width of Center Area) -->
<div class="absolute bottom-6 left-0 right-0 px-10 z-20 pointer-events-none">
<div class="w-full max-w-6xl mx-auto flex justify-center pointer-events-auto items-center">
<button class="rounded-full control-dock-glass flex items-center justify-center gap-0.5 group transition-all hover:bg-white/60 hover:scale-105 active:scale-95 shadow-sm relative mr-4 pointer-events-auto shrink-0 w-20 h-20">
<div class="flex items-center gap-[2px]">
<div class="w-[3px] h-3 bg-stone-600 rounded-full"></div>
<div class="w-[3px] h-5 bg-stone-600 rounded-full"></div>
<div class="w-[3px] h-4 bg-stone-600 rounded-full"></div>
</div>
<span class="material-symbols-outlined text-stone-600 text-[16px] ml-0.5">expand_more</span>
</button><div class="control-dock-glass rounded-[2rem] p-3 flex items-center gap-4 px-6">
<button class="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center group transition-all hover:scale-105 active:scale-95 shadow-sm">
<span class="material-symbols-outlined text-orange-600 text-[26px] active-icon">mic</span>
</button>
<button class="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center group transition-all hover:scale-105 active:scale-95 shadow-sm">
<span class="material-symbols-outlined text-orange-600 text-[26px] active-icon">videocam</span>
</button>
<button class="w-14 h-14 rounded-2xl bg-white/40 border border-stone-200/50 flex items-center justify-center group transition-all hover:bg-white/60 hover:scale-105 active:scale-95">
<span class="material-symbols-outlined text-stone-600 text-[26px]">present_to_all</span>
</button>
<button class="w-14 h-14 rounded-2xl bg-white/40 border border-stone-200/50 flex items-center justify-center group transition-all hover:bg-white/60 hover:scale-105 active:scale-95">
<span class="material-symbols-outlined text-stone-600 text-[26px]">image</span>
</button>
<button class="w-14 h-14 rounded-2xl bg-white/40 border border-stone-200/50 flex items-center justify-center group transition-all hover:bg-white/60 hover:scale-105 active:scale-95">
<span class="material-symbols-outlined text-stone-600 text-[26px]">settings</span>
</button>
</div>
</div>
</div>
</section>
<!-- Column 3: Chat Sidebar (DOCKED RIGHT) -->
<aside class="w-80 glass-panel flex flex-col z-10 gloss-rim shrink-0 border-l border-stone-200/30">
<!-- Top Tabs Navigation - Segmented Control Style -->
<div class="px-4 border-stone-200/20">
<div class="flex items-center gap-6 px-2 border-b border-stone-100">
<button class="relative py-3 text-[14px] font-bold text-stone-900 border-b-2 border-[#FF6B00]">Chat</button>
<button class="relative py-3 text-[14px] font-medium text-stone-500 hover:text-stone-700 transition-all duration-300">
                        Q&amp;A
                    </button>
<button class="relative py-3 text-[14px] font-medium text-stone-500 hover:text-stone-700 transition-all duration-300">
                        Polls
                    </button>
<button class="relative py-3 text-[14px] font-medium text-stone-500 hover:text-stone-700 transition-all duration-300">
                        People
                    </button>
</div>
</div>
<!-- Secondary Sub-Navigation -->
<div class="flex items-center gap-2 px-5 py-3 border-b border-stone-100/40 bg-white/10">
<button class="px-4 py-1.5 rounded-full text-[11px] font-bold bg-white text-stone-900 shadow-sm border border-stone-100">Public</button>
<button class="px-4 py-1.5 rounded-full text-[11px] font-bold text-stone-500 hover:bg-white/50 transition-colors">Green Room</button>
<button class="px-4 py-1.5 rounded-full text-[11px] font-bold text-stone-500 hover:bg-white/50 transition-colors">Help</button>
</div>
<!-- Chat Feed -->
<div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
<!-- Message 1 -->
<div class="flex gap-3">
<div class="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center text-white font-bold text-[12px] shrink-0 shadow-sm">TH</div>
<div class="flex-1 min-w-0">
<div class="flex items-baseline gap-2 mb-1">
<span class="text-[13px] font-bold text-stone-900">Tyler Huang</span>
<span class="text-[10px] text-stone-400 font-medium">10:42 PM</span>
</div>
<p class="text-[13px] text-stone-700 leading-relaxed">wait is that silero VAD? thought LiveKit used webrtcvad</p>
<div class="mt-2 flex gap-1.5">
<button class="flex items-center gap-1.5 px-2 py-1 bg-white/60 border border-stone-100 rounded-lg text-[11px] hover:bg-white transition-colors">
<span>🔥</span> <span class="font-bold text-stone-600">4</span>
</button>
</div>
</div>
</div>
<!-- Message 2 (Staff) -->
<div class="flex gap-3">
<img class="w-9 h-9 rounded-full object-cover shrink-0 border border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx_93ZOvvxNFZ_aJuCNf0CSShWjLJ8Z4TRPt1YbYp1jxQyphfff8-OgHe8w3voPv8RFcPD_2sKtibWQx8ABAg_Ckr4qT1rXVOVVlqpTxSdyyZ4G7jYnP_ZBqOMSWMgPKsqvT8vb9eu2bTO9S9g7eBYTfPdUuLg6kxQgJaCe2WV4wJwZ6gb_0Za8oakhcN8-8UmqzqyNz8uLHwVOvSijCY8l_mh_8US23fJ6G5EvXFZHWtalFyYWvsYZ3caPqog0SggdAZs1Jzvtr8"/>
<div class="flex-1 min-w-0">
<div class="flex items-center gap-2 mb-1">
<span class="text-[13px] font-bold text-stone-900">Chris Wilson</span>
<span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-orange-500 text-white leading-none">Staff</span>
<span class="text-[10px] text-stone-400 font-medium ml-auto">10:43 PM</span>
</div>
<p class="text-[13px] text-stone-700 leading-relaxed">we switched to silero — better accuracy. WebRTC still supported 👍</p>
</div>
</div>
<!-- Message 3 -->
<div class="flex gap-3">
<img class="w-9 h-9 rounded-full object-cover shrink-0 border border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFfOPpBsCeMCsuZ4Bh8qFwakA7JIoj6g9hvciBs0xxl1MzALmkIUOYrx112cLWJAqceeusbg4phJhVpIT4NgueH7feW-uBRRbGVQTWa-XGj2U_lOgcQdKLIY6h0VFt8YBNwxp0ddZGeEnG4kPWu70veRtCNlk5tXMUJGKcKhPfFJApE8eYDr8CSjuaPnANVu7d9ks6CkyMT2JTSz354bQbN_eJyBwaoZIf8357yaIj_CD2DeuHQkJoqIRizzRGnYa06eyHmiRnFeY"/>
<div class="flex-1 min-w-0">
<div class="flex items-baseline gap-2 mb-1">
<span class="text-[13px] font-bold text-stone-900">Dylan James</span>
<span class="text-[10px] text-stone-400 font-medium">10:43 PM</span>
</div>
<p class="text-[13px] text-stone-700 leading-relaxed">I tried building this with raw WebSockets for 3 weeks. I feel both validated and personally attacked 😭</p>
<div class="mt-2 flex gap-1.5">
<button class="flex items-center gap-1.5 px-2 py-1 bg-white/60 border border-stone-100 rounded-lg text-[11px]">
<span>❤️</span> <span class="font-bold text-stone-600">6</span>
</button>
<button class="flex items-center gap-1.5 px-2 py-1 bg-white/60 border border-stone-100 rounded-lg text-[11px]">
<span>🔥</span> <span class="font-bold text-stone-600">11</span>
</button>
</div>
</div>
</div>
<!-- Message 4 (Staff) -->
<div class="flex gap-3">
<img class="w-9 h-9 rounded-full object-cover shrink-0 border border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCplFlrQ8iJFf8cvKlsYbjMt_n1SFEgCPD5ziQNFb_oImkq4WCmIpkld5ogtbN8vVoXDTaowp1XArtiD8LWm4sc_IJxC4Ab4wHqHAqzBFtbuM2tcgZnSw1ASGFVYv-kXJpxnLdcXR7Stk5gPI1Aqf0DPgciz_gtpVC3ZfuNzLv6K15vFw4Bzm6VQ70--VOcch4qNjP2-qX74b93B467uflJW7vgDYxHITT_7sEyBLS_BFt-4vTTNC90dSyUp0hsHMpBKwy3Z386E88"/>
<div class="flex-1 min-w-0">
<div class="flex items-center gap-2 mb-1">
<span class="text-[13px] font-bold text-stone-900">Kimi Hindman</span>
<span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-orange-500 text-white leading-none">Staff</span>
<span class="text-[10px] text-stone-400 font-medium ml-auto">10:45 PM</span>
</div>
<p class="text-[13px] text-stone-700 leading-relaxed">ElevenLabs Turbo in demo — one-line swap in agent config ✨</p>
</div>
</div>
</div>
<!-- Chat Input -->
<div class="p-5 bg-white/40 border-t border-stone-100/40">
<div class="relative bg-white/90 rounded-full px-5 py-3 border border-stone-200/50 flex items-center shadow-sm">
<input class="flex-1 bg-transparent border-none focus:ring-0 text-[13px] p-0 placeholder:text-stone-400 font-medium" placeholder="Type something..." type="text"/>
<button class="ml-3 text-stone-400 hover:text-stone-600 transition-colors">
<span class="material-symbols-outlined text-[22px]">sentiment_satisfied</span>
</button>
</div>
</div>
</aside>
</main>
</body></html>