const db = require('./database/cassandra/cassandra.js');

test('db - Get all reviews by restaurant Id', async () =>  { 
try {
  let obj = {
    "restaurant_id": 9100100,
    "id": 899900,
    "ambiance_rating": 0,
    "food_rating": 5,
    "insertion_time": "2018-06-25T17:12:30.658Z",
    "overall_rating": 2,
    "recommended": true,
    "reservation_date": "2018-03-03T09:17:27.924Z",
    "review_body": "Doloribus quam ut laboriosam ducimus consequatur. Fugit nobis non unde dicta sed consequuntur perspiciatis. Aliquid non aliquam odit maxime consequatur quas ipsum.",
    "service_rating": 2,
    "user_id": 899900,
    "value_rating": 0
  };

  expect.assertions(1);
  
  const reviews =  await db.getAllReviewsByRestaurantId(9100100).catch(err => {throw err});
  const singleReview = JSON.parse(JSON.stringify(reviews.rows[0]));

  expect(obj).toEqual(singleReview); 
}
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});

//===========================POST
test('db - Post new review to database', async () =>  { 
  try {   
    let newReview = [11200200, 200, 0, 5, 1530111111000, 2, true, 1530111111000, "Doloribus quam", 2, 100000, 0];

    let obj = {
      "restaurant_id": 11200200,
      "id": 200,
      "ambiance_rating": 0,
      "food_rating": 5,
      "insertion_time": "2018-06-27T14:51:51.000Z",
      "overall_rating": 2,
      "recommended": true,
      "reservation_date": "2018-06-27T14:51:51.000Z",
      "review_body": "Doloribus quam", 
      "service_rating": 2,
      "user_id": 100000,
      "value_rating": 0
    };

    expect.assertions(1);
    
    await db.insertReview(newReview).catch(err => {throw err});
    
    const reviews = await db.getAllReviewsByRestaurantId(11200200).catch(err => {throw err});
    const postedReview = JSON.parse(JSON.stringify(reviews.rows[0])); 
    
    expect(postedReview).toEqual(obj);
    
    await db.deleteReview({"restaurant_id":11200200, "id": 200}).catch(err => {throw err});
  }
  catch (err) {
    console.log('err at catch, err -> ', err);
  };
});

//===================EDIT
it('db  - Edit review to database', async () =>  {
  expect.assertions(1);
  try {   
    let newReview = [9200300, 300, 0, 0, 0, 0, false, 0, "", 0, 700, 0];
    let updateReviewBody = {
      "restaurant_id": 9200300,
      "id": 300,
      "request": {
        "review_body": "'Updating my previous review'"
      }
    };
    let review = {
      "restaurant_id": 9200300,
      "id": 300,
      "ambiance_rating": 0,
      "food_rating": 0,
      "insertion_time": "1970-01-01T00:00:00.000Z",
      "overall_rating": 0,
      "recommended": false,
      "reservation_date": "1970-01-01T00:00:00.000Z",
      "review_body": "Updating my previous review",
      "service_rating": 0,
      "user_id": 700,
      "value_rating": 0
    };
    expect.assertions(1);

    await db.insertReview(newReview).catch(err => {throw err});

    await db.editReview(updateReviewBody).catch(err => {throw err});

    const reviews = await db.getAllReviewsByRestaurantId(9200300).catch(err => {throw err});
    const updatedReview = JSON.parse(JSON.stringify(reviews.rows[0]));

    expect(updatedReview).toEqual(review);  
    
    db.deleteReview({"restaurant_id":9200300, "id": 300}).catch(err => {throw err});
    
  }
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});

//===================DELETE
it('db  - Delete review from database', async () =>  { 
  try {   
  let newReview = [9200400, 400, 0, 0, 0, 0, false, 0, "", 0 , 600 , 0];
  let review = {
    "restaurant_id": 9200400,
    "id": 400,
    "ambiance_rating": 0,
    "food_rating": 0,
    "insertion_time": "1970-01-01T00:00:00.000Z",
    "overall_rating": 0,
    "recommended": false,
    "reservation_date": "1970-01-01T00:00:00.000Z",
    "review_body": "text",
    "service_rating": 0,
    "user_id": 600,
    "value_rating": 0
  };
  
  expect.assertions(1);

  await db.insertReview(newReview).catch(err => {throw err});
  const reviewPosted = review === await db.getAllReviewsByRestaurantId(9200400);

  await db.deleteReview({"restaurant_id":9200400, "id": 400}).catch(err => {throw err});
  const reviewRemoved = await db.getAllReviewsByRestaurantId(9200400) === undefined;

  expect(reviewPosted).toEqual(reviewRemoved);
  
  }
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});