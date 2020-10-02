const readlineSync = require("readline-sync");

let userInput;
let yearByTwelveVar;
let moduloByTwelveVar;
let foursInRemainderVar;
let dayIntVar;
let monthCodeVar;
let first2DigitsYear;
let last2DigitsYear;
let isLeapYearVar = false;

const isLeapYear = function(year) {
  if (year % 4 == 0) {
    if (last2DigitsYear == 0) {
      if (year % 400 == 0) {
        return true;
      }
      return false;
    }
    return true;
  }
  return false;
}

const helperFunctions = {
  initializeVars(year) {
    last2DigitsYear = year.toString().substring(2);
    first2DigitsYear = year.toString().substring(0, 2);
    isLeapYearVar = isLeapYear(year);
  },
  // step 1
  yearByTwelve() {
    let twelves = parseInt(last2DigitsYear) / 12;
    yearByTwelveVar = Math.floor(twelves);
  },
  // step 2
  moduloByTwelve() {
    let modulo = parseInt(last2DigitsYear) % 12;
    moduloByTwelveVar = modulo;
  },
  // step 3
  foursInRemainder() {
    foursInRemainderVar = Math.floor(moduloByTwelveVar / 4);
  },
  // step 4
  dayInt(day) {
    dayIntVar = parseInt(day);
  },
  // step 5
  monthCode(month) {
    let monthInput;
    switch (month) {
      case 4:
      case 7:
        monthInput = 0;
        break;
      case 1:
      case 10:
        monthInput = 1;
        break;
      case 5:
        monthInput = 2;
        break;
      case 8:
        monthInput = 3;
        break;
      case 2:
      case 3:
      case 11:
        monthInput = 4;
        break;
      case 6:
        monthInput = 5;
        break;
      case 9:
      case 12:
        monthInput = 6;
        break;
    }
    if ((month == 1 || month == 2) && isLeapYearVar) {
      monthInput -= 1;
    }
    if (first2DigitsYear == "16" || first2DigitsYear == "20") {
      monthInput += 6;
    }
    if (first2DigitsYear == "17" || first2DigitsYear == "21") {
      monthInput += 4;
    }
    if (first2DigitsYear == "18") {
      monthInput += 2;
    }

    monthCodeVar = monthInput;
  },
};

const {initializeVars,yearByTwelve,moduloByTwelve,foursInRemainder,monthCode,dayInt} = helperFunctions;

function findDayOfWeek(year, month, day) {
  initializeVars(year);
  yearByTwelve(year);
  moduloByTwelve(year);
  foursInRemainder();
  monthCode(month);
  dayInt(day);

  let sum =
    yearByTwelveVar +
    moduloByTwelveVar +
    foursInRemainderVar +
    monthCodeVar +
    dayIntVar;

  let dayOfWeekInt = sum % 7;

  return (function () {
    switch (dayOfWeekInt) {
      case 0:
        return "Saturday";
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
    }
  })();
}

function getDayOfTheWeek(year, month, day) {
  let yyyy = parseInt(year);
  let mm = parseInt(month);
  let dd = parseInt(day);

  console.log(
    "You have entered " +
      userInput +
      ", which is a " +
      findDayOfWeek(yyyy, mm, dd)
  );

  getDayOfTheWeekForUserDate();
}

function getDayOfTheWeekForUserDate() {

  userInput = readlineSync.question(
    "Please input date in the format MM-DD-YYYY : "
  );
  let inputArray = userInput.split("-");
  let month = parseInt(inputArray[0]);
  let day = parseInt(inputArray[1]);
  let year = parseInt(inputArray[2]);

  getDayOfTheWeek(year, month, day);
}

function makeCalendar() {
  let months = new Map([
    [1, 31],
    [2, 29],
    [3, 31],
    [4, 30],
    [5, 31],
    [6, 30],
    [7, 31],
    [8, 31],
    [9, 30],
    [10, 31],
    [11, 30],
    [12, 31],
  ]);

  months.forEach(function (value, key) {
    for (let i = 1; i <= value; i++) {
      console.log(
        key + "-" + i + "-" + "2020" + " is a " + findDayOfWeek(2020, key, i)
      );
    }
  });
}

module.exports = { makeCalendar, getDayOfTheWeekForUserDate };
