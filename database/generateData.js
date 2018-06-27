const generateRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateUsername = () =>  {
  let text = "";
  let possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 1; i < 12; i++) {
    text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return text;
}

const randomDate = () => {
  let day = JSON.stringify(generateRandomInt(1, 30));
  let month = () => {
    let monthNumber = generateRandomInt(1, 12);
    if (monthNumber < 10) {
      monthNumber = '0' + JSON.stringify(monthNumber);
    }
    return monthNumber;
  }
  let year = JSON.stringify(generateRandomInt(2016, 2018));

  return [year, month(), day].join('-');
}

const restaurantId = generateRandomInt;
const username = generateUsername;
const date = randomDate;
const overallRating = generateRandomInt;
const foodRating = generateRandomInt;
const serviceRating = generateRandomInt;
const ambianceRating = generateRandomInt;
const valueRating = generateRandomInt;
const noiseLevel = generateRandomInt;
const recommended = generateRandomInt;
const body = 'Lorem ipsum dolor sit amet, pri id vide homero alienum, nibh nusquam mel no. Pro perfecto atomorum sapientem cu, elit natum ex eum. Est probo qualisque ut. Quo at congue iriure. Lorem ipsum dolor sit amet, pri id vide homero alienum, nibh nusquam mel no. Pro perfecto atomorum sapientem cu, elit natum ex eum. Est probo qualisque ut. Quo at congue iriure. Lorem ipsum dolor sit amet, pri id vide homero alienum, nibh nusquam mel no. Pro perfecto atomorum sapientem cu, elit natum ex eum. Est probo qualisque ut. Quo at congue iriure. Lorem ipsum dolor sit amet, pri id vide homero alienum, nibh nusquam mel no. Pro perfecto atomorum sapientem cu, elit natum ex eum. Est probo qualisque ut. Quo at congue iriure. Lorem ipsum dolor sit amet, pri id vide homero alienum, nibh nusquam mel no. Pro perfecto atomorum sapientem cu, elit natum ex eum. Est probo qualisque ut. Quo at congue iriure.';
const categories = [
  'Special Occasion',
  'Business Meals',
  'Live Music',
  'Good for Groups',
  'Waterfront',
  'Scenic View',
  'Kid-friendly',
  'Afternoon Coffee',
  'Romantic',
  'Good for Anniversaries',
  'Casual',
  'Seasonal',
  'Great for Outdoor Dining',
  'Neighborhood Gem',
  'Late-night Find',
  'Handcrafted Cocktails',
  'Vegan',
  'Healthy',
  'Comfort Food',
  'Disabled Access',
  'Fun',
  'Happy Hour',
  'Bar Seating',
  'Tasting Menu',
  'Quiet Conversation',
  'Authentic',
  'Vibrant Bar Scene',
  'Fit for Foodies',
  'Worth the Drive',
  'Notable Wine List',
  'Quick Bite',
  'Organic',
  'Great for Lunch',
  'Afternoon Tea',
  'Good for Birthdays',
  'Hot Spot',
  'Great for Brunch',
  'Pre/post Theatre',
  'Cozy',
  'Gluten Free Options',
  'Live Sports',
  'People Watching',
  'Creative Cuisine',
  'Spicy',
  'Paleo Friendly',
  'Good for a Date',
  'Local Ingredients',
  'Good Vegetarian Options',
  'Tapas',
  'Sunday Lunch',
  'Great Beer'
];

module.exports = {
  generateRandomInt,
  generateUsername,
  restaurantId,
  username,
  date,
  overallRating,
  foodRating,
  serviceRating,
  ambianceRating,
  valueRating,
  noiseLevel,
  recommended,
  body,
  categories
};