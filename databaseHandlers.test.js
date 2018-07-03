const db = require('./database/cassandra/cassandra.js')

test('adds 1 + 2 to equal 3', () =>  { 
  expect(3).toBe(3);
});

it('db - Get all reviews by restaurant Id', async () =>  { 
  expect.assertions(1);
  try {
    const data = await db.getAllReviewsByRestauranId(9100100);    
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
  expect(data).toEqual(obj);
  }
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});


it('db  - Post new review to database', async () =>  { 
  expect.assertions(1);
  try {   
  let body = [
    9200200,
    200,
    0,
    5,
    JSON.stringify(Date.now()),
    2,
    true,
    "2018-03-03T09:17:27.924Z",
    "Doloribus quam ut laboriosam ducimus consequatur. Fugit nobis non unde dicta sed consequuntur perspiciatis. Aliquid non aliquam odit maxime consequatur quas ipsum.",
    2,
    100000,
    0
  ];
  const dataToPost = await db.insertReview(body, x => x); 
  const dataPosted = await db.getAllReviewsByRestauranId(9200200, x => x)

  expect(dataToPost).toEqual(dataPosted);
  
  db.deleteReview({"restaurant_id":9200200, "id": 200}, x => x);
  }
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});






it('db  - Edit review to database', async () =>  { 
  expect.assertions(1);
  try {   
  let newReview = [9200300,300,0,0,0,0,false,0,"To be filled",0,700,0];
  let updateReviewBody = {
    "restaurant_id": 9200300,
    "id": 300,
    "request": {
      "review_body": "'Updating my previous review'"
    }
  };
  let updatedReview = {
    "restaurant_id": 9200300,
    "id": 300,
    "ambiance_rating": 0,
    "food_rating": 0,
    "insertion_time": 0,
    "overall_rating": 0,
    "recommended": false,
    "reservation_date": 0,
    "review_body": "Updating my previous review",
    "service_rating": 0,
    "user_id": 700,
    "value_rating": 0
  };
  const newPost = await db.insertReview(newReview, x => x); 
  const editPost = await db.editReview(updateReviewBody, x => x);
  const getUpdatedReview= await db.getAllReviewsByRestauranId(9200300, x => x);

  expect(getUpdatedReview).toEqual(updatedReview);
  
  db.deleteReview({"restaurant_id":9200300, "id": 300}, x => x);
  }
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});





it('db  - Delete review from database', async () =>  { 
  expect.assertions(1);
  try {   
  let newReview = [9200400,400,0,0,0,0,false,0,"text",0,600,0];
  let review = {
    "restaurant_id": 9200400,
    "id": 400,
    "ambiance_rating": 0,
    "food_rating": 0,
    "insertion_time": 0,
    "overall_rating": 0,
    "recommended": false,
    "reservation_date": 0,
    "review_body": "text",
    "service_rating": 0,
    "user_id": 600,
    "value_rating": 0
  };

  await db.insertReview(newReview, x => x); 
  const reviewPosted = review === await db.getAllReviewsByRestauranId(9200400)

  await db.deleteReview({"restaurant_id":9200400, "id": 400}, x => x);
  const reviewRemoved = await db.getAllReviewsByRestauranId(9200400) === undefined;
  console.log()

  expect(reviewPosted).toEqual(reviewRemoved);
  
  
  }
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});