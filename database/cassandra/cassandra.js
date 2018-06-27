const fs = require('fs');

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042']});
client.connect(function (err) {
  console.log(err);
});

/*
//CREATE 

//===keyspace
CREATE KEYSPACE IF NOT EXISTS dataTableReviews
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

//===tables

//---categories---

CREATE TABLE IF NOT EXISTS dataTableReviews.categories (
  id int,
  category text,
  PRIMARY KEY (category, id)
)
WITH CLUSTERING ORDER BY (id ASC);                   // <- this is optional


//---restaurants---

CREATE TABLE IF NOT EXISTS dataTableReviews.restaurants (
  id int,
  restaurant_name text,
  location_id int,
  insertion_time timestamp,
  PRIMARY KEY (id, location_id, restaurant_name)
)
WITH CLUSTERING ORDER BY (id);                   // <- this is optional


//---reviews---

CREATE TABLE IF NOT EXISTS dataTableReviews.reviews (
  id int,
  restaurant_id int,                              // <- foreign key?  link to restaurant
  user_id int,                                     // <- foreign key?  link to restaurant
  review_body text,
  overall_rating int,
  food_rating int,
  service_rating int,
  ambiance_rating int,
  value_rating int,
  recommended boolean,
  date_visited,
  insertion_time timestamp,
  PRIMARY KEY (id)
);


//---users--

CREATE TABLE IF NOT EXISTS dataTableReviews.users (
  id int,
  user_name text,
  vip boolean,
  location int,
  photo_url text,
  insertion_time timestamp,
  PRIMARY KEY (id, username_name, location_id)
)
WITH CLUSTERING ORDER BY (id);                   // <- this is optional
*/





const insertRestaurant = function(uniqueKey, name, location) {
  const query = `INSERT INTO excalibur.restaurants (id, restaurantname, location) Values (?, ?, ?)` ;
  const params = [uniqueKey, name, location];
  client. execute(query, params, {prepare: true}, function(err) {
    console.log(err);
  })
}

for (let i = 11; i < 5000; i++) {
  insertRestaurant(i, `restaurants${i}`, 1000+i);
};



const insertUser = function(uniqueKey, name, location) {
  const query = 'INSERT INTO users (key, name, email, birthdate) VALUES (?, ?, ?)';
  const params = ['mick-jagger', 'Sir Mick Jagger', 'mick@rollingstones.com', new Date(1943, 6, 26)]; // <---fix
  client.execute(query, params, { prepare: true }, function (err) {
    console.log(err);
    //Inserted in the cluster
});
}







// CREATE TABLE IF NOT EXISTS excalibur.categories (
//   id int,
//   category text,
//   PRIMARY KEY (id, category)
// );