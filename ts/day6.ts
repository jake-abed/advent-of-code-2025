const rawInput = await Deno.readTextFile("./inputs/day6.txt");
const rows = rawInput.split("\n").map((a) => a.trim()).filter((a) => a !== "");
const partTwoRows = rawInput.split('\n').map(row => row.split('')).slice(0, -1);

const splitRows = rows.map((row) => row.split(' ').filter(a => a !== ''));

export const solvePartOne = (): {sum: bigint, time: number} => {
  const tZero = performance.now();
  let sum = 0n;

  const operandRows = splitRows.slice(0, 4).map((row) => row.map((x) => parseInt(x)));
  const operatorRow = splitRows.at(-1)!;

  for (let i = 0; i < operatorRow.length; i++) {
    const operator = operatorRow[i];
    let res = 0n;

    if (operator === '*') {
      res += BigInt(operandRows[0][i] * operandRows[1][i] * operandRows[2][i] * operandRows[3][i]);
    } else {
      res += BigInt(operandRows[0][i] + operandRows[1][i] + operandRows[2][i] + operandRows[3][i]);
    }
    sum += res;
  }

  const time = performance.now() - tZero;
  return { sum, time: time};
}

export const solvePartTwo = (): {sum: bigint, time: number} => {
  const tZero = performance.now();
  let exit = false
  let sum: bigint = 0n;

  while (!exit) {
    const {res, endFound} = scanForProblem(partTwoRows);
    sum += res;
    exit = endFound;
  }

  const time = performance.now() - tZero;
  return {sum, time};
}

const scanForProblem = (rows: string[][]) => {
  let operatorFound = false;
  let operator: string;
  let res: bigint;
  const operands: bigint[] = [];


  while (!operatorFound) {
    const column = parseColumn(rows);
    operands.push(BigInt(parseInt(column.digits.join(''))));
    
    if (column.operator) {
      operatorFound = true;
      operator = column.operator;
    }
  }

  if (operator! === '+') {
    res = operands.reduce((a, acc) => a + acc, 0n);
  } else {
    res = operands.reduce((a, acc) => a * acc, 1n);
  }

  for (const row of rows) {
    row.pop();
  }

  const endFound = rows[0].length === 0;

  return {res, endFound};
}

type Column = {
  digits: string[];
  operator?: string;
}
const parseColumn = (rows: string[][]): Column => {
  const operator = rows.at(-1)?.pop();
  const digits: string[] = [];

  for (const row of rows.slice(0, -1)) {
    digits.push(row.pop()!);
  }

  return { operator: operator === ' ' ? undefined : operator, digits }
}

