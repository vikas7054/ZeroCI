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
  <title>App</title>

  <!-- Script blocker: Must be placed at the very top of <head> before other scripts load -->
  <script>
    (function() {
      const BLOCKED_URL = 'https://bolt.new/badge.js';

      // 1. Intercept dynamically created <script> elements (document.createElement)
      const originalCreateElement = document.createElement;
      document.createElement = function(tagName, options) {
        const element = originalCreateElement.call(document, tagName, options);
        if (tagName.toLowerCase() === 'script') {
          Object.defineProperty(element, 'src', {
            set(value) {
              if (typeof value === 'string' && value.includes(BLOCKED_URL)) {
                console.warn('[Blocked script load]:', value);
                return;
              }
              element.setAttribute('src', value);
            },
            get() {
              return element.getAttribute('src');
            }
          });
        }
        return element;
      };

      // 2. Intercept scripts inserted via MutationObserver as a fallback
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.tagName === 'SCRIPT' && node.src && node.src.includes(BLOCKED_URL)) {
              node.type = 'javascript/blocked';
              node.remove();
              console.warn('[Blocked element]:', node.src);
            }
          }
        }
      });

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    })();
  </script>

  <style>
    /* Reset margins and force html/body to fill the entire screen */
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden; /* Prevents double scrollbars */
    }

    /* Force the iframe to fill 100% of the viewport */
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
    }
  </style>
</head>
<body> 
  <!-- Single tag — rrweb and project ID are auto-detected -->
  <script src="https://api1-orpin.vercel.app/api/custom/38e46e61-e08f-449b-a5ec-f795d8d3b481/tracking.js" defer></script>

  <iframe
    src="https://mew.bolt.host"
    allow="fullscreen; clipboard-read; clipboard-write; geolocation; microphone; camera; display-capture; autoplay"
    sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-top-navigation"
  ></iframe>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Frontend UI Client running on port ${PORT}`));
