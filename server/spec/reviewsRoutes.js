
const express  = require('express');
const db = require('../../database/cassandra/cassandra.js');
const router = express.Router();



router.get('/:restaurantId/reviews', (req, res) => {
  db.getAllReviewsByRestauranId(req.params.restaurantId, (err, results) => { 
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);  
    }
  });
});

router.post('/:restaurantId/reviews', (req, res) => {
  db.insertReview(req.body.content, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});

router.put('/:restaurantId/reviews', (req, res) => {
  db.editReview(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});

router.delete('/:restaurantId/reviews', (req, res) => {
  db.deleteReview(req.body, (err, response) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(response);
    }
  });
});

module.exports = router;
