// 1_04 – databehandling

/**
 * * .dsv()
 * * .max()
 * * .min()
 * * .extent()
 * * .mean()
 * * .median()
 *
 */

import * as d3 from "d3"

d3.dsv(";", "data/kommuner.csv").then(list => {
  const max = d3.max(list, d => +d["2019"])
  const mean = d3.mean(list, d => +d["2019"])
  const extent = d3.extent(list, d => +d["2019"])
  console.log(extent)
})
