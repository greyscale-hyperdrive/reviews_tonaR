const port = 3020;
const bodyParser = require('body-parser');
const db = require('../../database/cassandra/cassandra.js');
const path = require('path');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.use("/", function(req, res, next) {
  console.log("the request URL is " + req.url);
  next();
});

app.use('/reviewsBundle.js', express.static(path.join(__dirname + '../../../client/dist/bundle.js')));
app.use('/reviewsMain.css', express.static(path.join(__dirname + '../../../client/styles/main.css')));

app.get('/restaurant/:restaurantId/reviews', (req, res) => {
  db.getAllReviewsByRestauranId(req.params.restaurantId, (err, results) => {
    if (err) {res.status(500).send(err)}
    else {
      res.status(200).send(results);
    }
  });
});

//app.listen(port, () => console.log(`CavaTable is listening on port ${port}`));


/*
  getAllReviewsByRestauranId,
  getRestaurantNameById,
  getUserNameById,
  insertReview,
  editReview,
  deleteReview
*/