var margin = {top: 20, bottom: 30, left: 40, right: 20},
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var bodyStructure = d3.select(".body-structure")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("assets/data/body-structure.csv", function(error, data) {
  data.forEach(function(d) {
      d.stage = +(d.stage);
      d.human = +(d.human);
      d.humanoid = +(d.humanoid);
  });

  if (error) throw error;

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var valueline = d3.line()
      .x(function(d) { return x(d.stage); })
      .y(function(d) { return y(d.human); });

  var valueline2 = d3.line()
    .x(function(d) { return x(d.stage); })
    .y(function(d) { return y(d.humanoid); });

  x.domain(d3.extent(data, function(d) { return d.stage; }));
  y.domain([d3.min(data, function(d) { return Math.min(d.humanoid, d.human); }), d3.max(data, function(d) { return Math.max(d.humanoid, d.human); })]);

  bodyStructure.append("path")
      .data([data])
      .attr("class", "line3a")
      .attr("d", valueline);

  bodyStructure.append("path")
      .data([data])
      .attr("class", "line3b")
      .attr("d", valueline2);

  bodyStructure.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  bodyStructure.append("text")
      .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top) + ")")
      .attr("class", "label")
      .style("text-anchor", "middle")
      .text("Stages");

  bodyStructure.append("g")
      .call(d3.axisLeft(y));

  bodyStructure.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 50 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "label")
      .style("text-anchor", "middle")
      .text("Body Structure");
});
