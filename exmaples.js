var sw = true
var X = XLSX;
var XW = {
  msg: 'xlsx',
};
var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

var wtf_mode = false;

function fixdata(data) {
  var o = "", l = 0, w = 10240;
  for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
  o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
  return o;
}

function ab2str(data) {
  var o = "", l = 0, w = 10240;
  for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint16Array(data.slice(l*w,l*w+w)));
  o+=String.fromCharCode.apply(null, new Uint16Array(data.slice(l*w)));
  return o;
}

function s2ab(s) {
  var b = new ArrayBuffer(s.length*2), v = new Uint16Array(b);
  for (var i=0; i != s.length; ++i) v[i] = s.charCodeAt(i);
  return [v, b];
}

function xw_noxfer(data, cb) {
  var worker = new Worker(XW.noxfer);
  worker.onmessage = function(e) {
    switch(e.data.t) {
      case 'ready': break;
      case 'e': console.error(e.data.d); break;

    }
  };
  var arr = rABS ? data : btoa(fixdata(data));
  worker.postMessage({d:arr,b:rABS});
}

function xw_xfer(data, cb) {
  var worker = new Worker(rABS ? XW.rABS : XW.norABS);
  worker.onmessage = function(e) {
    switch(e.data.t) {
      case 'ready': break;
      case 'e': console.error(e.data.d); break;
      default: xx=ab2str(e.data).replace(/\n/g,"\\n").replace(/\r/g,"\\r"); console.log("done");  break;

    }
  };
  if(rABS) {
    var val = s2ab(data);
    worker.postMessage(val[1], [val[1]]);
  } else {
    worker.postMessage(data, [data]);
  }
}

function xw(data, cb) {

  if(transferable) xw_xfer(data, cb);
  else xw_noxfer(data, cb);
}

function get_radio_value( radioName ) {
  var radios = document.getElementsByName( radioName );
  for( var i = 0; i < radios.length; i++ ) {
    if( radios[i].checked || radios.length === 1 ) {
      return radios[i].value;
    }
  }
}


function to_csv(workbook) {
  var result = [];
  workbook.SheetNames.forEach(function(sheetName) {
    var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    if(csv.length > 0){
      result.push("SHEET: " + sheetName);
      result.push("");
      result.push(csv);
      if (sw){
        initChart_custom(csv)
        sw=false
      }
    }
  });
  return result.join("\n");
}

function to_formulae(workbook) {
  var result = [];
  workbook.SheetNames.forEach(function(sheetName) {
    var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
    if(formulae.length > 0){
      result.push("SHEET: " + sheetName);
      result.push("");
      result.push(formulae.join("\n"));

    }
  });
  return result.join("\n");
}



function process_wb(wb) {
  var output = "";
  switch(get_radio_value("format")) {

    case "form":
      output = to_formulae(wb);
      break;
    default:
    output = to_csv(wb);
    console.log(output)
  }
  if(out.innerText === undefined) out.textContent = output;
  else out.innerText = output;
  if(typeof console !== 'undefined') console.log("output", new Date());
}

var xlf = document.getElementById('xlf');
function handleFile(e) {

  var files = e.target.files;
  var f = files[0];
  {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      if(typeof console !== 'undefined') console.log("onload", new Date(), rABS);
      var data = e.target.result;

        if(rABS) {
          wb = X.read(data, {type: 'binary'});	}
          else {
        var arr = fixdata(data);
          wb = X.read(btoa(arr), {type: 'base64'});
        }
        process_wb(wb);
      }
    };
    if(rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  }


if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

Chart.types.Line.extend({
    name: "LineAlt",
    highlightPoints: function(datasetIndex, pointIndexArray){
        var activePoints = [];
        // var activePoints_2 = [];
        var points = this.datasets[datasetIndex].points;
        for(i in pointIndexArray){
        	if(points[pointIndexArray[i]]){
          	activePoints.push(points[pointIndexArray[i]]);
          }
          //mostrar siguiente punto seleccionado
          // if(points[pointIndexArray[i]+1]){
          // 	activePoints_2.push(points[pointIndexArray[i]+1]);
          // }
         }
        //mostrar puntos activos en input
        $("#if_a").val(activePoints[0].value)
        $("#if_b").val(activePoints[0].label)

        change_values()
        this.showTooltip(activePoints);
        }

});
var result1 = null
var result2 = null
var result3 = null
var result4 = null
var result5 = null
function initChart_custom(data) {
  var data_new = data.split(/\n/)
  var c_1 = []
  var c_2 = []
  data_new.forEach(function(data_f){
    data_c = data_f.split(",");
    c_1.push(data_c[1]);
    c_2.push(data_c[0]);
  })
  c_1 = c_1.slice(1,c_1.length-1)
  c_2 = c_2.slice(1,c_2.length-1)
  var lineChartData = {
      "datasets": [{
          "data": c_1,
              "pointStrokeColor": "#1A81C5",
              "fillColor": "rgba(254, 254, 254, 0.4)",
              "pointColor": "#1A81C5",
              "strokeColor": "#5D9CC6"
      }],
          "labels": c_2,
  };

//mostrar interseccion de valor (x)

    var a = c_2
    var elem_want= parseFloat(document.getElementById('if_b').value);
    var element_find = {}
    a.find(function(element,index){
      element = parseFloat(element)
      if (index<a.length-1){
        if (element<=elem_want && a[index+1]>=elem_want){
          element_find = {
            e_i: element,
            index_i: index,
            e_f: a[index+1],
            index_f: index+1
          }
          return true;
        }
      }
    })
    // alert("elemento 1 c_1 inferior: "+ c_1[element_find.index_i]+"elemento 1 c_2 inferior: "+ c_2[element_find.index_i] +
    // "\n" + "elemento 2 c_1 superior: "+ c_1[element_find.index_f]+"elemento 2 c_2 superior: "+ c_2[element_find.index_f])

      result1=(c_1[element_find.index_f] - c_1[element_find.index_i]);
      result2=(c_2[element_find.index_f] - c_2[element_find.index_i]);
      result3=(result1/result2);
      result4=(result3*result2);
      result5= ((c_1[element_find.index_f]) * (result4));
      //alert(result5.toFixed(3));

  var options = {showTooltips: true};
  var myLine = new Chart(document.getElementById("canvas").getContext("2d")).LineAlt(lineChartData, options);
  var highlight = function(index){
  	myLine.highlightPoints(0, [index]);
  }
  $("#slider").slider({
    max: lineChartData.datasets[0].data.length-1,
    slide: function( event, ui ) { highlight(ui.value); },
  });
}

