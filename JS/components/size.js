var margin = {top: 20, bottom: 30, left: 40, right: 20},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

var size = d3.select(".size")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("assets/data/size.csv", function(error, data) {
  if(error) throw error;
  data.forEach(function(d) {
    d.sales = +d.sales;
  });

  x.domain(data.map(function(d) { return d.salesperson; }));
  y.domain([0, d3.max(data, function(d) { return d.sales; })]);

  size.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.salesperson); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.sales); })
      .attr("height", function(d) { return height - y(d.sales); });

  size.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // svg.append("text")
  //     .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
  //     .style("text-anchor", "middle")
  //     .text("Height");

  size.append("g")
      .call(d3.axisLeft(y));
  //
  // svg.append("text")
  //       .attr("transform", "rotate(90)")
  //       .attr("y", 0 - margin.left)
  //       .attr("x",0 - (height / 2))
  //       .attr("dy", "1em")
  //       .style("text-anchor", "middle")
  //       .text("Stage");
})
