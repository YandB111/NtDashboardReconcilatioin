$(document).ready(function () {
    Table_1();
    Table_2();
    Table_3();
});
var chartType = '';
var unit = 'Million';
//current month and year

var d = new Date();
d.setMonth(d.getMonth() - 1);


d = new Date(d).toUTCString();
d = d.split(' ').slice(2, 3).join('-');
// console.log(d);

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

var chartMonth = month;
var chartYear = year_curr;
// console.log(chartMonth,chartYear);


//filter month and year
var mnth = month;
var year = year_curr;


// filter for bar and line chart. filter for unit conversion....
function filter_top() {

    $('.float-div').removeClass('open');   //close on click
    $('.float_overlay').removeClass('d-block');

    chartType = document.getElementById("Chart_type").value;
    unit = document.getElementById("Unit_value").value;
    chartMonth = document.getElementById("Chart_Month").value;
    chartYear = document.getElementById("Chart_Year").value;

    document.getElementById('TopTable').innerHTML = chartMonth + ' ' + chartYear + ' (In ' + unit + ')';
    document.getElementById('centerTable').innerHTML = chartMonth + ' ' + chartYear + ' (In ' + unit + ')';
    document.getElementById('bottomTable').innerHTML = chartMonth + ' ' + chartYear + ' (In ' + unit + ')';

    //console.log(chartMonth, chartYear);
    if (chartType == 'Bar' && (unit == 'Thousand' || unit == 'Million' || unit == 'Billion')) {
        //for clearing the data
        ntable.innerHTML = '';
        PieChart_1.innerHTML = '';
      //  LineChart_1.innerHTML = '';
       // LineChart_percent.innerHTML = '';
        table2.innerHTML = '';
        PieChart_2.innerHTML = '';
        //LineChart_2.innerHTML = '';
        table3.innerHTML = '';
        PieChart_3.innerHTML = '';
        //LineChart_3.innerHTML = '';
        BarChart_1.innerHTML = '';
        BarChart_percent.innerHTML = '';
        BarChart_percent_2.innerHTML = '';
       // LineChart_percent_2.innerHTML = '';
        BarChart_percent_3.innerHTML = '';
        //LineChart_percent_3.innerHTML = '';
        BarChart_2.innerHTML = '';
        BarChart_3.innerHTML = '';
        Table_1();
        Table_2();
        Table_3();

    }
    if (chartType == 'Line' && (unit == 'Thousand' || unit == 'Million' || unit == 'Billion')) {
        //for clearing the data
        ntable.innerHTML = '';
        PieChart_1.innerHTML = '';
        BarChart_1.innerHTML = '';
        BarChart_percent.innerHTML = '';
        table2.innerHTML = '';
        PieChart_2.innerHTML = '';
        BarChart_2.innerHTML = '';
        table3.innerHTML = '';
        PieChart_3.innerHTML = '';
        BarChart_3.innerHTML = '';
       // LineChart_1.innerHTML = '';
      //  LineChart_percent.innerHTML = '';
        //LineChart_2.innerHTML = '';
        //LineChart_3.innerHTML = '';
        BarChart_percent_2.innerHTML = '';
      //  LineChart_percent_2.innerHTML = '';
        BarChart_percent_3.innerHTML = '';
      // LineChart_percent_3.innerHTML = '';
        Table_1_line();
        Table_2_line();
        Table_3_line();

    }
}

//reload button on filter
function Reload() {
    window.location.reload();
}

