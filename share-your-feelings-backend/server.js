const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get('/', (_req, res) => res.send('WhatsApp notify backend is running 🚀'));

app.post('/send-whatsapp', (req, res) => {
  const { mood, text, time } = req.body || {};

  if (!text) {
    return res.status(400).json({ error: 'Message text required' });
  }

  client.messages
    .create({
      from: process.env.WHATSAPP_FROM,
      to: `whatsapp:${process.env.WHATSAPP_TO}`,
      body: `💌 New Feeling:\nMood: ${mood || '🙂'}\nMessage: ${text}\nTime: ${time || ''}`
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: err.message }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
