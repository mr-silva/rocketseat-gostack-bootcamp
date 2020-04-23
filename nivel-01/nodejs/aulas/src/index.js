const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({ ok: false });
});

app.listen(2408, () => {
  console.log('Back-end started!');
});
