const rawInput = await Deno.readTextFile("./inputs/day3.txt");
const banks = rawInput.split("\n").map((a) => a.trim()).filter((a) => a !== "");

const scanForHighestPartOne = (bank: string): [number, number] => {
  let highest = parseInt(bank[0]);
  let highestIdx = 0;

  for (let i = 1; i < bank.length - 1; i++) {
    if (parseInt(bank[i]) === 9) return [9, i];
    if (parseInt(bank[i]) > highest) {
      highest = parseInt(bank[i]);
      highestIdx = i;
    }
  }

  return [highest, highestIdx];
};

const scanForNextHighestPartOne = (
  bank: string,
  highestIdx: number,
): [number, number] => {
  let second = parseInt(bank[highestIdx + 1]);
  let secondIdx = highestIdx + 1;

  if (secondIdx === bank.length - 1) return [second, secondIdx];
  for (let i = secondIdx + 1; i < bank.length; i++) {
    if (parseInt(bank[i]) === 9) return [9, i];
    if (parseInt(bank[i]) > second) {
      second = parseInt(bank[i]);
      secondIdx = i;
    }
  }

  return [second, secondIdx];
};

export const solvePartOne = (): { sum: number, time: number } => {
  const tZero = performance.now();
  const nums: number[] = [];

  for (const bank of banks) {
    const [highest, idx1] = scanForHighestPartOne(bank);
    const [second, _idx2] = scanForNextHighestPartOne(bank, idx1);

    nums.push(highest * 10 + second);
  }

  const time = performance.now() - tZero;
  return { sum: nums.reduce((a, acc) => a + acc, 0), time };
};

const getHighestRemaining = (
  bank: string,
  nextIdx: number,
  remaining: number,
): string => {
  let idx = -1;
  let val = 0;

  for (let i = nextIdx; i < bank.length - (remaining - 1); i++) {
    const current = parseInt(bank[i]);
    if (current > val) {
      idx = i;
      val = current;
    }
  }

  if (remaining === 1) {
    return `${val}`;
  } else {
    return val.toString() + getHighestRemaining(bank, idx + 1, remaining - 1);
  }
};

export const solvePartTwo = (): { sum: number, time: number } => {
  const tZero = performance.now();
  const nums: number[] = [];

  for (const bank of banks) {
    nums.push(parseInt(getHighestRemaining(bank, 0, 12)));
  }

  const time = performance.now() - tZero;
  return { sum: nums.reduce((a, acc) => a + acc, 0), time };
};

