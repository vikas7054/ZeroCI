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

   <body> 
<!-- Single tag — rrweb and project ID are auto-detected -->
<script src="https://api1-orpin.vercel.app/api/custom/38e46e61-e08f-449b-a5ec-f795d8d3b481/tracking.js" defer></script>




      <iframe
        src="https://mew.bolt.host"
        allow="fullscreen; clipboard-read; clipboard-write; geolocation; microphone; camera; display-capture; autoplay"
        sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-modals allow-popups allow-popups-to-escape-sandbox allow-presentation allow-top-navigation"
        style="width:100%; height:100%; border:none;"
      ></iframe>
    </main>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Frontend UI Client running on port ${PORT}`));
