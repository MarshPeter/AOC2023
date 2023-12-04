const fs = require("fs");
const content = fs.readFileSync("./a.txt");
const stringArr = content
	.toString()
	.split("\r\n")
	.filter(str => str !== "")

const possibleTokenCombination = {
	"red": 12,
	"green": 13,
	"blue": 14,
}

for (let i = 0; i < stringArr.length; i++) {
	stringArr[i] = stringArr[i].split(": ").pop();
}

let acc = 0;

for (let i = 0; i < stringArr.length; i++) {
	let valid = evaluateSuccessfulPulls(stringArr[i].split(";"));
	if (valid) acc += i + 1;
}

console.log(acc);

function evaluateSuccessfulPulls(pulls) {
	for (let i = 0; i < pulls.length; i++) {
		let truthy = parseToken(pulls[i], possibleTokenCombination);
		if (truthy === false) {
			return false; 
		}
	}
	return true;
}

function parseToken(tokenStr, possibleTokens) {
	const individualTokens = tokenStr.trim().split(", ")
	let valid = true;
	for (let i = 0; i < individualTokens.length; i++) {
		let pair = individualTokens[i].split(" ");
		if (possibleTokens[pair[1]] < pair[0]) {
			return false;
		}
	}

	return true;
}

