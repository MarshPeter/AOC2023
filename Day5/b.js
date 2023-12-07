function lowestLocation(seeds, seedMap) {

}

function setupSeedMaps(seedMaps, contentArray) {
  console.log("test1");
  for (let i = 0; i < contentArray.length; i++) {
    if (contentArray[i].match(/^[a-z\s-]+:$/)) {
      seedMaps.push([]);
      continue;
    }
    let [destinationStart, sourceStart, rangeLength] = contentArray[i].split(" ");
    let nextRange = {};
    nextRange["destinationStart"] = destinationStart;
    nextRange["sourceStart"] = sourceStart;
    nextRange["rangeLength"] = rangeLength;

    seedMaps[seedMaps.length - 1].push(nextRange);
  }
  console.log("test2");
}

function main() {
  const fs = require("fs");
  const [seeds, ...content] = fs.readFileSync("./example", "utf-8")
    .split("\r\n")
    .filter(line => line !== "");
  let individualSeeds = seeds.split(":")[1]
    .split(" ")
    .filter(seed => seed != "");
  const relevantSeedMaps = [];
  setupSeedMaps(relevantSeedMaps, content);
  let lowest = lowestLocation(individualSeeds, relevantSeedMaps)
  console.log(lowest);
}

main();