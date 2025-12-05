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

  const sortedRanges = ranges.toSorted((a, b) => a[0] - b[0]);
  const flattened: number[][] = [];

  for (let i = 0; i < sortedRanges.length; i++) {
    const range = sortedRanges[i];

    if (flattened.length === 0) {
      flattened.push(range);
      continue;
    }

    if (range[1] > flattened[flattened.length - 1][1]) {
      if (range[0] <= flattened[flattened.length - 1][1]) {
        flattened[flattened.length - 1][1] = range[1];
      } else {
        flattened.push(range);
      }
    }
  }

  const diffs = flattened.map((r) => r[1] - r[0] + 1);
  const sum = diffs.reduce((a, acc) => a + acc, 0);

  const time = performance.now() - tZero;
  return { sum, time };
};
