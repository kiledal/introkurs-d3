// 1_01 - Selections

/**
 * **What we'll learn**
 * * .select()
 * * .selectAll()
 * * .node()
 * * .append()
 * * .text() and .html()
 */

import * as d3 from "d3"

const body = d3.select("body")

body.append("p")
body.append("p")
body.append("p")

d3.selectAll("p").text((d, i) => {
  console.log(d)
})
