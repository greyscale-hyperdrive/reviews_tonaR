
CREATE TABLE  IF NOT EXISTS categories (
    category_id integer DEFAULT nextval('categories_id_seq'::regclass) PRIMARY KEY,
    category character varying(50) NOT NULL,
    previous_id integer NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX categories_pkey ON categories(category_id int4_ops);


CREATE TABLE  IF NOT EXISTS  users (
    user_id integer DEFAULT nextval('users_id_seq'::regclass) PRIMARY KEY,
    previous_id integer NOT NULL,
    user_name character varying(50) NOT NULL,
    location_id integer NOT NULL,
    insertion_time bigint,
    photo_url character varying(50),
    vip boolean
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX users_pkey ON users(user_id int4_ops);

CREATE TABLE restaurants (
    restaurant_id integer DEFAULT nextval('restaurants_id_seq'::regclass) PRIMARY KEY,
    previous_id integer NOT NULL,
    restaurant_name character varying(100) NOT NULL,
    location_id integer NOT NULL
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX restaurants_pkey ON restaurants(restaurant_id int4_ops);


CREATE TABLE  IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    restaurant_id integer NOT NULL REFERENCES restaurants(restaurant_id),
    previous_id integer NOT NULL,
    ambiance_rating integer,
    food_rating integer,
    insertion_time bigint,
    overall_rating integer,
    recommended boolean,
    reservation_date bigint NOT NULL,
    review_body character varying(1000) NOT NULL,
    service_rating integer,
    user_id integer NOT NULL REFERENCES users(user_id),
    value_rating integer
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX reviews_pkey ON reviews(id int4_ops);

-- copy categories (user_name, location_id, time, photo_url, vip) from '/Users/Tona-/Desktop/gitfun/greyscale/data/users.csv' (format csv, delimiter ',');
-- copy users (user_name, location_id, time, photo_url, vip) from '/Users/Tona-/Desktop/gitfun/greyscale/data/users.csv' (format csv, delimiter ',');
-- copy restaurants (previous_id, restaurant_name, location_id, insertion_time) from '/Users/Tona-/Desktop/gitfun/greyscale/data/restaurants.csv' (format csv, delimiter ',');
-- copy reviews (restaurant_id, previous_id, ambiance_rating, food_rating, insertion_time, overall_rating, recommended, reservation_date, review_body, service_rating, user_id, value_rating) from '/Users/Tona-/Desktop/gitfun/greyscale/data/reviewsPartSeven.csv' (format csv, delimiter ',');