// 1_04 – databehandling

/**
 * * .max()
 * * .min()
 * * .extent()
 * * .mean() .median() .mode()
 *
 */

import * as d3 from "d3"

const arr = [
  new Date("1968-01-01"),
  new Date("1985-05-21"),
  new Date("1981-05-21"),
  new Date("1988-04-12"),
  new Date("1978-10-30")
]

const parseTime = d3.utcParse("%Q")
const formatTime = d3.timeFormat("%d %B %Y")

const avgDate = parseTime(d3.mean(arr))

console.log(formatTime(avgDate))
