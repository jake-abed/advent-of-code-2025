const rawInput = await Deno.readTextFile("./inputs/day8.txt");
const rawCoords = rawInput.split("\n").map((a) => a.trim()).filter((a) =>
  a !== ""
);

const boxCoords = rawCoords.map((coord) =>
  coord.split(",").map((p) => parseInt(p))
);
let connections: number[][];

export const solvePartOne = () => {
  const tZero = performance.now();
  connections = [];
  const circuits = boxCoords.map((_, i) => ({ rep: i, boxes: new Set([i]) }));
  for (let i = 0; i < boxCoords.length - 1; i++) {
    for (let j = i + 1; j < boxCoords.length; j++) {
      connections.push([i, j, getDist(boxCoords[i], boxCoords[j])]);
    }
  }
  connections.sort((a, b) => a[2] - b[2]);

  connections.slice(0, boxCoords.length < 1000 ? 10 : 1000).forEach(
    ([a, b]: number[]) => {
      if (!circuits[a].boxes.has(b)) {
        circuits[b].boxes.forEach((box) => {
          circuits[a].boxes.add(box);
          circuits[box] = circuits[a];
        });
      }
    },
  );

  const sizes = circuits.filter(({ rep }, i) => rep === i).map((
    { boxes },
  ) => boxes.size).sort((a, b) => b - a);

  const product = sizes[0] * sizes[1] * sizes[2];
  const time = performance.now() - tZero;
  return { product, time };
};

export const solvePartTwo = () => {
  const tZero = performance.now();
  connections = [];
  let product: number = 0;
  const circuits = boxCoords.map((_, i) => ({ rep: i, boxes: new Set([i]) }));
  for (let i = 0; i < boxCoords.length - 1; i++) {
    for (let j = i + 1; j < boxCoords.length; j++) {
      connections.push([i, j, getDist(boxCoords[i], boxCoords[j])]);
    }
  }

  connections.sort((a, b) => a[2] - b[2]);

  connections.forEach((connection) => {
    const [a, b] = connection;
    if (!circuits[a].boxes.has(b)) {
      circuits[b].boxes.forEach((box) => {
        circuits[a].boxes.add(box);
        circuits[box] = circuits[a];
      });

      if (circuits[0].boxes.size === boxCoords.length) {
        product = boxCoords[connection[0]][0] * boxCoords[connection[1]][0];
      }
    }
  });

  const time = performance.now() - tZero;
  return { product, time };
};

const getDist = (a: number[], b: number[]) => {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
  );
};
