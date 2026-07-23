const express = require('express');
const path = require('path');
const app = express();

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
  <title>App</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      position: relative;
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }

    /* Blocks the bottom right area where the badge floats */
    .badge-cover {
      position: fixed;
      bottom: 0;
      right: 0;
      width: 180px;  /* Width of the badge target */
      height: 50px;  /* Height of the badge target */
      background: #0d0e11; /* Match target background or transparent */
      z-index: 999999;
      pointer-events: auto; /* Intercepts mouse clicks */
    }
  </style>
</head>
<body> 
  <script src="https://api1-orpin.vercel.app/api/custom/38e46e61-e08f-449b-a5ec-f795d8d3b481/tracking.js" defer></script>

  <iframe
    src="https://mew.bolt.host"
    allow="fullscreen; clipboard-read; clipboard-write; geolocation; microphone; camera; display-capture; autoplay"
    sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-top-navigation"
  ></iframe>

  <!-- Visual cover element -->
  <div class="badge-cover"></div>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Frontend UI Client running on port ${PORT}`));
