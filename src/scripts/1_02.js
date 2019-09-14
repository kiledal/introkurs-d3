// 1_02 - Databinding

import * as d3 from "d3"

const adjektiv = ["beste", "kuleste", "definitivt lengste"]

const body = d3.select("body")

body.append("p").html("Jeg er det <strong>første</strong> tekstelementet")
body.append("p").html("Jeg er det <strong>andre</strong> tekstelementet")
body.append("p").html("Jeg er det <strong>tredje</strong> tekstelementet")
body.append("p").html("Jeg er det <strong>fjerde</strong> tekstelementet")