function Table_1() {
    $.ajax({
        url: 'https://10.26.194.52:8743/Dashboard/dashboard/traffic/trafficRevenueDayByDay?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.trafficDayByRevList.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            if (Month == "null") {
                Month = chartMonth;
            }
            // var data=jsonData.eventValueList;
            var demodata = jsonData.trafficDayByRevList;
            var data1 = new Array(demodata.length);
            var name = new Array(demodata.length);
            var value = new Array(demodata.length);
            var call_bar = new Array(demodata.length);
            var gprs_bar = new Array(demodata.length);
            var sms_bar = new Array(demodata.length);
            var ussd_bar = new Array(demodata.length);
            var video_bar = new Array(demodata.length);
            var voice_bar = new Array(demodata.length);
            var fax_bar=new Array(demodata.length);
            var unk_bar = new Array(demodata.length);

           
              let mySet = new Set()// add lines 

            var obj = new Array(demodata.length); //declare it a 2d array
            $.each(demodata, function (index, data) {
                count = data.eventListSize;
            });
            // console.log(count);


            for (var i = 0; i < demodata.length; i++) {
                obj[i] = demodata[i];
                // console.log(obj[i]);
            }
            //loop for bar chart.....................
            for (var i = 0; i < obj.length; i++) {
                // data1[i]=obj[i].day;
                data1[i] = obj[i].dayList;
                // data1[i]=data1[i].fieldname;
                for (var j = 0; j < count; j++) {
                    name[j] = data1[i][j].eventFiledName;
                   mySet.add(name[j]);// add lines r.k
                    value[j] = data1[i][j].cdrscount;
                }
            }

             
              let arr= Array.from(mySet); 
              //add  below2 lines r.k
              for (let item of mySet) 
            console.log("set item are"+item);
            var demodata = jsonData.trafficDayByRevList;
            var day = '';
            // var count='';
            var callfrwd = '';
            var gprs = '';
            var smsrev = '';
            var ussd = '';
            var videotele = '';
            var voice = '';
            var fax='';
            var unk = '';
            var total_rev = '';
            var percent = '';
            var total_sms = jsonData.cdrCountMonthlySumlist.SMS;
            var total_callfrwd = jsonData.cdrCountMonthlySumlist.CALL_FORWARD;
            var total_gprs = jsonData.cdrCountMonthlySumlist.GPRS;
            var total_ussd = jsonData.cdrCountMonthlySumlist.USSD;
            var total_videotele = jsonData.cdrCountMonthlySumlist.VIDEO_TELEPHONY;
            var total_voice = jsonData.cdrCountMonthlySumlist.VOICE;
            var total_fax=jsonData.cdrCountMonthlySumlist.FAX;
            var total_unk = jsonData.cdrCountMonthlySumlist.UNK; 
            var sum_totalRev = jsonData.monthlyCdrsCount;
            var avg_percnt=jsonData.averagePst;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var col = demodata[i];
                if (col.dayBypst > 0 + '%') {
                    color[i] = 'success';
                }
                if (col.dayBypst < 0 + '%') {
                    color[i] = 'danger';
                }
            }
            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
            });

          
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
               
                     for (var j = 0; j < 1; j++) {
                      for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[0])
				{
                            value[j]=data1[i][j].cdrscount;
                         }
                     }
                     value[j] = data1[i][j].cdrscount;
                    call_bar[i] = value[j]
                    // console.log(call[i]);

                   if(value[j]!=null)
			{
                   arr[0]+= '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
			}


                }
            }
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 1; j < 2; j++) {

                     for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[1])
                         {
                            value[j]=data1[i][j].cdrscount;
			  //console.log("GPRS_DATA"+data1[i][m].cdrscount);
                         }
                     }

                    value[j] = data1[i][j].cdrscount;
                    gprs_bar[i] = value[j];

			if(value[j]!=null)
			{
                      
                    arr[1]+= '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
			}
                }
            }
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 2; j < 3; j++) {
                for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[2])
                         {
                            value[j]=data1[i][m].cdrscount;
                         }
                     }

                   value[j] = data1[i][j].cdrscount;
                    sms_bar[i] = value[j];
			if(value[j]!=null)
			{
				arr[2]+= '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
			}	
                }
            }
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 3; j < 4; j++) {

                     for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[3])
                         {
                            value[j]=data1[i][m].cdrscount;
                         }
                     }

                   value[j] = data1[i][j].cdrscount;
                    ussd_bar[i] = value[j];
                       if(value[j]!=null)
			{
                    arr[3]+= '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
			}
                }
            }
                  
                

                for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 4; j < 5; j++) {
  
                     for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[4])
                         {
                            value[j]=data1[i][m].cdrscount;
                         }
                     }

                   value[j] = data1[i][j].cdrscount;
                    video_bar[i] = value[j];
			if(value[j]!=null)
			{
                    arr[4] += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
			}
                }
            }
           for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                    for (var j = 5; j < 6; j++) {

                    for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[5])
                         {
                            value[j]=data1[i][m].cdrscount;
                         }
                     }

                    value[j] = data1[i][j].cdrscount;
                    voice_bar[i] = value[j];
			if(value[j]!=null)
			{
                    arr[5]+= '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
			}
                }
            }

               for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                  for (var j = 6; j < 7; j++) {
                      for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[6])
                         {
                            value[j]=data1[i][m].cdrscount;
                         }
                     } 
			console.log("Data[i] is"+obj[i].dayList);

                  
			if(arr[6]!=null)
			{
			 value[j] = data1[i][j].cdrscount;
                    fax_bar[i] = value[j];
                       arr[6] += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
			}
                }
            }
              
               for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 7; j < 8; j++) {
                   for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[7])
                         {
                            value[j]=data1[i][m].cdrscount;
                         }
                     }

                   
			if(arr[7]!=null)
			{
		       value[j] = data1[i][j].cdrscount;
                       unk_bar[i] = value[j];
                       arr[7] += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';unk_bar
			}
                }
            }


              
                        $.each(demodata, function (index, data) {
                total_rev += '<tc><td scope="col" style="text-align:right"><b>' + data.dayByTotalRev + '</b></td></tc>';
            });

            $.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.dayBypst + '</b></span></td></tc>';
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
                + '<td><b>' + arr[0] +'</b></td>'
                + '<td style="text-align:right">' + total_callfrwd + callfrwd +'</td>'
                // + '<td style="text-align:right">' +   '</td>'
                // +'}'

                + '<tr>'
                + '<td><b>' + arr[1] + '</b></td>'
                + '<td style="text-align:right">' + total_gprs + gprs + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + arr[2] + '</b></td>'
                + '<td style="text-align:right">' + total_sms + smsrev + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + arr[3] + '</b></td>'
                + '<td style="text-align:right">' + total_ussd + ussd + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + arr[4] + '</b></td>'
                + '<td style="text-align:right">' + total_videotele + videotele + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + arr[5] + '</b></td>'
                + '<td style="text-align:right">' + total_voice + voice + '</td>'
                + '</tr>'
                // + '<tr>'
               // + '<td><b>' + arr[6] + '</b></td>'
               // + '<td style="text-align:right">' + total_fax + fax + '</td>'
                //+ '</tr>'
                // + '<tr class="bg-secondary text-white">'   // column highlighter
               // + '<td><b>' + arr[7] + '</b></td>'
                //+ '<td style="text-align:right">' + total_unk + unk + '</td>'
                //+ '</tr>'
                + '<td><b>' + "DAILY GROWTH" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percnt + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + "TOTAL REVENUE" + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_totalRev + total_rev + '</b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'bar',
                name: 'Call Forward',
                x: unpack(jsonData, "day"),
                y: call_bar,
            };
            var trace2 = {
                type: 'bar',
                name: 'SMS',
                x: unpack(jsonData, "day"),
                y: sms_bar,
            };
            var trace3 = {
                type: 'bar',
                name: 'GPRS',
                x: unpack(jsonData, "day"),
                y: gprs_bar,
            };
            var trace4 = {
                type: 'bar',
                name: 'USSD',
                x: unpack(jsonData, "day"),
                y: ussd_bar,
            };
             var trace5 = {
                type: 'bar',
                name: 'Videa Telephony',
                x: unpack(jsonData, "day"),
                y: video_bar,
            };
            var trace6 = {
                type: 'bar',
                name: 'Voice',
                x: unpack(jsonData, "day"),
                y: voice_bar,
            };
            var text = new Array(demodata.length);
			for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];
				text[i] = obj.dayBypst;
			}

            var trace7 = {
                type: 'bar',
                name: '% Daily Growth',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "dayBypst"),
                text:text.map(String),
                textposition:'auto',
            };
            var tracepie = {
                type: 'pie',
                values: [total_voice, total_sms, total_callfrwd, total_gprs, total_ussd, total_videotele],
                labels: ['Voice', 'SMS', 'Call Forward', 'GPRS', 'USSD', 'Video Telephony'],
                textinfo: 'percent',
				textposition: "auto",
                //textposition: "inside",
                hoverinfo: "percent+label+value",
                // insidetextorientation: "radial",
            };
            var data = [trace3, trace2, trace6,trace4, trace1, trace5];
            var data1 = [trace7];
            var datapie = [tracepie];

            var layout = {
                autosize: true,
                width: 1300,
                height: 306,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' (' + unit + ')',
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
            var layout1 = {
                autosize: true,
                width: 1300,
                height: 250,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month,
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
            var layoutpie = {
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

            //Plotly.newPlot('PieChart_1', datapie, layoutpie, config);
            Plotly.newPlot('BarChart_1', data, layout, config);
            Plotly.newPlot('BarChart_percent', data1, layout1, config);
        }
    });
}

