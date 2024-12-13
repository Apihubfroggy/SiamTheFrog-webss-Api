const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = '318ec8';
const baseURL = 'https://api.screenshotmachine.com';

// JSON বডি পার্সিং
app.use(express.json());

app.post('/screenshot', async (req, res) => {
  const { url } = req.body;

  // URL যাচাই
  if (!url) {
    return res.status(400).send('Please provide a valid URL.');
  }

  // URL এর প্রোটোকল চেক করুন (http:// বা https:// থাকতে হবে)
  const validUrl = /^(https?:\/\/)/.test(url) ? url : `http://${url}`;

  try {
    // Screenshot URL তৈরি
    const screenshotURL = `${baseURL}?key=${apiKey}&url=${encodeURIComponent(validUrl)}&dimension=1024xfull`;
    
    // Screenshot এপিআই থেকে রেসপন্স
    const response = await axios.get(screenshotURL, { responseType: 'arraybuffer' });

    // রেসপন্স যদি সঠিক হয়, তাহলে PNG ইমেজ ফেরত পাঠানো
    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    // ত্রুটি হলে কনসোল লগ এবং রেসপন্স
    console.error('Error generating screenshot:', error);
    res.status(500).send('Failed to generate screenshot.');
  }
});

// API লিসেনার
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
