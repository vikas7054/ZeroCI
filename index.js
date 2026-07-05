const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Secure Iframe Loader</title>
      <style>
        html, body, iframe {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          border: none;
        }
      </style>
      <!-- Pryst Analytics -->
<script async src="https://kaynyakfypebznmakozp.supabase.co/functions/v1/track/track.js"></script>
<script>
  window.__TV = window.__TV || {};
  window.__TV.init({
    id: "c6743477-a359-45ee-8fe2-d1d37d3202f6",
    endpoint: "https://kaynyakfypebznmakozp.supabase.co/functions/v1/track",
    events: { click: true, input: true, scroll: true, replay: true, pv: true }
  });
</script>
<!-- End Pryst Analytics -->
    </head>
    <body>
      <iframe
        src="https://neon-beignet-4c499f.netlify.app"
        allow="fullscreen; clipboard-read; clipboard-write; geolocation; microphone; camera; display-capture; autoplay"
        sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-top-navigation"
        style="width:100%; height:100%; border:none;"
      ></iframe>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
