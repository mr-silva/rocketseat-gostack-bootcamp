const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'just starting' });
});

app.listen(2408);
