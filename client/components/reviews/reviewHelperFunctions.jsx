const formatDate = (date) => {
  
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

module.exports = {
  formatDate : formatDate
}

const reviewFunctions = module.exports;
export default reviewFunctions;