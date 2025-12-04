const rawInput = await Deno.readTextFile("./inputs/day4.txt");
const rows = rawInput.split("\n").filter((r) => r !== "").map((r) => r.trim());
const paperMatrix = rows.map((r) => r.split("").map((c) => c.trim()));

const PAPER = "@";
const SPACE = ".";

export const solvePartOne = () => {
  let reachable = 0;
  const width = paperMatrix[0].length;
  const height = paperMatrix.length;
  const edgesX = [0, width - 1];
  const edgesY = [0, height - 1];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < height; x++) {
      const spaces = [
        x === edgesX[0] || y === edgesY[0] ? SPACE : paperMatrix[y - 1][x - 1], // nw
        x === edgesX[1] || y === edgesY[0] ? SPACE : paperMatrix[y - 1][x + 1], // ne
        x === edgesX[1] || y === edgesY[1] ? SPACE : paperMatrix[y + 1][x + 1], // se
        x === edgesX[0] || y === edgesY[1] ? SPACE : paperMatrix[y + 1][x - 1], // sw
        x === edgesX[0] ? SPACE : paperMatrix[y][x - 1], // w
        x === edgesX[1] ? SPACE : paperMatrix[y][x + 1], // e
        y === edgesY[0] ? SPACE : paperMatrix[y - 1][x], // n
        y === edgesY[1] ? SPACE : paperMatrix[y + 1][x], // s
      ];

      const openSpots = spaces.filter((s) => s === SPACE).map((_) => 1).reduce(
        (a, acc) => a + acc,
        0,
      );

      if (openSpots > 4 && paperMatrix[y][x] === PAPER) reachable++;
    }
  }

  console.log(reachable);
};

solvePartOne();
