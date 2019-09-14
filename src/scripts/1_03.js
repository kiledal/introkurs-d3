// 1_03 - Scales

import * as d3 from "d3"

const actualHeight = 185 // cm

const scale = d3
  .scaleTime()
  .domain([new Date("1990-07-16"), new Date("2105-05-17")])
  .range([0, 600])

console.log(scale(new Date()))
