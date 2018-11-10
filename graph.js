function createGraph(data) {

    d3.select("#control__variable").text(data.variable);
    d3.select("#control__route").text(data.route);
    d3.select("#control__unit").text(data.unit);
    d3.select("#control__respondants").text(data.values.length);

    const values = data.values;

    let extent = d3.extent(values.flat());
    
    let barScale = d3.scaleLinear()
        .domain(extent)
        .range([innerCircleRadius, barHeight]);

    let numBars = values.length;

    let x = d3.scaleLinear()
        .domain(extent)
        .range([-innerCircleRadius, -barHeight]);

    let xAxis = d3.axisLeft(x)
        .ticks(5);

    // BACKGROUND CIRCLES
    let circles = svg.append("g")
        .classed("circles__wrapper", true);

    svg.select(".circles__wrapper")
        .append("circle")
        .attr("r", barHeight)
        .style("fill", "white");

    svg.select(".circles__wrapper")
        .selectAll("circle")
        .data(x.ticks(5))
        .enter().append("circle")
        .classed("circle__axis", true)
        .attr("r", function (d) { return barScale(d); })
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
        .attr("y1", -innerCircleRadius)
        .attr("y2", function (d, i) { 
            return barScale(-d[1]) - innerCircleRadius * 2; 
        })
        .style("stroke", "#a3a3a3")
        .style("stroke-width", "1px");

    let lineSpan = linesWrapper
        .datum((d) => { return d })
        .append("line")
        .classed("line__span", true)
        .attr("y1", function (d, i) { 
            return barScale(-d[0]) - innerCircleRadius * 2; 
        } )
        .attr("y2", function (d, i) { 
            return barScale(-d[1]) - innerCircleRadius * 2; 
        })
        .style("stroke", "#dddddd")
        .style("stroke-width", "10px")
        .on("mouseover", function (d) { 
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

    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis);

    // DESTINATION
    let circleDestination = svg.append("circle")
        .classed("circle__destination", true)
        .attr("r", innerCircleRadius)
        .style("fill", "white")
        .style("stroke", "none");

    svg.append("image")
        .attr("xlink:href","assets/shenkar_logo.svg")
        .attr("width", innerCircleRadius)
        .attr("height", innerCircleRadius)
        .attr("transform", "translate(" + (-innerCircleRadius / 2) + "," + (-innerCircleRadius / 2) + ")");

    // LABELS
    let labelRadius = barHeight * 1.025;

    let labels = svg.append("g")
        .classed("labels", true);

    labels.append("def")
        .append("path")
        .attr("id", "label-path")
        .attr("d", "m0 " + -labelRadius + " a" + labelRadius + " " + labelRadius + " 0 1,1 -0.01 0");

    /*labels.selectAll("text")
        .data(data)
        .enter().append("text")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("fill", function (d, i) { return "#3e3e3e"; })
        .append("textPath")
        .attr("xlink:href", "#label-path")
        .attr("startOffset", function (d, i) { return i * 100 / numBars + 50 / numBars + '%'; })
        .text(function (d) { return d.toUpperCase(); });*/
}
