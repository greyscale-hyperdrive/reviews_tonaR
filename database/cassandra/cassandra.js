const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'datatablereviews'});
client.connect()
.then(x => console.log('connected '))
.catch(err => console.log('err at connection ', err))

// - GET -
const getAllReviewsByRestaurantId = (restId) => {
  const query = `SELECT * FROM datatablereviews.reviews WHERE restaurant_id = ? `;
  return client.execute(query, [restId], { prepare: true });
}

const getRestaurantNameById = (restId) => {
  const query = `SELECT * FROM datatablereviews.restaurants WHERE id = ?`;
  return client.execute(query, [restId], { prepare: true });
}

const getUserNameById = userId => {
  const query = `SELECT * FROM datatablereviews.users WHERE id = ?`;
  return client.execute(query, [userId], { prepare: true });
}

// - POST -
const insertReview = params => {
  const query = `INSERT INTO datatablereviews.reviews (
    restaurant_id, id, ambiance_rating, food_rating, insertion_time, overall_rating, recommended, reservation_date, review_body, service_rating, user_id, value_rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  return client.execute(query, params, { prepare: true });
};

// - PUT -
const editReview = paramsObj => {
  const query = `UPDATE datatablereviews.reviews SET ${Object.keys(paramsObj.request)[0]} = ${paramsObj.request.review_body} WHERE restaurant_id = ${paramsObj.restaurant_id} and id = ${paramsObj.id};`;
  return  client.execute(query);git 
};

// - DELETE - 
const deleteReview = params => {
  const query = `DELETE FROM datatablereviews.reviews WHERE restaurant_id = ? and id = ? ;`;
  return client.execute(query, [params.restaurant_id, params.id], { prepare: true });
};

module.exports = {
  getAllReviewsByRestaurantId,
  getRestaurantNameById,
  getUserNameById,
  insertReview,
  editReview,
  deleteReview
};
