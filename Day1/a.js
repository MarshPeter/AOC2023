const fs = require("fs");
const content = fs.readFileSync("./a.txt");
const stringArr = content.toString().split("\r\n");
const numberArr = [];

stringArr.forEach((str) => {
  let firstIndex = -1;
  let secondIndex = -1;

  for (let i = 0; i < str.length; i++) {
    if (Number(str[i]) && firstIndex === -1) {
      firstIndex = i;
    }

    if (Number(str[str.length - 1 - i]) && secondIndex === -1) {
      secondIndex = str.length - 1 - i;
    }

    if (firstIndex !== -1 && secondIndex !== -1) {
      break;
    }
  }

  numberArr.push(str[firstIndex] + str[secondIndex]);
});

let sum = 0;

numberArr.forEach((num) => {
  sum += parseInt(num);
});

console.log(sum);
