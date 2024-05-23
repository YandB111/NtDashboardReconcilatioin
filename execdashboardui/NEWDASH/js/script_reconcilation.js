$(document).ready(function () {
    Table_bar();
});

var chartType = '';
var unit = 'Million';

var d = new Date();
d.setMonth(d.getMonth() - 1);

d = new Date(d).toUTCString();
d = d.split(' ').slice(2, 3).join('-');
//current month and year
today = new Date();
var month = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })
month = new Date(month).toUTCString();
month = month.split(' ').slice(2, 3).join('-');
var year_curr = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })
year_curr = new Date(year_curr).toUTCString();
year_curr = year_curr.split(' ').slice(3, 4).join('-');

var month1 = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })
month1 = new Date(month1).toUTCString();
month1 = month1.split(' ').slice(2, 3).join('-');

// var chartMonth = month;
var chartMonth = d;
var chartYear = year_curr;

function Reload() {
    window.location.reload();
}

function filter_top() {
    $('.float-div').removeClass('open');   //close on click
    $('.float_overlay').removeClass('d-block');

    chartType = document.getElementById("Chart_type").value;
    unit = document.getElementById("Unit_value").value;
    chartMonth = document.getElementById("Chart_Month").value;
    chartYear = document.getElementById("Chart_Year").value;

    document.getElementById('Top').innerHTML = chartMonth + ' ' + chartYear + ' (In ' + unit + ')';

    if (chartType == 'Bar' && (unit == 'Thousand' || unit == 'Million' || unit == 'Billion')) {
        Table1.innerHTML = '';
        pie_count.innerHTML = '';
        bar_record.innerHTML = '';
       // line_record.innerHTML = '';
        pie_duration.innerHTML = '';
        bar_count.innerHTML = '';
       // line_count.innerHTML = '';
        //line_variance.innerHTML = '';
        bar_variance.innerHTML = '';
        Table_bar();
    }
    else if (chartType == 'Line' || (unit == 'Thousand' || unit == 'Miliion' || unit == 'Billion')) {
        Table1.innerHTML = '';
        pie_count.innerHTML = '';
        bar_record.innerHTML = '';
        pie_duration.innerHTML = '';
        bar_count.innerHTML = '';
        // line_record.innerHTML = '';
        // line_count.innerHTML = '';
        // line_variance.innerHTML = '';
        bar_variance.innerHTML = '';
        Table_line();

    }
}

