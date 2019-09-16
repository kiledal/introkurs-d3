// 1_02 - Data bindings

/**
 * **What we'll learn**
 * * .data()
 * * enter/update/exit pattern with .enter() .exit()
 * * .join()
 */

import * as d3 from "d3"

const adjektiv = ["beste", "kuleste", "definitivt lengste", "fineste", "meste fantastiske"]

// Select <body>
const body = d3.select("body")

// Create four paragraphs
body.append("p").html("Jeg er det <strong>første</strong> tekstelementet")
body.append("p").html("Jeg er det <strong>tredje</strong> tekstelementet")
body.append("p").html("Jeg er det <strong>første</strong> tekstelementet")
body.append("p").html("Jeg er det <strong>tredje</strong> tekstelementet")
body.append("p").html("Jeg er det <strong>første</strong> tekstelementet")
body.append("p").html("Jeg er det <strong>tredje</strong> tekstelementet")

// Select all paragraphs and change their content
const text = body
  .selectAll("p")
  .data(adjektiv)
  .join("p")
  .text(d => {
    return `Jeg er det ${d} tekstelementet`
  })
