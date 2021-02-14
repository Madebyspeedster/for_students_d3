const { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom } = d3;

const chart = select("#barChart");
const width = +chart.attr("width");
const height = +chart.attr("height");
const margin = { top: 10, left: 300, right: 10, bottom: 10 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const SOURCE_LINK =
  "https://datahub.io/JohnSnowLabs/population-figures-by-country/r/0.csv";

const renderChart = (data) => {
  const g = chart
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.population)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight - 10])
    .padding(0.1);

  //Add Axies
  g.append("g").call(axisLeft(yScale)).attr("transform", `translate(-1,0)`); // -1 beacause of axis has own width equal 1
  g.append("g")
    .call(axisBottom(xScale))
    .attr("transform", `translate(-1,${innerHeight - 10})`);

  // Add single rect with all necessary elements
  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.country))
    .attr("width", (d) => xScale(d.population))
    .attr("height", yScale.bandwidth())
    .attr("fill", "orange")
    .attr("stroke", "black");
};

csv(SOURCE_LINK)
  .then((data) => {
    const resultData = data.map((element) => ({
      country: element["Country"],
      population: +element["Year_2016"],
    }));
    renderChart(resultData);
  })
  .catch((err) => {
    console.log(err);
  });
