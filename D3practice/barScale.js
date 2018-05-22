var data = [1, 5, 3, 4, 8, 7, 2];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / data.length);

var svg = d3.selectAll('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgHeight]);

var barChart = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", function(d) {
         return svgHeight - yScale(d);
    })
    .attr("height", function(d) {
        return yScale(d);
    })
    .attr("width", barWidth - barPadding)
    .attr("class", "bar")
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0];
        return "translate("+ translate +")";
    });
