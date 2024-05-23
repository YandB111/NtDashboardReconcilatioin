$(document).ready(function () {
    Table_1();
    Table_2();
    // Table_3();
});
var CD = new Date();
     var Cm=CD.toLocaleString('default', { month: 'short' })
     var Cy=CD.getFullYear();
    url = 'https://192.168.167.6:8743/Dashboard/dashboard/roaming/';
    function Table_1() {
    $.ajax({
        url: url+'RoamingDayByDayRev?year='+Cy+'&month='+Cm+'&currency=thousand',
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.list.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            var demodata = jsonData.list;
            var day = '';
            var voice = '';
            var sms = '';
            var gprs = '';
            var total_rev = '';
            var percent = '';
            var sum_voice = jsonData.voiceMonthlySum;
            var sum_sms = jsonData.smsMonthlySum;
            var sum_gprs = jsonData.gprsMonthlySUm;
            var sum_totalrev = jsonData.toatlMonthlySum;
            var avg_percent = jsonData.averagepst;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                if (obj.pst > 0 + '%') {
                    color[i] = 'success';
                }
                if (obj.pst < 0 + '%') {
                    color[i] = 'danger';
                }
            }
            //"voice":"2.349","sms":"0.075","gprs":"0.411","totalrev":"2.835","pst":"-68.52%","day":"01"

            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col" style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                voice += '<tc><td scope="col" style="text-align:right">' + data.voice + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                sms += '<tc><td scope="col" style="text-align:right">' + data.sms + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                gprs += '<tc><td scope="col" style="text-align:right">' + data.gprs + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                total_rev += '<tc><td scope="col" style="text-align:right"><b>' + data.totalrev + '</b></td></tc>';
            });
            $.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></td></tc>';
                //<td style="text-align:center">  <span class="badge badge-'+varience[index]+'">'+ data.varience + '</span></td>
                //<span class="badge badge-'+varience[index]+'">'+ data.varience + '</span>
            });

            '<style>'
            'table '
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#ntable').append('<table style="width:0px id="tablevalue_top" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                //	+ '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th>Events</th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="tablevalue_top">'
                // +'for(var z=0;z<count;z++){'
                + '<td><b>' + 'Voice' + '</b></td>'
                + '<td style="text-align:right">' + sum_voice + voice + '</td>'
                // + '<td style="text-align:right">' +   '</td>'
                // +'}'
                + '<tr>'
                + '<td><b>' + 'SMS' + '</b></td>'
                + '<td style="text-align:right">' + sum_sms + sms + '</td>'
                + '</tr>'

                + '<tr>'
                + '<td><b>' + 'GPRS' + '</b></td>'
                + '<td style="text-align:right">' + sum_gprs + gprs + '</td>'
                + '</tr>'
                + '<td><b>' + "DAILY GROWTH" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percent + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + 'Total Revenue' + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_totalrev + total_rev + '<b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'bar',
                name: 'Voice',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, "voice"),
            };
            var trace2 = {
                type: 'bar',
                name: 'SMS',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "sms"),
            };
            var trace3 = {
                type: 'bar',
                name: 'GPRS',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "gprs"),
            };

            var data = [trace1, trace3, trace2];

            var text = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                text[i] = obj.pst;
            }

            var trace7 = {
                type: 'bar',
                name: '% Daily Growth',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "pst"),
                text: text.map(String),
                textposition: 'auto',
            };

            var data1 = [trace7];

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

            var voice_pie = jsonData.voiceRev_pie;
            var sms_pie = jsonData.smsRev_pie;
            var gprs_pie = jsonData.gprsRev_Pie;

            voice_pie = parseInt(voice_pie);
            sms_pie = parseInt(sms_pie);
            gprs_pie = parseInt(gprs_pie);


            var tracepie = {
                type: 'pie',
                values: [voice_pie, sms_pie, gprs_pie],
                labels: ['Voice', 'SMS', 'GPRS'],
                textinfo: 'percent',
                textposition: "auto",
                hoverinfo: "percent+label+value",
            };

            var data_pie = [tracepie];

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

            Plotly.newPlot('bar_1', data, layout, config);
            Plotly.newPlot('bar_variance_1', data1, layout1, config);
            Plotly.newPlot('pie_1', data_pie, layout_pie, config);
        }
    });
}
function Table_1_line() {
    $.ajax({
        url: url+'RoamingDayByDayRev?year=year='+Cy+'&month='+Cm+'&currency=thousand',
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.list.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            var demodata = jsonData.list;
            var day = '';
            var voice = '';
            var sms = '';
            var gprs = '';
            var total_rev = '';
            var percent = '';
            var sum_voice = jsonData.voiceMonthlySum;
            var sum_sms = jsonData.smsMonthlySum;
            var sum_gprs = jsonData.gprsMonthlySUm;
            var sum_totalrev = jsonData.toatlMonthlySum;
            var avg_percent = jsonData.averagepst;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                if (obj.pst > 0 + '%') {
                    color[i] = 'success';
                }
                if (obj.pst < 0 + '%') {
                    color[i] = 'danger';
                }
            }
            //"voice":"2.349","sms":"0.075","gprs":"0.411","totalrev":"2.835","pst":"-68.52%","day":"01"

            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col" style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                voice += '<tc><td scope="col" style="text-align:right">' + data.voice + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                sms += '<tc><td scope="col" style="text-align:right">' + data.sms + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                gprs += '<tc><td scope="col" style="text-align:right">' + data.gprs + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                total_rev += '<tc><td scope="col" style="text-align:right"><b>' + data.totalrev + '</b></td></tc>';
            });
            $.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></td></tc>';
                //<td style="text-align:center">  <span class="badge badge-'+varience[index]+'">'+ data.varience + '</span></td>
                //<span class="badge badge-'+varience[index]+'">'+ data.varience + '</span>
            });

            '<style>'
            'table '
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#ntable').append('<table style="width:0px id="tablevalue_top" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                //	+ '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th>Events</th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="tablevalue_top">'
                // +'for(var z=0;z<count;z++){'
                + '<td><b>' + 'Voice' + '</b></td>'
                + '<td style="text-align:right">' + sum_voice + voice + '</td>'
                // + '<td style="text-align:right">' +   '</td>'
                // +'}'
                + '<tr>'
                + '<td><b>' + 'SMS' + '</b></td>'
                + '<td style="text-align:right">' + sum_sms + sms + '</td>'
                + '</tr>'

                + '<tr>'
                + '<td><b>' + 'GPRS' + '</b></td>'
                + '<td style="text-align:right">' + sum_gprs + gprs + '</td>'
                + '</tr>'
                + '<td><b>' + "DAILY GROWTH" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percent + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + 'Total Revenue' + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_totalrev + total_rev + '<b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'line',
                name: 'Voice',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, "voice"),
            };
            var trace2 = {
                type: 'line',
                name: 'SMS',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "sms"),
            };
            var trace3 = {
                type: 'line',
                name: 'GPRS',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "gprs"),
            };

            var data = [trace1, trace3, trace2];

            var text = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                text[i] = obj.pst;
            }

            var trace7 = {
                type: 'line',
                name: '% Daily Growth',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "pst"),
                text: text.map(String),
                textposition: 'auto',
            };

            var data1 = [trace7];

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

            var voice_pie = jsonData.voiceRev_pie;
            var sms_pie = jsonData.smsRev_pie;
            var gprs_pie = jsonData.gprsRev_Pie;

            voice_pie = parseInt(voice_pie);
            sms_pie = parseInt(sms_pie);
            gprs_pie = parseInt(gprs_pie);


            var tracepie = {
                type: 'pie',
                values: [voice_pie, sms_pie, gprs_pie],
                labels: ['Voice', 'SMS', 'GPRS'],
                textinfo: 'percent',
                textposition: "auto",
                hoverinfo: "percent+label+value",
            };

            var data_pie = [tracepie];

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

            Plotly.newPlot('bar_1', data, layout, config);
            Plotly.newPlot('bar_variance_1', data1, layout1, config);
            Plotly.newPlot('pie_1', data_pie, layout_pie, config);
        }
    });
}
function Table_2() {
    $.ajax({
        url: url+'RoamingEventByRev?year='+Cy+'&month='+Cm+'&currency=thousand',
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.roamingEventByRevList.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            var demodata = jsonData.roamingEventByRevList;
            var day = '';
            var onnet = '';
            var offnet = '';
            var national = '';
            var international = '';
            var others = '';
            var total_rev = '';
            var percent = '';
            var sum_onnet = jsonData.onnetSum;
            var sum_offnet = jsonData.offnetsum;
            var sum_national = jsonData.nationalSUm;
            var sum_international = jsonData.internationalSum;
            var sum_others = jsonData.othersSUm;
            var sum_totalrev = jsonData.totalSum;
            var avg_percent = jsonData.averagepst;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                if (obj.pst > 0 + '%') {
                    color[i] = 'success';
                }
                if (obj.pst < 0 + '%') {
                    color[i] = 'danger';
                }
            }
            //onnet":"0.341","offnet":"0.907","national":"0.111","international":"0.512","others":"0.964","total":"2.835","pst":"-68.52%","day":"


            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col" style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                onnet += '<tc><td scope="col" style="text-align:right">' + data.onnet + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                offnet += '<tc><td scope="col" style="text-align:right">' + data.offnet + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                national += '<tc><td scope="col" style="text-align:right">' + data.national + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                international += '<tc><td scope="col" style="text-align:right">' + data.international + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                others += '<tc><td scope="col" style="text-align:right">' + data.others + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                total_rev += '<tc><td scope="col" style="text-align:right"><b>' + data.total + '</b></td></tc>';
            });
            $.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></td></tc>';
                //<td style="text-align:center">  <span class="badge badge-'+varience[index]+'">'+ data.varience + '</span></td>
                //<span class="badge badge-'+varience[index]+'">'+ data.varience + '</span>
            });

            '<style>'
            'table '
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#table2').append('<table style="width:0px id="tablevalue_center" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                //	+ '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th>Events</th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="tablevalue_center">'
                // +'for(var z=0;z<count;z++){'
                + '<td><b>' + 'Onnet' + '</b></td>'
                + '<td style="text-align:right">' + sum_onnet + onnet + '</td>'
                // + '<td style="text-align:right">' +   '</td>'
                // +'}'
                + '<tr>'
                + '<td><b>' + 'Offnet' + '</b></td>'
                + '<td style="text-align:right">' + sum_offnet + offnet + '</td>'
                + '</tr>'

                + '<tr>'
                + '<td><b>' + 'National' + '</b></td>'
                + '<td style="text-align:right">' + sum_national + national + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + 'International' + '</b></td>'
                + '<td style="text-align:right">' + sum_international + international + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + 'Others' + '</b></td>'
                + '<td style="text-align:right">' + sum_others + others + '</td>'
                + '</tr>'
                + '<td><b>' + "DAILY GROWTH" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percent + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + 'Total Revenue' + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_totalrev + total_rev + '<b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'bar',
                name: 'Onnet',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, "onnet"),
            };
            var trace2 = {
                type: 'bar',
                name: 'Offnet',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "offnet"),
            };
            var trace3 = {
                type: 'bar',
                name: 'National',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "national"),
            };
            var trace4 = {
                type: 'bar',
                name: 'International',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "international"),
            };
            var trace5 = {
                type: 'bar',
                name: 'Others',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "others"),
            };

            var data = [trace5, trace2, trace4, trace1, trace3];

            var text = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                text[i] = obj.pst;
            }

            var trace7 = {
                type: 'bar',
                name: '% Daily Growth',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "pst"),
                text: text.map(String),
                textposition: 'auto',
            };

            var data1 = [trace7];

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
            //onnetSum_pie":"6463","offnetsum_pie":"17520","nationalSum_pie":"849","internationalSum_pie":"8548","othersSum_pie":"33348","
            var onnet_pie = jsonData.onnetSum_pie;
            var offnet_pie = jsonData.offnetsum_pie;
            var national_pie = jsonData.nationalSum_pie;
            var international_pie = jsonData.internationalSum_pie;
            var others_pie = jsonData.othersSum_pie;

            onnet_pie = parseInt(onnet_pie)
            offnet_pie = parseInt(offnet_pie)
            national_pie = parseInt(national_pie)
            international_pie = parseInt(international_pie)
            others_pie = parseInt(others_pie)

            var tracepie = {
                type: 'pie',
                values: [onnet_pie, offnet_pie, national_pie, international_pie, others_pie],
                labels: ['Onnet', 'Offnet', 'National', 'International', 'Others'],
                textinfo: 'percent',
                textposition: "auto",
                hoverinfo: "percent+label+value",
            };

            var data_pie = [tracepie];

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

            Plotly.newPlot('bar_2', data, layout, config);
            Plotly.newPlot('bar_variance_2', data1, layout1, config);
            Plotly.newPlot('pie_2', data_pie, layout_pie, config);
        }
    });
}

