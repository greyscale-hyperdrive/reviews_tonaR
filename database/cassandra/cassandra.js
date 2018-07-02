const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'datatablereviews'});
client.connect(function (err) {
  console.log(err);
});

// - GET -
const getAllReviewsByRestauranId = (restId, callback) => {
  const query = `SELECT * FROM datatablereviews.reviews WHERE restaurant_id = ?`;
  client.execute(query, [restId], { prepare: true })
    .then(result => {
      callback(null, result.rows);
    })
    .catch(err => {
      callback(err, null);
    });
}

const getRestaurantNameById = (restId, callback) => {
  const query = `SELECT * FROM datatablereviews.restaurants WHERE id = ?`;
  client.execute(query, [restId], { prepare: true })
    .then(result => {
      const resultObj = Object.assign( {}, ...result.rows);
      callback(null, resultObj);
    })
    .catch(err => {
      callback(err)
    });
}

const getUserNameById = (userId, callback) => {
  const query = `SELECT * FROM datatablereviews.users WHERE id = ?`;
  client.execute(query, [userId], { prepare: true })
    .then(result => {
      const resultObj = Object.assign( {}, result.rows)
      callback(null, resultObj);
    })
    .catch(err => {
      callback(err);
    });
}

// - POST -
const insertReview = (params, callback) => {
  const query = `INSERT INTO datatablereviews.reviews (
    restaurant_id, id, ambiance_rating, food_rating, insertion_time, overall_rating, recommended, reservation_date, review_body, service_rating, user_id, value_rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  client.execute(query, params, { prepare: true })
    .then(result => {
      callback(null, result);
      })
    .catch(err => {
      callback(err, null);
    });
};

// - PUT -
const editReview = (paramsObj, callback) => {
  const query = `UPDATE datatablereviews.reviews SET ${Object.keys(paramsObj.request)[0]} = ${paramsObj.request.review_body} WHERE restaurant_id = ${paramsObj.restaurant_id} and id = ${paramsObj.id};`;
  client.execute(query)
    .then(result => {
      callback(null, result);
    })
    .catch(err => {
      callback(err, null);
    });
};

// - DELETE - 
const deleteReview = (params, callback) => {
  const query = `DELETE FROM datatablereviews.reviews WHERE restaurant_id = ? and id = ? ;`;
  client.execute(query, [params.restaurant_id, params.id], { prepare: true })
    .then(result => {
      callback(null, result);
    })
    .catch(err => {
      callback(err);
    });
};

module.exports = {
  getAllReviewsByRestauranId,
  getRestaurantNameById,
  getUserNameById,
  insertReview,
  editReview,
  deleteReview
};

