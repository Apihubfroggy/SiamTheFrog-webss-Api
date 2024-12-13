const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = '318ec8';
const baseURL = 'https://api.screenshotmachine.com';

app.use(express.json());

app.post('/screenshot', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send('Please provide a valid URL.');
  }

  try {
    const screenshotURL = `${baseURL}?key=${apiKey}&url=${encodeURIComponent(url)}&dimension=1024xfull`;
    const response = await axios.get(screenshotURL, { responseType: 'arraybuffer' });

    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Error generating screenshot:', error);
    res.status(500).send('Failed to generate screenshot.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
