$(document).ready(function () {
	Table_top_bar();
	// Pie_top();
	Table_offnet_bar();
//	Pie_offnet();
	// Table_incoming_bar();
	// incoming_pie();
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
// console.log(month);

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
	// document.getElementById('bottomTable').innerHTML = chartMonth + ' ' + chartYear + ' (In ' + unit + ')';

	//console.log(chartMonth, chartYear);
	if (chartType == 'Bar' && (unit == 'Thousand' || unit == 'Million' || unit == 'Billion')) {
		//for clearing the data
		// Incoming_line.innerHTML = '';
		//Offnet_line.innerHTML = '';
		//Percent_line.innerHTML = '';
		//Daily_line.innerHTML = '';
		offnet.innerHTML = '';
		Offnet_barchart.innerHTML = '';
		Percent_barchart.innerHTML = '';
		Daily_barchart.innerHTML = '';
		Offnet_barchart_percent.innerHTML='';
		// incoming.innerHTML = '';
		ntable.innerHTML = '';
		pieChart.innerHTML = '';
		pieOffnet.innerHTML = '';
		// pieincoming.innerHTML = '';
		Table_top_bar();
		// Pie_top();
		Table_offnet_bar();
		// Pie_offnet();
		// Table_incoming_bar();
		// incoming_pie();
	}
	if (chartType == 'Line' && (unit == 'Thousand' || unit == 'Million' || unit == 'Billion')) {
		//for clearing the data
		// incoming_barchart.innerHTML = '';
		Offnet_barchart.innerHTML = '';
		Percent_barchart.innerHTML = '';
		Daily_barchart.innerHTML = '';
		offnet.innerHTML = '';
		Offnet_barchart_percent.innerHTML='';

		//Offnet_line.innerHTML = '';
		//Percent_line.innerHTML = '';
		//Daily_line.innerHTML = '';

		// incoming.innerHTML = '';
		ntable.innerHTML = '';
		pieChart.innerHTML = '';
		pieOffnet.innerHTML = '';
		// pieincoming.innerHTML = '';
		Table_top_line();
		// Pie_top();
		Table_offnet_line();
		// Pie_offnet();
		// Table_incoming_line();
		// incoming_pie();
	}
}

//reload button on filter
function Reload() {
	window.location.reload();
}

//Top table and 2 bar charts
function Table_top_bar() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getDayByDayRev?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.eventValueList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;
			// var data=jsonData.eventValueList;
			var demodata = jsonData.eventValueList;
			var data1 = new Array(demodata.length);
			var name = new Array(demodata.length);
			var value = new Array(demodata.length);
			var call_bar = new Array(demodata.length);
			var gprs_bar = new Array(demodata.length);
			var sms_bar = new Array(demodata.length);
			var ussd_bar = new Array(demodata.length);
			var video_bar = new Array(demodata.length);
			var voice_bar = new Array(demodata.length);
			

			var obj = new Array(demodata.length); //declare it a 2d array
			$.each(demodata, function (index, data) {
				count = data.eventlistsize;
			});
			// console.log(count);


			for (var i = 0; i < demodata.length; i++) {
				obj[i] = demodata[i];
				// console.log(obj[i]);
			}
			//loop for bar chart.....................
			for (var i = 0; i < obj.length; i++) {
				// data1[i]=obj[i].day;
				data1[i] = obj[i].finaldata;
				// data1[i]=data1[i].fieldname;
				for (var j = 0; j < count; j++) {
					name[j] = data1[i][j].eventname;
					value[j] = data1[i][j].eventRev;
				}
			}

			var demodata = jsonData.eventValueList;
			var day ='';
			var callfrwd = '';
			var gprs = '';
			var smsrev = '';
			var ussd = '';
			var videotele = '';
			var voice = '';
			var total_rev = '';
			var percent = '';
			var total_voice = jsonData.eventRevMonthlysumList.VOICE;
			var total_sms = jsonData.eventRevMonthlysumList.SMS;
			var total_callfrwd = jsonData.eventRevMonthlysumList.CALL_FORWARD;
			var total_gprs = jsonData.eventRevMonthlysumList.GPRS;
			var total_ussd = jsonData.eventRevMonthlysumList.USSD;
			var total_videotele = jsonData.eventRevMonthlysumList.VIDEO_TELEPHONY;
			var sum_totalRev = jsonData.sumoftotalRev;
			var avg_percent=jsonData.averagePst;

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
			// for(var i=0;i<obj.length;i++)
			// {
			// 	day[i]=jsonData.eventRevMonthlysumList.day[i];
			// 	console.log(day[i]);
			// }
			$.each(demodata, function (index, data) {
				day += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
			});
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 0; j < 1; j++) {
					value[j] = data1[i][j].eventRev;
					call_bar[i] = value[j]
					// console.log(call[i]);
					callfrwd += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 1; j < 2; j++) {
					value[j] = data1[i][j].eventRev;
					gprs_bar[i] = value[j];
					gprs += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 2; j < 3; j++) {
					value[j] = data1[i][j].eventRev;
					sms_bar[i] = value[j];
					smsrev += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 3; j < 4; j++) {
					value[j] = data1[i][j].eventRev;
					ussd_bar[i] = value[j];
					ussd += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 4; j < 5; j++) {
					value[j] = data1[i][j].eventRev;
					video_bar[i] = value[j];
					videotele += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 5; j < 6; j++) {
					value[j] = data1[i][j].eventRev;
					voice_bar[i] = value[j];
					voice += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			$.each(demodata, function (index, data) {
				total_rev += '<tc><td scope="col" style="text-align:right"><b>' + data.totalrev + '</b></td></tc>';
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
				+ '<td><b>' + name[0] + '</b></td>'
				+ '<td style="text-align:right">' + total_callfrwd + callfrwd + '</td>'
				// + '<td style="text-align:right">' +   '</td>'
				// +'}'

				+ '<tr>'
				+ '<td><b>' + name[1] + '</b></td>'
				+ '<td style="text-align:right">' + total_gprs + gprs + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + name[2] + '</b></td>'
				+ '<td style="text-align:right">' + total_sms + smsrev + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + name[3] + '</b></td>'
				+ '<td style="text-align:right">' + total_ussd + ussd + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + name[4] + '</b></td>'
				+ '<td style="text-align:right">' + total_videotele + videotele + '</td>'
				+ '</tr>'
				// + '<tr class="bg-secondary text-white">'   // column highlighter
				+ '<td><b>' + name[5] + '</b></td>'
				+ '<td style="text-align:right">' + total_voice + voice + '</td>'
				+ '</tr>'
				+ '<td><b>' + "DAILY GROWTH" + '</b></td>'
				+ '<td style="text-align:right"><mark><b>' + avg_percent + percent + '</b></mark></td>'
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
				text: text.map(String),
				textposition:'auto',
			};
			var tracepie = {
				type: 'pie',
				values: [total_voice, total_sms, total_callfrwd, total_gprs, total_ussd, total_videotele],
				labels: ['Voice', 'SMS', 'Call Forward', 'GPRS', 'USSD', 'Video Telephony'],
				textinfo: 'percent',
				textposition: "auto",
				hoverinfo: "percent+label+value",
				// insidetextorientation: "radial",
			};
			var data = [trace3, trace6, trace4, trace2, trace1, trace5];
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

			Plotly.newPlot('pieChart', datapie, layoutpie, config);
			Plotly.newPlot('Daily_barchart', data, layout, config);
			Plotly.newPlot('Percent_barchart', data1, layout1, config);
		}
	})
}
//top table and line charts
function Table_top_line() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getDayByDayRev?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.eventValueList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;
			// var data=jsonData.eventValueList;
			var demodata = jsonData.eventValueList;
			var data1 = new Array(demodata.length);
			var name = new Array(demodata.length);
			var value = new Array(demodata.length);
			var call_bar = new Array(demodata.length);
			var gprs_bar = new Array(demodata.length);
			var sms_bar = new Array(demodata.length);
			var ussd_bar = new Array(demodata.length);
			var video_bar = new Array(demodata.length);
			var voice_bar = new Array(demodata.length);


			var obj = new Array(demodata.length); //declare it a 2d array
			$.each(demodata, function (index, data) {
				count = data.eventlistsize;
			});
			// console.log(count);


			for (var i = 0; i < demodata.length; i++) {
				obj[i] = demodata[i];
				// console.log(obj[i]);
			}
			//loop for bar chart.....................
			for (var i = 0; i < obj.length; i++) {
				// data1[i]=obj[i].day;
				data1[i] = obj[i].finaldata;
				// data1[i]=data1[i].fieldname;
				for (var j = 0; j < count; j++) {
					name[j] = data1[i][j].eventname;
					value[j] = data1[i][j].eventRev;

					// datarev += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';


					// console.log(data1[i]);
					// console.log(value[j]);
					// console.log();
					//console.log(data1[i][j].eventname);

				}
			}
			// for (var i = 0; i < obj.length; i++) {

			// 	console.log(value[i]);
			// }

			// for (var j = 0; j < count; j++) {
			// 		var i=1;
			// 		name[j]=data1[i][j].eventname;
			// 		value[j]=data1[i][j].eventRev;

			// 	console.log(name[j]);
			// 	console.log(value[j]);

			// }

			var demodata = jsonData.eventValueList;
			// function unpack(data, key) {
			// 	return data.demodata.map(function (row) {
			// 		return row[key];
			// 	});
			// }
			var day = '';
			// var count='';
			var callfrwd = '';
			var gprs = '';
			var smsrev = '';
			var ussd = '';
			var videotele = '';
			var voice = '';
			var total_rev = '';
			var percent = '';
			var total_voice = jsonData.eventRevMonthlysumList.VOICE;
			var total_sms = jsonData.eventRevMonthlysumList.SMS;
			var total_callfrwd = jsonData.eventRevMonthlysumList.CALL_FORWARD;
			var total_gprs = jsonData.eventRevMonthlysumList.GPRS;
			var total_ussd = jsonData.eventRevMonthlysumList.USSD;
			var total_videotele = jsonData.eventRevMonthlysumList.VIDEO_TELEPHONY;
			var sum_totalRev = jsonData.sumoftotalRev;
			var avg_percent=jsonData.averagePst;

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
				data1[i] = obj[i].finaldata;
				for (var j = 0; j < 1; j++) {
					value[j] = data1[i][j].eventRev;
					call_bar[i] = value[j]
					// console.log(call[i]);
					callfrwd += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 1; j < 2; j++) {
					value[j] = data1[i][j].eventRev;
					gprs_bar[i] = value[j];
					gprs += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 2; j < 3; j++) {
					value[j] = data1[i][j].eventRev;
					sms_bar[i] = value[j];
					smsrev += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 3; j < 4; j++) {
					value[j] = data1[i][j].eventRev;
					ussd_bar[i] = value[j];
					ussd += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 4; j < 5; j++) {
					value[j] = data1[i][j].eventRev;
					video_bar[i] = value[j];
					videotele += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			for (var i = 0; i < obj.length; i++) {
				data1[i] = obj[i].finaldata;
				for (var j = 5; j < 6; j++) {
					value[j] = data1[i][j].eventRev;
					voice_bar[i] = value[j];
					voice += '<tc><td scope="col" style="text-align:right">' + value[j] + '</td></tc>';
				}
			}
			$.each(demodata, function (index, data) {
				total_rev += '<tc><td scope="col" style="text-align:right"><b>' + data.totalrev + '</b></td></tc>';
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
				+ '<td><b>' + name[0] + '</b></td>'
				+ '<td style="text-align:right">' + total_callfrwd + callfrwd + '</td>'
				// + '<td style="text-align:right">' +   '</td>'
				// +'}'

				+ '<tr>'
				+ '<td><b>' + name[1] + '</b></td>'
				+ '<td style="text-align:right">' + total_gprs + gprs + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + name[2] + '</b></td>'
				+ '<td style="text-align:right">' + total_sms + smsrev + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + name[3] + '</b></td>'
				+ '<td style="text-align:right">' + total_ussd + ussd + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + name[4] + '</b></td>'
				+ '<td style="text-align:right">' + total_videotele + videotele + '</td>'
				+ '</tr>'
				// + '<tr class="bg-secondary text-white">'   // column highlighter
				+ '<td><b>' + name[5] + '</b></td>'
				+ '<td style="text-align:right">' + total_voice + voice + '</td>'
				+ '</tr>'
				+ '<td><b>' + "DAILY GROWTH" + '</b></td>'
				+ '<td style="text-align:right"><mark><b>' + avg_percent + percent + '</b></mark></td>'
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
				values: [total_voice, total_sms, total_callfrwd, total_gprs, total_ussd, total_videotele],
				labels: ['Voice', 'SMS', 'Call Forward', 'GPRS', 'USSD', 'Video Telephony'],
				textinfo: 'percent',
				textposition: "auto",
				//textposition: "inside",
				hoverinfo: "percent+label+value",
				// insidetextorientation: "radial",
			};
			var data = [trace3, trace6, trace4, trace2, trace1, trace5];
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

			Plotly.newPlot('pieChart', datapie, layoutpie, config);
			Plotly.newPlot('Daily_barchart', data, layout, config);
			Plotly.newPlot('Percent_barchart', data1, layout1, config);
		}
	})
}
//top pie chart
// function Pie_top() {
// 	$.ajax({
// 		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getTotalRevByMonthly?year=' + chartYear + '&month=' + chartMonth,
// 		dataType: 'json',
// 		//var a = (jsonData.frodcaseClose);
// 		success: function (jsonData) {
// 			function unpack(data, key) {
// 				return data.totalrevmonthlist.map(function (row) {
// 					return row[key];
// 				});
// 			}
// 			var trace1 = {
// 				type: 'pie',
// 				values: unpack(jsonData, "values"),
// 				labels: unpack(jsonData, "label"),
// 				textinfo: 'none',
// 				//textposition: "inside",
// 				hoverinfo: "percent+label+value",
// 				// insidetextorientation: "radial",
// 			};
// 			var data = [trace1];

