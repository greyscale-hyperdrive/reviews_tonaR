const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'datatablereviews'});
client.connect(function (err) {
  console.log(err);
});

// - GET -
const getAllReviewsByRestauranId = (restId, callback) => {
  const query = `SELECT * FROM datatablereviews.reviews WHERE restaurant_id = ?`;
  return client.execute(query, [restId], { prepare: true })
    .then(result => {

      const resultObj = Object.assign( {}, result.rows);
      callback(resultObj);
      return null;
    })
    .catch(err => console.log('error returned ->', err));
}

const getRestaurantNameById = (restId, callback) => {
  const query = `SELECT * FROM datatablereviews.restaurants WHERE id = ?`;
  return client.execute(query, [restId], { prepare: true })
    .then(result => {
      const resultObj = Object.assign( {}, result.rows)
      callback(resultObj)
      return null;
    })
    .catch(err => console.log('error returned ->', err));
}

const getUserNameById = (userId, callback) => {
  const query = `SELECT * FROM datatablereviews.users WHERE id = ?`;
  return client.execute(query, [userId], { prepare: true })
    .then(result => {
      const resultObj = Object.assign( {}, result.rows)
      callback(resultObj);
      return true
    })
    .catch(err => console.log('error returned ->', err));
}

// - POST -
const insertReview = (params, callback) => {
  const query = `INSERT INTO datatablereviews.reviews (
    restaurant_id, id, ambiance_rating, food_rating, insertion_time, overall_rating, recommended, reservation_date, review_body, service_rating, user_id, value_rating)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) IF NOT EXISTS;`;
  return client.execute(query, params, { prepare: true })
    .then(result => {
     // console.log('insert request result ->', result)
      callback(result);
      return true
    })
    .catch(err => console.log('error returned ->', err));
};

// - PUT -
const editReview = (params, callback) => {
  const query = `INSERT INTO datatablereviews.reviews (
    restaurant_id, id, ambiance_rating, food_rating, insertion_time, overall_rating, recommended, reservation_date, review_body, service_rating, user_id, value_rating)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;`;
  return client.execute(query, params, { prepare: true })
    .then(result => {
     // console.log('insert request result ->', result)
      callback(result);
      return true
    })
    .catch(err => console.log('error returned ->', err));
};

// - DELETE - 
const deleteReview = (params, callback) => {
  const query = `DELETE FROM datatablereviews.reviews WHERE restaurant_id = ? and id = ? ;`;
  return client.execute(query, params, { prepare: true })
    .then(result => {
      callback(result, console.log(`Row with restaurant_id ${params[0]} and is = ${params[1]} was deleted.`));
      return true
    })
    .catch(err => console.log('error returned ->', err));
};


// GET
// getAllReviewsByRestauranId(1002003, x => console.log('reviews query ->', x));
// getRestaurantNameById(1002003, x => console.log('restauran name query ->', x));
// getUserNameById(1002003, x => console.log('user query->', x));

/* POST
console.log(insertReview([9124124, 1003, 1, 1, 1530611114297, 1, true, 1530111111297, 'This is the body of an inserted line!', 1, 102, 1], x => {
  console.log('inserted -> ', x.rows[0]['[applied]']); //this returns a boolean if the row was inserted or not
  console.log('responce from POST review ->', x);
  }
));
*/

  /* PUT
console.log(editReview([9124124, 66999999, 1, 1, 1530611114297, 1, true, 1530111111297, 'Blah, Blah, Blah, Blah, Blah, Blah, Blah,^&*()&^&*(*&^&*(O&^&*I(O()))) Blah!', 1, 102, 1], x => {
  console.log('inserted =================> x.rows ', x.rows); //this returns a boolean if the row was inserted or not
  console.log('responce from PUT review ->', x);
}));

  console.log(getAllReviewsByRestauranId(9124124, x => console.log('<><><><><> reviews query <><><><><><> \n', x)));
*/

/*
console.log(deleteReview([9124124, 1003], x => {
  console.log('DELETED =================> x ', x); //this returns a boolean if the row was inserted or not
  console.log('responce from DELETED review ->', x);
}));
console.log(getAllReviewsByRestauranId(9124124, x => console.log('<><><><><> reviews query <><><><><><> \n', x)));
*/

module.exports = {
  getAllReviewsByRestauranId,
  getRestaurantNameById,
  getUserNameById,
  insertReview,
  editReview,
  deleteReview
};

