var chart_simu = {}
chart_simu.initChart_custom= function(data) {
    var data_new = data.split(/\n/)
    var c_1 = []
    var c_2 = []
    data_new.forEach(function(data_f) {
        data_c = data_f.split(",");
        c_1.push(data_c[0]);
        c_2.push(data_c[1]);
    })
    c_1 = c_1.slice(1, c_1.length - 1)
    c_2 = c_2.slice(1, c_2.length - 1)
    values_xls = {
        c_1: c_1,
        c_2: c_2
    }
    var lineChartData = {
        "datasets": [{
            "data": c_2,
            "pointStrokeColor": "#1A81C5",
            "fillColor": "rgba(254, 254, 254, 0.4)",
            "pointColor": "#1A81C5",
            "strokeColor": "#5D9CC6"
        }],
        "labels": c_1,
    };
    var options = {
        showTooltips: true,
        hover: {
            onHover: function () {
                // body...
            }
        }
    };
    chart_simu.myLine = new Chart(document.getElementById("canvas").getContext("2d")).LineAlt(lineChartData, options);
    chart_simu.highlight = function(points) {
        chart_simu.myLine.highlightPoints(0, points);
    }
    constructor()
}
