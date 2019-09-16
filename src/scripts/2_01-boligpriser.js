import * as d3 from "d3"

const height = 400
const width = 500
const padding = { left: 180, top: 50, right: 60, bottom: 20 }

d3.dsv(";", "/data/boligpriser.csv").then(run)

function run(data) {
  const svg = d3
    .select("body")
    .append("svg")
    .attr("tabindex", 0)

  svg.attr("height", height + padding.top + padding.bottom).attr("width", width + padding.left + padding.right)

  const canvas = svg.append("g").attr("transform", `translate(${padding.left}, ${padding.top})`)

  const nestedData = d3
    .nest()
    .key(d => d.bydel)
    .entries(data)
    .sort((a, b) => d3.median(b.values.map(d => +d.pris)) - d3.median(a.values.map(d => +d.pris)))

  const y = d3
    .scalePoint()
    .range([height, 0])
    .domain(nestedData.map(d => d.key))
    .padding(1)

  console.log(y.step())

  const size = d3
    .scaleSqrt()
    .range([0, y.step() / 2])
    .domain(d3.extent(data.map(d => +d.omsatte_boliger)))

  canvas.append("g").call(d3.axisLeft(y).tickSize(-width))

  const x = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data.map(d => +d.pris)))
    .nice()

  console.log(x.invert(80))

  const xAxis = canvas.append("g").call(d3.axisTop(x).tickFormat(d3.format("~s")))

  xAxis.selectAll(".tick text").attr("transform", (d, i) => {
    return `translate(0, ${i % 2 ? -20 : 0})`
  })

  xAxis.selectAll(".tick line").attr("y2", (d, i) => {
    return i % 2 ? -26 : -6
  })

  const nodes = canvas
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", d => size(+d.omsatte_boliger))
    .attr("fill", "transparent")
    .attr("stroke", "steelblue")
    .attr("cx", d => x(+d.pris))
    .attr("cy", d => y(d.bydel))
    .attr("tabindex", 0)

  nodes.on("click", function(d, i, j) {
    console.dir(this.__data__)
    console.log(d)
  })

  canvas.select(".domain").remove()
}