// 			var layout = {
// 				showlegend: true,

// 				margin: { "t": 30, "b": 0, "l": 40, "r": 0 },
// 				height: 310,
// 				width: 400,
// 				displayModeBar: false,
// 				font: {
// 					family: 'Arial, Helvetica, sans-serif',
// 				}
// 			};
// 			var config = {
// 				responsive: true,
// 				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
// 				displaylogo: false,
// 			}
// 			Plotly.newPlot('pieChart', data, layout, config);
// 		}
// 	})
// }
//center table and bar charts
function Table_offnet_bar() {
	$.ajax({

		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getCategoryByrev?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.categoryByrevList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;
			var demodata = jsonData.categoryByrevList;
			var tableDay = '';
			var onnnet = '';
			var offnet = '';
			var intl = '';
			var national='';
			var percent='';
			var others = '';
			var total_Day = '';
			var onnet_sum = jsonData.sumOfOnnet;
			var offnet_sum = jsonData.sumOfOffnet;
			var intl_sum = jsonData.sumOfInternationalrev;
			var national_sum=jsonData.sumOfNationalrev;
			var others_sum = jsonData.sumOfOthers;
			var avg_percent=jsonData.monthlyAveragepst;
			var total_totalrev = jsonData.sumOfTotal;

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
				onnnet += '<tc><td scope="col" style="text-align:right">' + data.onnnet + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				tableDay += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
			});
			$.each(demodata, function (index, data) {
				offnet += '<tc><td scope="col"  style="text-align:right">' + data.offnet + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				intl += '<tc><td scope="col" style="text-align:right">' + data.international + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				national += '<tc><td scope="col" style="text-align:right">' + data.national + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				others += '<tc><td scope="col" style="text-align:right">' + data.others + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				total_Day += '<tc><td scope="col" style="text-align:right"><b>' + data.totalRev + '</b></td></tc>';
			});
			$.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></td></tc>';
            });

			'<style>'
			'table '
			'{'
			'table.table table-bordered mb-0'
			'width: 100%'
			'}'
			$('#offnet').append('<table style="width:0px id="tablevalue_offnet" class="table table-bordered mb-0">'
				+ '<colgroup>'
				+ '<thead class="thead-dark">'
				+ '<tr>'
				+ '<th>Events</th>'
				+ '<th>' + Month + tableDay + '</th>'
				+ '</tr>'
				+ '</thead>'
				+ '<tbody id="tablevalue_offnet">'
				+ '<td><b>' + "ONNET" + '</b></td>'
				+ '<td style="text-align:right">' + onnet_sum + onnnet + '</td>'
				+ '<tr>'
				+ '<td><b>' + "OFFNET" + '</b></td>'
				+ '<td style="text-align:right">' + offnet_sum + offnet + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "NATIONAL" + '</b></td>'
				+ '<td style="text-align:right">' + national_sum + national + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "INTERNATIONAL" + '</b></td>'
				+ '<td style="text-align:right">' + intl_sum + intl + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "Others" + '</b></td>'
				+ '<td style="text-align:right">' + others_sum + others + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "Daily Growth" + '</b></td>'
				+ '<td style="text-align:right"><mark><b>' + avg_percent + percent + '</b></mark></td>'
				+ '</tr>'
				+ '<tr class="bg-secondary text-white">'
				+ '<td><b>' + "Total Revenue" + '</b></td>'
				+ '<td style="text-align:right"><b>' + total_totalrev + total_Day + '</b></td>'
				+ '</tr>'
				+ '</tbody>'
				+ '</table>'
			)
			var trace1 = {
				type: 'bar',
				name: 'Onnet Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "onnnet"),
			};
			var trace2 = {
				type: 'bar',
				name: 'Offnet Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "offnet"),
			};
			var trace3 = {
				type: 'bar',
				name: 'National Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "national"),
			};
			var trace4 = {
				type: 'bar',
				name: 'International Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "international"),
			};
			var trace5 = {
				type: 'bar',
				name: 'Other Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "others"),
			};
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
				textposition:'auto'
			};
			var data1=[trace7];
			var data = [trace5, trace4, trace2, trace1,trace3];
			
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

			var pie_onnet=jsonData.onnetRev_pie;
			var pie_offnet=jsonData.offnetRev_pie;
			var pie_national=jsonData.nationalrev_pie;
			var pie_intl=jsonData.internationalrev_pie;
			var pie_others=jsonData.othersrev_pie;

			pie_onnet = parseInt(pie_onnet);
			pie_offnet=parseInt(pie_offnet);
			pie_national=parseInt(pie_national);
			pie_intl=parseInt(pie_intl);
			pie_others=parseInt(pie_others);

			var tracepie = {
				type: 'pie',
				values: [pie_onnet,pie_offnet,pie_national,pie_intl,pie_others],
				labels: ['Onnet','Offnet','National','International','Others'],
				textinfo: 'percent',
				textposition: "auto",
				//textposition: "inside",
				hoverinfo: "percent+label+value",
				// insidetextorientation: "radial",
			};

			var datapie = [tracepie];

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
			Plotly.newPlot('Offnet_barchart', data, layout, config);
			Plotly.newPlot('Offnet_barchart_percent', data1, layout1, config);
			Plotly.newPlot('pieOffnet', datapie, layoutpie, config);
		
		}
	})
}
//center table and line charts
function Table_offnet_line() {
	$.ajax({

		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getCategoryByrev?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.categoryByrevList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;
			var demodata = jsonData.categoryByrevList;
			var tableDay = '';
			var onnnet = '';
			var offnet = '';
			var intl = '';
			var national='';
			var percent='';
			var others = '';
			var total_Day = '';
			var onnet_sum = jsonData.sumOfOnnet;
			var offnet_sum = jsonData.sumOfOffnet;
			var intl_sum = jsonData.sumOfInternationalrev;
			var national_sum=jsonData.sumOfNationalrev;
			var others_sum = jsonData.sumOfOthers;
			var avg_percent=jsonData.monthlyAveragepst;
			var total_totalrev = jsonData.sumOfTotal;

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
				onnnet += '<tc><td scope="col" style="text-align:right">' + data.onnnet + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				tableDay += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
			});
			$.each(demodata, function (index, data) {
				offnet += '<tc><td scope="col"  style="text-align:right">' + data.offnet + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				intl += '<tc><td scope="col" style="text-align:right">' + data.international + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				national += '<tc><td scope="col" style="text-align:right">' + data.national + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				others += '<tc><td scope="col" style="text-align:right">' + data.others + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				total_Day += '<tc><td scope="col" style="text-align:right"><b>' + data.totalRev + '</b></td></tc>';
			});
			$.each(demodata, function (index, data) {
                percent += '<tc><td scope="col" style="text-align:right"> <span class="badge badge-' + color[index] + '"><b>' + data.pst + '</b></span></td></tc>';
            });

			'<style>'
			'table '
			'{'
			'table.table table-bordered mb-0'
			'width: 100%'
			'}'
			$('#offnet').append('<table style="width:0px id="tablevalue_offnet" class="table table-bordered mb-0">'
				+ '<colgroup>'
				+ '<thead class="thead-dark">'
				+ '<tr>'
				+ '<th>Events</th>'
				+ '<th>' + Month + tableDay + '</th>'
				+ '</tr>'
				+ '</thead>'
				+ '<tbody id="tablevalue_offnet">'
				+ '<td><b>' + "ONNET" + '</b></td>'
				+ '<td style="text-align:right">' + onnet_sum + onnnet + '</td>'
				+ '<tr>'
				+ '<td><b>' + "OFFNET" + '</b></td>'
				+ '<td style="text-align:right">' + offnet_sum + offnet + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "NATIONAL" + '</b></td>'
				+ '<td style="text-align:right">' + national_sum + national + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "INTERNATIONAL" + '</b></td>'
				+ '<td style="text-align:right">' + intl_sum + intl + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "Others" + '</b></td>'
				+ '<td style="text-align:right">' + others_sum + others + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "Daily Growth" + '</b></td>'
				+ '<td style="text-align:right"><mark><b>' + avg_percent + percent + '</b></mark></td>'
				+ '</tr>'
				+ '<tr class="bg-secondary text-white">'
				+ '<td><b>' + "Total Revenue" + '</b></td>'
				+ '<td style="text-align:right"><b>' + total_totalrev + total_Day + '</b></td>'
				+ '</tr>'
				+ '</tbody>'
				+ '</table>'
			)
			var trace1 = {
				type: 'line',
				name: 'Onnet Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "onnnet"),
			};
			var trace2 = {
				type: 'line',
				name: 'Offnet Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "offnet"),
			};
			var trace3 = {
				type: 'line',
				name: 'National Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "national"),
			};
			var trace4 = {
				type: 'line',
				name: 'International Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "international"),
			};
			var trace5 = {
				type: 'line',
				name: 'Other Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "others"),
			};
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
			var data1=[trace7];
			var data = [trace5, trace4, trace2, trace1,trace3];
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

			var pie_onnet=jsonData.onnetRev_pie;
			var pie_offnet=jsonData.offnetRev_pie;
			var pie_national=jsonData.nationalrev_pie;
			var pie_intl=jsonData.internationalrev_pie;
			var pie_others=jsonData.othersrev_pie;

			pie_onnet = parseInt(pie_onnet);
			pie_offnet=parseInt(pie_offnet);
			pie_national=parseInt(pie_national);
			pie_intl=parseInt(pie_intl);
			pie_others=parseInt(pie_others);

			var tracepie = {
				type: 'pie',
				values: [pie_onnet,pie_offnet,pie_national,pie_intl,pie_others],
				labels: ['Onnet','Offnet','National','International','Others'],
				textinfo: 'percent',
				textposition: "auto",
				//textposition: "inside",
				hoverinfo: "percent+label+value",
				// insidetextorientation: "radial",
			};

			var datapie = [tracepie];

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
			Plotly.newPlot('Offnet_barchart', data, layout, config);
			Plotly.newPlot('Offnet_barchart_percent', data1, layout1, config);
			Plotly.newPlot('pieOffnet', datapie, layoutpie, config);
		
		}
	})
}
//center pie chart
// function Pie_offnet() {
// 	$.ajax({
// 		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getCategoryByRevMonthly?year=' + chartYear + '&month=' + chartMonth,
// 		dataType: 'json',
// 		//var a = (jsonData.frodcaseClose);
// 		success: function (jsonData) {
// 			function unpack(data, key) {
// 				return data.monthlyCategoryrevlist.map(function (row) {
// 					return row[key];
// 				});
// 			}
// 			var tracepie = {
// 				type: 'pie',
// 				values: unpack(jsonData, "value"),
// 				labels: unpack(jsonData, "label"),
// 				textinfo: 'none',
// 				textposition: "auto",
// 				hoverinfo: "percent+label+value",
// 				// insidetextorientation: "radial",
// 			};

