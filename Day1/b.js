const fs = require("fs");
const content = fs.readFileSync("./a.txt");
const stringArr = content.toString().split("\r\n");
const numberArr = [];
const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

stringArr.forEach((str) => {
  let firstNumber = "";
  let secondNumber = "";
  let currentAccString = "";
  for (let i = 0; i < str.length; i++) {
    if (Number(str[i])) {
      if (firstNumber === "") {
        firstNumber = str[i];
      } else {
        secondNumber = str[i];
      }
      currentAccString = "";
      continue;
    }

    currentAccString += str[i];

    for (let j = 0; j < numbers.length; j++) {
      if (currentAccString.includes(numbers[j])) {
        if (firstNumber === "") {
          firstNumber = j + 1;
        } else {
          secondNumber = j + 1;
        }

        currentAccString = str[i];
        break;
      }
    }
  }
  if (secondNumber === "") {
    secondNumber = firstNumber;
  }
  numberArr.push(firstNumber.toString() + secondNumber.toString());
});

let sum = 0;

numberArr.forEach((num) => {
  sum += parseInt(num);
});

console.log(sum);
