import * as d3 from 'd3';

function render() {
  //let graph = d3.forceSimulation()

  //d3.select("body")
  //.append(graph)
  //.attr("viewBox", [-100, -100, 200, 200])
  //.style("font", "12px sans-serif");


  //svg.append("rect")
  //.attr("fill", "red")
  //.attr("x", 10)
  //.attr("y", 20)
  //.attr("height", 20)
  //.attr("width", 10)

  //console.log(svg.text())

  //let body = document.getElementsByTagName('body')[0]
  //if (body) {
  //let svgNode = svg.node()
  //if (svgNode) {
  //body.appendChild(svgNode)
  //}
  //}
  //
  d3.select("body")
    .selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .enter().append("p")
    .text(function (d) {return "I’m number " + d + "!";});
}

export = render;
