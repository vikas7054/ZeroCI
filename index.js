const express = require('express');
const app = express();

app.get('*', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard – Vercel Clone</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .view-content { display: none; }
        .view-content.active { display: block; }
    </style>
</head>
<body class="bg-black text-white min-h-screen selection:bg-neutral-800">

    <nav class="border-b border-neutral-800 bg-black sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-4">
                    <svg class="h-6 w-6 text-white cursor-pointer" viewBox="0 0 76 65" fill="none" onclick="navigateTo('/')">
                        <path d="M37.5 0L75 65H0L37.5 0Z" fill="currentColor"/>
                    </svg>
                    <span class="text-neutral-600">/</span>
                    <div class="flex items-center space-x-2">
                        <div class="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">P</div>
                        <span class="text-sm font-medium hover:text-neutral-300 cursor-pointer" onclick="navigateTo('/')">personal-projects</span>
                        <span class="bg-neutral-800 text-neutral-400 text-[10px] font-medium px-2 py-0.5 rounded-full">Hobby</span>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <button class="text-sm text-neutral-400 hover:text-white transition hidden sm:inline-block">Feedback</button>
                    <button class="text-sm text-neutral-400 hover:text-white transition hidden sm:inline-block">Docs</button>
                    <button class="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-md hover:bg-neutral-200 transition">Create New...</button>
                    <div class="h-8 w-8 rounded-full border border-neutral-700 bg-neutral-800 cursor-pointer"></div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="nav-tabs" class="flex space-x-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-none">
                <button data-path="/" onclick="navigateTo('/')" class="nav-tab border-b-2 border-white py-3 text-white font-medium transition focus:outline-none">Overview</button>
                <button data-path="/integrations" onclick="navigateTo('/integrations')" class="nav-tab border-b-2 border-transparent py-3 text-neutral-400 hover:text-neutral-200 transition focus:outline-none">Integrations</button>
                <button data-path="/activity" onclick="navigateTo('/activity')" class="nav-tab border-b-2 border-transparent py-3 text-neutral-400 hover:text-neutral-200 transition focus:outline-none">Activity</button>
                <button data-path="/settings" onclick="navigateTo('/settings')" class="nav-tab border-b-2 border-transparent py-3 text-neutral-400 hover:text-neutral-200 transition focus:outline-none">Settings</button>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div id="view-overview" class="view-content active space-y-10">
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

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-black border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition group">
                        <div class="p-6 space-y-4">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h2 class="text-xl font-semibold tracking-tight group-hover:underline cursor-pointer flex items-center gap-2">
                                        nextjs-commerce-template
                                        <span class="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                                    </h2>
                                    <a href="#" class="text-sm text-neutral-400 hover:text-neutral-300 flex items-center gap-1 mt-1">
                                        nextjs-commerce-template.vercel.app
                                    </a>
                                </div>
                                <span class="bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium px-2.5 py-1 rounded-md">Production</span>
                            </div>
                            <div class="flex items-center space-x-2 text-sm text-neutral-400 bg-neutral-950 p-3 rounded-md border border-neutral-900">
                                <span class="font-mono text-white text-xs">main</span>
                                <span>•</span>
                                <span class="truncate">feat: optimize image loading and add custom layout sizing</span>
                                <span class="text-xs text-neutral-500 whitespace-nowrap">2h ago</span>
                            </div>
                        </div>
                        <div class="bg-neutral-950 border-t border-neutral-800 px-6 py-3 flex items-center justify-between text-xs text-neutral-400">
                            <div class="flex items-center space-x-4">
                                <span>Framework: <strong class="text-white font-medium">Next.js</strong></span>
                            </div>
                            <span>Deployed by GitHub</span>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-xs font-semibold uppercase tracking-wider text-neutral-500">Other Projects</h3>
                        <div class="bg-black border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-700 transition">
                            <div class="flex items-center space-x-3">
                                <div class="h-10 w-10 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-neutral-400">AI</div>
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
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="bg-black border border-neutral-800 rounded-xl overflow-hidden">
                        <div class="bg-neutral-950 p-3 border-b border-neutral-800 flex items-center justify-between">
                            <span class="text-xs font-mono text-neutral-500">Deployment Preview</span>
                            <span class="text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-2 py-0.5 rounded">99 / 100</span>
                        </div>
                        <div class="h-36 bg-neutral-900 flex items-center justify-center border-b border-neutral-800">
                            <div class="text-center p-4 bg-black/40 border border-neutral-800 rounded-lg max-w-[80%]">
                                <div class="h-3 w-16 bg-neutral-800 rounded mb-2 mx-auto"></div>
                                <div class="h-2 w-24 bg-neutral-700 rounded mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="view-integrations" class="view-content space-y-6">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Integrations</h1>
                <p class="text-neutral-400 text-sm mt-1">Connect your workspace with tools to automate development workflows.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-black border border-neutral-800 p-6 rounded-xl hover:border-neutral-700 transition space-y-4">
                    <div class="h-12 w-12 bg-white text-black font-bold rounded-lg flex items-center justify-center text-xl">g</div>
                    <div>
                        <h3 class="font-semibold text-lg">GitHub Enterprise</h3>
                        <p class="text-sm text-neutral-400 mt-1">Link internal source repositories seamlessly with production builds.</p>
                    </div>
                    <button class="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 py-2 rounded-md text-sm font-medium transition">Configure</button>
                </div>
                <div class="bg-black border border-neutral-800 p-6 rounded-xl hover:border-neutral-700 transition space-y-4">
                    <div class="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">S</div>
                    <div>
                        <h3 class="font-semibold text-lg">Slack Notifications</h3>
                        <p class="text-sm text-neutral-400 mt-1">Get real-time workspace build diagnostics and status pings instantly.</p>
                    </div>
                    <button class="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 py-2 rounded-md text-sm font-medium transition">Configure</button>
                </div>
                <div class="bg-black border border-neutral-800 p-6 rounded-xl hover:border-neutral-700 transition space-y-4">
                    <div class="h-12 w-12 bg-neutral-900 border border-neutral-700 rounded-lg flex items-center justify-center font-bold text-xl">▲</div>
                    <div>
                        <h3 class="font-semibold text-lg">Logtail Engine</h3>
                        <p class="text-sm text-neutral-400 mt-1">Pipe real-time serverless execution run logs directly into metrics dashboards.</p>
                    </div>
                    <button class="w-full bg-white text-black py-2 rounded-md text-sm font-medium transition">Connect</button>
                </div>
            </div>
        </div>

        <div id="view-activity" class="view-content space-y-6">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Activity Log</h1>
                <p class="text-neutral-400 text-sm mt-1">A timeline auditing team event tracking logs inside your organization.</p>
            </div>
            <div class="border border-neutral-800 rounded-xl bg-black divide-y divide-neutral-800">
                <div class="p-4 flex items-center justify-between text-sm">
                    <div class="flex items-center space-x-3">
                        <div class="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center font-bold text-xs text-purple-300">U</div>
                        <p class="text-neutral-200"><strong class="text-white font-medium">user@domain.com</strong> forced production deployment on <span class="font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-300 text-xs">nextjs-commerce</span></p>
                    </div>
                    <span class="text-xs text-neutral-500">12 mins ago</span>
                </div>
                <div class="p-4 flex items-center justify-between text-sm">
                    <div class="flex items-center space-x-3">
                        <div class="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-xs">G</div>
                        <p class="text-neutral-200"><strong class="text-white font-medium">GitHub Hook</strong> triggered automatic staging build branch <span class="font-mono bg-neutral-900 px-1.5 py-0.5 rounded text-neutral-300 text-xs">patch-2</span></p>
                    </div>
                    <span class="text-xs text-neutral-500">2 hours ago</span>
                </div>
                <div class="p-4 flex items-center justify-between text-sm">
                    <div class="flex items-center space-x-3">
                        <div class="h-8 w-8 rounded-full bg-emerald-950 flex items-center justify-center font-bold text-xs text-emerald-400">DB</div>
                        <p class="text-neutral-200"><strong class="text-white font-medium">TiDB Pool</strong> updated integration target tables schemas</p>
                    </div>
                    <span class="text-xs text-neutral-500">Yesterday</span>
                </div>
            </div>
        </div>

        <div id="view-settings" class="view-content space-y-6">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Project Settings</h1>
                <p class="text-neutral-400 text-sm mt-1">Configure global variables, build steps, and environment flags.</p>
            </div>
            <div class="bg-black border border-neutral-800 rounded-xl max-w-2xl overflow-hidden">
                <div class="p-6 space-y-4">
                    <h3 class="font-medium text-lg">Project Name</h3>
                    <p class="text-neutral-400 text-sm">Renaming changes production domains automatically.</p>
                    <input type="text" value="personal-projects" class="w-full max-w-md px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-sm focus:outline-none focus:border-neutral-700">
                </div>
                <div class="bg-neutral-950 px-6 py-3 border-t border-neutral-800 flex justify-end">
                    <button class="bg-white text-black text-xs font-medium px-4 py-2 rounded-md hover:bg-neutral-200 transition">Save Changes</button>
                </div>
            </div>
            <div class="bg-black border border-red-900/50 rounded-xl max-w-2xl overflow-hidden">
                <div class="p-6 space-y-2">
                    <h3 class="font-medium text-lg text-red-500">Danger Zone</h3>
                    <p class="text-neutral-400 text-sm">Permanently wipe all cluster histories, routes, and deployments instantly.</p>
                </div>
                <div class="bg-red-950/20 px-6 py-4 border-t border-red-900/40 flex justify-end">
                    <button class="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-4 py-2 rounded-md transition">Delete Project</button>
                </div>
            </div>
        </div>

    </main>

    <script>
        // SPA Client-Side Routing Maps
        const views = {
            '/': 'view-overview',
            '/integrations': 'view-integrations',
            '/activity': 'view-activity',
            '/settings': 'view-settings'
        };

        function navigateTo(path) {
            // Update browser URL query path using standard state pushes
            window.history.pushState({}, "", path);
            renderRoute(path);
        }

        function renderRoute(path) {
            // Fallback default path assignment logic
            const targetViewId = views[path] || 'view-overview';

            // 1. Swap visibility classes across registered views
            document.querySelectorAll('.view-content').forEach(view => {
                view.classList.remove('active');
            });
            const targetView = document.getElementById(targetViewId);
            if (targetView) targetView.classList.add('active');

            // 2. Synchronize visual navigation menu bars underline focus highlights
            document.querySelectorAll('.nav-tab').forEach(tab => {
                const tabPath = tab.getAttribute('data-path');
                if (tabPath === path) {
                    tab.classList.remove('border-transparent', 'text-neutral-400');
                    tab.classList.add('border-white', 'text-white', 'font-medium');
                } else {
                    tab.classList.remove('border-white', 'text-white', 'font-medium');
                    tab.classList.add('border-transparent', 'text-neutral-400');
                }
            });
        }

        // Catch dynamic browser back/forward buttons clicks execution events
        window.addEventListener('popstate', () => {
            renderRoute(window.location.pathname);
        });

        // Initialize view states routing instantly during initialization
        document.addEventListener('DOMContentLoaded', () => {
            renderRoute(window.location.pathname);
        });
    </script>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
