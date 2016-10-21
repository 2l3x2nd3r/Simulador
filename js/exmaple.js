var X = XLSX;
var XW = {

    msg: 'xlsx',

};

var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

var wtf_mode = false;

function fixdata(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

function ab2str(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
    return o;
}

function s2ab(s) {
    var b = new ArrayBuffer(s.length * 2),
        v = new Uint16Array(b);
    for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
    return [v, b];
}

function xw_noxfer(data, cb) {
    var worker = new Worker(XW.noxfer);
    worker.onmessage = function(e) {
        switch (e.data.t) {
            case 'ready':
                break;
            case 'e':
                console.error(e.data.d);
                break;

        }
    };
    var arr = rABS ? data : btoa(fixdata(data));
    worker.postMessage({
        d: arr,
        b: rABS
    });
}

function xw_xfer(data, cb) {
    var worker = new Worker(rABS ? XW.rABS : XW.norABS);
    worker.onmessage = function(e) {
        switch (e.data.t) {
            case 'ready':
                break;
            case 'e':
                console.error(e.data.d);
                break;
            default:
                xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
                console.log("done");
                break;
        }
    };
    if (rABS) {
        var val = s2ab(data);
        worker.postMessage(val[1], [val[1]]);
    } else {
        worker.postMessage(data, [data]);
    }
}

function xw(data, cb) {

    if (transferable) xw_xfer(data, cb);
    else xw_noxfer(data, cb);
}

function get_radio_value(radioName) {
    var radios = document.getElementsByName(radioName);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked || radios.length === 1) {
            return radios[i].value;
        }
    }
}


function to_csv(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function(sheetName) {
        var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        if (csv.length > 0) {
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(csv);
        }
    });
    return result.join("\n");
}

function to_formulae(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function(sheetName) {
        var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
        if (formulae.length > 0) {
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(formulae.join("\n"));
        }
    });
    return result.join("\n");
}



function process_wb(wb) {
    var output = "";
    switch (get_radio_value("format")) {

        case "form":
            output = to_formulae(wb);
            break;
        default:
            output = to_csv(wb);
    }
    if (out.innerText === undefined) out.textContent = output;
    else out.innerText = output;
    if (typeof console !== 'undefined') console.log("output", new Date());
}

var xlf = document.getElementById('xlf');

function handleFile(e) {

    var files = e.target.files;
    var f = files[0]; {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function(e) {
            if (typeof console !== 'undefined') console.log("onload", new Date(), rABS);
            var data = e.target.result;

            if (rABS) {
                wb = X.read(data, {
                    type: 'binary'
                });
            } else {
                var arr = fixdata(data);
                wb = X.read(btoa(arr), {
                    type: 'base64'
                });
            }
            process_wb(wb);
        }
    };
    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
}


if (xlf.addEventListener) xlf.addEventListener('change', handleFile, false);




// var lineChartData = {
//     "datasets": [{
//         "data": [
//             "85",
//             "87",
//             "70",
//             "80",
//             "78",
//             "100",],
//             "pointStrokeColor": "#1A81C5",
//             "fillColor": "rgba(254, 254, 254, 0.4)",
//             "pointColor": "#1A81C5",
//             "strokeColor": "#5D9CC6"
//     }],
//         "labels": [
//         "10",
//         "20",
//         "30",
//         "40",
//         "50",
//         "60"],
// };
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
// $("#slider").slider({
//   max: lineChartData.datasets[0].data.length-1,
//   slide: function( event, ui ) { highlight(ui.value); },
// });
//


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
