const readlineSync = require("readline-sync");

var userInput;
var yearByTwelveVar;
var moduloByTwelveVar;
var foursInRemainderVar;
var dayIntVar;
var monthCodeVar;
var first2DigitsYear;
var last2DigitsYear;
var isLeapYear = false;

var helperFunctions = {
  prep: function (year) {
    last2DigitsYear = year.toString().substring(2);
    first2DigitsYear = year.toString().substring(0, 2);
    isLeapYear = (function () {
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
    })();
  },
  // step 1
  yearByTwelve: function () {
    var twelves = parseInt(last2DigitsYear) / 12;
    yearByTwelveVar = Math.floor(twelves);
  },
  // step 2
  moduloByTwelve: function () {
    var modulo = parseInt(last2DigitsYear) % 12;
    moduloByTwelveVar = modulo;
  },
  // step 3
  foursInRemainder: function () {
    foursInRemainderVar = Math.floor(moduloByTwelveVar / 4);
  },
  // step 4
  dayInt: function (day) {
    dayIntVar = parseInt(day);
  },
  // step 5
  monthCode: function (month) {
    var monthInput;
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
    if ((month == 1 || month == 2) && isLeapYear) {
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

function findDayOfWeek(year, month, day) {
  helperFunctions.prep(year);
  helperFunctions.yearByTwelve(year);
  helperFunctions.moduloByTwelve(year);
  helperFunctions.foursInRemainder();
  helperFunctions.monthCode(month);
  helperFunctions.dayInt(day);

  var sum =
    yearByTwelveVar +
    moduloByTwelveVar +
    foursInRemainderVar +
    monthCodeVar +
    dayIntVar;

  var dayOfWeekInt = sum % 7;

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
  var year = parseInt(year);
  var month = parseInt(month);
  var day = parseInt(day);

  console.log(
    "You have entered " +
      userInput +
      ", which is a " +
      findDayOfWeek(year, month, day)
  );
}

function getDayOfTheWeekForUserDate() {
  userInput = readlineSync.question(
    "Please input date in the format MM-DD-YYYY : "
  );
  var inputArray = userInput.split("-");
  var month = parseInt(inputArray[0]);
  var day = parseInt(inputArray[1]);
  var year = parseInt(inputArray[2]);

  getDayOfTheWeek(year, month, day);
}

function makeCalendar() {
  var months = new Map([
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
