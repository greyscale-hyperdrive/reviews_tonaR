require('newrelic');
const port = process.env.port || 3020;
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const app = express();
const reviewsRoutes = require('./reviewsRoutes');

app.use(bodyParser.json());

app.use('/restaurant/:id/', express.static(path.join(__dirname + '../../../client/')));

app.use(express.static(path.join(__dirname + '../../../client/')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Mehods',
      'GET, POST, PUT, DELETE',
    );
    return res.status(200).json({});
  }
  next();
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/restaurant', reviewsRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message }});
  });

app.listen(port, () => console.log(`DataTable listening on port ${port}`));
