function removeCardPortion(content) {
  for (let i = 0; i < content.length; i++) {
    content[i] = content[i].replace(/.+:\s/, "");
  }
}

function splitIntoObject(content) {
  const winningMapArray = [];
  content.forEach(line => {
    let [winningNumbers, ourNumbers] = line.split("|");
    winningNumbers = winningNumbers.trim().split(" ").filter(number => number != "");
    ourNumbers = ourNumbers.trim().split(" ").filter(number => number != "");
    winningMapArray.push({"winningNumbers": winningNumbers, "ourNumbers": ourNumbers});
  })

  return winningMapArray;
}

function modifyContent(content) {
  removeCardPortion(content);
  return splitIntoObject(content);
} 

function numberMatches(winningNumbers, ourNumbers) {
  let sum = 0;
  let factor = 2;
  ourNumbers.forEach(num => {
    if (winningNumbers.includes(num)) {
      if (sum === 0) {
        sum = 1;
      } else {
        sum *= factor
      }
    }
  })

  return sum;
}

function calculateWins(winningMapArray) {
  let sum = 0;
  winningMapArray.forEach(game => {
    sum += numberMatches(game.winningNumbers, game.ourNumbers);
  })

  return sum;
}

function getMatchingNumbers(winningNumbers, ourNumbers) { 
  let count = 0;
  ourNumbers.forEach(num => {
    if (winningNumbers.includes(num)) {
      count++;
    }
  })

  return count;
}

function calculateScorecardCount(mapArray) {
  let count = 0;
  const stack = []; // will contain indexes of scratchcards to do  
  const scratchCardResultLookup = {};
  const occurrenceResultLookup = {};
  for (let i = 0; i < mapArray.length; i++) {
    while (stack.length !== 0) {
      let currentScratchCard = stack.pop();
      if (scratchCardResultLookup[currentScratchCard] == null) {
        let matches = getMatchingNumbers(mapArray[currentScratchCard].winningNumbers, mapArray[currentScratchCard].ourNumbers);
        scratchCardResultLookup[currentScratchCard] = matches;
      }
      let matches = scratchCardResultLookup[currentScratchCard]; 
      let nextScratchCardId = currentScratchCard + 1;
      while (nextScratchCardId < mapArray.length && matches > 0) {
        stack.push(nextScratchCardId++);
        matches--;
      }
      // console.log(stack);
      count++;
      if (occurrenceResultLookup[currentScratchCard] == null) occurrenceResultLookup[currentScratchCard] = 0;
    
      occurrenceResultLookup[currentScratchCard] += 1;
    }

    if (scratchCardResultLookup[i] == null) {
      let matches = getMatchingNumbers(mapArray[i].winningNumbers, mapArray[i].ourNumbers);
      scratchCardResultLookup[i] = matches;
      if (occurrenceResultLookup[i] == null) occurrenceResultLookup[i] = 0;
    
      occurrenceResultLookup[i] += 1;
    }

    let matches = scratchCardResultLookup[i]; 
    let nextScratchCardId = i + 1;
    while (nextScratchCardId < mapArray.length && matches > 0) {
      stack.push(nextScratchCardId++);
      matches--;

    }

    count++;

    // console.log(stack);
  }

  // console.log(scratchCardResultLookup);
  // console.log(occurrenceResultLookup);

  return count;

}

function main() {
  const fs = require("fs");
  const content = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
  content.forEach(line => {
    [test1, test2, test3] = line.split(/[:|]/);
    console.log("part1 ", test1)
    console.log("part2 ", test2)
    console.log("part3 ", test3)
  })
  // winningMapArray = modifyContent(content);
  // let part1result = calculateWins(winningMapArray)
  // console.log(part1result);
  // let part2result = calculateScorecardCount(winningMapArray);
  // console.log(part2result);
}

main();