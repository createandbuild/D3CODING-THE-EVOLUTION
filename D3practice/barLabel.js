var data = [80, 110, 56, 120, 18, 30, 40, 180, 160];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / data.length);

var svg2 = d3.selectAll('.bar-label')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var barChart = svg2.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", function(d) {
           return svgHeight - d;
      })
      .attr("height", function(d) {
          return d;
      })
      .attr("width", barWidth - barPadding)
      .attr("class", "bar")
      .attr("transform", function (d, i) {
          var translate = [barWidth * i, 0];
          return "translate("+ translate +")";
      });

var label = svg2.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("y", function(d, i) {
        return svgHeight - d - 2;
    })
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    .attr("fill", "#A64C38");
