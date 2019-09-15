import * as d3 from "d3"

const url = "https://api.punkapi.com/v2/beers?per_page=80&page=1"

d3.json(url).then(render)

const [w, h] = [800, 600]
const padding = 60

function render(data) {
  console.log(data)
  const svg = d3
    .select("body")
    .append("svg")
    .attr("viewBox", `0 0 ${w + padding + padding} ${h + padding + padding}`)

  var zoom = d3
    .zoom()
    .scaleExtent([1, 40])
    .translateExtent([[-100, -100], [w + 90, h + 100]])
    .on("zoom", zoomed)

  const canvas = svg.append("g").attr("transform", `translate(${padding}, ${padding})`)

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data.map(d => d.target_fg)))
    .range([0, w])
    .nice()

  const xAxis = canvas
    .append("g")
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${h})`)

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data.map(d => d.target_og)))
    .range([h, 0])
    .nice()

  const yAxis = canvas.append("g").call(d3.axisLeft(y))

  const nodes = canvas
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 5)
    .attr("cx", d => x(d.target_fg))
    .attr("cy", d => y(d.target_og))
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.6)

  svg.call(zoom)

  function zoomed() {
    canvas.attr("transform", d3.event.transform)
    xAxis.call(xAxis.scale(d3.event.transform.rescaleX(x)))
    yAxis.call(yAxis.scale(d3.event.transform.rescaleY(y)))
  }
}

const descriptions = {
  attenuation_level: "the greater the attenuation, the more sugar has been converted into alcohol.",
  abv: "Alcohol by volume",
  ebc: "Color measurement. Higher is darker.",
  ibu: "International Bittering Units. Bitterness",
  ph: "Acidity",
  srm: "Standard Reference Method. Color measure.",
  target_fg: "The final gravity is the specific gravity measured at the completion of fermentation",
  target_og: "The original gravity is the specific gravity measured before fermentation"
}
