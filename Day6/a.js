const fs = require("fs");

function beatsBestDistance(holdTime, bestDistance, duration) {
    let movementTime = duration - holdTime;

    return bestDistance < holdTime * movementTime;
}

function calculateWinningCount(times, recordDistances) {
    let product = 1;
    for (let i = 0; i < times.length; i++) {
        let winningCount = 0;
        for (let holdTime = 0; holdTime < times[i]; holdTime++) {
            if (beatsBestDistance(holdTime, recordDistances[i], times[i])) {
                winningCount++;
            }
        }

        console.log(winningCount);
        product *= winningCount;
    }

    return product;
}

function calculateSingleRaceWinAmount(time, distance) {
    let possibleMethods = time;

    for (let holdTime = 0; holdTime < time; holdTime++) {
        if (beatsBestDistance(holdTime, distance, time)) {
            break;
        }
        possibleMethods--;
    }

    for (let holdTime = time - 1; holdTime > 0; holdTime--) {
        if (beatsBestDistance(holdTime, distance, time)) {
            break;
        }
        possibleMethods--;
    }

    return possibleMethods;
}

function main() {

    const [times, recordDistances] = fs.readFileSync("./input.txt", "utf-8")
        .split("\n")
        .map(line => {return line.split(":")[1]})
        .map(line => {return line.trim()})
        .map(line => {return line.split(" ").filter(number => number !== "")});

    // part 1
    console.log(calculateWinningCount(times, recordDistances));
    // part 2
    let singleTime = Number(times.join(""));
    let singleDistance = Number(recordDistances.join(""))

    console.log(calculateSingleRaceWinAmount(singleTime,singleDistance));
}

main();