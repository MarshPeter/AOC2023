function isNumeric(num) {
  return !isNaN(num);
}

function replaceStringCharWithPeriod(string, col) {
  return (
    string.substring(0, col) + "." + string.substring(col + 1, string.length)
  );
}

function findNotedSymbols(content, notedSymbols) {
  for (let i = 0; i < content.length; i++) {
    for (let j = 0; j < content[i].length; j++) {
      if (content[i][j] === "*") {
        if (notedSymbols[i] == null) {
          notedSymbols[i] = {};
        }
        notedSymbols[i][j] = [];
      }
    }
  }
}

// checks directly up and diagonal left/right
function symbolIsAbove(row, column, notedSymbols, maxColumnLength) {
  if (row === 0) return false;
  if (notedSymbols[row - 1] == null) return false;

  if (notedSymbols[row - 1][column]) return [row - 1, column];
  if (column > 0 && notedSymbols[row - 1][column - 1])
    return [row - 1, column - 1];
  if (column < maxColumnLength && notedSymbols[row - 1][column + 1])
    return [row - 1, column + 1];

  return false;
}

// checks directly below and diagonal left/right
function symbolIsBelow(
  row,
  column,
  notedSymbols,
  maxColumnLength,
  maxRowLength
) {
  if (row === maxRowLength) return false;
  if (notedSymbols[row + 1] == null) return false;

  if (notedSymbols[row + 1][column]) return [row + 1, column];
  if (column > 0 && notedSymbols[row + 1][column - 1])
    return [row + 1, column - 1];
  if (column < maxColumnLength && notedSymbols[row + 1][column + 1])
    return [row + 1, column + 1];

  return false;
}

function symbolIsLeft(row, column, notedSymbols) {
  if (column === 0) return false;
  if (notedSymbols[row] == null) return false;

  if (notedSymbols[row][column - 1]) return [row, column - 1];
  return false;
}

function symbolIsright(row, column, notedSymbols, maxColumnLength) {
  if (column === maxColumnLength) return false;
  if (notedSymbols[row] == null) return false;

  if (notedSymbols[row][column + 1]) return [row, column + 1];
  return false;
}

function isNextToSymbol(row, column, content, notedSymbols) {
  let above = symbolIsAbove(row, column, notedSymbols, content[0].length);
  if (above) return above;
  let below = symbolIsBelow(
    row,
    column,
    notedSymbols,
    content[0].length,
    content.length
  );
  if (below) return below;
  let left = symbolIsLeft(row, column, notedSymbols);
  if (left) return left;
  let right = symbolIsright(row, column, notedSymbols, content[0].length);
  if (right) return right;
  return false;
}

// valid number returns full number, otherwise will return 0
function validNumberNextToSymbol(content, notedSymbols, row, startCol) {
  let validNumber = false;
  let currentNumber = "";
  let col = startCol;
  while (isNumeric(content[row][col])) {
    currentNumber += content[row][col];
    if (validNumber === false) {
      validNumber = isNextToSymbol(row, col, content, notedSymbols);
    }
    content[row] = replaceStringCharWithPeriod(content[row], col);
    col += 1;

    if (col > content[0].length) {
      break;
    }
  }

  if (validNumber) {
    notedSymbols[validNumber[0]][validNumber[1]].push(currentNumber);
  }
}

function findNumbers(content, notedSymbols) {
  for (let i = 0; i < content.length; i++) {
    for (let j = 0; j < content[i].length; j++) {
      if (isNumeric(content[i][j])) {
        validNumberNextToSymbol(content, notedSymbols, i, j);
      }
    }
  }
}

function calculateResult(notedSymbols, content) {
  let sum = 0;
  for (let i = 0; i < content.length; i++) {
    for (let j = 0; j < content[i].length; j++) {
      if (notedSymbols[i] != null) {
        if (notedSymbols[i][j] != null) {
          if (notedSymbols[i][j].length === 2) {
            sum += notedSymbols[i][j][0] * notedSymbols[i][j][1];
          }
        }
      }
    }
  }

  return sum;
}

function main() {
  const fs = require("fs");
  const content = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
  const notedSymbols = {};
  findNotedSymbols(content, notedSymbols);
  findNumbers(content, notedSymbols);
  let sum = calculateResult(notedSymbols, content);
  console.log(sum);
}

// welp this was a fail, taking a break, and trying again later this month
main();