function Table_1_line() {
    $.ajax({
        url: 'https://10.26.194.52:8743/Dashboard/dashboard/traffic/trafficRevenueDayByDay?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.trafficDayByRevList.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            // var data=jsonData.eventValueList;
            var demodata = jsonData.trafficDayByRevList;
            var data1 = new Array(demodata.length);
            var name = new Array(demodata.length);
            var value = new Array(demodata.length);
            var call_bar = new Array(demodata.length);
            var gprs_bar = new Array(demodata.length);
            var sms_bar = new Array(demodata.length);
            var ussd_bar = new Array(demodata.length);
            var video_bar = new Array(demodata.length);
            var voice_bar = new Array(demodata.length);
            var fax_bar = new Array(demodata.length);
            var unk_bar = new Array(demodata.length);

             let mySet=new Set();



            var obj = new Array(demodata.length); //declare it a 2d array
            $.each(demodata, function (index, data) {
                count = data.eventListSize;
            });
            // console.log(count);


            for (var i = 0; i < demodata.length; i++) {
                obj[i] = demodata[i];
                // console.log(obj[i]);
            }
            //loop for bar chart.....................
            for (var i = 0; i < obj.length; i++) {
                // data1[i]=obj[i].day;
                data1[i] = obj[i].dayList;
                // data1[i]=data1[i].fieldname;
                for (var j = 0; j < count; j++) {
                    name[j] = data1[i][j].eventFiledName;
                    mySet.add(name[j]);// add lines r.k

                    value[j] = data1[i][j].cdrscount;
                }
            }
            var demodata = jsonData.trafficDayByRevList;
            var day = '';
            // var count='';
            var callfrwd = '';
            var gprs = '';
            var smsrev = '';
            var ussd = '';
           var videotele = '';
            var voice = '';
            var fax = '';
            var unk = '';
            var total_rev = '';
            var percent = '';
            var total_voice = jsonData.cdrCountMonthlySumlist.VOICE;
            var total_sms = jsonData.cdrCountMonthlySumlist.SMS;
            var total_callfrwd = jsonData.cdrCountMonthlySumlist.CALL_FORWARD;
            var total_gprs = jsonData.cdrCountMonthlySumlist.GPRS;
            var total_ussd = jsonData.cdrCountMonthlySumlist.USSD;
            var total_unk = jsonData.cdrCountMonthlySumlist.UNK;
            var total_videotele = jsonData.cdrCountMonthlySumlist.VIDEO_TELEPHONY;
            var total_fax=jsonData.cdrCountMonthlySumlist.FAX;
            var sum_totalRev = jsonData.monthlyCdrsCount;
            var avg_percnt=jsonData.averagePst;
            let arr= Array.from(mySet); 
       

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var col = demodata[i];
                if (col.dayBypst > 0 + '%') {
                    color[i] = 'success';
                }
                if (col.dayBypst < 0 + '%') {
                    color[i] = 'danger';
                }
            }
            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
            });
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 0; j < 1; j++) {
                    for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[0])
                         {
                            value[j]=data1[i][m].cdrscount;
                         }
                     }
                   
                    call_bar[i] = value[j]
                    // console.log(call[i]);
                    callfrwd += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
                }
            }
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 1; j < 2; j++) {
                    for(var m=0;m<data1[i].length;m++)
                    {
                        if(data1[i][m].eventFiledName == arr[1])
                        {
                           value[j]=data1[i][m].cdrscount;
                        }
                    }
                    gprs_bar[i] = value[j];
                    gprs += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
                }
            }
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 2; j < 3; j++) {
                    for(var m=0;m<data1[i].length;m++)
                    {
                        if(data1[i][m].eventFiledName == arr[2])
                        {
                           value[j]=data1[i][m].cdrscount;
                        }
                    }
                    sms_bar[i] = value[j];
                    smsrev += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
                }
            }
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 3; j < 4; j++) {
                    for(var m=0;m<data1[i].length;m++)
                    {
                        if(data1[i][m].eventFiledName == arr[3])
                        {
                           value[j]=data1[i][m].cdrscount;
                        }
                    }

                    ussd_bar[i] = value[j];
                    ussd += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
                }
            }
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 4; j < 5; j++) {
                   
                    for(var m=0;m<data1[i].length;m++)
                     {
                         if(data1[i][m].eventFiledName == arr[4])
                         {
                            value[j]=data1[i][m].cdrscount;
                         }
                     }

                     video_bar[i] = value[j];
                    videotele += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
                    
                }
            }
            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 5; j < 6; j++) {
                    for(var m=0;m<data1[i].length;m++)
                    {
                        if(data1[i][m].eventFiledName == arr[5])
                        {
                           value[j]=data1[i][m].cdrscount;
                        }
                    }
                    voice_bar[i] = value[j];
                    voice += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
                  
                }
            }
                 for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 6; j < 7; j++) {


                    for(var m=0;m<data1[i].length;m++)
                    {
                        if(data1[i][m].eventFiledName == arr[6])
                        {
                           value[j]=data1[i][m].cdrscount;
                        }
                    }

                   fax_bar[i] = value[j];
                    fax += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
                }
            }

            for (var i = 0; i < obj.length; i++) {
                data1[i] = obj[i].dayList;
                for (var j = 7; j < 8; j++) {


                    for(var m=0;m<data1[i].length;m++)
                    {
                        if(data1[i][m].eventFiledName == arr[7])
                        {
                           value[j]=data1[i][m].cdrscount;
                        }
                    }

                    unk_bar[i] = value[j];
                    unk += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
                }
            }
            $.each(demodata, function (index, data) {
                total_rev += '<tc><td scope="col" style="text-align:right"><b>' + data.dayByTotalRev + '</b></td></tc>';
            });

            $.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.dayBypst + '</b></span></td></tc>';
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
                + '<td><b>' + arr[0] + '</b></td>'
                + '<td style="text-align:right">' + total_callfrwd + callfrwd + '</td>'
                // + '<td style="text-align:right">' +   '</td>'
                // +'}'

                + '<tr>'
                + '<td><b>' + arr[1] + '</b></td>'
                + '<td style="text-align:right">' + total_gprs + gprs + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + arr[2] + '</b></td>'
                + '<td style="text-align:right">' + total_sms + smsrev + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + arr[3] + '</b></td>'
                + '<td style="text-align:right">' + total_unk + unk + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + arr[4] + '</b></td>'
                + '<td style="text-align:right">' + total_videotele + videotele + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + arr[5] + '</b></td>'
                + '<td style="text-align:right">' + total_voice + voice + '</td>'
                + '</tr>'
                 + '<tr>'
                + '<td><b>' + arr[6] + '</b></td>'
                + '<td style="text-align:right">' + total_fax + fax + '</td>'
                + '</tr>'
                // + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + arr[7] + '</b></td>'
                + '<td style="text-align:right">' + total_unk + unk + '</td>'
                + '</tr>'
                + '<td><b>' + "DAILY GROWTH" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percnt + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + "TOTAL REVENUE" + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_totalRev + total_rev + '</b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'line',
                name: 'Call Forward',
                x: unpack(jsonData, "day"),
                y: call_bar,
            };
            var trace2 = {
                type: 'line',
                name: 'SMS',
                x: unpack(jsonData, "day"),
                y: sms_bar,
            };
            var trace3 = {
                type: 'line',
                name: 'GPRS',
                x: unpack(jsonData, "day"),
                y: gprs_bar,
            };
            var trace4 = {
                type: 'line',
                name: 'USSD',
                x: unpack(jsonData, "day"),
                y: ussd_bar,
            };
            var trace8 = {
                type: 'line',
                name: 'UNK',
                x: unpack(jsonData, "day"),
                y: unk_bar,
            };
            var trace5 = {
                type: 'line',
                name: 'Videa Telephony',
                x: unpack(jsonData, "day"),
                y: video_bar,
            };
            var trace6 = {
                type: 'line',
                name: 'Voice',
                x: unpack(jsonData, "day"),
                y: voice_bar,
            };
            var text = new Array(demodata.length);
			for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];
				text[i] = obj.dayBypst;
			}

            var trace7 = {
                type: 'line',
                name: '% Daily Growth',
                x: unpack(jsonData, "day"),
                y: unpack(jsonData, "dayBypst"),
                text:text.map(String),
                textposition:'auto',
            };
            var tracepie = {
                type: 'pie',
                values: [total_voice, total_sms, total_callfrwd, total_gprs, total_ussd, total_videotele, total_unk],
                labels: ['Voice', 'SMS', 'Call Forward', 'GPRS', 'USSD', 'Video Telephony', 'UNK'],
                textinfo: 'percent',
				textposition: "auto",
                //textposition: "inside",
                hoverinfo: "percent+label+value",
                // insidetextorientation: "radial",
            };
            var data = [trace3, trace2, trace6, trace8, trace4, trace1, trace5];
            var data1 = [trace7];
            var datapie = [tracepie];

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
                    title: Month + ' (' + unit + ')',
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
            var layout1 = {
                autosize: true,
                width: 1300,
                height: 250,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month,
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
            var layoutpie = {
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

            Plotly.newPlot('PieChart_1', datapie, layoutpie,config);
            Plotly.newPlot('BarChart_1', data, layout, config);
            Plotly.newPlot('BarChart_percent', data1, layout1, config);
        }
    });
}
function Table_2() {
    $.ajax({
        url: 'https://10.26.194.52:8743/Dashboard/dashboard/traffic/trafficRevenueGraph?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
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
            var onnet = '';
            var offnet = '';
            var national = '';
            var intl = '';
            var others = '';
            var percent = '';
            var totalRev = '';
            var sum_onnet = jsonData.onnetSum;
            var sum_offnet = jsonData.offnetSUm;
            var sum_national = jsonData.nationalSum;
            var sum_intl = jsonData.internationalSum;
            var sum_others = jsonData.othersSum;
            var sum_total = jsonData.totalSUm;
            var avg_percnt = jsonData.averagepst;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var col = demodata[i];
                if (col.pst > 0 + '%') {
                    color[i] = 'success';
                }
                if (col.pst < 0 + '%') {
                    color[i] = 'danger';
                }
            }

            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                national += '<tc><td scope="col" style="text-align:right">' + data.national + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                intl += '<tc><td scope="col" style="text-align:right">' + data.international + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                onnet += '<tc><td scope="col" style="text-align:right">' + data.onnet + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                offnet += '<tc><td scope="col" style="text-align:right">' + data.offnet + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                others += '<tc><td scope="col" style="text-align:right">' + data.others + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                totalRev += '<tc><td scope="col" style="text-align:right"><b>' + data.total + '</b></td></tc>';
            });
            $.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></td></tc>';
            });
            // $.each(demodata, function (index, data) {
            //     percent += '<tc><th scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></th></tc>';
            // });

            '<style>'
            'table '
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#table2').append('<table style="width:0px id="tablevalue_middle" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                + '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th>Events</th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="tablevalue_middle">'
                + '<td><b>' + "INTL" + '</b></td>'
                + '<td style="text-align:right">' + sum_intl + intl + '</td>'
                + '<tr>'
                + '<td><b>' + "National" + '</b></td>'
                + '<td style="text-align:right">' + sum_national + national + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Onnet" + '</b></td>'
                + '<td style="text-align:right">' + sum_onnet + onnet + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Offnet" + '</b></td>'
                + '<td style="text-align:right">' + sum_offnet + offnet + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Others" + '</b></td>'
                + '<td style="text-align:right">' + sum_others + others + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Daily Growth" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percnt + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + "Total Record Count" + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_total + totalRev + '</b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )

            var trace1 = {
                type: 'bar',
                name: 'INTL',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'international'),
            }
            var trace5 = {
                type: 'bar',
                name: 'INTL',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'national'),
            }
            var trace2 = {
                type: 'bar',
                name: 'Onnet',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'onnet'),
            }
            var trace3 = {
                type: 'bar',
                name: 'Offnet',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'offnet'),
            }
            var trace4 = {
                type: 'bar',
                name: 'Others',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'others'),
            }
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
                text:text.map(String),
                textposition:'auto',
            };
            var data_bar = [trace4, trace1, trace3, trace2, trace5];
            var data1 = [trace7]
            var layout_bar = {
                autosize: true,
                width: 800,
                height: 306,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' (' + unit + ')',
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

            var layout1 = {
                autosize: true,
                width: 1300,
                height: 250,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month,
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

            var intl_pie = jsonData.internationalSUm_pie;
            var nat_pie = jsonData.nationalSum_pie
            var onnet_pie = jsonData.onnetSum_pie;
            var offnet_pie = jsonData.ofnetSum_pie;
            var other_pie = jsonData.othersSum_pie;
            intl_pie = parseInt(intl_pie);
            nat_pie = parseInt(nat_pie);
            onnet_pie = parseInt(onnet_pie);
            offnet_pie = parseInt(offnet_pie);
            other_pie = parseInt(other_pie);

            var tracepie = {
                type: 'pie',
                values: [intl_pie, nat_pie, onnet_pie, offnet_pie, other_pie],
                labels: ['INTL', 'National', 'Onnet', 'Offnet', 'Others'],
                textinfo: 'percent',
				textposition: "auto",
                hoverinfo: "percent+label+value",
            }

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
            Plotly.newPlot('BarChart_2', data_bar, layout_bar, config);
            Plotly.newPlot('PieChart_2', data_pie, layout_pie, config);
            Plotly.newPlot('BarChart_percent_2', data1, layout1, config);
        }
    });
}

