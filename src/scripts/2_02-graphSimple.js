import * as d3 from "d3"

const height = 800
const width = 800
const padding = { left: 280, top: 50, right: 60, bottom: 20 }

d3.dsv(";", "/data/boligpriser.csv").then(run)

function run(data) {
  const nestedData = d3
    .nest()
    .key(d => d.bydel)
    .entries(data)
    .sort((a, b) => d3.mean(b.values.map(d => +d.pris)) - d3.mean(a.values.map(d => +d.pris)))

  const x = d3
    .scaleLinear()
    .range([0, width])
    .domain(d3.extent(data.map(d => +d.pris)))
    .nice()

  const size = d3
    .scaleSqrt()
    .range([3, 25])
    .domain(d3.extent(data.map(d => +d.omsatte_boliger)))

  const y = d3
    .scalePoint()
    .range([height, 0])
    .domain(nestedData.map(d => d.key))
    .padding(1)

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + padding.left + padding.right)
    .attr("height", height + padding.top + padding.bottom)

  const canvas = svg
    .append("g")
    .attr("class", "canvas")
    .attr("transform", `translate(${padding.left}, ${padding.top})`)

  canvas.append("g").call(d3.axisTop(x))

  const axisY = canvas.append("g").call(d3.axisLeft(y).tickSize(-width))

  axisY.select(".domain").remove()
  axisY.selectAll("text").attr("transform", `translate(${-40}, 0)`)
  axisY.selectAll("line").attr("opacity", 0.1)

  const node = canvas
    .selectAll("circle")
    .data(data)
    .join("circle")

  node
    .attr("r", d => size(d.omsatte_boliger))
    .attr("stroke-width", 2)
    .attr("stroke-opacity", 0.65)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("cx", d => x(d.pris))
    .attr("cy", d => y(d.bydel))
}
