const fs = require('fs');

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042']});
client.connect(function (err) {
  console.log(err);
});

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
