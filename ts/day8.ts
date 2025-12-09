const rawInput = await Deno.readTextFile("./inputs/day8.txt");
const rawCoords = rawInput.split("\n").map((a) => a.trim()).filter((a) =>
  a !== ""
);
const coords = rawCoords.map((coord) =>
  coord.split(",").map((p) => parseInt(p))
);

interface Point {
  x: number;
  y: number;
  z: number;
}
interface Box {
  point: Point;
  distances: PointDistance[];
}

interface PointDistance {
  p1: Point;
  p2: Point;
  distance: number;
}

interface Circuit {
  subcircuit1?: Circuit;
  subcircuit2?: Circuit;
  pointDistances: PointDistance[];
  allPointIds: Set<string>;
}

const solvePartOne = (
  targetConnections: number = 1000,
): { product: number; time: number } => {
  const boxes = coords.map((coord): Box => ({
    point: { x: coord[0], y: coord[1], z: coord[2] },
    distances: [],
  }));

  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes.length; j++) {
      if (i === j) continue;
      boxes[i].distances.push({
        p1: boxes[i].point,
        p2: boxes[j].point,
        distance: calculateDistance(boxes[i].point, boxes[j].point),
      });
    }
  }

  let possibleConnections: PointDistance[] = [];
  for (const box of boxes) {
    possibleConnections = [...possibleConnections, ...box.distances];
  }
  possibleConnections.sort((a, b) => a.distance - b.distance);
  possibleConnections = possibleConnections.filter((_, idx) => idx % 2 !== 0);

  const connections = possibleConnections.slice(0, targetConnections);
  const madeConnections: Set<string> = new Set<string>();

  const circuits: Array<Circuit|null> = [];

  for (let i = 0; i < connections.length; i++) {
    const conn = connections[i];
    const p1Id = getPointId(conn.p1);
    const p2Id = getPointId(conn.p2);

    if (!madeConnections.has(p1Id) && !madeConnections.has(p2Id)) {
      circuits.push({
        pointDistances: [conn],
        allPointIds: new Set([p1Id, p2Id]),
      });
      continue;
    }

    for (const circuit of circuits) {
      if (!circuit) continue;
      if (circuit.allPointIds.has(p1Id) || circuit.allPointIds.has(p2Id)) {
        madeConnections.add(p1Id);
        madeConnections.add(p2Id);
        circuit.allPointIds.add(p1Id);
        circuit.allPointIds.add(p2Id);
      }
    }
  }

  for (let i = 0; i < circuits.length - 1; i++) {
    if (!circuits[i]) continue;
    for (let j = 0; j < circuits.length; j++) {
      if (i === j) break;
      if (!circuits[j]) continue;

      for (const id of circuits[j]!.allPointIds) {
        if (circuits[i]!.allPointIds.has(id) {
          circuits[j] = { subcircuit1: circuits[i], subcircuit2: circuits[j], allPointIds: new Set([...circuits[i]?.allPointIds, ...circuits[j]?.allPointIds]), pointDistances: [...circuits[i]?.pointDistances, circuits[j]?.pointDistances] };
        })
      }
    }
  }

  console.log(circuits);

  return { product: 0, time: 0 };
};

const calculateDistance = (p1: Point, p2: Point): number => {
  return Math.sqrt(
    (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2,
  );
};

const getConnectionId = (p1: Point, p2: Point) => {
  return [getPointId(p1), getPointId(p2)].toString();
};

const getPointId = (p: Point) => {
  return `${p.x}${p.y}${p.z}`;
};

solvePartOne(11);