// bar charts
function Table_bar() {
    $.ajax({
        url: 'https://192.168.167.6:8743/Dashboard/dashboard/reconciliation/reconciliationDayByRev?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.reconciliationRevList.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            var demodata = jsonData.reconciliationRevList;
            var day = '';
            var count_rtd = '';
            var count_msc = '';
            var count_diff = '';
            var count_variance = '';
            var dur_rtd = '';
            var dur_msc = '';
            var dur_diff = '';
            var dur_variance = '';
            var sum_count_rtd = jsonData.rtd_In_Sum;
            var sum_count_msc = jsonData.msc_In_sum;
            var sum_count_diff = jsonData.count_diffsum;
            var avg_count_variance = jsonData.countAvgVarience;
            var sum_dur_rtd = jsonData.rtd_dur_sum;
            var sum_dur_msc = jsonData.msc_dur_sum;
            var sum_dur_diff = jsonData.dur_diffsum;
            var avg_dur_variance = jsonData.durAvgVarience;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                if (obj.count_varience > 0 + '%') {
                    color[i] = 'success';
                }
                if (obj.count_varience < 0 + '%') {
                    color[i] = 'danger';
                }
            }

            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col" style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                count_rtd += '<tc><th scope="col" style="text-align:right">' + data.rtd_IN_Count + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                count_msc += '<tc><th scope="col" style="text-align:right">' + data.msc_IN_Count + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                count_diff += '<tc><th scope="col" style="text-align:right">' + data.ion_Count_Diff + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                count_variance += '<tc><th scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.count_varience + '</b></span></th></tc>';
                //<td style="text-align:center">  <span class="badge badge-'+varience[index]+'">'+ data.varience + '</span></td>
                //<span class="badge badge-'+varience[index]+'">'+ data.varience + '</span>
            });
            $.each(demodata, function (index, data) {
                dur_rtd += '<tc><th scope="col" style="text-align:right">' + data.rtd_IN_Dur + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                dur_msc += '<tc><th scope="col" style="text-align:right">' + data.msc_IN_Dur + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                dur_diff += '<tc><th scope="col" style="text-align:right">' + data.ion_DUr_Diff + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                dur_variance += '<tc><th scope="col" style="text-align:right"><span class="badge badge-' + color[index] + '"><b>' + data.dur_varience + '</b></th></tc>';
            });
            '<style>'
            'table'
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#Table1').append('<table style="width:0px id="table_1" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                + '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th> Measure </th>'
                + '<th> Periods </th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="table_1">'
                + '<tr>'
                + '<th scope="row" rowspan="4"> Record Count </th>'
                + '<th scope="row"> RTD_IN </th>'
                + '<td style="text-align:right"><b>' + sum_count_rtd + count_rtd + '</b>' + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">MSC</th>'
                + '<td style="text-align:right"><b>' + sum_count_msc + count_msc + '</b>' + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">Difference</th>'
                + '<td style="text-align:right"><b>' + sum_count_diff + count_diff + '</b>' + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">Variance</th>'
                + '<td style="text-align:right"><mark><b>' + avg_count_variance + '</b></mark>' + count_variance + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row" rowspan="4"> Duration </th>'
                + '<th scope="row"> RTD_IN </th>'
                + '<td style="text-align:right"><b>' + sum_dur_rtd + '</b>' + dur_rtd + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">MSC</th>'
                + '<td style="text-align:right"><b>' + sum_dur_msc + '</b>' + dur_msc + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">Difference</th>'
                + '<td style="text-align:right"><b>' + sum_dur_diff + '</b>' + dur_diff + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">Variance</th>'
                + '<td style="text-align:right"><mark><b>' + avg_dur_variance + '</b></mark>' + dur_variance + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'bar',
                name: 'RTD_IN',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, "rtd_IN_Count"),
            };
            var trace2 = {
                type: 'bar',
                name: 'MSC',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "msc_IN_Count"),
            };
            var trace3 = {
                type: 'bar',
                name: 'Difference',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "ion_Count_Diff"),
            };

            var data = [trace1, trace2, trace3];

            var trace4 = {
                type: 'bar',
                name: 'RTD_IN',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "rtd_IN_Dur"),
            };
            var trace5 = {
                type: 'bar',
                name: 'MSC',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "msc_IN_Dur"),
            };
            var trace6 = {
                type: 'bar',
                name: 'Difference',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "ion_DUr_Diff"),
            };
            var data1 = [trace4, trace5, trace6];

            var text = new Array(demodata.length);
            var text1=new Array(demodata.length);
			for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];
                text[i] = obj.count_varience;
                text1[i]=obj.dur_varience;
			}

            var trace7 = {
                type: 'bar',
                name: 'Count',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "count_varience"),
                text:text.map(String),
                textposition:'auto',
            };
            var trace8 = {
                type: 'bar',
                name: 'Duration',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "dur_varience"),
                text:text1.map(String),
                textposition:'auto',
            };
            var data2 = [trace7, trace8];

            var layout1 = {
                autosize: true,
                width: 1300,
                height: 300,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' ' + year,
                },
                yaxis: {
                    autorange: true,
                    fixedrange: true,
                    automargin: true,
                },
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                }
            };


            var layout = {
                autosize: true,
                width: 800,
                height: 306,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' ' + year + ' (' + unit + ')',
                },
                yaxis: {
                    autorange: true,
                    fixedrange: true,
                    automargin: true,
                },
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                }
            };
            var config = {
                responsive: true,
                modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
                displaylogo: false,
            }
            Plotly.newPlot('bar_record', data, layout, config);
            Plotly.newPlot('bar_count', data1, layout, config);
            Plotly.newPlot('bar_variance', data2, layout1, config);

            var sum_rtd = jsonData.count_In_sum;
            var sum_msc = jsonData.count_msc_sum;
            var sum_diff = jsonData.count_diff_sum;

            sum_rtd = parseInt(sum_rtd);
            sum_diff = parseInt(sum_diff);
            sum_msc = parseInt(sum_msc);

            var sum_rtd_dur = jsonData.dur_in_sum;
            var sum_msc_dur = jsonData.dur_msc_sum;
            var sum_diff_dur = jsonData.dur_diff_sum;

            sum_rtd_dur = parseInt(sum_rtd_dur);
            sum_diff_dur = parseInt(sum_diff_dur);
            sum_msc_dur = parseInt(sum_msc_dur);

            var tracepie_record = {
                type: 'pie',
                values: [sum_rtd, sum_msc, sum_diff],
                labels: ['RTD_ID', 'MSC', 'Difference'],
                textinfo: 'percent',
				textposition: "auto",
                hoverinfo: "percent+label+value",
            };

            var tracepie_dur = {
                type: 'pie',
                values: [sum_rtd_dur, sum_msc_dur, sum_diff_dur],
                labels: ['RTD_ID', 'MSC', 'Difference'],
                textinfo: 'percent',
				textposition: "auto",
                hoverinfo: "percent+label+value",
            };
            var data_pie_rec = [tracepie_record];
            var data_pie_dur = [tracepie_dur];


            var layout_pie = {
                showlegend: true,

                margin: { "t": 30, "b": 0, "l": 40, "r": 0 },
                height: 306,
                width: 400,
                displayModeBar: false,
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                }
            };
            var config = {
                responsive: true,
                modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
                displaylogo: false,
            }
            Plotly.newPlot('pie_count', data_pie_rec, layout_pie, config);
            Plotly.newPlot('pie_duration', data_pie_dur, layout_pie, config);
        }
    });
}

