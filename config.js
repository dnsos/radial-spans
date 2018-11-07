console.log('Hello radial spans!');

const width = 960,
    height = 500,
    barHeight = height / 2,
    innerCircleRadius = 20;

const color = d3.scaleOrdinal(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]);

const svg = d3.select('#viz').append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("data/data.json", function (error, data) {
    createGraph(data[0].values);
});