// 			var datapie = [tracepie];

// 			var layoutpie = {
// 				showlegend: true,
// 				margin: { "t": 30, "b": 0, "l": 40, "r": 0 },
// 				height: 310,
// 				width: 400,
// 				displayModeBar: false,
// 				font: {
// 					family: 'Arial, Helvetica, sans-serif',
// 				}
// 			};
			
// 			Plotly.newPlot('pieOffnet', datapie, layoutpie, config);
// 		}
// 	})
// }
//bottom table and bar charts
// function Table_incoming_bar() {
// 	$.ajax({
// 		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/DayByEventTypeRev?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
// 		dataType: 'json',
// 		success: function (jsonData) {
// 			function unpack(data, key) {

// 				return data.categoryRevlist.map(function (row) {
// 					return row[key];
// 				});
// 			}
// 			var Month = jsonData.month;
// 			var incoming_sum_mnth = jsonData.sumOfIncomingRev;
// 			var outgoing_sum_mnth = jsonData.sumOfOutGoingRev;
// 			var others_sum_mnth = jsonData.sumOfOtherRev;
// 			var total_sum_mnth = jsonData.sumOfTotalRev;

// 			// incoming_sum_mnth = parseInt(incoming_sum_mnth);
// 			// outgoing_sum_mnth = parseInt(outgoing_sum_mnth);
// 			// others_sum_mnth = parseInt(others_sum_mnth);
// 			// total_sum_mnth = parseInt(total_sum_mnth);
// 			//	console.log(incoming_sum_mnth);