function Table_2_line() {
    $.ajax({
        url: 'https://10.26.194.52:8743/Dashboard/dashboard/traffic/trafficRevenueGraph?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
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
            var onnet = '';
            var offnet = '';
            var national = '';
            var intl = '';
            var others = '';
            var percent = '';
            var totalRev = '';
            var sum_onnet = jsonData.onnetSum;
            var sum_offnet = jsonData.offnetSUm;
            var sum_national = jsonData.nationalSum;
            var sum_intl = jsonData.internationalSum;
            var sum_others = jsonData.othersSum;
            var sum_total = jsonData.totalSUm;
            var avg_percnt = jsonData.averagepst;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var col = demodata[i];
                if (col.pst > 0 + '%') {
                    color[i] = 'success';
                }
                if (col.pst < 0 + '%') {
                    color[i] = 'danger';
                }
            }

            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                national += '<tc><td scope="col" style="text-align:right">' + data.national + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                intl += '<tc><td scope="col" style="text-align:right">' + data.international + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                onnet += '<tc><td scope="col" style="text-align:right">' + data.onnet + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                offnet += '<tc><td scope="col" style="text-align:right">' + data.offnet + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                others += '<tc><td scope="col" style="text-align:right">' + data.others + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                totalRev += '<tc><td scope="col" style="text-align:right"><b>' + data.total + '</b></td></tc>';
            });
            $.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></td></tc>';
            });
            // $.each(demodata, function (index, data) {
            //     percent += '<tc><th scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></th></tc>';
            // });

            '<style>'
            'table '
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#table2').append('<table style="width:0px id="tablevalue_middle" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                + '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th>Events</th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="tablevalue_middle">'
                + '<td><b>' + "INTL" + '</b></td>'
                + '<td style="text-align:right">' + sum_intl + intl + '</td>'
                + '<tr>'
                + '<td><b>' + "National" + '</b></td>'
                + '<td style="text-align:right">' + sum_national + national + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Onnet" + '</b></td>'
                + '<td style="text-align:right">' + sum_onnet + onnet + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Offnet" + '</b></td>'
                + '<td style="text-align:right">' + sum_offnet + offnet + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Others" + '</b></td>'
                + '<td style="text-align:right">' + sum_others + others + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Daily Growth" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percnt + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + "Total Record Count" + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_total + totalRev + '</b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )

            var trace1 = {
                type: 'line',
                name: 'INTL',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'international'),
            }
            var trace5 = {
                type: 'line',
                name: 'INTL',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'national'),
            }
            var trace2 = {
                type: 'line',
                name: 'Onnet',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'onnet'),
            }
            var trace3 = {
                type: 'line',
                name: 'Offnet',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'offnet'),
            }
            var trace4 = {
                type: 'line',
                name: 'Others',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'others'),
            }
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
                text:text.map(String),
                textposition:'auto',
            };
            var data_bar = [trace4, trace1, trace3, trace2, trace5];
            var data1 = [trace7]
            var layout_bar = {
                autosize: true,
                width: 800,
                height: 306,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' (' + unit + ')',
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

            var layout1 = {
                autosize: true,
                width: 1300,
                height: 250,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month,
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

            var intl_pie = jsonData.internationalSUm_pie;
            var nat_pie = jsonData.nationalSum_pie
            var onnet_pie = jsonData.onnetSum_pie;
            var offnet_pie = jsonData.ofnetSum_pie;
            var other_pie = jsonData.othersSum_pie;
            intl_pie = parseInt(intl_pie);
            nat_pie = parseInt(nat_pie);
            onnet_pie = parseInt(onnet_pie);
            offnet_pie = parseInt(offnet_pie);
            other_pie = parseInt(other_pie);

            var tracepie = {
                type: 'pie',
                values: [intl_pie, nat_pie, onnet_pie, offnet_pie, other_pie],
                labels: ['INTL', 'National', 'Onnet', 'Offnet', 'Others'],
                textinfo: 'percent',
				textposition: "auto",
                hoverinfo: "percent+label+value",
            }

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
            Plotly.newPlot('BarChart_2', data_bar, layout_bar, config);
            Plotly.newPlot('PieChart_2', data_pie, layout_pie, config);
            Plotly.newPlot('BarChart_percent_2', data1, layout1, config);
        }
    });
}
function Table_3() {
    $.ajax({
        url: 'https://10.26.194.52:8743/Dashboard/dashboard/traffic/trafficRevenueCategory?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.trafficCategoryRevList.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            var demodata = jsonData.trafficCategoryRevList;
            var day = '';
            var deleted = '';
            var delivered = '';
            var expired = '';
            var rejected = '';
            var submitted = '';
            var total = '';
            var percent='';
            var sum_deleted = jsonData.deletedSum;
            var sum_delivered = jsonData.deliverdSum;
            var sum_expired = jsonData.expiredSum;
            var sum_rejected = jsonData.rejectedSum;
            var sum_submitted = jsonData.submitedSum;
            var sum_total = jsonData.totalrevSum;
            var avg_percnt=jsonData.avegpst;

            var color = new Array(demodata.length);
            for (var i = 0; i < demodata.length; i++) {
                var col = demodata[i];
                if (col.pst > 0 + '%') {
                    color[i] = 'success';
                }
                if (col.pst < 0 + '%') {
                    color[i] = 'danger';
                }
            }

            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                deleted += '<tc><td scope="col" style="text-align:right">' + data.deleted + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                delivered += '<tc><td scope="col" style="text-align:right">' + data.delivered + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                expired += '<tc><td scope="col" style="text-align:right">' + data.expired + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                rejected += '<tc><td scope="col" style="text-align:right">' + data.rejected + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                submitted += '<tc><td scope="col" style="text-align:right">' + data.submited + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                total += '<tc><td scope="col" style="text-align:right"><b>' + data.total + '</b></td></tc>';
            });
            $.each(demodata, function (index, data) {
                percent += '<tc><th scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></th></tc>';
            });

            '<style>'
            'table '
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#table3').append('<table style="width:0px id="tablevalue_bottom" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                + '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th>Events</th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="tablevalue_bottom">'
                + '<td><b>' + "Deleted" + '</b></td>'
                + '<td style="text-align:right">' + sum_deleted + deleted + '</td>'
                + '<tr>'
                + '<td><b>' + "Delivered" + '</b></td>'
                + '<td style="text-align:right">' + sum_delivered + delivered + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Expired" + '</b></td>'
                + '<td style="text-align:right">' + sum_expired + expired + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Rejected" + '</b></td>'
                + '<td style="text-align:right">' + sum_rejected + rejected + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Submitted" + '</b></td>'
                + '<td style="text-align:right">' + sum_submitted + submitted + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Daily Growth" + '</b></td>'
                + '<td style="text-align:right"><mark><b>' + avg_percnt + percent + '</b></mark></td>'
                + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + "Total Record Count" + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_total + total + '</b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            var trace1 = {
                type: 'bar',
                name: 'Deleted',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'deleted'),
            }

            var trace2 = {
                type: 'bar',
                name: 'Delivered',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'delivered'),
            }
            var trace3 = {
                type: 'bar',
                name: 'Expired',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'expired'),
            }
            var trace4 = {
                type: 'bar',
                name: 'Rejected',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'rejected'),
            }
            var trace5 = {
                type: 'bar',
                name: 'Submitted',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'submited'),
            }
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
                text:text.map(String),
                textposition:'auto',
            };
            var data1 = [trace7];

            var data_bar = [trace5, trace2, trace3, trace1, trace4];

            var layout_bar = {
                autosize: true,
                width: 800,
                height: 306,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' (' + unit + ')',
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
            //deletedPie":"37181910","deliverdPie":"2001294455","expiredPie":"213689732","rejectedPie":"0","submitedPie":"2252452739"
            var deleted_pie = jsonData.deletedPie;
            var delivered_pie = jsonData.deliverdPie;
            var expired_pie = jsonData.expiredPie;
            var rejected_pie = jsonData.rejectedPie;
            var submitted_pie = jsonData.submitedPie;
            deleted_pie = parseInt(deleted_pie);
            delivered_pie = parseInt(delivered_pie);
            expired_pie = parseInt(expired_pie);
            rejected_pie = parseInt(rejected_pie);
            submitted_pie = parseInt(submitted_pie);

            var tracepie = {
                type: 'pie',
                values: [deleted_pie, delivered_pie, expired_pie, rejected_pie, submitted_pie],
                labels: ['Deleted', 'Delivered', 'Expired', 'Rejected', 'Submitted'],
                textinfo: 'percent',
				textposition: "auto",
                hoverinfo: "percent+label+value",
            }

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
            var layout1 = {
                autosize: true,
                width: 1300,
                height: 250,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month,
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
            Plotly.newPlot('BarChart_3', data_bar, layout_bar, config);
            Plotly.newPlot('PieChart_3', data_pie, layout_pie, config);
            Plotly.newPlot('BarChart_percent_3', data1, layout1, config);

        }
    });
}

