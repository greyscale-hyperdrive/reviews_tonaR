const fs = require('fs');
const faker = require('faker');

const randomInteger = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

//change the name of file if saving a different section
const myWriteStream = fs.createWriteStream(__dirname + '/../../../data/reviewsPartOne.csv')
//myWriteStream.write('thiscan be some data');

const writeToFile = function(data, fileName) {
  fs.appendFileSync(`../data/${fileName}.csv`, data, 'utf8', (err) => {if (err) throw err; 
  });
}

const generateCategories = function() {

  for (let i = 0; i < 500001; i++) {
    let time = Date.now();  
    let tableName = 'categories';
    let fileName= 'categoriesPostgres';
    let item = `${faker.company.companyName()},${i}\n`;
    //console.log(item);
    writeToFile(item, fileName);
    if(i % 10000 === 0) {
      console.log('working... passed ' + i);
      console.log('working... ' + i + ' entries left.',' Time elapsed from last entry -> ', (Date.now() - time)/1000, ' seconds.');
    }
  }
};

const generateRestaurants = function() {

  for (let i = 0; i < 10000000; i++) {
    const fileNumber = 1;
    const tableName = 'restaurants';
    const fileName = 'restaurants1';
    const name = faker.fake("{{company.bsNoun}} {{commerce.productAdjective}} {{commerce.productName}}");
    const zipCode = faker.address.zipCode().slice(0,5);

    let item = `${i},${name},${zipCode}\n`;
    //console.log(item);
    writeToFile(item, fileName);
    if(i % 250000 === 0) {
      console.log('working... passed ' + i);
    }
  }
  return 'finished runnig!';
}

const createUsersCsvFile = function (reviewNum) {
  let i = 10000000;

  const createUser = () => {
    const name = faker.internet.userName();
    const zipCode = faker.address.zipCode().slice(0,5);
    const time = Date.now();
    const photo_url = faker.internet.url();
    const vip = !randomInteger(0,1);
    return `${i},${name},${zipCode},${time},${photo_url},${vip}\n`;
  }
  
  const generateUsers = () => {
    let drained = true;
    do {
      drained = myWriteStream.write(createUser());
      i--;
    } while (i > -1 && drained);
    if (i > -1) {
      myWriteStream.once('drain', generateUsers);
    }
  }
  generateUsers();
}

const createReviewsCsvFile = function() {
  
  let i =10000000;
  let k = 1;
  let user = 10000000;
  let time = Date.now();
  
  const createReview = () => {
    const ambianceRate = randomInteger(0,5);
    const foodRate = randomInteger(0,5);
    const timeStamp = Date.now();
    const overallRate = randomInteger(0,5);
    const recommended = !randomInteger(0,1);
    const reservation_date = randomInteger(1520000000000,1529781014704);
    const reviewBody = faker.lorem.paragraph();
    const serviceRate = randomInteger(0,5);
    const valueRate = randomInteger(0,5);
    const review = `${k},${i},${ambianceRate},${foodRate},${timeStamp},${overallRate},${recommended},${reservation_date},${reviewBody},${serviceRate},${user},${valueRate}\n`;
    k += 1;
    user -= 1;
    if (k === 10000000) {
      k = 1;
    }
    if (user === 1) {
      user = 10000000;
    }
    if ( i % 1000000 === 0) {
      console.log('working... ' + i + ' entries left.',' Time elapsed from last entry -> ', (Date.now() - time)/1000, ' seconds.');
      time = Date.now()
    }
    return review;
  }
  
  const generateReview = function() {
    let drained = true;
    do {
      drained = myWriteStream.write(createReview());
      i--;
    } while (i > 00000001 && drained);
    if (i > 000000001) {
      myWriteStream.once('drain', generateReview);
    }
  }
  generateReview();
}
