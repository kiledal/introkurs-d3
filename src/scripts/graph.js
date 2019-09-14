import * as d3 from "d3"

const height = 800
const width = 800
const padding = { left: 280, top: 50, right: 60, bottom: 20 }

let svg, canvas, x, y, y2, node

class Graph {
  constructor() {
    this.svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + padding.left + padding.right)
      .attr("height", height + padding.top + padding.bottom)

    this.canvas = this.svg
      .append("g")
      .attr("class", "canvas")
      .attr("transform", `translate(${padding.left}, ${padding.top})`)

    this.xAxis = this.canvas.append("g")
    this.yAxis = this.canvas.append("g")
  }

  overview(data = this.data) {
    this.data = data

    const nestedData = d3
      .nest()
      .key(d => d.bydel)
      .entries(data)
      .sort((a, b) => d3.mean(b.values.map(d => +d.pris)) - d3.mean(a.values.map(d => +d.pris)))

    this.x = d3
      .scaleLinear()
      .range([0, width])
      .domain(d3.extent(data.map(d => +d.pris)))
      .nice()

    const sizeScale = d3
      .scaleSqrt()
      .range([3, 25])
      .domain(d3.extent(data.map(d => +d.omsatte_boliger)))

    this.y2 = d3
      .scaleLinear()
      .range([height, 0])
      .domain(d3.extent(data.map(d => +d.omsatte_boliger)))
      .nice()

    this.y = d3
      .scalePoint()
      .range([height, 0])
      .domain(nestedData.map(d => d.key))
      .padding(1)

    this.xAxis.transition().call(d3.axisTop(this.x))

    this.yAxis.transition().call(d3.axisLeft(this.y).tickSize(-width))
    this.yAxis.select(".domain").remove()
    this.yAxis.selectAll("text").attr("transform", `translate(${-40}, 0)`)
    this.yAxis.selectAll("line").attr("opacity", 0.1)

    this.node = this.canvas
      .selectAll("circle")
      .data(data, d => d.bydel + d.delbydel)
      .join(
        enter => {
          return enter
            .append("circle")
            .attr("cx", d => this.x(d.pris))
            .attr("cy", d => this.y(d.bydel))
        },
        update => update
      )

    this.node
      .transition()
      .duration(1000)
      .attr("r", d => sizeScale(d.omsatte_boliger))
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.65)
      .attr("fill", "transparent")
      .attr("stroke", "steelblue")
      .attr("cx", d => this.x(d.pris))
      .attr("cy", d => this.y(d.bydel))

    this.node.on("click", d => {
      this.details(data.filter(raw => raw.bydel === d.bydel))
    })
  }

  details(subset) {
    this.xAxis.transition().call(d3.axisTop(this.x))
    this.yAxis.transition().call(d3.axisLeft(this.y2).tickSize(-width))

    this.node = this.node
      .data(subset, d => d.bydel + d.delbydel)
      .join(
        enter => enter.append("circle"),
        update => update,
        exit => {
          return exit
            .attr("opacity", 1)
            .transition()
            .duration(500)
            .attr("opacity", 0)
            .attr("r", 0)
            .remove()
        }
      )

    this.node
      .transition()
      .duration(1000)
      .delay(500)
      .attr("r", d => 10)
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.65)
      .attr("fill", "transparent")
      .attr("stroke", "steelblue")
      .attr("cx", d => this.x(d.pris))
      .attr("cy", d => this.y2(d.omsatte_boliger))

    this.node.on("click", () => {
      this.overview()
    })
  }
}

const graph = new Graph()
d3.dsv(";", "/data/boligpriser.csv").then(d => {
  graph.overview(d)
})
