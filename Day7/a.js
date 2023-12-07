const fs = require("fs")

const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

function gradeHand(hand) {
    let highestSingleSuit = 0;
    let secondHighestSuit = 0;
    for (const [key, value] of Object.entries(hand)) {
        if (value > highestSingleSuit) {
            secondHighestSuit = highestSingleSuit;
            highestSingleSuit = value;
        } else if (value > secondHighestSuit) {
            secondHighestSuit = value;
        }
    }

    if (highestSingleSuit === 5) {
        console.log("test1");
        return 7;
    }

    if (highestSingleSuit === 4) {
        console.log("test2");
        return 6;
    } 

    if (highestSingleSuit === 3 && secondHighestSuit === 2) {
        console.log("test3");
        return 5;
    }

    if (highestSingleSuit === 3) {
        console.log("test4");
        return 4;
    }

    if (highestSingleSuit === 2 && secondHighestSuit === 2) {
        console.log("test5");
        return 3;
    }

    if (highestSingleSuit === 2) {
        console.log("test6");
        return 2;
    }

    console.log("test7");
    return 1;
}

function winningHand(handA, handB) {
    let handAGrade = gradeHand(handA);
    let handBGrade = gradeHand(handB);

    if (handAGrade === handBGrade) {
        return 0;
    }

    if (handAGrade < handBGrade) {
        return -1;
    }
    return 1;
}

function sortTie(handA, handB) {
    for (let i = 0; i < handA.hand.length; i++) {
        if (ranks.indexOf(handA.hand[i]) < ranks.indexOf(handB.hand[i])) {
            return 1;
        }
        if (ranks.indexOf(handA.hand[i]) > ranks.indexOf(handB.hand[i])) {
            return -1;
        }
    }

    return 0;
}

function compareHands(handA, handB) {
    // contains counts 
    let handACounts = {};
    let handBCounts = {};

    for (let i = 0; i < handA.hand.length; i++) {
        if (!handACounts.hasOwnProperty(handA.hand[i])) {
            handACounts[handA.hand[i]] = 0;
        }
        if (!handBCounts.hasOwnProperty(handB.hand[i])) {
            handBCounts[handB.hand[i]] = 0;
        }

        handACounts[handA.hand[i]] += 1;
        handBCounts[handB.hand[i]] += 1;
    }

    let result = winningHand(handACounts, handBCounts);
    return result === 0 ? sortTie(handA, handB) : result;
}

function sortHandRanks(hands) {
    hands.sort((a, b) => compareHands(a, b));
}

function calculateTotalWinnings(hands) {
    let sum = 0;
    for (let i = 0; i < hands.length; i++) {
        sum += hands[i].bid * (hands.length - i);
    }
    return sum;
}

function main() {
    const content = fs.readFileSync("example.txt", "utf-8")
        .split("\n")
        .map(line => {
            line = line.trim();
            let [hand, bid] = line.split(" "); 
            return {
                hand: hand,
                bid: bid,
            }
        });

    sortHandRanks(content);
    console.log(content);
    let winnings = calculateTotalWinnings(content);
    console.log(winnings);
}

main();