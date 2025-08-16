// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();
// const twilio = require('twilio');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Load saved data from file
// let feelings = [];
// if (fs.existsSync('feelings.json')) {
//   feelings = JSON.parse(fs.readFileSync('feelings.json'));
// }

// // Twilio Client
// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // Send WhatsApp
// const sendWhatsApp = (message) => {
//   client.messages
//     .create({
//       from: process.env.WHATSAPP_FROM,
//       to: `whatsapp:${process.env.WHATSAPP_TO}`,
//       body: message
//     })
//     .then(msg => console.log("📩 WhatsApp Sent:", msg.sid))
//     .catch(err => console.error("❌ WhatsApp Error:", err));
// };

// // API: Save Feeling
// app.post('/api/feelings', (req, res) => {
//   const { name, feeling } = req.body;
//   const newFeeling = { name, feeling, date: new Date() };
//   feelings.unshift(newFeeling);

//   // Save to file
//   fs.writeFileSync('feelings.json', JSON.stringify(feelings, null, 2));

//   // Send WhatsApp
//   sendWhatsApp(`💌 New Feeling from ${name}:\n"${feeling}"`);

//   res.status(201).json({ success: true, message: "Feeling saved and WhatsApp sent!" });
// });

// // API: Get Feelings
// app.get('/api/feelings', (req, res) => {
//   res.json(feelings);
// });

// // Start Server
// app.listen(process.env.PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// WhatsApp API endpoint
app.post('/send-whatsapp', (req, res) => {
  const { mood, text, time } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Message text required' });
  }

  client.messages
    .create({
      from: process.env.WHATSAPP_FROM,
      to: `whatsapp:${process.env.WHATSAPP_TO}`,
      body: `💌 New Feeling:\nMood: ${mood}\nMessage: ${text}\nTime: ${time}`
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
