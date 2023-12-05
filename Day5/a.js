function lowestLocation(seeds, seedMaps) {
  let lowestLocation = -1;
  for (let i = 0; i < i < seeds.length; i += 2) {
    for (let j = 0; j < seeds[i + 1]; j++) {
      let seed = Number(seeds[i]) + j;
      let currentValue = Number(seed);
      seedMaps.forEach(mapSet => {
        let withinARange = false;

        mapSet.forEach(map => {
          if (currentValue >= Number(map.sourceStart) && currentValue < (Number(map.sourceStart) + Number(map.rangeLength)) && !withinARange) {
            // console.log("Current Value", currentValue);
            // console.log("sourceStart", map.sourceStart);
            // console.log("sourceEnd", Number(map.sourceStart) + Number(map.rangeLength));
            // console.log("Max destination Range", Number(map.destinationStart) + Number(map.rangeLength) - 1);
            // console.log(currentValue);
            currentValue = Number(map.destinationStart) - Number(map.sourceStart) + currentValue;
            withinARange = true;
            // console.log(currentValue);
          }
        })
      })
      // console.log(currentValue);
      if (lowestLocation === -1) {
        lowestLocation = currentValue; 
      }

      if (lowestLocation > currentValue) {
        lowestLocation = currentValue;
      }
    }
  }
  return lowestLocation;
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
  // console.log(individualSeeds);
  // console.log(relevantSeedMaps);
  // this is part 1
  let lowest = lowestLocation(individualSeeds, relevantSeedMaps)
  console.log(lowest);
}

main();