// 			var demodata = jsonData.categoryRevlist;
// 			var tableDay = '';
// 			var incoming1 = '';
// 			var outgoing1 = '';
// 			var others = '';
// 			var total_rev = '';

// 			$.each(demodata, function (index, data) {
// 				outgoing1 += '<tc><td scope="col" style="text-align:right">' + data.outgoing + '</td></tc>';
// 			});
// 			$.each(demodata, function (index, data) {
// 				incoming1 += '<tc><td scope="col"  style="text-align:right">' + data.incomming + '</td></tc>';
// 			});
// 			$.each(demodata, function (index, data) {
// 				others += '<tc><td scope="col"  style="text-align:right">' + data.others + '</td></tc>';
// 			});
// 			$.each(demodata, function (index, data) {
// 				tableDay += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
// 			});
// 			$.each(demodata, function (index, data) {
// 				total_rev += '<tc><td scope="cols" style="text-align:right"><b>' + data.totalrev + '</b></td></tc>';
// 			});
// 			'<style>'
// 			'table '
// 			'{'
// 			'table.table table-bordered mb-0'
// 			'width: 100%'
// 			'}'
// 			$('#incoming').append('<table style="width:0px id="tablevalue_incoming" class="table table-bordered mb-0">'
// 				+ '<colgroup>'
// 				+ '<thead class="thead-dark">'
// 				+ '<tr>'
// 				+ '<th>Events</th>'
// 				+ '<th>' + Month + tableDay + '</th>'
// 				+ '</tr>'
// 				+ '</thead>'
// 				+ '<tbody id="tablevalue_">'
// 				+ '<td><b>' + "OUTGOING" + '</b></td>'
// 				+ '<td style="text-align:right">' + outgoing_sum_mnth + outgoing1 + '</td>'
// 				+ '<tr>'
// 				+ '<td><b>' + "INCOMING" + '</b></td>'
// 				+ '<td style="text-align:right">' + incoming_sum_mnth + incoming1 + '</td>'
// 				+ '</tr>'
// 				+ '<tr>'
// 				+ '<td><b>' + "Others" + '</b></td>'
// 				+ '<td style="text-align:right">' + others_sum_mnth + others + '</td>'
// 				+ '</tr>'
// 				+ '<tr class="bg-secondary text-white">'
// 				+ '<td><b>' + "Total Revenue" + '</b></td>'
// 				+ '<td style="text-align:right"><b>' + total_sum_mnth + total_rev + '</b></td>'
// 				+ '</tr>'
// 				+ '</tbody>'
// 				+ '</table>'
// 			)

