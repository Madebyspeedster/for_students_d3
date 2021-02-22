const { select, geoAlbersUsa, geoPath, scaleLinear } = d3;

const _svgContainer = select("#usaMap");

const WIDTH = +_svgContainer.attr("width");
const HEIGHT = +_svgContainer.attr("height");

const projection = geoAlbersUsa()
  .translate([WIDTH / 2, HEIGHT / 2])
  .scale(1000);

const path = geoPath(projection);

_svgContainer
  .selectAll("path")
  .data(_states.features)
  .enter()
  .append("path")
  .attr("d", path)
  .style("stroke", "#fff")
  .style("stroke-width", "1")
  .style("fill", "rgb(49, 130, 189)");
