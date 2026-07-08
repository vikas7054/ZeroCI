const express = require('express');
const path = require('path');
const app = express();

// 1. SERVE YOUR CUSTOM SCRIPT FROM THE SAME DIRECTORY
// This matches your <script src="/tracking.js"> tag
app.use('/tracking.js', express.static(path.join(__dirname, 'tracking.js')));

// 2. MULTI-PAGE SPA DASHBOARD ROUTER
app.get('*', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Console Dashboard – Vercel Analytics</title>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <script>
      window.ANALYTICS_PROJECT_ID = '5d6a6287-8517-4838-bd68-67f5c8cab180';
    </script>
    <script src="https://unpkg.com/rrweb@2.0.0-alpha.4/dist/rrweb.min.js"></script>
    <script src="/tracking.js" defer></script>

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
                        <div class="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">A</div>
                        <span class="text-sm font-medium hover:text-neutral-300 cursor-pointer" onclick="navigateTo('/')">analytics-workspace</span>
                        <span class="bg-neutral-800 text-neutral-400 text-[10px] font-medium px-2 py-0.5 rounded-full">Hobby</span>
                    </div>
                </div>

                <div class="flex items-center space-x-4">
                    <button class="bg-white text-black text-sm font-medium px-3 py-1.5 rounded-md hover:bg-neutral-200 transition" onclick="openNewProjectModal()">
                        Deploy Project...
                    </button>
                    <div class="h-8 w-8 rounded-full border border-neutral-700 bg-neutral-800 cursor-pointer"></div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="nav-tabs" class="flex space-x-6 text-sm overflow-x-auto whitespace-nowrap">
                <button data-path="/" onclick="navigateTo('/')" class="nav-tab border-b-2 border-white py-3 text-white font-medium focus:outline-none">Overview</button>
                <button data-path="/script-builder" onclick="navigateTo('/script-builder')" class="nav-tab border-b-2 border-transparent py-3 text-neutral-400 hover:text-neutral-200 focus:outline-none">Script Snippet</button>
                <button data-path="/activity" onclick="navigateTo('/activity')" class="nav-tab border-b-2 border-transparent py-3 text-neutral-400 hover:text-neutral-200 focus:outline-none">Deployment Log</button>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div id="view-overview" class="view-content active space-y-8">
            <div>
                <h1 class="text-xl font-bold tracking-tight">Active Projects</h1>
                <p class="text-xs text-neutral-500 mt-0.5">Stored dynamically inside your browser's LocalStorage engine.</p>
            </div>
            <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        </div>

        <div id="view-script-builder" class="view-content space-y-6">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Script Integration Code</h1>
                <p class="text-neutral-400 text-sm mt-1">Copy this block to deploy rrweb records on your multi-page remote GitHub repositories.</p>
            </div>

            <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4 max-w-3xl">
                <label class="block text-sm font-medium text-neutral-300">Select Target Project Scope ID</label>
                <select id="project-selector" onchange="updateSnippetPreview()" class="w-full max-w-md bg-black border border-neutral-800 rounded-md p-2 text-sm text-white focus:outline-none focus:border-neutral-700"></select>

                <div class="space-y-2 mt-4">
                    <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">HTML Header Integration block</span>
                    <div class="bg-black p-4 rounded-lg border border-neutral-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre"><code id="snippet-code-block"></code></div>
                </div>
            </div>
        </div>

        <div id="view-activity" class="view-content space-y-6">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">Deployment Log</h1>
                <p class="text-neutral-400 text-sm mt-1">Workspace tracking audits mapped locally.</p>
            </div>
            <div id="activity-log-wrapper" class="border border-neutral-800 rounded-xl bg-black divide-y divide-neutral-800 text-sm text-neutral-400"></div>
        </div>
    </main>

    <div id="project-modal" class="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-xl overflow-hidden shadow-2xl">
            <div class="p-6 space-y-4">
                <h3 class="text-lg font-bold">Deploy New App Track</h3>
                <div class="space-y-3 text-sm">
                    <div>
                        <label class="block text-neutral-400 mb-1">Project Name</label>
                        <input id="input-project-name" type="text" placeholder="e.g. ecommerce-store" class="w-full bg-black border border-neutral-800 rounded-md p-2 text-white focus:outline-none focus:border-neutral-700">
                    </div>
                    <div>
                        <label class="block text-neutral-400 mb-1">Domain</label>
                        <input id="input-project-domain" type="text" placeholder="e.g. mysite.com" class="w-full bg-black border border-neutral-800 rounded-md p-2 text-white focus:outline-none focus:border-neutral-700">
                    </div>
                </div>
            </div>
            <div class="bg-neutral-950 p-4 border-t border-neutral-800 flex justify-end space-x-3">
                <button class="text-xs font-medium text-neutral-400 hover:text-white px-4 py-2" onclick="closeNewProjectModal()">Cancel</button>
                <button class="bg-white text-black text-xs font-medium px-4 py-2 rounded-md hover:bg-neutral-200" onclick="saveNewProject()">Deploy App</button>
            </div>
        </div>
    </div>

    <script>
        const views = { '/': 'view-overview', '/script-builder': 'view-script-builder', '/activity': 'view-activity' };

        if (!localStorage.getItem('vercel_projects')) {
            localStorage.setItem('vercel_projects', JSON.stringify([
                { id: "5d6a6287-8517-4838-bd68-67f5c8cab180", name: "nextjs-commerce-template", domain: "nextjs-commerce-template.vercel.app", created: "2 hours ago" }
            ]));
        }
        if (!localStorage.getItem('vercel_logs')) {
            localStorage.setItem('vercel_logs', JSON.stringify(["Workspace instance baseline profile configured successfully."]));
        }

        function navigateTo(path) {
            window.history.pushState({}, "", path);
            renderRoute(path);
        }

        function renderRoute(path) {
            const targetViewId = views[path] || 'view-overview';
            document.querySelectorAll('.view-content').forEach(view => view.classList.remove('active'));
            
            const targetView = document.getElementById(targetViewId);
            if (targetView) targetView.classList.add('active');

            document.querySelectorAll('.nav-tab').forEach(tab => {
                if (tab.getAttribute('data-path') === path) {
                    tab.classList.remove('border-transparent', 'text-neutral-400');
                    tab.classList.add('border-white', 'text-white', 'font-medium');
                } else {
                    tab.classList.remove('border-white', 'text-white', 'font-medium');
                    tab.classList.add('border-transparent', 'text-neutral-400');
                }
            });

            if (targetViewId === 'view-overview') renderOverviewGrid();
            if (targetViewId === 'view-script-builder') fillSnippetSelectors();
            if (targetViewId === 'view-activity') renderActivityLogs();
        }

        function renderOverviewGrid() {
            const projects = JSON.parse(localStorage.getItem('vercel_projects'));
            const grid = document.getElementById('projects-grid');
            grid.innerHTML = '';
            if (projects.length === 0) {
                grid.innerHTML = \`<div class="col-span-full border border-dashed border-neutral-800 p-8 text-center rounded-xl text-neutral-500 text-sm">No deployed projects found.</div>\`;
                return;
            }
            projects.forEach(p => {
                grid.innerHTML += \`
                    <div class="bg-black border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition">
                        <div class="p-6 space-y-4">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h2 class="text-lg font-semibold text-white">\${p.name}</h2>
                                    <span class="text-xs text-neutral-400 font-mono block mt-1">\${p.domain}</span>
                                </div>
                                <button class="text-xs border border-red-900 bg-red-950/20 text-red-400 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition" onclick="deleteProject('\${p.id}')">Delete</button>
                            </div>
                            <div class="text-xs text-neutral-500 flex justify-between items-center bg-neutral-950 p-2.5 rounded border border-neutral-900">
                                <span>Project ID: <code class="font-mono text-neutral-300">\${p.id}</code></span>
                                <span>\${p.created}</span>
                            </div>
                        </div>
                    </div>
                \`;
            });
        }

        function fillSnippetSelectors() {
            const projects = JSON.parse(localStorage.getItem('vercel_projects'));
            const selector = document.getElementById('project-selector');
            selector.innerHTML = '';
            if (projects.length === 0) {
                selector.innerHTML = '<option value="none">Create a project first</option>';
                updateSnippetPreview();
                return;
            }
            projects.forEach(p => { selector.innerHTML += \`<option value="\${p.id}">\${p.name}</option>\`; });
            updateSnippetPreview();
        }

        function updateSnippetPreview() {
            const trackingId = document.getElementById('project-selector').value || 'none';
            const origin = window.location.origin;
            
            // Constructs the clean block to preview in dashboard
            document.getElementById('snippet-code-block').innerText = 
\`&lt;script&gt;
  window.ANALYTICS_PROJECT_ID = '\${trackingId}';
&lt;/script&gt;
&lt;script src="https://unpkg.com/rrweb@2.0.0-alpha.4/dist/rrweb.min.js"&gt;&lt;/script&gt;
&lt;script src="\${origin}/tracking.js" defer&gt;&lt;/script&gt;\`;
        }

        function renderActivityLogs() {
            const logs = JSON.parse(localStorage.getItem('vercel_logs'));
            const container = document.getElementById('activity-log-wrapper');
            container.innerHTML = '';
            [...logs].reverse().forEach(log => {
                container.innerHTML += \`<div class="p-4 flex items-center justify-between"><div class="flex items-center space-x-3"><span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span><p class="text-neutral-300 font-mono text-xs">\${log}</p></div></div>\`;
            });
        }

        function openNewProjectModal() { document.getElementById('project-modal').classList.remove('hidden'); }
        function closeNewProjectModal() { document.getElementById('project-modal').classList.add('hidden'); }

        function saveNewProject() {
            const name = document.getElementById('input-project-name').value.trim();
            const domain = document.getElementById('input-project-domain').value.trim();
            if (!name || !domain) return alert("Fill out all fields.");

            const projects = JSON.parse(localStorage.getItem('vercel_projects'));
            const logs = JSON.parse(localStorage.getItem('vercel_logs'));
            
            // Generate standard UUID-like tracking string format
            const newId = crypto.randomUUID ? crypto.randomUUID() : "trck_" + Math.random().toString(16).slice(2, 14);

            projects.push({ id: newId, name, domain, created: "Just now" });
            logs.push(\`Deployed track target [\${name}] successfully.\`);

            localStorage.setItem('vercel_projects', JSON.stringify(projects));
            localStorage.setItem('vercel_logs', JSON.stringify(logs));

            document.getElementById('input-project-name').value = '';
            document.getElementById('input-project-domain').value = '';
            closeNewProjectModal();
            renderOverviewGrid();
        }

        function deleteProject(id) {
            let projects = JSON.parse(localStorage.getItem('vercel_projects'));
            let logs = JSON.parse(localStorage.getItem('vercel_logs'));
            projects = projects.filter(p => p.id !== id);
            logs.push(\`Deleted token cluster target [\${id}].\`);
            localStorage.setItem('vercel_projects', JSON.stringify(projects));
            localStorage.setItem('vercel_logs', JSON.stringify(logs));
            renderOverviewGrid();
        }

        window.addEventListener('popstate', () => renderRoute(window.location.pathname));
        document.addEventListener('DOMContentLoaded', () => renderRoute(window.location.pathname));
    </script>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