// 			var trace1 = {
// 				type: 'bar',
// 				name: 'Incoming',
// 				x: unpack(jsonData, "day"),
// 				y: unpack(jsonData, "incomming"),
// 			};
// 			var trace2 = {
// 				type: 'bar',
// 				name: 'Outgoing',
// 				x: unpack(jsonData, "day"),
// 				y: unpack(jsonData, "outgoing"),
// 			};
// 			var trace3 = {
// 				type: 'bar',
// 				name: 'Other',
// 				x: unpack(jsonData, "day"),
// 				y: unpack(jsonData, "others"),
// 			};

// 			var data = [trace2, trace1, trace3];
// 			var layout1 = {
// 				autosize: true,
// 				width: 800,
// 				height: 300,
// 				dragmode: "pan",
// 				barmode: "group",
// 				showlegend: true,
// 				hoverinfo: 'y',
// 				displayModeBar: false,

// 				xaxis: {
// 					title: Month + ' (' + unit + ')',
// 				},
// 				yaxis: {
// 					autorange: true,
// 					fixedrange: true,
// 					automargin: true,
// 				},
// 				font: {
// 					family: 'Arial, Helvetica, sans-serif',
// 				}
// 			};

// 			var config = {
// 				responsive: true,
// 				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
// 				displaylogo: false,
// 			}
// 			Plotly.newPlot('incoming_barchart', data, layout1, config);
// 		}
// 	})
// }
// //bottom table and line charts
// function Table_incoming_line() {
// 	$.ajax({
// 		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/DayByEventTypeRev?year=' + chartYear + '&month=' + chartMonth + '&currency=' + unit,
// 		dataType: 'json',
// 		success: function (jsonData) {
// 			function unpack(data, key) {

