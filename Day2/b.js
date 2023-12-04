const fs = require("fs");
const content = fs.readFileSync("./a.txt");
const stringArr = content
	.toString()
	.split("\r\n")
	.filter(str => str !== "")

for (let i = 0; i < stringArr.length; i++) {
	stringArr[i] = stringArr[i].split(": ").pop();
}

let acc = 0;

for (let i = 0; i < stringArr.length; i++) {
	acc += evaluateSuccessfulPulls(stringArr[i].split(";"));
}

console.log(acc);

function evaluateSuccessfulPulls(pulls) {
	let possibleTokenCombination = {
		"red": 0,
		"green": 0,
		"blue": 0,
	}

	for (let i = 0; i < pulls.length; i++) {
		parseToken(pulls[i], possibleTokenCombination);
	}

	return possibleTokenCombination["red"] * possibleTokenCombination["blue"] * possibleTokenCombination["green"];
}

function parseToken(tokenStr, possibleTokens) {
	const individualTokens = tokenStr.trim().split(", ")
	for (let i = 0; i < individualTokens.length; i++) {
		let pair = individualTokens[i].split(" ");
		if (parseInt(possibleTokens[pair[1]]) < parseInt(pair[0])) {
			possibleTokens[pair[1]] = pair[0];
		}
	}

}

