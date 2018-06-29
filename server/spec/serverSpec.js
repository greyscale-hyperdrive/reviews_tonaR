const port = 3020;
const bodyParser = require('body-parser');
const db = require('../../database/cassandra/cassandra.js');
const path = require('path');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.use('/reviewsBundle.js', express.static(path.join(__dirname + '../../../client/dist/bundle.js')));
app.use('/reviewsMain.css', express.static(path.join(__dirname + '../../../client/styles/main.css')));





app.get('/restaurant/:restaurantId/reviews', (req, res) => {
  db.getAllReviewsByRestauranId(req.params.restaurantId, (err, results) => {
    if (err) {res.status(500).send(err)}
    //console.log('the params from server get request->',req.params);
    res.status(200).send(results);
  });
});




app.use("/", function(req, res, next) {
  console.log("the request URL is " + req.url);
  next();
});


app.listen(port, () => console.log(`DataTable listening on port ${port}`));


/*
  getAllReviewsByRestauranId,
  getRestaurantNameById,
  getUserNameById,
  insertReview,
  editReview,
  deleteReview
*/