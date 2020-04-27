import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ ok: 'Hellow meuamigo' });
});

app.listen(2408, () => {
  console.log('Server started on port 2408')
});
