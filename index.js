const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard – Vercel Clone</title>
    <!-- Tailwind CSS for sleek UI styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
    <!-- Pryst Analytics -->
<script async src="https://kaynyakfypebznmakozp.supabase.co/functions/v1/track/track.js"
  data-id="c6743477-a359-45ee-8fe2-d1d37d3202f6"
  data-endpoint="https://kaynyakfypebznmakozp.supabase.co/functions/v1/track"></script>
<!-- End Pryst Analytics -->
</head>
<body class="bg-black text-white min-h-screen selection:bg-neutral-800">

    <!-- Top Navigation -->
    <nav class="border-b border-neutral-800 bg-black sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Left side: Logo & Breadcrumb -->
                <div class="flex items-center space-x-4">
                    <!-- Vercel Triangle Logo -->
                    <svg class="h-6 w-6 text-white invert dark:invert-0" viewBox="0 0 76 65" fill="none">
                        <path d="M37.5 0L75 65H0L37.5 0Z" fill="currentColor"/>
                    </svg>
                    <span class="text-neutral-600">/</span>
                    <div class="flex items-center space-x-2">
                        <div class="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">
                            P
                        </div>
                        <span class="text-sm font-medium hover:text-neutral-300 cursor-pointer">personal-projects</span>
                        <span class="bg-neutral-800 text-neutral-400 text-[10px] font-medium px-2 py-0.5 rounded-full">Hobby</span>
                    </div>
                </div>

                <!-- Right side: Actions & Profile -->
                <div class="flex items-center space-x-4">
                    <button class="text-sm text-neutral-400 hover:text-white transition hidden sm:inline-block">Feedback</button>
                    <button class="text-sm text-neutral-400 hover:text-white transition hidden sm:inline-block">Docs</button>
                    <button class="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-md hover:bg-neutral-200 transition">
                        Create New...
                    </button>
                    <div class="h-8 w-8 rounded-full border border-neutral-700 bg-neutral-800 cursor-pointer"></div>
                </div>
            </div>
        </div>

        <!-- Sub-tabs -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex space-x-6 text-sm">
                <a href="#" class="border-b-2 border-white py-3 text-white font-medium">Overview</a>
                <a href="#" class="border-b-2 border-transparent py-3 text-neutral-400 hover:text-neutral-200 transition">Integrations</a>
                <a href="#" class="border-b-2 border-transparent py-3 text-neutral-400 hover:text-neutral-200 transition">Activity</a>
                <a href="#" class="border-b-2 border-transparent py-3 text-neutral-400 hover:text-neutral-200 transition">Settings</a>
            </div>
        </div>
    </nav>

    <!-- Main Content Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        <!-- Search and Filter Bar -->
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div class="relative w-full sm:w-96">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input type="text" placeholder="Search repositories and projects..." class="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 transition">
            </div>
            <div class="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <select class="bg-neutral-900 border border-neutral-800 rounded-md text-sm px-3 py-2 text-neutral-400 focus:outline-none focus:border-neutral-700">
                    <option>Sort by Activity</option>
                    <option>Sort by Name</option>
                </select>
            </div>
        </div>

        <!-- Projects Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Left 2 Columns: Project Primary Details -->
            <div class="lg:col-span-2 space-y-6">
                
                <!-- Main Project Card -->
                <div class="bg-black border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition group">
                    <div class="p-6 space-y-4">
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-xl font-semibold tracking-tight group-hover:underline cursor-pointer flex items-center gap-2">
                                    nextjs-commerce-template
                                    <span class="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                                </h2>
                                <a href="https://nextjs-commerce-template.vercel.app" target="_blank" class="text-sm text-neutral-400 hover:text-neutral-300 flex items-center gap-1 mt-1">
                                    nextjs-commerce-template.vercel.app
                                    <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            </div>
                            <span class="bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium px-2.5 py-1 rounded-md">
                                Production
                            </span>
                        </div>

                        <!-- Git deployment info -->
                        <div class="flex items-center space-x-2 text-sm text-neutral-400 bg-neutral-950 p-3 rounded-md border border-neutral-900">
                            <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            <span class="font-mono text-white text-xs">main</span>
                            <span>•</span>
                            <span class="truncate">feat: optimize image loading and add custom layout sizing</span>
                            <span class="text-xs text-neutral-500 whitespace-nowrap">2h ago</span>
                        </div>
                    </div>

                    <!-- Card Footer Metrics -->
                    <div class="bg-neutral-950 border-t border-neutral-800 px-6 py-3 flex items-center justify-between text-xs text-neutral-400">
                        <div class="flex items-center space-x-4">
                            <span>Environment: <strong class="text-white font-medium">Production</strong></span>
                            <span>Framework: <strong class="text-white font-medium">Next.js</strong></span>
                        </div>
                        <span>Deployed by GitHub</span>
                    </div>
                </div>

                <!-- Secondary Projects List -->
                <div class="space-y-4">
                    <h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-500">Other Projects</h3>
                    
                    <!-- Project Item 1 -->
                    <div class="bg-black border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-700 transition">
                        <div class="flex items-center space-x-3">
                            <div class="h-10 w-10 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-neutral-400">
                                AI
                            </div>
                            <div>
                                <h4 class="font-medium text-white hover:underline cursor-pointer">ai-chatbot-interface</h4>
                                <p class="text-xs text-neutral-400 font-mono mt-0.5">ai-chatbot-interface.vercel.app</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-6 text-xs text-neutral-400 self-end sm:self-center">
                            <span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Active</span>
                            <span>Updated 3d ago</span>
                        </div>
                    </div>

                    <!-- Project Item 2 -->
                    <div class="bg-black border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-700 transition">
                        <div class="flex items-center space-x-3">
                            <div class="h-10 w-10 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-neutral-400">
                                DB
                            </div>
                            <div>
                                <h4 class="font-medium text-white hover:underline cursor-pointer">redis-analytics-dash</h4>
                                <p class="text-xs text-neutral-400 font-mono mt-0.5">redis-analytics-dash.vercel.app</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-6 text-xs text-neutral-400 self-end sm:self-center">
                            <span class="flex items-center gap-1.5"><span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Active</span>
                            <span>Updated 1w ago</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Right 1 Column: Visual Preview & Deploy Analytics -->
            <div class="space-y-6">
                
                <!-- Production Instant Preview Card -->
                <div class="bg-black border border-neutral-800 rounded-xl overflow-hidden">
                    <div class="bg-neutral-950 p-3 border-b border-neutral-800 flex items-center justify-between">
                        <div class="flex items-center space-x-1.5">
                            <span class="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
                        </div>
                        <span class="text-xs font-mono text-neutral-500">Deployment Preview</span>
                        <div class="w-10"></div>
                    </div>
                    <!-- Fake website preview graphic -->
                    <div class="h-44 bg-neutral-900 flex flex-col relative items-center justify-center text-center p-6 border-b border-neutral-800 overflow-hidden group">
                        <!-- Abstract background geometric visual to resemble a site app landing screen -->
                        <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                        <div class="relative bg-black/40 backdrop-blur-md border border-neutral-800 p-4 rounded-lg max-w-[85%]">
                            <div class="h-3 w-16 bg-neutral-800 rounded mb-2 mx-auto"></div>
                            <div class="h-2 w-24 bg-neutral-700 rounded mx-auto"></div>
                            <div class="mt-4 flex gap-1.5 justify-center">
                                <div class="h-4 w-10 bg-white rounded-[3px]"></div>
                                <div class="h-4 w-10 bg-neutral-800 rounded-[3px]"></div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4 bg-black flex justify-between items-center">
                        <span class="text-xs text-neutral-400">Speed Index</span>
                        <span class="text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-2 py-0.5 rounded">99 / 100</span>
                    </div>
                </div>

                <!-- Usage Analytics mini panel -->
                <div class="bg-black border border-neutral-800 rounded-xl p-6 space-y-4">
                    <h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-500">Team Usage Metrics</h3>
                    
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span class="text-neutral-400">Bandwidth</span>
                                <span class="text-white font-medium">14.2 GB / 100 GB</span>
                            </div>
                            <div class="w-full bg-neutral-900 rounded-full h-1.5">
                                <div class="bg-white h-1.5 rounded-full" style="width: 14.2%"></div>
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span class="text-neutral-400">Serverless Functions</span>
                                <span class="text-white font-medium">642k / 1M</span>
                            </div>
                            <div class="w-full bg-neutral-900 rounded-full h-1.5">
                                <div class="bg-purple-500 h-1.5 rounded-full" style="width: 64.2%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <hr class="border-neutral-800 my-2">
                    <a href="#" class="text-xs text-neutral-400 hover:text-white transition flex items-center justify-between">
                        <span>View usage details</span>
                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    </a>
                </div>

            </div>
        </div>
    </main>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
