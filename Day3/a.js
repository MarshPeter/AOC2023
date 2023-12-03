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
      if (content[i][j] !== "." && !isNumeric(content[i][j])) {
        if (notedSymbols[i] == null) {
          notedSymbols[i] = [j];
        } else {
          notedSymbols[i].push(j);
        }
      }
    }
  }
}

// checks directly up and diagonal left/right
function symbolIsAbove(row, column, notedSymbols, maxColumnLength) {
  if (row === 0) return false;
  if (notedSymbols[row - 1] == null) return false;

  if (notedSymbols[row - 1].includes(column)) return true;
  if (column > 0 && notedSymbols[row - 1].includes(column - 1)) return true;
  if (column < maxColumnLength && notedSymbols[row - 1].includes(column + 1))
    return true;

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

  if (notedSymbols[row + 1].includes(column)) return true;
  if (column > 0 && notedSymbols[row + 1].includes(column - 1)) return true;
  if (column < maxColumnLength && notedSymbols[row + 1].includes(column + 1))
    return true;

  return false;
}

function symbolIsLeft(row, column, notedSymbols) {
  if (column === 0) return false;
  if (notedSymbols[row] == null) return false;

  if (notedSymbols[row].includes(column - 1)) return true;
  return false;
}

function symbolIsright(row, column, notedSymbols, maxColumnLength) {
  if (column === maxColumnLength) return false;
  if (notedSymbols[row] == null) return false;

  if (notedSymbols[row].includes(column + 1)) return true;
  return false;
}

function isNextToSymbol(row, column, content, notedSymbols) {
  return (
    symbolIsAbove(row, column, notedSymbols, content[0].length) ||
    symbolIsBelow(
      row,
      column,
      notedSymbols,
      content[0].length,
      content.length
    ) ||
    symbolIsLeft(row, column, notedSymbols) ||
    symbolIsright(row, column, notedSymbols, content[0].length)
  );
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

  return validNumber ? parseInt(currentNumber) : 0;
}

function findFinalSum(content, notedSymbols) {
  let sum = 0;
  for (let i = 0; i < content.length; i++) {
    for (let j = 0; j < content[i].length; j++) {
      if (isNumeric(content[i][j])) {
        sum += validNumberNextToSymbol(content, notedSymbols, i, j);
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
  const sum = findFinalSum(content, notedSymbols);
  console.log(sum);
}

main();
