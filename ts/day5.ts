const rawInput = await Deno.readTextFile("./inputs/day5.txt");
const split = rawInput.split("\n\n").map((a) => a.trim()).filter((a) =>
  a !== ""
);
const ranges = split[0]
  .split("\n")
  .map((range) => range.split("-"))
  .map((range) => [parseInt(range[0]), parseInt(range[1])]);

const ingredients = split[1].split("\n").map((i) => parseInt(i));

export const solvePartOne = (): { sum: number; time: number } => {
  const tZero = performance.now();
  let sum = 0;

  for (const ingredient of ingredients) {
    for (const range of ranges) {
      const inRange = ingredient >= range[0] && ingredient <= range[1];
      if (inRange) {
        sum++;
        break;
      }
    }
  }

  const time = performance.now() - tZero;
  return { sum, time };
};

export const solvePartTwo = (): { sum: number, time: number } => {
  const tZero = performance.now();
  let sum = 0;

  const sortedRanges = ranges.toSorted((a, b) => a[0] - b[0]);


  let rangeStart = sortedRanges[0][0];
  let rangeEnd = sortedRanges[0][1];

  for (let i = 1; i < sortedRanges.length; i++) {
    const range = sortedRanges[i];

    if (range[1] > rangeEnd) {
      if (range[0] <= rangeEnd) {
        rangeEnd = range[1];
      } else {
        sum += rangeEnd - rangeStart + 1;
        rangeStart = range[0];
        rangeEnd = range[1];
      }
    }

  }

  sum += rangeEnd - rangeStart + 1;

  const time = performance.now() - tZero;
  return { sum, time };
}

