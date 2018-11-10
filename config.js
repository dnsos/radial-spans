const width = 750,
    height = 500,
    barHeight = height / 2,
    innerCircleRadius = 40;

const color = d3.scaleOrdinal(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]);

const svg = d3.select('#viz').append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("data/data.json", function (error, data) {

    let selector = d3.select("#selector__variable")
        .on("change", onChange);

    selector
        .selectAll("option")
        .data(data)
        .enter().append("option")
        .text((d) => { return d.variable; });

    createGraph(data[0]);

    function onChange() {
        let selectedValue = d3.select("#selector__variable").property("value")

        let selectedIndex = data.findIndex(d => d.variable == selectedValue);

        updateData(data[selectedIndex]);
    }
});

function updateData(data) {

    d3.select("#control__variable").text(data.variable);
    d3.select("#control__route").text(data.route);
    d3.select("#control__unit").text(data.unit);
    d3.select("#control__respondants").text(data.values.length);

    const values = data.values;

    let extent = d3.extent(values.flat());

    let barScale = d3.scaleLinear()
        .domain(extent)
        .range([innerCircleRadius, barHeight]);

    let x = d3.scaleLinear()
        .domain(extent)
        .range([-innerCircleRadius, -barHeight]);

    let xAxis = d3.axisLeft(x)
        .ticks(5);

    svg.selectAll(".circle__axis")
        .data(x.ticks(5))
        .transition()
        .duration(700)
        .attr("r", function (d) { return barScale(d); })

    d3.selectAll(".line__distance")
        .data(data.values)
        .transition()
        .duration(700)
        .attr("y1", -innerCircleRadius)
        .attr("y2", function (d, i) {
            return barScale(-d[1]) - innerCircleRadius * 2;
        });

    d3.selectAll(".line__span")
        .data(data.values)
        .transition()
        .duration(700)
        .attr("y1", function (d, i) {
            return barScale(-d[0]) - innerCircleRadius * 2;
        })
        .attr("y2", function (d, i) {
            return barScale(-d[1]) - innerCircleRadius * 2;
        });
}