Chart.types.Radar.extend({
    name: "RadarAlt",
    initialize: function (data) {
        Chart.types.Radar.prototype.initialize.apply(this, arguments);

        var originalScaleDraw = this.scale.draw;
        var ctx = this.chart.ctx;
        this.scale.draw = function () {
            var lineWidth = this.lineWidth;
            // this bypasses the line drawing in originalScaleDraw
            this.lineWidth = lineWidth;

            originalScaleDraw.apply(this, arguments);

            ctx.lineWidth = this.lineWidth;
            var scale = this;
            // now we draw
            Chart.helpers.each(scale.yLabels, function (label, index) {
                // color of each radial line - you could replace this by an array lookup (if you limit your scaleSteps)
                ctx.strokeStyle = "hsl(" + index / scale.yLabels.length * 360 + ", 80%, 70%)";

                // copy of the chart.js code
                ctx.beginPath();
                for (var i = 0; i < scale.valuesCount; i++) {
                    pointPosition = scale.getPointPosition(i, scale.calculateCenterOffset(scale.min + (index * scale.stepValue)));
                    if (i === 0) {
                        ctx.moveTo(pointPosition.x, pointPosition.y);
                    } else {
                        ctx.lineTo(pointPosition.x, pointPosition.y);
                    }
                }
                ctx.closePath();
                ctx.stroke();
            });
        }
    }
});



var data = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(187,151,205,0.2)",
            strokeColor:"rgb(247, 247, 247)",
            pointColor: "rgba(187,151,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(187,151,205,1)",
            data: [65, 59, 60, 41, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 46, 27, 20]
        }
    ]
};


var ctx = document.getElementById("myChart").getContext("2d");
var myRadarChart = new Chart(ctx).RadarAlt(data, {
    scaleLineWidth: 10
});

// var lineChartData = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//         {
//             label: "My First dataset",
//             fill: false,
//             backgroundColor: "rgba(220,220,220,0.2)",
//             borderColor: "rgba(220,220,220,1)",
//             borderCapStyle: 'butt',
//             borderDash: [],
//             borderDashOffset: 0.0,
//             borderJoinStyle: 'miter',
//             pointBorderColor: "rgba(220,220,220,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(220,220,220,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             tension: 0.1,
//             data: [65, 59, 80, 81, 56, 55, 40]
//         },
//         {
//             label: "My Second dataset",
//             fill: true,
//             backgroundColor: "rgba(220,220,220,0.2)",
//             borderColor: "rgba(220,220,220,1)",
//             pointBorderColor: "rgba(220,220,220,1)",
//             pointBackgroundColor: "#fff",
//             pointBorderWidth: 1,
//             pointHoverRadius: 5,
//             pointHoverBackgroundColor: "rgba(220,220,220,1)",
//             pointHoverBorderColor: "rgba(220,220,220,1)",
//             pointHoverBorderWidth: 2,
//             data: [28, 48, 40, 19, 86, 27, 90]
//         }
//     ]
//   };
//
// var options = {showTooltips: true};
//
// Chart.types.Line.extend({
//     name: "LineAlt",
//     highlightPoints: function(datasetIndex, pointIndexArray){
//         var activePoints = [];
//         var points = this.datasets[datasetIndex].points;
//         for(i in pointIndexArray){
//         	if(points[pointIndexArray[i]]){
//           	activePoints.push(points[pointIndexArray[i]]);
//           }
//         }
//         this.showTooltip(activePoints);
//     }
// });
//
// var myLine = new Chart(document.getElementById("canvas").getContext("2d")).LineAlt(lineChartData, options);
//
// var highlight = function(index){
// 	myLine.highlightPoints(0, [index]);
// }
//
// $("#slider").slider({
//   max: lineChartData.datasets[0].data.length-1,
//   slide: function( event, ui ) { highlight(ui.value); },
// });
