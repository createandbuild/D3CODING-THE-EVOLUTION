var margin = {top: 20, bottom: 30, left: 40, right: 20},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var size = d3.select(".size")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("assets/data/size.csv", function(error, data) {
  var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
  var y = d3.scaleLinear()
          .range([height, 0]);

  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.sales = +d.sales;
});

// Scale the range of the data in the domains
x.domain(data.map(function(d) { return d.salesperson; }));
y.domain([0, d3.max(data, function(d) { return d.sales; })]);

// append the rectangles for the bar chart
size.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.salesperson); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.sales); })
    .attr("height", function(d) { return height - y(d.sales); });

// add the x Axis
size.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// add the y Axis
size.append("g")
    .call(d3.axisLeft(y));

});













// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var movement = d3.select(".movement")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("assets/data/movement.csv", function(error, data) {
  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });

  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
  });

  // scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // add the valueline path.
  movement.append("path")
     .data([data])
     .attr("class", "line")
     .attr("d", valueline);

  // add the dots
  movement.selectAll("dot")
     .data(data)
     .enter().append("circle")
       .attr("r", 5)
       .attr("cx", function(d) { return x(d.date); })
       .attr("cy", function(d) { return y(d.close); });

  // add the X Axis
  movement.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the Y Axis
  movement.append("g")
      .call(d3.axisLeft(y));

});
