const rawInput = await Deno.readTextFile("./inputs/day2.txt");
const idRanges = rawInput.split(",").map((a) => a.trim());

const parseIdRange = (idRange: string): [string, string] => {
  return idRange.split("-") as [string, string];
};

export const solvePartOne = (): { sum: number; time: number } => {
  const tZero = performance.now();
  const badIds: number[] = [];

  for (const idRange of idRanges) {
    const [start, end] = parseIdRange(idRange);
    let cur = parseInt(start) as number;

    while (cur <= parseInt(end)) {
      const current = cur.toString();

      if (current[0] === "0") {
        cur++;
        continue;
      }

      if (current.length % 2 != 0) {
        cur++;
        continue;
      }

      const firstHalf = current.slice(0, current.length / 2);
      const secondHalf = current.slice(current.length / 2);
      if (firstHalf === secondHalf) {
        badIds.push(cur);
      }
      cur++;
    }
  }

  const time = performance.now() - tZero;
  return { sum: badIds.reduce((id, acc) => id + acc, 0), time };
};

export const solvePartTwo = (): { sum: number; time: number } => {
  const tZero = performance.now();
  const badIds: number[] = [];

  for (const idRange of idRanges) {
    const [start, end] = parseIdRange(idRange);
    let cur = parseInt(start) as number;

    while (cur <= parseInt(end)) {
      const current = cur.toString();

      if (current[0] === "0") {
        cur++;
        continue;
      }

      const l = current.length;

      for (let i = 1; i <= l / 2; i++) {
        const substring = current.slice(0, i);
        if (substring.repeat(l / substring.length) === current) {
          badIds.push(cur);
          break;
        }
      }

      cur++;
    }
  }

  const time = performance.now() - tZero;
  return { sum: badIds.reduce((id, acc) => id + acc, 0), time };
};