function Table_3_line() {
    $.ajax({
        url: 'https://10.26.194.52:8743/Dashboard/dashboard/traffic/trafficRevenueCategory?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
        dataType: 'json',
        success: function (jsonData) {
            function unpack(data, key) {
                return data.trafficCategoryRevList.map(function (row) {
                    return row[key];
                });
            }
            var Month = jsonData.month;
            var demodata = jsonData.trafficCategoryRevList;
            var day = '';
            var deleted = '';
            var delivered = '';
            var expired = '';
            var rejected = '';
            var submitted = '';
            var total = '';
            var sum_deleted = jsonData.deletedSum;
            var sum_delivered = jsonData.deliverdSum;
            var sum_expired = jsonData.expiredSum;
            var sum_rejected = jsonData.rejectedSum;
            var sum_submitted = jsonData.submitedSum;
            var sum_total = jsonData.totalrevSum;

            $.each(demodata, function (index, data) {
                day += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
            });
            $.each(demodata, function (index, data) {
                deleted += '<tc><td scope="col" style="text-align:right">' + data.deleted + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                delivered += '<tc><td scope="col" style="text-align:right">' + data.delivered + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                expired += '<tc><td scope="col" style="text-align:right">' + data.expired + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                rejected += '<tc><td scope="col" style="text-align:right">' + data.rejected + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                submitted += '<tc><td scope="col" style="text-align:right">' + data.submited + '</td></tc>';
            });
            $.each(demodata, function (index, data) {
                total += '<tc><td scope="col" style="text-align:right"><b>' + data.total + '</b></td></tc>';
            });
            // $.each(demodata, function (index, data) {
            //     percent += '<tc><th scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></th></tc>';
            // });

            '<style>'
            'table '
            '{'
            'table.table table-bordered mb-0'
            'width: 100%'
            '}'
            $('#table3').append('<table style="width:0px id="tablevalue_bottom" class="table table-bordered mb-0">'
                + '<style>'
                + ' mark {'
                + 'background-color: orange;'
                + 'color: black;'
                + ' border-radius: 25px;}'
                + '</style>'
                + '<colgroup>'
                + '<thead class="thead-dark">'
                + '<tr>'
                + '<th>Events</th>'
                + '<th>' + Month + day + '</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody id="tablevalue_bottom">'
                + '<td><b>' + "Deleted" + '</b></td>'
                + '<td style="text-align:right">' + sum_deleted + deleted + '</td>'
                + '<tr>'
                + '<td><b>' + "Delivered" + '</b></td>'
                + '<td style="text-align:right">' + sum_delivered + delivered + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Expired" + '</b></td>'
                + '<td style="text-align:right">' + sum_expired + expired + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Rejected" + '</b></td>'
                + '<td style="text-align:right">' + sum_rejected + rejected + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td><b>' + "Submitted" + '</b></td>'
                + '<td style="text-align:right">' + sum_submitted + submitted + '</td>'
                + '</tr>'
                // + '<tr>'
                // + '<td><b>' + "Daily Growth" + '</b></td>'
                // + '<td style="text-align:right"><mark><b>' + avg_percnt + percent + '</b></mark></td>'
                // + '</tr>'
                + '<tr class="bg-secondary text-white">'   // column highlighter
                + '<td><b>' + "Total Record Count" + '</b></td>'
                + '<td style="text-align:right"><b>' + sum_total + total + '</b></td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
            )
            // /deletedSum":"37.182","deliverdSum":"2,001.294","expiredSum":"213.69","rejectedSum":"0","submitedSum":"2,252.453","totalrevSum":"4,504.619","avegpst":"0.285%",","trafficCategoryRevList":[{"day":"01","deleted":"1.218","delivered":"68.385","expired":"6.832","rejected":"0","submited":"76.434","total":"152.869
            var trace1 = {
                type: 'line',
                name: 'Deleted',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'deleted'),
            }

            var trace2 = {
                type: 'line',
                name: 'Delivered',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'delivered'),
            }
            var trace3 = {
                type: 'line',
                name: 'Expired',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'expired'),
            }
            var trace4 = {
                type: 'line',
                name: 'Rejected',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'rejected'),
            }
            var trace5 = {
                type: 'line',
                name: 'Submitted',
                x: unpack(jsonData, 'day'),
                y: unpack(jsonData, 'submited'),
            }
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
                text:text.map(String),
                textposition:'auto',
            };
            var data1 = [trace7];
            var data_line = [trace5, trace2, trace3, trace1, trace4];
            var layout_bar = {
                autosize: true,
                width: 800,
                height: 306,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month + ' (' + unit + ')',
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
            //deletedPie":"37181910","deliverdPie":"2001294455","expiredPie":"213689732","rejectedPie":"0","submitedPie":"2252452739"
            var deleted_pie = jsonData.deletedPie;
            var delivered_pie = jsonData.deliverdPie;
            var expired_pie = jsonData.expiredPie;
            var rejected_pie = jsonData.rejectedPie;
            var submitted_pie = jsonData.submitedPie;
            deleted_pie = parseInt(deleted_pie);
            delivered_pie = parseInt(delivered_pie);
            expired_pie = parseInt(expired_pie);
            rejected_pie = parseInt(rejected_pie);
            submitted_pie = parseInt(submitted_pie);

            var tracepie = {
                type: 'pie',
                values: [deleted_pie, delivered_pie, expired_pie, rejected_pie, submitted_pie],
                labels: ['Deleted', 'Delivered', 'Expired', 'Rejected', 'Submitted'],
                textinfo: 'percent',
				textposition: "auto",
                hoverinfo: "percent+label+value",
            }

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
            var layout1 = {
                autosize: true,
                width: 1300,
                height: 250,
                dragmode: "pan",
                barmode: "group",
                showlegend: true,
                hoverinfo: 'y',
                displayModeBar: false,

                xaxis: {
                    title: Month,
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
            Plotly.newPlot('BarChart_3', data_line, layout_bar, config);
            Plotly.newPlot('PieChart_3', data_pie, layout_pie, config);
            Plotly.newPlot('BarChart_percent_3', data1, layout1, config);
        }
    });
}
