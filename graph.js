function createGraph(data) {

    console.log(data);

    let extent = d3.extent(data, function (d, i) { return d[i]; });
    console.log(extent);

    extent = [0,50];

    console.log(extent);
    
    
    let barScale = d3.scaleLinear()
        .domain(extent)
        .range([innerCircleRadius, barHeight]);

    let numBars = data.length;

    let x = d3.scaleLinear()
        .domain(extent)
        .range([-innerCircleRadius, -barHeight]);

    let xAxis = d3.axisLeft(x)
        .ticks(5);

    let circles = svg.selectAll("circle")
        .data(x.ticks(5))
        .enter().append("circle")
        .attr("r", function (d) { return barScale(d); })
        .style("fill", "none")
        .style("stroke", "white")
        .style("stroke-dasharray", "5,5")
        .style("stroke-width", "1px");

    svg.append("circle")
        .attr("r", barHeight)
        .classed("outer", true)
        .style("fill", "none")
        .style("stroke", "white")
        .style("stroke-width", "1.5px");

    let lines = svg.selectAll("line")
        .data(data)
        .enter().append("line")
        .attr("y1", function (d, i) { 
            return barScale(-d[0]) - innerCircleRadius * 2; 
        } )
        .attr("y2", function (d, i) { 
            return barScale(-d[1]) - innerCircleRadius * 2; 
        })
        .style("stroke", "#dddddd")
        .style("stroke-width", "6px")
        .attr("transform", function (d, i) { return "rotate(" + (i * 360 / numBars) + ")"; })
        .on("mouseover", function (d) { 
            d3.select(this).attr("y1", -innerCircleRadius);
            d3.select(this).style("stroke", "#a3a3a3"); 
        })
        .on("mouseout", function (d) { 
            d3.select(this).attr("y1", barScale(-d[0]) - innerCircleRadius * 2);
            d3.select(this).style("stroke", "#dddddd"); 
        });

    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis);

    // Labels
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
