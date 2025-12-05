import * as DayOne from "./day1.ts";
import * as DayTwo from "./day2.ts";
import * as DayThree from "./day3.ts";
import * as DayFour from "./day4.ts";

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
