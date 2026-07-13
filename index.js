const express = require('express');
const path = require('path');
const app = express();

// Serve the tracking.js file locally from the same folder
app.get('/tracking.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'tracking.js'));
});

app.get('*', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Console Dashboard – Vercel Analytics</title>
    <script src="https://cdn.tailwindcss.com"></script>
    
  <!-- 1. Load rrweb (for session recording) -->
<script src="https://unpkg.com/rrweb@2.0.0-alpha.4/dist/rrweb.min.js"></script>

<!-- 2. Load your custom tracking script (project ID is auto-detected from the URL) -->
<script src="https://api1-orpin.vercel.app/api/custom/5d6a6287-8517-4838-bd68-67f5c8cab180/tracking.js" defer></script>
1

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-black text-white min-h-screen selection:bg-neutral-800">
    <nav class="border-b border-neutral-800 bg-black p-4 flex justify-between h-16 items-center">
        <span class="text-sm font-bold">▲ Frontend Dashboard Client</span>
        <span class="text-xs text-neutral-500">Script Loaded Locally</span>
    </nav>
    <main class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-xl font-bold">Workspace App Interface</h1>
        <p class="text-neutral-400 text-sm mt-1">Script is loaded from this domain, but data is sent to your external API server.</p>
        <div class="mt-6 flex gap-4">
            <button class="bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-neutral-200">Test Click Tracking</button>
        </div>
    </main>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Frontend UI Client running on port ${PORT}`));
