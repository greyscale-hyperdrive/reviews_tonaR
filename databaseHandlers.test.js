const db = require('./database/cassandra/cassandra.js')

it('db - Get all reviews by restaurant Id', async () =>  { 
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

  await (db.getAllReviewsByRestauranId(9100100, (err, res) => { 
    expect.assertions(1);
    expect(res[0]).toEqual(obj); 
  }));
}
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});

//===========================POST
it('db - Post new review to database', async () =>  { 
  try {   
    let body = [
      11200200,
      200,
      0,
      5,
      1530111111000,
      2,
      true,
      1530111111000,
      "Doloribus quam",
      2,
      100000,
      0
    ];

    let obj = {
      "restaurant_id": 11200200,
      "id": 200,
      "ambiance_rating": 0,
      "food_rating": 5,
      "insertion_time": 1530111111000,
      "overall_rating": 2,
      "recommended": true,
      "reservation_date": 1530111111000,
      "review_body": "Doloribus quam", 
      "service_rating": 2,
      "user_id": 100000,
      "value_rating": 0
    };
    
    //post data
     await db.insertReview(body, (err, res) => {
      if (err) {
        console.log('err ->', err);
      }
    }); 
    //check if data was posted
    await db.getAllReviewsByRestauranId(11200200, (err, res) => {
      if (err) {
        console.log(err)
      }
      expect.assertions(1);
      expect(res[0]).toEqual(obj);
    });
    // delete the posted comment
    await db.deleteReview({"restaurant_id":11200200, "id": 200}, (err, res) => {
      if (err) {
        console.log('err ->', err);
      }
    });
  }
  catch (err) {
    console.log('err at catch, err -> ', err);
  }
});






// it('db  - Edit review to database', async () =>  { 
//   expect.assertions(1);
//   try {   
//   let newReview = [9200300,300,0,0,0,0,false,0,"To be filled",0,700,0];
//   let updateReviewBody = {
//     "restaurant_id": 9200300,
//     "id": 300,
//     "request": {
//       "review_body": "'Updating my previous review'"
//     }
//   };
//   let updatedReview = {
//     "restaurant_id": 9200300,
//     "id": 300,
//     "ambiance_rating": 0,
//     "food_rating": 0,
//     "insertion_time": 0,
//     "overall_rating": 0,
//     "recommended": false,
//     "reservation_date": 0,
//     "review_body": "Updating my previous review",
//     "service_rating": 0,
//     "user_id": 700,
//     "value_rating": 0
//   };
//   const newPost = await db.insertReview(newReview, (err, res) => {
//     if (err) {
//       console.log('err ->', err);
//     }
//   });
//   const editPost = await db.editReview(updateReviewBody, (err, res) => {
//     if (err) {
//       console.log('err ->', err);
//     }
//   });
//   const getUpdatedReview= await db.getAllReviewsByRestauranId(9200300,  (err, res) => {
//     if (err) {
//       console.log('err ->', err);
//     }
//   });



//   expect(getUpdatedReview).toEqual(updatedReview);
  
//   db.deleteReview({"restaurant_id":9200300, "id": 300}, (err, res) => {
//     if (err) {
//       consol.log('err ->', err);
//     }
//   });
//   }
//   catch (err) {
//     console.log('err at catch, err -> ', err);
//   }
// });





// it('db  - Delete review from database', async () =>  { 
//   expect.assertions(1);
//   try {   
//   let newReview = [9200400,400,0,0,0,0,false,0,"text",0,600,0];
//   let review = {
//     "restaurant_id": 9200400,
//     "id": 400,
//     "ambiance_rating": 0,
//     "food_rating": 0,
//     "insertion_time": 0,
//     "overall_rating": 0,
//     "recommended": false,
//     "reservation_date": 0,
//     "review_body": "text",
//     "service_rating": 0,
//     "user_id": 600,
//     "value_rating": 0
//   };

//   await db.insertReview(newReview,  (err, res) => {
//     if (err) {
//       consol.log('err ->', err);
//     }
//   });
//   const reviewPosted = review === await db.getAllReviewsByRestauranId(9200400)

//   await db.deleteReview({"restaurant_id":9200400, "id": 400}, (err, res) => {
//     if (err) {
//       consol.log('err ->', err);
//     }
//   });
//   const reviewRemoved = await db.getAllReviewsByRestauranId(9200400) === undefined;

//   expect(reviewPosted).toEqual(reviewRemoved);
  
//   }
//   catch (err) {
//     console.log('err at catch, err -> ', err);
//   }
// });