const express = require('express');

const app = express();

app.use(express.json());

app.get('/projects', (req, res) => {
  const query = req.query;
  const { title, owner } = req.query;

  console.log(query);
  console.log(title);
  console.log(owner);

  return res.json([
    'Projeto 1',
    'Projeto 2'
  ]);
});

app.post('/projects', (req, res) => {
  const body = req.body;
  const { title, owner } = req.body;

  console.log(body);
  console.log(title);
  console.log(owner);

  return res.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3'
  ])
});

app.put('/projects/:id', (req, res) => {
  const params = req.params;
  const { id } = req.params;

  console.log(params);
  console.log(id);

  return res.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3'
  ]);
});

app.delete('/projects/:id', (req, res) => {
  return res.json([
    'Projeto 2',
    'Projeto 3'
  ]);
});

app.listen(2408, () => {
  console.log('Back-end started!');
});
