const svgface = d3.select("#d3face");

const height = parseFloat(svgface.attr("height"));
const width = parseFloat(svgface.attr("width"));

const eyeSpacing = 70;
const eyeOffset = 50;
const eyeRadius = 10;
const eyeBrowWidth = 30;
const eyeBrowHeight = 10;
const eyeBrowOffset = 75;

const g = svgface
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`)
  .attr("stroke", "black");

const circle = g
  .append("circle")
  .attr("r", 140)
  .attr("stroke", "black")
  .attr("fill", "#d3face");

const leftEye = g
  .append("circle")
  .attr("r", eyeRadius)
  .attr("cx", -eyeSpacing)
  .attr("cy", -eyeOffset);

const rightEye = g
  .append("circle")
  .attr("r", eyeRadius)
  .attr("cx", eyeSpacing)
  .attr("cy", -eyeOffset);

const leftEyeBrow = g
  .append("rect")
  .attr("x", -eyeSpacing - eyeBrowWidth / 2)
  .attr("y", -eyeBrowOffset)
  .attr("width", eyeBrowWidth)
  .attr("height", eyeBrowHeight);

const RightEyeBrow = g
  .append("rect")
  .attr("x", eyeSpacing - eyeBrowWidth / 2)
  .attr("y", -eyeBrowOffset)
  .attr("width", eyeBrowWidth)
  .attr("height", eyeBrowHeight);

const mouth = g.append("path").attr(
  "d",
  d3.arc()({
    innerRadius: 90,
    outerRadius: 95,
    startAngle: Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
  })
);

g.on("mouseenter", moveEyeBrow.bind(this));

function moveEyeBrow() {
  RightEyeBrow.transition()
    .duration(500)
    .attr("y", -eyeBrowOffset - 20)
    .transition()
    .duration(500)
    .attr("y", -eyeBrowOffset);
}
