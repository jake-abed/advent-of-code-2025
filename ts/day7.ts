const rawInput = await Deno.readTextFile("./inputs/day7.txt");
const rows = rawInput.split("\n").map((a) => a.trim()).filter((a) => a !== "");

const partTwoRows = rows.map((row) => row.split("").filter((c) => c !== ""));

export const solvePartOne = (): { count: number; time: number } => {
  const tZero = performance.now();
  let count = 0;

  const lasers: boolean[] = Array.from(
    { length: rows[0].length },
    (_, _i) => false,
  );
  const startPosition = rows[0].indexOf("S");

  lasers[startPosition] = true;

  for (let i = 1; i < rows.length; i++) {
    const splitterPositions: number[] = [];

    for (let j = 0; j < rows[0].length; j++) {
      if (rows[i][j] === "^") {
        splitterPositions.push(j);
      }
    }

    for (let k = 0; k < splitterPositions.length; k++) {
      const splitterIdx = splitterPositions[k];

      if (lasers[splitterIdx]) {
        count++;
        const leftIdx = splitterIdx - 1;
        const rightIdx = splitterIdx + 1;

        lasers[splitterIdx] = false;
        lasers[leftIdx] = true;
        lasers[rightIdx] = true;
      }
    }
  }

  const time = performance.now() - tZero;
  return { count, time };
};

type MemoKey = string;
type Memo = Record<string, number>;

export const solvePartTwo = (): { count: number; time: number } => {
  const tZero = performance.now();
  const startPosition = rows[0].indexOf("S");
  const memo: Memo = {};

  const count = getTimelines(startPosition, 0, partTwoRows, memo);
  const time = performance.now() - tZero;
  return { count, time };
};

const getTimelines = (
  pos: number,
  idx: number,
  grid: string[][],
  memo: Memo,
) => {
  const key = `${pos}/${idx}` as MemoKey;

  if (key in memo) {
    return memo[key]!;
  }

  let total = 0;
  for (let i = idx; i < grid.length; i++) {
    if (grid[i][pos] === "^") {
      total = 0;
      total += getTimelines(pos + 1, i + 1, grid, memo);
      total += getTimelines(pos - 1, i + 1, grid, memo);
      return total;
    }
  }

  memo[key] = 1;
  return 1;
};

console.log(solvePartTwo());
