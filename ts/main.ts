import * as DayOne from "./day1.ts";
import * as DayTwo from "./day2.ts";
import * as DayThree from "./day3.ts";
import * as DayFour from "./day4.ts";
import * as DayFive from "./day5.ts";
import * as DaySix from "./day6.ts";
import * as DaySeven from "./day7.ts";
import * as DayEight from "./day8.ts";
import * as DayNine from "./day9.ts";

const { hits: d1p1Count, time: d1p1Time } = DayOne.solvePartOne();
console.log(`Day One, Part One - Hits: ${d1p1Count} in ${d1p1Time} ms`);
const { hits: d1p2Count, time: d1p2Time } = DayOne.solvePartTwo();
console.log(`Day One, Part Two - Hits: ${d1p2Count} in ${d1p2Time} ms`);

const { sum: d2p1Count, time: d2p1Time } = DayTwo.solvePartOne();
console.log(`Day Two, Part One - Sum: ${d2p1Count} in ${d2p1Time} ms`);
const { sum: d2p2Count, time: d2p2Time } = DayTwo.solvePartTwo();
console.log(`Day Two, Part Two - Sum: ${d2p2Count} in ${d2p2Time} ms`);

const { sum: d3p1Count, time: d3p1Time } = DayThree.solvePartOne();
console.log(`Day Three, Part One - Sum: ${d3p1Count} in ${d3p1Time} ms`);
const { sum: d3p2Count, time: d3p2Time } = DayThree.solvePartTwo();
console.log(`Day Three, Part Two - Sum: ${d3p2Count} in ${d3p2Time} ms`);

const { sum: d4p1Count, time: d4p1Time } = DayFour.solvePartOne();
console.log(`Day Four, Part One - Sum: ${d4p1Count} in ${d4p1Time} ms`);
const { sum: d4p2Count, time: d4p2Time } = DayFour.solvePartTwo();
console.log(`Day Four, Part Two - Sum: ${d4p2Count} in ${d4p2Time} ms`);

const { sum: d5p1Count, time: d5p1Time } = DayFive.solvePartOne();
console.log(`Day Five, Part One - Sum: ${d5p1Count} in ${d5p1Time} ms`);
const { sum: d5p2Count, time: d5p2Time } = DayFive.solvePartTwo();
console.log(`Day Five, Part Two - Sum: ${d5p2Count} in ${d5p2Time} ms`);

const { sum: d6p1Count, time: d6p1Time } = DaySix.solvePartOne();
console.log(`Day Six, Part One - Sum: ${d6p1Count} in ${d6p1Time} ms`);
const { sum: d6p2Count, time: d6p2Time } = DaySix.solvePartTwo();
console.log(`Day Six, Part Two - Sum: ${d6p2Count} in ${d6p2Time} ms`);

const { count: d7p1Count, time: d7p1Time } = DaySeven.solvePartOne();
console.log(`Day Seven, Part One - Count: ${d7p1Count} in ${d7p1Time} ms`);
const { count: d7p2Count, time: d7p2Time } = DaySeven.solvePartTwo();
console.log(`Day Seven, Part Two - Sum: ${d7p2Count} in ${d7p2Time} ms`);

const { product: d8p1Count, time: d8p1Time } = DayEight.solvePartOne();
console.log(`Day Eight, Part One - Count: ${d8p1Count} in ${d8p1Time} ms`);
const { product: d8p2Count, time: d8p2Time } = DayEight.solvePartTwo();
console.log(`Day Eight, Part Two - Sum: ${d8p2Count} in ${d8p2Time} ms`);

const { area: d9p1Count, time: d9p1Time } = DayNine.solvePartOne();
console.log(`Day Nine, Part One - Are0: ${d9p1Count} in ${d9p1Time} ms`);
