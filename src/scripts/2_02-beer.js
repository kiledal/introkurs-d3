import * as d3 from "d3"

d3.json("/data/beers.json").then(render)

function render(data) {
  console.log(data)
  const [w, h] = [800, 600]
  const padding = 60

  const svg = d3
    .select("body")
    .append("svg")
    .attr("viewBox", `0 0 ${w + padding + padding} ${h + padding + padding}`)

  const canvas = svg.append("g").attr("transform", `translate(${padding}, ${padding})`)
}

// const dataSource = "https://api.punkapi.com/v2/beers?per_page=80&page=1"

/*
const keyDescriptions = {
  attenuation_level: "the greater the attenuation, the more sugar has been converted into alcohol.",
  abv: "Alcohol by volume",
  ebc: "Color measurement. Higher is darker.",
  ibu: "International Bittering Units. Bitterness",
  ph: "Acidity",
  srm: "Standard Reference Method. Color measure.",
  target_fg: "The final gravity is the specific gravity measured at the completion of fermentation",
  target_og: "The original gravity is the specific gravity measured before fermentation"
}
*/