function Table_2_line() {
    $.ajax({
        url: url+'RoamingEventByRev?year=year='+Cy+'&month='+Cm+'&currency=thousand',
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.roamingEventByRevList.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            var demodata = jsonData.roamingEventByRevList;
            var day = '';
            var onnet = '';
            var offnet = '';
            var national = '';
            var international = '';
            var others = '';
            var total_rev = '';
            var percent = '';
            var sum_onnet = jsonData.onnetSum;
            var sum_offnet = jsonData.offnetsum;
            var sum_national = jsonData.nationalSUm;
            var sum_international = jsonData.internationalSum;
            var sum_others = jsonData.othersSUm;
            var sum_totalrev = jsonData.totalSum;
            var avg_percent = jsonData.averagepst;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                if (obj.pst > 0 + '%') {
                    color[i] = 'success';
                }
                if (obj.pst < 0 + '%') {
                    color[i] = 'danger';
                }
            }
            //onnet":"0.341","offnet":"0.907","national":"0.111","international":"0.512","others":"0.964","total":"2.835","pst":"-68.52%","day":"


            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col" style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                onnet += '<tc><td scope="col" style="text-align:right">' + data.onnet + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                offnet += '<tc><td scope="col" style="text-align:right">' + data.offnet + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                national += '<tc><td scope="col" style="text-align:right">' + data.national + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                international += '<tc><td scope="col" style="text-align:right">' + data.international + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                others += '<tc><td scope="col" style="text-align:right">' + data.others + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                total_rev += '<tc><td scope="col" style="text-align:right"><b>' + data.total + '</b></td></tc>';
            });
            $.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></td></tc>';
                //<td style="text-align:center">  <span class="badge badge-'+varience[index]+'">'+ data.varience + '</span></td>
                //<span class="badge badge-'+varience[index]+'">'+ data.varience + '</span>
            });

            '<style>'
            'table '
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#table2').append('<table style="width:0px id="tablevalue_center" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                //	+ '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th>Events</th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="tablevalue_center">'
                // +'for(var z=0;z<count;z++){'
                + '<td><b>' + 'Onnet' + '</b></td>'
                + '<td style="text-align:right">' + sum_onnet + onnet + '</td>'
                // + '<td style="text-align:right">' +   '</td>'
                // +'}'
                + '<tr>'
                + '<td><b>' + 'Offnet' + '</b></td>'
                + '<td style="text-align:right">' + sum_offnet + offnet + '</td>'
                + '</tr>'

                + '<tr>'
                + '<td><b>' + 'National' + '</b></td>'
                + '<td style="text-align:right">' + sum_national + national + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + 'International' + '</b></td>'
                + '<td style="text-align:right">' + sum_international + international + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + 'Others' + '</b></td>'
                + '<td style="text-align:right">' + sum_others + others + '</td>'
                + '</tr>'
                + '<td><b>' + "DAILY GROWTH" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percent + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + 'Total Revenue' + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_totalrev + total_rev + '<b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'line',
                name: 'Onnet',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, "onnet"),
            };
            var trace2 = {
                type: 'line',
                name: 'Offnet',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "offnet"),
            };
            var trace3 = {
                type: 'line',
                name: 'National',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "national"),
            };
            var trace4 = {
                type: 'line',
                name: 'International',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "international"),
            };
            var trace5 = {
                type: 'line',
                name: 'Others',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "others"),
            };

            var data = [trace5, trace2, trace4, trace1, trace3];

            var text = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var obj = demodata[i];
                text[i] = obj.pst;
            }

            var trace7 = {
                type: 'line',
                name: '% Daily Growth',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "pst"),
                text: text.map(String),
                textposition: 'auto',
            };

            var data1 = [trace7];

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
            //onnetSum_pie":"6463","offnetsum_pie":"17520","nationalSum_pie":"849","internationalSum_pie":"8548","othersSum_pie":"33348","
            var onnet_pie = jsonData.onnetSum_pie;
            var offnet_pie = jsonData.offnetsum_pie;
            var national_pie = jsonData.nationalSum_pie;
            var international_pie = jsonData.internationalSum_pie;
            var others_pie = jsonData.othersSum_pie;

            onnet_pie = parseInt(onnet_pie)
            offnet_pie = parseInt(offnet_pie)
            national_pie = parseInt(national_pie)
            international_pie = parseInt(international_pie)
            others_pie = parseInt(others_pie)

            var tracepie = {
                type: 'pie',
                values: [onnet_pie, offnet_pie, national_pie, international_pie, others_pie],
                labels: ['Onnet', 'Offnet', 'National', 'International', 'Others'],
                textinfo: 'percent',
                textposition: "auto",
                hoverinfo: "percent+label+value",
            };

            var data_pie = [tracepie];

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

            Plotly.newPlot('bar_2', data, layout, config);
            Plotly.newPlot('bar_variance_2', data1, layout1, config);
            Plotly.newPlot('pie_2', data_pie, layout_pie, config);
        }
    });
}