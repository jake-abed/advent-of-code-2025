const rawInput = await Deno.readTextFile("./inputs/day1.txt");
const turns = rawInput.split("\n").filter((entry) => entry != "");

const parseTurn = (turn: string): [string, number] => {
  const direction = turn[0];
  const clicks = parseInt(turn.slice(1));
  return [direction, clicks];
};

export const solvePartOne = (): { hits: number; time: number } => {
  const tZero = performance.now();
  let hits = 0;
  let currentPosition = 50;

  for (const turn of turns) {
    const [direction, clicks] = parseTurn(turn);

    const trueClicks = clicks % 100;
    const target = direction === "R"
      ? currentPosition + trueClicks
      : currentPosition - trueClicks;

    if (target < 0) currentPosition = 100 + target;
    else if (target > 99) currentPosition = target - 100;
    else currentPosition = target;

    if (currentPosition === 0) hits++;
  }

  const time = performance.now() - tZero;
  return { hits, time };
};

export const solvePartTwo = (): { hits: number; time: number } => {
  const tZero = performance.now();
  let hits = 0;
  let currentPosition = 50;

  for (const turn of turns) {
    const [direction, clicks] = parseTurn(turn);

    for (let i = 0; i < clicks; i++) {
      const target = direction == "R"
        ? currentPosition + 1
        : currentPosition - 1;
      if (target > 99) currentPosition = 0;
      else if (target < 0) currentPosition = 99;
      else currentPosition = target;

      if (currentPosition === 0) hits++;
    }
  }

  const time = performance.now() - tZero;
  return { hits, time };
};
