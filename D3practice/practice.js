var data = [80, 110, 56, 120, 18, 30, 40, 180, 160];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / data.length);

var svg1 = d3.selectAll('.bar-chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var barChart1 = svg1.selectAll("rect")
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

var svg2 = d3.selectAll('.bar-label')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var barChart2 = svg2.selectAll("rect")
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

var svg3 = d3.selectAll('.bar-scale')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgHeight]);

var barChart3 = svg3.selectAll("rect")
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

var svg4 = d3.selectAll('.axes')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var xScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgWidth]);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([svgHeight, 0]);

var x_axis = d3.axisBottom()
    .scale(xScale);

var y_axis = d3.axisLeft()
    .scale(yScale);

svg4.append("g")
    .attr("transform", "translate(50, 10)")
    .call(y_axis);

var xAxisTranslate = svgHeight - 20;

svg4.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate + ")")
    .call(x_axis);

var svgWidth = 600, svgHeight = 500;

var svg5 = d3.select(".svgElement")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "svg-container");

var line = svg5.append("line")
    .attr("x1", 100)
    .attr("x2", 500)
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "red")
    .attr("stroke-width", 5);

var rect = svg5.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("width", 200)
    .attr("height", 100)
    .attr("fill", "#9B95FF");

var circle = svg5.append("circle")
    .attr("cx", 200)
    .attr("cy", 300)
    .attr("r", 80)
    .attr("fill", "#7CE8D5")

var data = [
    {"platform": "Android", "percentage": 40.11},
    {"platform": "Windows", "percentage": 36.69},
    {"platform": "iOS", "percentage": 13.06}
];

var svgWidth = 500, svgHeight = 300, radius =  Math.min(svgWidth, svgHeight) / 2;
var svg6 = d3.select('.pie-chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var g = svg6.append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")") ;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var pie = d3.pie().value(function(d) {
     return d.percentage;
});

var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

var arc = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g");

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.percentage); });

var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

arc.append("text")
    .attr("transform", function(d) {
        return "translate(" + label.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.data.platform+":"+d.data.percentage+"%"; });

const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';

// loading data from API when DOM Content has been loaded
document.addEventListener("DOMContentLoaded", function(event) {
  fetch(api)
      .then(function(response) { return response.json(); })
      .then(function(data) {
        var parsedData = parseData(data);
        drawChart(parsedData);
      })
      .catch(function(err) { console.log(err); })
});
function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push({
            date: new Date(i), //date
            value: +data.bpi[i] //convert string to number
        });
    }
    return arr;
}

// Creates a chart using D3 @param {object} data Object containing historical data of BPI
function drawChart(data) {
var svgWidth = 600, svgHeight = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg7 = d3.select('.line-chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var g = svg7.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date)})
    .y(function(d) { return y(d.value)})
    x.domain(d3.extent(data, function(d) { return d.date }));
    y.domain(d3.extent(data, function(d) { return d.value }));

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

g.append("g") //creates the y-axis
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

g.append("path")  //draws the line chart
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}
