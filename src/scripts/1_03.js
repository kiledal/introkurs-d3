// 1_03 - Scales

/**
 * **What we'll learn**
 * * .scaleLinear()
 * * .scaleTime()
 * * .scalePow()
 * * .scaleSqrt()
 * * .scalePoint()
 *
 * * .domain()
 * * .range()
 * * .invert()
 */

import * as d3 from "d3"

const erlend = 193
const lego = 4

const scale = d3
  .scaleTime()
  .range([0, 100])
  .domain([new Date("1990-07-16"), new Date("2067-01-17")])

console.log(scale(new Date()))
