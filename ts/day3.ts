const rawInput = await Deno.readTextFile("./inputs/day3.txt");
const banks = rawInput.split("\n").map((a) => a.trim()).filter((a) => a !== '');

const scanForHighest = (bank: string): [number, number] => {
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
}

const scanForNextHighest = (bank: string, highestIdx: number): [number, number] => {
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
}

export const solvePartOne = () => {
  const nums: number[] = [];

  for (const bank of banks) {
    const [highest, idx1] = scanForHighest(bank);
    const [second, _idx2] = scanForNextHighest(bank, idx1);

    nums.push(highest * 10 + second);
  }

  console.log(nums.reduce((a, acc) => a + acc, 0));
}
