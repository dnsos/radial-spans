function initGraph(data) {

    const values = data.values;

    let numBars = values.length;

    // LABELS
    let labelRadius = barHeight * 1.025;

    let labels = svg.append("g")
        .classed("labels", true);

    labels.append("def")
        .append("path")
        .attr("id", "label-path")
        .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");

    labels.selectAll("text")
        .data(values)
        .enter().append("text")
        .attr("class", (d, i) => {
            return "label__" + i;
        })
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "normal")
        .style("fill", function (d, i) { return "rgb(184, 18, 20)"; })
        .append("textPath")
        .attr("xlink:href", "#label-path")
        .attr("startOffset", function (d, i) { return i * 100 / numBars + 5 / numBars + '%'; })
        .text(function (d, i) { return "R" + (i + 1); });

    // BACKGROUND CIRCLES
    let circles = svg.append("g")
        .classed("circles__wrapper", true);

    svg.select(".circles__wrapper")
        .selectAll("circle")
        .data([1,2,3,4,5,6])
        .enter().append("circle")
        .classed("circle__axis", true)
        .attr("r", innerCircleRadius)
        .style("fill", "none")
        .style("stroke", "#dddddd")
        .style("stroke-dasharray", "5,5")
        .style("stroke-width", "1px");

    // LINES
    let linesWrapper = svg.selectAll("lines__wrapper")
        .data(values)
        .enter().append("g")
        .classed("lines__wrapper", true)
        .attr("transform", function (d, i) { return "rotate(" + (i * 360 / numBars) + ")"; });

    let lineDistance = linesWrapper
        .datum((d) => { return d })
        .append("line")
        .classed("line__distance", true)
        .style("stroke", "#a3a3a3")
        .style("stroke-width", "1px");

    let lineSpan = linesWrapper
        .datum((d) => { return d })
        .append("line")
        .classed("line__span", true)
        .style("stroke", "#dddddd")
        .style("stroke-width", "12px")
        .on("mouseover", function (d, i) { 
            
            d3.select("label__" + i).style("font-weight", "bold");
            console.log(d3.select(".label__" + i));
            
            d3.select(this)
                .transition()
                .duration(200)
                //.attr("y1", -innerCircleRadius)
                .style("stroke", "#b81214"); 
        })
        .on("mouseout", function (d) { 
            d3.select(this)
                .transition()
                .duration(200)
                //.attr("y1", barScale(-d[0]) - innerCircleRadius * 2)
                .style("stroke", "#dddddd"); 
        });

    // DESTINATION
    svg.append("circle")
        .classed("circle__destination", true)
        .attr("r", innerCircleRadius)
        .style("fill", "white")
        .style("stroke", "none");

    svg.append("image")
        .attr("xlink:href","assets/shenkar_logo.svg")
        .attr("width", innerCircleRadius)
        .attr("height", innerCircleRadius)
        .attr("transform", "translate(" + (-innerCircleRadius / 2) + "," + (-innerCircleRadius / 2) + ")");

    // AXIS
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,-7)");
}

function applyData(data) {

    d3.select("#control__variable").text(data.variable);

    const values = data.values;

    let extent = d3.extent(values.flat());

    let barScale = d3.scaleLinear()
        .domain(extent)
        .range([innerCircleRadius, barHeight]);

    let x = d3.scaleLinear()
        .domain(extent)
        .range([-innerCircleRadius, -barHeight]);

    let xAxis = d3.axisLeft(x)
        .ticks(5)
        .tickFormat((d) => { return d + " " + data.unit});

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
    
    svg.select(".x")
        .transition()
        .duration(700)
        .call(xAxis);
}
