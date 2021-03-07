var curateHistogramPane = function(data,buckets,xLabel){
    var freqBucket = Array.apply(null, Array(buckets)).map(Number.prototype.valueOf,0);
    var eachIntervalSize = (d3.max(data) - d3.min(data))/buckets;
    data.forEach(function(d){
        freqBucket[Math.floor((d - d3.min(data))/eachIntervalSize)]++;
    });
    var intervals = [];
    
    var start = d3.min(data);
    var end;
    for(var i=0;i<buckets;i++){
        end = (+start + +eachIntervalSize);
        var temp = ((+start + +end)/2).toFixed(1);
        intervals.push(temp);
        start = end;
    }

    var margin = { top: 40, right: 40, bottom: 100, left: 100 },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select('#mainContainer').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    var g =  svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xscale = d3.scaleBand()
        .domain(intervals)
        .range([0, width]);

    var yscale = d3.scaleLinear()
        .domain([0, d3.max(freqBucket)])
        .range([height, 0]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .style('stroke-width', '2px')
        .call(d3.axisBottom(xscale))
        .append("text")
        .attr("y", height -310)
        .attr("x", width/2)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "Times New Roman")
        .attr("font-size", "18px")
        .text(xLabel);

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
        .attr("font-family", "Times New Roman")
        .attr("font-size", "18px")
        .text("Player Counts");

    g.selectAll("rect")
    .data(intervals)
    .enter().append("rect")
    .attr("fill","darkblue" )
    .attr("x", function(d) { return xscale(d); })
    .attr("y", height)
    .attr("height", 0)
    .attr("width", xscale.bandwidth())
    .on("mouseover", showFreq)
    .on("mouseout", revertBack)
    .transition()
    .ease(d3.easeLinear)
    .duration(500)
    .delay(function (d, i) {
        return i * 40;
    })
    .attr("y", function(d, i) { return yscale(freqBucket[i]); })
    .attr("height", function(d, i) { return height - yscale(freqBucket[i]); });

    function showFreq(d, i){
        d3.select(this).attr("fill", "darkred");
        d3.select(this)
            .transition()
            .duration(250)
            .attr("y", function() { return yscale(freqBucket[i]) - 10; })
            .attr("height", function() { return height - yscale(freqBucket[i]) + 10; });

        g.append('text')
            .attr('x', xscale(d))
            .attr('y', yscale(freqBucket[i]) - 10)
            .attr('class', 'freq')
            .attr('fill','darkred' )
            .attr('font-size','20px' )
            .attr('font-family','Times New Roman' )
            .attr('font-weight','bold' )
            .text(function(){
                return +freqBucket[i];
        });

    } 

    function revertBack(d, i){
        d3.select(this).attr("fill", "darkblue");
        d3.select(this)
            .transition()
            .duration(250)
            .attr("y", function() { return yscale(freqBucket[i]); })
            .attr("height", function() { return height - yscale(freqBucket[i]); });
        d3.selectAll('.freq')
            .remove();
        
    } 

}