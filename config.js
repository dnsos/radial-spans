const width = 750,
    height = 500,
    barHeight = height / 2,
    innerCircleRadius = 40;

const color = d3.scaleOrdinal(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]);

const svg = d3.select('.g-viz').append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("data/data.json", function (error, data) {

    let selector = d3.select("#selector__variable")
        .on("change", onChange);

    selector
        .selectAll(".selector__option")
        .data(data)
        .enter().append("option")
        .classed("selector__option", true)
        .text((d) => { return d.variable; });

    initGraph(data[0]);

    function onChange() {
        let selectedValue = d3.select("#selector__variable").property("value")

        let selectedIndex = data.findIndex(d => d.variable == selectedValue);

        d3.select(".selector__option--default").attr("disabled", true);

        updateData(data[selectedIndex]);
    }
});