import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

app.listen(2408, () => {
  console.log('Server started on port 2408');
});