// 				return data.categoryRevlist.map(function (row) {
// 					return row[key];
// 				});
// 			}
// 			var Month = jsonData.month;
// 			var incoming_sum_mnth = jsonData.sumOfIncomingRev;
// 			var outgoing_sum_mnth = jsonData.sumOfOutGoingRev;
// 			var others_sum_mnth = jsonData.sumOfOtherRev;
// 			var total_sum_mnth = jsonData.sumOfTotalRev;

// 			// incoming_sum_mnth = parseInt(incoming_sum_mnth);
// 			// outgoing_sum_mnth = parseInt(outgoing_sum_mnth);
// 			// others_sum_mnth = parseInt(others_sum_mnth);
// 			// total_sum_mnth = parseInt(total_sum_mnth);
// 			//	console.log(incoming_sum_mnth);

// 			var demodata = jsonData.categoryRevlist;
// 			var tableDay = '';
// 			var incoming1 = '';
// 			var outgoing1 = '';
// 			var others = '';
// 			var total_rev = '';

// 			$.each(demodata, function (index, data) {
// 				outgoing1 += '<tc><td scope="col" style="text-align:right">' + data.outgoing + '</td></tc>';
// 			});
// 			$.each(demodata, function (index, data) {
// 				incoming1 += '<tc><td scope="col"  style="text-align:right">' + data.incomming + '</td></tc>';
// 			});
// 			$.each(demodata, function (index, data) {
// 				others += '<tc><td scope="col"  style="text-align:right">' + data.others + '</td></tc>';
// 			});
// 			$.each(demodata, function (index, data) {
// 				tableDay += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
// 			});
// 			$.each(demodata, function (index, data) {
// 				total_rev += '<tc><td scope="cols" style="text-align:right"><b>' + data.totalrev + '</b></td></tc>';
// 			});
// 			'<style>'
// 			'table '
// 			'{'
// 			'table.table table-bordered mb-0'
// 			'width: 100%'
// 			'}'
// 			$('#incoming').append('<table style="width:0px id="tablevalue_incoming" class="table table-bordered mb-0">'
// 				+ '<colgroup>'
// 				+ '<thead class="thead-dark">'
// 				+ '<tr>'
// 				+ '<th>Events</th>'
// 				+ '<th>' + Month + tableDay + '</th>'
// 				+ '</tr>'
// 				+ '</thead>'
// 				+ '<tbody id="tablevalue_">'
// 				+ '<td><b>' + "OUTGOING" + '</b></td>'
// 				+ '<td style="text-align:right">' + outgoing_sum_mnth + outgoing1 + '</td>'
// 				+ '<tr>'
// 				+ '<td><b>' + "INCOMING" + '</b></td>'
// 				+ '<td style="text-align:right">' + incoming_sum_mnth + incoming1 + '</td>'
// 				+ '</tr>'
// 				+ '<tr>'
// 				+ '<td><b>' + "Others" + '</b></td>'
// 				+ '<td style="text-align:right">' + others_sum_mnth + others + '</td>'
// 				+ '</tr>'
// 				+ '<tr class="bg-secondary text-white">'
// 				+ '<td><b>' + "Total Revenue" + '</b></td>'
// 				+ '<td style="text-align:right"><b>' + total_sum_mnth + total_rev + '</b></td>'
// 				+ '</tr>'
// 				+ '</tbody>'
// 				+ '</table>'
// 			)

