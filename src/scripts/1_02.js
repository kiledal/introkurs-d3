// 1_02 - Data bindings

/**
 * **What we'll learn**
 * * .data()
 * * enter/update/exit pattern with .enter() .exit()
 * * .join()
 */

import * as d3 from 'd3'

// Select <body>
const body = d3.select('body')

// Create four paragraphs
body.append('p').html('Jeg er det <strong>første</strong> tekstelementet')
body.append('p').html('Jeg er det <strong>andre</strong> tekstelementet')
body.append('p').html('Jeg er det <strong>tredje</strong> tekstelementet')
body.append('p').html('Jeg er det <strong>fjerde</strong> tekstelementet')

// Select all paragraphs and change their content

//
