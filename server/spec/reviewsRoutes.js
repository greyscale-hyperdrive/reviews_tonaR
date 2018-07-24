
const express  = require('express');
const db = require('../../database/cassandra/cassandra.js');
const router = express.Router();

router.get('/:restaurantId/reviews', async (req, res, next) => {
  try {
  const reviews = await db.getAllReviewsByRestaurantId(req.params.restaurantId).catch(err => {throw err});
  res.status(200).json(reviews.rows);  
  } catch (err) {
    next(err);
  };
});

router.post('/:restaurantId/reviews', async (req, res, next) => {
  try {
  const newReview = await db.insertReview(req.body.content).catch(err => {throw err});
    res.status(200).json(newReview);
  } catch(err) {
    next(err);
  };
});

router.put('/:restaurantId/reviews', async (req, res, next) => {
  try {
  const newEdit = await db.editReview(req.body).catch(err => {throw err});
    res.status(200).json(newEdit);
  } catch(err) {
    next(err);
  };
});

router.delete('/:restaurantId/reviews', async (req, res, next) => {
  try {
  const reviewDelete = await db.deleteReview(req.body).catch(err => {throw err});
    res.status(200).json(reviewDelete);
  } catch(err) {
    next(err);
  };
});

module.exports = router;