// line charts 
function Table_line() {
    $.ajax({
        url: 'https://192.168.167.6:8743/Dashboard/dashboard/reconciliation/reconciliationDayByRev?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.reconciliationRevList.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            var demodata = jsonData.reconciliationRevList;
            var day = '';
            var count_rtd = '';
            var count_msc = '';
            var count_diff = '';
            var count_variance = '';
            var dur_rtd = '';
            var dur_msc = '';
            var dur_diff = '';
            var dur_variance = '';
            var sum_count_rtd = jsonData.rtd_In_Sum;
            var sum_count_msc = jsonData.msc_In_sum;
            var sum_count_diff = jsonData.count_diffsum;
            var avg_count_variance = jsonData.countAvgVarience;
            var sum_dur_rtd = jsonData.rtd_dur_sum;
            var sum_dur_msc = jsonData.msc_dur_sum;
            var sum_dur_diff = jsonData.dur_diffsum;
            var avg_dur_variance = jsonData.durAvgVarience;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                if (obj.count_varience > 0 + '%') {
                    color[i] = 'success';
                }
                if (obj.count_varience < 0 + '%') {
                    color[i] = 'danger';
                }
            }

            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col" style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                count_rtd += '<tc><th scope="col" style="text-align:right">' + data.rtd_IN_Count + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                count_msc += '<tc><th scope="col" style="text-align:right">' + data.msc_IN_Count + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                count_diff += '<tc><th scope="col" style="text-align:right">' + data.ion_Count_Diff + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                count_variance += '<tc><th scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.count_varience + '</b></span></th></tc>';
                //<td style="text-align:center">  <span class="badge badge-'+varience[index]+'">'+ data.varience + '</span></td>
                //<span class="badge badge-'+varience[index]+'">'+ data.varience + '</span>
            });
            $.each(demodata, function (index, data) {
                dur_rtd += '<tc><th scope="col" style="text-align:right">' + data.rtd_IN_Dur + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                dur_msc += '<tc><th scope="col" style="text-align:right">' + data.msc_IN_Dur + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                dur_diff += '<tc><th scope="col" style="text-align:right">' + data.ion_DUr_Diff + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                dur_variance += '<tc><th scope="col" style="text-align:right"><span class="badge badge-' + color[index] + '"><b>' + data.dur_varience + '</b></th></tc>';
            });
            '<style>'
            'table'
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#Table1').append('<table style="width:0px id="table_1" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                + '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th> Measure </th>'
                + '<th> Periods </th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="table_1">'
                + '<tr>'
                + '<th scope="row" rowspan="4"> Record Count </th>'
                + '<th scope="row"> RTD_IN </th>'
                + '<td style="text-align:right"><b>' + sum_count_rtd + count_rtd + '</b>' + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">MSC</th>'
                + '<td style="text-align:right"><b>' + sum_count_msc + count_msc + '</b>' + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">Difference</th>'
                + '<td style="text-align:right"><b>' + sum_count_diff + count_diff + '</b>' + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">Variance</th>'
                + '<td style="text-align:right"><mark><b>' + avg_count_variance + '</b></mark>' + count_variance + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row" rowspan="4"> Duration </th>'
                + '<th scope="row"> RTD_IN </th>'
                + '<td style="text-align:right"><b>' + sum_dur_rtd + '</b>' + dur_rtd + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">MSC</th>'
                + '<td style="text-align:right"><b>' + sum_dur_msc + '</b>' + dur_msc + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">Difference</th>'
                + '<td style="text-align:right"><b>' + sum_dur_diff + '</b>' + dur_diff + '</td>'
                + '</tr>'
                + '<tr>'
                + '<th scope="row">Variance</th>'
                + '<td style="text-align:right"><mark><b>' + avg_dur_variance + '</b></mark>' + dur_variance + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'line',
                name: 'RTD_IN',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, "rtd_IN_Count"),
            };
            var trace2 = {
                type: 'line',
                name: 'MSC',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "msc_IN_Count"),
            };
            var trace3 = {
                type: 'line',
                name: 'Difference',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "ion_Count_Diff"),
            };

            var data = [trace1, trace2, trace3];

            var trace4 = {
                type: 'line',
                name: 'RTD_IN',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "rtd_IN_Dur"),
            };
            var trace5 = {
                type: 'line',
                name: 'MSC',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "msc_IN_Dur"),
            };
            var trace6 = {
                type: 'line',
                name: 'Difference',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "ion_DUr_Diff"),
            };
            var data1 = [trace4, trace5, trace6];
            var text = new Array(demodata.length);
            var text1=new Array(demodata.length);
			for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];
                text[i] = obj.count_varience;
                text1[i]=obj.dur_varience;
			}


            var trace7 = {
                type: 'line',
                name: 'Count',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "count_varience"),
                text:text.map(String),
                textposition:'auto',
            };
            var trace8 = {
                type: 'line',
                name: 'Duration',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "dur_varience"),
                text:text1.map(String),
                textposition:'auto',
            };
            var data2 = [trace7, trace8];

            var layout1 = {
                autosize: true,
                width: 1300,
                height: 300,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' ' + year,
                },
                yaxis: {
                    autorange: true,
                    fixedrange: true,
                    automargin: true,
                },
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                }
            };


            var layout = {
                autosize: true,
                width: 800,
                height: 306,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' ' + year + ' (' + unit + ')',
                },
                yaxis: {
                    autorange: true,
                    fixedrange: true,
                    automargin: true,
                },
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                }
            };
            var config = {
                responsive: true,
                modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
                displaylogo: false,
            }
            Plotly.newPlot('bar_record', data, layout, config);
            Plotly.newPlot('bar_count', data1, layout, config);
            Plotly.newPlot('bar_variance', data2, layout1, config);

            var sum_rtd = jsonData.count_In_sum;
            var sum_msc = jsonData.count_msc_sum;
            var sum_diff = jsonData.count_diff_sum;

            sum_rtd = parseInt(sum_rtd);
            sum_diff = parseInt(sum_diff);
            sum_msc = parseInt(sum_msc);

            var sum_rtd_dur = jsonData.dur_in_sum;
            var sum_msc_dur = jsonData.dur_msc_sum;
            var sum_diff_dur = jsonData.dur_diff_sum;

            sum_rtd_dur = parseInt(sum_rtd_dur);
            sum_diff_dur = parseInt(sum_diff_dur);
            sum_msc_dur = parseInt(sum_msc_dur);

            var tracepie_record = {
                type: 'pie',
                values: [sum_rtd, sum_msc, sum_diff],
                labels: ['RTD_ID', 'MSC', 'Difference'],
                textinfo: 'percent',
				textposition: "auto",
                hoverinfo: "percent+label+value",
            };

            var tracepie_dur = {
                type: 'pie',
                values: [sum_rtd_dur, sum_msc_dur, sum_diff_dur],
                labels: ['RTD_ID', 'MSC', 'Difference'],
                textinfo: 'percent',
				textposition: "auto",
                hoverinfo: "percent+label+value",
            };
            var data_pie_rec = [tracepie_record];
            var data_pie_dur = [tracepie_dur];


            var layout_pie = {
                showlegend: true,

                margin: { "t": 30, "b": 0, "l": 40, "r": 0 },
                height: 306,
                width: 400,
                displayModeBar: false,
                font: {
                    family: 'Arial, Helvetica, sans-serif',
                }
            };
            var config = {
                responsive: true,
                modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
                displaylogo: false,
            }
            Plotly.newPlot('pie_count', data_pie_rec, layout_pie, config);
            Plotly.newPlot('pie_duration', data_pie_dur, layout_pie, config);
        }
    });
}
