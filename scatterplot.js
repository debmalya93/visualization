var curateScatterPlotPane = function(dataX,dataY,labelX,labelY,valueXType,valueYType){
    var dataArray = [];
    for(var i=0;i<dataX.length && i<dataY.length; i++){
        var data ={};
        data.x = dataX[i];
        data.y = dataY[i];
        dataArray.push(data);
    }

    var margin = { top: 40, right: 40, bottom: 100, left: 100 },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select('#mainContainer').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    var g =  svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xscale;
    if(valueXType == "categorical"){
        xscale = d3.scalePoint()
        .domain(dataX)
        .range([0, width]);
    }else{
        xscale = d3.scaleLinear()
         .domain([0, d3.max(dataX)])
        .range([0, width]);
    }
    
    var yscale;
    if(valueYType == "categorical"){
        yscale = d3.scalePoint()
        .domain(dataY)
        .range([height, 0]);
    }else{
        yscale = d3.scaleLinear()
        .domain([0,  d3.max(dataY)])
        .range([height, 0]);
    }

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .style('stroke-width', '2px')
        .call(d3.axisBottom(xscale))
        .append("text")
        .attr("y", height -310)
        .attr("x", width/2)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .text(labelX);

    g.append("g")
        .attr("transform", "translate(0, 0)")
        .style('stroke-width', '2px')
        .call(d3.axisLeft(yscale))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 55)
        .attr("dy", "-5.5em")
        .attr("x", -150)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .text(labelY);

    g.append('g')
    .selectAll("circle")
    .data(dataArray)
    .enter()
    .append("circle")
    .attr('fill-opacity', 0.5)
    .attr("cx", function (d) { return xscale(d.x); } )
    .attr("cy", function (d) { return yscale(d.y); } )
        .attr("r", 1.5)
        .style("fill", "darkblue");

}