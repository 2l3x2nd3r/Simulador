var sw = true
var X = XLSX;
var values_xls = {}
var XW = {
    msg: 'xls',
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
            if (sw) {
                chart_simu.initChart_custom(csv)
                sw = false
            }
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
            console.log(output)
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

Chart.types.Line.extend({
    name: "LineAlt",
    highlightPoints: function(datasetIndex, pointIndexArray) {
        var activePoints = [];
        // var activePoints_2 = [];
        var points = this.datasets[datasetIndex].points;
        for (i in pointIndexArray) {
            if (points[pointIndexArray[i]]) {
                activePoints.push(points[pointIndexArray[i]]);
            }
        }
        // //mostrar puntos activos en input
        // $("#if_a").val(activePoints[0].value)
        // $("#if_b").val(activePoints[0].label)

        // change_values()
        this.showTooltip(activePoints);
    }
});

// var RadarChart = {
//     labels: ["Ruby", "jQuery", "Java", "ASP.Net", "PHP"],
//     datasets: [{
//         fillColor: "rgba(187,151,205,0.2)",
//         strokeColor: "rgba(187,151,205,1)",
//         pointColor: "rgba(187,151,205,1)",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(187,151,205,1)",
//         data: [10, 20, 30, 40, 50]
//     }, {
//         fillColor: "rgba(151,187,205,0.2)",
//         strokeColor: "rgba(151,187,205,1)",
//         pointColor: "rgba(151,187,205,1)",
//         pointStrokeColor: "#fff",
//         pointHighlightFill: "#fff",
//         pointHighlightStroke: "rgba(151,187,205,1)",
//         data: [28, 48, 40, 19, 96]
//     }]
// }

// var myRadarChart = new Chart(document.getElementById("myChart").getContext("2d")).Radar(RadarChart, {
//     pointLabelFontSize: 13,
//     pointLabelFontColor: "rgb(0, 0, 0)"
// });