// 			var trace1 = {
// 				type: 'line',
// 				name: 'Incoming',
// 				x: unpack(jsonData, "day"),
// 				y: unpack(jsonData, "incomming"),
// 			};
// 			var trace2 = {
// 				type: 'line',
// 				name: 'Outgoing',
// 				x: unpack(jsonData, "day"),
// 				y: unpack(jsonData, "outgoing"),
// 			};
// 			var trace3 = {
// 				type: 'line',
// 				name: 'Other',
// 				x: unpack(jsonData, "day"),
// 				y: unpack(jsonData, "others"),
// 			};

// 			var data = [trace2, trace1, trace3];
// 			var layout1 = {
// 				autosize: true,
// 				width: 800,
// 				height: 300,
// 				dragmode: "pan",
// 				barmode: "group",
// 				showlegend: true,
// 				hoverinfo: 'y',
// 				displayModeBar: false,

// 				xaxis: {
// 					title: Month + ' (' + unit + ')',
// 				},
// 				yaxis: {
// 					autorange: true,
// 					fixedrange: true,
// 					automargin: true,
// 				},
// 				font: {
// 					family: 'Arial, Helvetica, sans-serif',
// 				}
// 			};
// 			var config = {
// 				responsive: true,
// 				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
// 				displaylogo: false,
// 			}
// 			Plotly.newPlot('Incoming_line', data, layout1, config);
// 		}
// 	})
// }
// //bottom pie chart
// function incoming_pie() {
// 	$.ajax({
// 		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/monthlyEventCatgRev?year=' + chartYear + '&month=' + chartMonth,
// 		dataType: 'json',
// 		success: function (jsonData) {
// 			function unpack(data, key) {
// 				return data.monthlyEventCategList.map(function (row) {
// 					return row[key];
// 				});
// 			}
// 			var tracepie = {
// 				type: 'pie',
// 				values: unpack(jsonData, "rev"),
// 				labels: unpack(jsonData, 'service'),
// 				textinfo: 'none',
// 				hoverinfo: "percent+label+value",
// 			};

// 			var data = [tracepie];

// 			var layout = {
// 				showlegend: true,

// 				margin: { "t": 30, "b": 0, "l": 40, "r": 0 },
// 				height: 310,
// 				width: 400,
// 				displayModeBar: false,
// 				font: {
// 					family: 'Arial, Helvetica, sans-serif',
// 				}
// 			};
// 			var config = {
// 				responsive: true,
// 				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
// 				displaylogo: false,
// 			}
// 			Plotly.newPlot('pieincoming', data, layout, config);
// 		}
// 	})
// }
