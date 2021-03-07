
var crossing = [];
var finishing = [];
var headingAccuracy = [];
var shortPassing = [];
var age = [];
var preferredFoot = [];
var intReputation = [];
var skillMove = [];
var height = [];
var weight = [];
var workRate=[];
var dribbling = [];
var sprintSpeed = [];
var agility = []
var jumping = [];
var strength = [];
var vision = [];
var aggression = [];
var weakFoot = [];


var startX;
var defNoOfBins = 15;
document.addEventListener("mousedown",function(event){
    startX = event.pageX;
});

document.addEventListener("mouseup",function(event){
    var diffX = event.pageX - startX;
    var selectedChart = document.getElementById("selectedChart").innerHTML;
    var xLabel = document.getElementById("selectedChartXLabel").innerHTML;
    if(selectedChart == "age" || 
            selectedChart == "headingAccuracy" || selectedChart == "shortPassing" ||
            selectedChart == "height" || selectedChart == "weight" ||
            selectedChart == "dribbling" || selectedChart == "sprintSpeed" ||
            selectedChart == "jumping" || selectedChart == "vision" ||
            selectedChart == "finishing"){
                if(diffX < 0){
                    if(defNoOfBins + 3 < 20){
                        defNoOfBins+=3;
                        visualizeByHistogram(selectedChart,xLabel);
                    }
                }else if(diffX > 0){
                    if(defNoOfBins - 3 > 3){
                        defNoOfBins-=3;
                        visualizeByHistogram(selectedChart,xLabel);
                    }
                }
    }
});

//https://www.kaggle.com/chaitanyahivlekar/fifa-19-player-dataset
d3.csv("FIFA19.csv", function(data) {
    data.map(function (d) {
        //numerical data
        finishing.push(+d.Finishing);
        headingAccuracy.push(+d.HeadingAccuracy);
        shortPassing.push(+d.ShortPassing);
        age.push(+d.Age);
        height.push(+(d.Height.replace("'",".")));
        weight.push(+(d.Weight.replace("lbs","")));
        dribbling.push(+d.Dribbling);
        sprintSpeed.push(+d.SprintSpeed);
        jumping.push(+d.Jumping);
        vision.push(+d.Vision);
        //categorical data
        weakFoot.push(+d['Weak Foot']);
        preferredFoot.push(d['Preferred Foot']);
        intReputation.push(+d['International Reputation']);
        skillMove.push(+d['Skill Moves']);
        workRate.push(d['Work Rate']);
    });
    curateHistogramPane(age,defNoOfBins,"Age (yrs.)");
    document.getElementById("selectedChart").innerHTML="age";
    document.getElementById("selectedChartXLabel").innerHTML = "Age (yrs.)";
    for(var i=0;i<=15;i++){
        document.getElementsByTagName("a")[i].style.backgroundColor = "rgb(13, 13, 129)";
    }
    document.getElementById("age").style.backgroundColor = "rgb(57, 57, 226)";
});
var valueX;
var valueY;
var labelX;
var labelY;
var valueXType; 
var showInputBox = function(){
    document.getElementById("scatterPlotInput").style.display = "block";
    document.getElementById("mainContainer").innerHTML = "";
    document.getElementById("selectedChart").innerHTML = "scatterPlot";
    
    for(var i=0;i<=15;i++){
        document.getElementsByTagName("a")[i].style.backgroundColor = "rgb(13, 13, 129)";
    }
    document.getElementById("scatterPlot").style.backgroundColor = "rgb(57, 57, 226)";
    document.getElementById("scatterPlot").style.color = "white";
    document.getElementById("scatterPlot").style.textDecoration = "none";
}
var drawScatterPlot = function(){
    document.getElementById("mainContainer").innerHTML = "";
    document.getElementById("selectedChart").innerHTML = "scatterPlot";
    var axis = $('input:radio[name=axisRadio]:checked').val();
    var newValue = $("#val1 :selected").val();
    var newlabel = $("#val1 :selected").text();
    var newValueType;
    if(newValue == "preferredFoot" || newValue =="intReputation"
        || newValue == "workRate" || newValue == "weakFoot" || 
        newValue == "skillMove"){
            newValueType = "categorical";
    }else{
        newValueType = "numerical";
    }
    if(axis == "axisx"){
        valueX = newValue;
        labelX = newlabel;
        valueXType = newValueType;
    }else{
        valueY = newValue;
        labelY = newlabel;
        valueYType = newValueType;
    }
    if(valueX!=null && valueY!=null){
        curateScatterPlotPane(eval(valueX),eval(valueY),labelX,labelY,valueXType,valueYType);
    }
    
}

var visualizeByHistogram = function(dataArrayName,xLabelName){
    document.getElementById("selectedChart").innerHTML = dataArrayName;
    document.getElementById("selectedChartXLabel").innerHTML = xLabelName;
    document.getElementById("scatterPlotInput").style.display = "none";
    document.getElementById("mainContainer").innerHTML = "";
    curateHistogramPane(eval(dataArrayName),defNoOfBins,xLabelName);

    for(var i=0;i<=15;i++){
        document.getElementsByTagName("a")[i].style.backgroundColor = "rgb(13, 13, 129)";
    }
    document.getElementById(dataArrayName).style.backgroundColor = "rgb(57, 57, 226)";
    document.getElementById(dataArrayName).style.color = "white";
    document.getElementById(dataArrayName).style.textDecoration = "none";
}

var visualizeByBarchart = function(dataArrayName,xLabelName){
    document.getElementById("selectedChart").innerHTML = dataArrayName;
    document.getElementById("selectedChartXLabel").innerHTML = xLabelName;
    document.getElementById("scatterPlotInput").style.display = "none";
    document.getElementById("mainContainer").innerHTML = "";
    curateBarChartPane(eval(dataArrayName),xLabelName);

    for(var i=0;i<=15;i++){
        document.getElementsByTagName("a")[i].style.backgroundColor = "rgb(13, 13, 129)";
    }
    document.getElementById(dataArrayName).style.backgroundColor = "rgb(57, 57, 226)";
    document.getElementById(dataArrayName).style.color = "white";
    document.getElementById(dataArrayName).style.textDecoration = "none";
}



