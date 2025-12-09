const rawInput = await Deno.readTextFile("./inputs/day9.txt");
const rawCoords = rawInput.split("\n").map((a) => a.trim()).filter((a) =>
  a !== ""
);
const parsedCoords = rawCoords.map((c) => c.split(",").map((x) => parseInt(x)));

const getArea = (coord1: [number, number], coord2: [number, number]) => {
  const width = coord1[0] > coord2[0]
    ? coord1[0] - coord2[0] + 1
    : coord2[0] - coord1[0] + 1;
  const height = coord1[1] > coord2[1]
    ? coord1[1] - coord2[1] + 1
    : coord2[1] - coord1[1] + 1;

  return (width) * (height);
};

export const solvePartOne = () => {
  const tZero = performance.now();

  const areas: number[] = [];

  for (let i = 0; i < parsedCoords.length; i++) {
    for (let j = i + 1; j < parsedCoords.length -1; j++) {
      areas.push(getArea(parsedCoords[i] as [number, number], parsedCoords[j] as [number, number]));
    }
  }

  areas.sort((a, b) => b - a);

  const time = performance.now() - tZero;
  return { area: areas[0], time };
};

