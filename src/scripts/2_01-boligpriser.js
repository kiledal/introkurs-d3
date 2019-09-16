import * as d3 from "d3"

const height = 800
const width = 800
const padding = { left: 280, top: 50, right: 60, bottom: 20 }

d3.dsv(";", "/data/boligpriser.csv").then(run)

function run(data) {}
