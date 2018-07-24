SELECT * FROM restaurants WHERE id = 8808080;

INSERT INTO reviews (
  restaurant_id,
  id, 
  ambiance_rating, 
  food_rating, 
  insertion_time, 
  overall_rating, 
  recommended, 
  reservation_date, 
  review_body, 
  service_rating, 
  user_id, 
  value_rating) 
  VALUES (
    9300000,
    1001,
    1,
    2,
    1530211104297,
    3,
    true,
    1530211104297,
    'this is the body of an inserted line',
    4,
    6100100,
    5
  );

--GET QUERIES
SELECT * FROM reviews WHERE restaurant_id = 4000001
SELECT * FROM reviews WHERE id = 68100000 ALLOW FILTERING;
SELECT * FROM reviews WHERE id < 69011600 AND id > 69011550 LIMIT 5  ALLOW FILTERING;
SELECT * FROM reviews WHERE id < 52260000 AND id > 52214000 LIMIT 5 ALLOW FILTERING;
SELECT * FROM reviews WHERE restaurant_id = 5000002 AND id = 64999998;
SELECT * FROM reviews WHERE restaurant_id = 989898 AND id < 60011600 AND id > 40000000 LIMIT 5;
SELECT * FROM reviews WHERE restaurant_id = 3810000;
SELECT * FROM reviews WHERE recommended = true LIMIT 5 ALLOW FILTERING;
SELECT * FROM reviews WHERE recommended = true AND id > 60000000 LIMIT 5 ALLOW FILTERING;
SELECT * FROM reviews WHERE recommended = true AND restaurant_id > 9000000 LIMIT 5 ALLOW FILTERING;
SELECT * FROM reviews WHERE user_id = 501000 ALLOW FILTERING;
SELECT * FROM restaurants WHERE id = 5100100;
SELECT * FROM restaurants WHERE restaurant_name = 'e-markets Sleek Tasty Soft Towels' ALLOW FILTERING;
SELECT * FROM restaurants WHERE id = 8808080 ;
SELECT * FROM restaurants WHERE location_id = 18970;
SELECT * FROM users WHERE id = 6900000;
SELECT * FROM users WHERE user_name = 'Therese.Bashirian' ALLOW FILTERING;
SELECT * FROM users WHERE location_id = 45606;

--POST
INSERT INTO reviews (restaurant_id, id, ambiance_rating, food_rating, insertion_time, overall_rating, recommended, reservation_date, review_body, service_rating, user_id, value_rating) VALUES (9300000, 1001, 1, 2, 1530211104297, 3, true, 1530211104297, 'This is the body of an inserted line!', 4, 6100100, 5);
INSERT INTO restaurants (id, restaurant_name, location_id, insertion_time) VALUES (9100150, 'My favorite restaurant', 94122, 1531211104297);
INSERT INTO users (id, user_name, location_id, photo_url, vip) VALUES (9100100, 'Tona-rAmos-AAA', 94122, 'www.findmypicture.com/myuserpic', true);
INSERT INTO categories (category, id) VALUES ('pizza', 1000);

--PUT
INSERT INTO reviews (restaurant_id, id, ambiance_rating, food_rating, overall_rating, recommended, review_body, service_rating, value_rating) VALUES (9300000, 1001, 0, 0, 0, false, 'This is the NEWNEW body of an inserted line!', 4, 5);
INSERT INTO restaurants (id, restaurant_name, location_id, insertion_time) VALUES (9100150, 'My NEW NEW favorite restaurant', 94122, 1530211104297);
INSERT INTO users (id, user_name, location_id, insertion_time) VALUES (9100100, 'Tona-rAmos-AAA', 94122, 1530211105297);

--DELETE
DELETE FROM reviews WHERE restaurant_id = 9808094 AND id = 60191906;
DELETE FROM restaurants WHERE id = 8899951;
DELETE FROM users WHERE id = 9587548;
DELETE FROM categories WHERE category = 'Computer' AND id = 2613;