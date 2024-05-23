var chartType = '';
var unit = 'Million';
//current month and year
today = new Date();
var month = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })
month = new Date(month).toUTCString();
month = month.split(' ').slice(2, 3).join('-');
var year_curr = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })
year_curr = new Date(year_curr).toUTCString();
year_curr = year_curr.split(' ').slice(3, 4).join('-');


//filter month and year
var mnth = month;
var year = year_curr;
$(document).ready(function () {
	Table_top();
	Pie_top();
	Table_offnet();
	offnet_bar();
	incoming_bar();
	barchart_top();
	Pie_offnet();
	Table_incoming();
	incoming_pie();
});

// filter for bar and line chart. filter for unit conversion....
function filter_top() {
	chartType = document.getElementById("Chart_type").value;
	unit = document.getElementById("Unit_value").value;
	$('.float-div').removeClass('open');   //close on click
	$('.float_overlay').removeClass('d-block');
	console.log(unit);
	if (chartType == 'Bar' && (unit == 'Thousand' || unit == 'Million' || unit == 'Billion')) {
		Incoming_line.innerHTML = '';
		Offnet_line.innerHTML = '';
		Percent_line.innerHTML = '';
		Daily_line.innerHTML = '';
		offnet.innerHTML = '';
		incoming.innerHTML = '';
		ntable.innerHTML = '';
		Table_incoming();
		Table_top();
		Table_offnet();
		offnet_bar();
		incoming_bar();
		barchart_top();
	}
	if (chartType == 'Line' && (unit == 'Thousand' || unit == 'Million' || unit == 'Billion')) {
		incoming_barchart.innerHTML = '';
		Offnet_barchart.innerHTML = '';
		Percent_barchart.innerHTML = '';
		Daily_barchart.innerHTML = '';
		offnet.innerHTML = '';
		incoming.innerHTML = '';
		ntable.innerHTML = '';
		offnet_line();
		incoming_line();
		top_line();
		Table_incoming();
		Table_top();
		Table_offnet();
	}
	// current month display and the unit
	document.getElementById("TopTable").innerHTML = mnth + " " + year + ' (In ' + unit + ')';
	document.getElementById("centerTable").innerHTML = mnth + " " + year + ' (In ' + unit + ')';
	document.getElementById("bottomTable").innerHTML = mnth + " " + year + ' (In ' + unit + ')';
}

//reload button on filter
function Reload() {
	window.location.reload();
}


$(function () {
	$("#date_filter").datepicker({
		changeMonth: true,
		changeYear: true,
		// changeDate:true,
		showDate: true,
		showButtonPanel: true,
		dateFormat: 'MM yy ',

		onClose: function (dateText, inst) {
			$(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
			mnth = inst.selectedMonth;
			year = inst.selectedYear;
			if (mnth == '0') {
				mnth = 'Jan';
			}
			if (mnth == '1') {
				mnth = 'Feb';
			}
			if (mnth == '2') {
				mnth = 'Mar';
			}
			if (mnth == '3') {
				mnth = 'Apr';
			}
			if (mnth == '4') {
				mnth = 'May';
			}
			if (mnth == '5') {
				mnth = 'Jun';
			}
			if (mnth == '6') {
				mnth = 'Jul';
			}
			if (mnth == '7') {
				mnth = 'Aug';
			}
			if (mnth == '8') {
				mnth = 'Sep';
			}
			if (mnth == '9') {
				mnth = 'Oct';
			}
			if (mnth == '10') {
				mnth = 'Nov';
			}
			if (mnth == '11') {
				mnth = 'Dec';
			}

			// document.getElementById("TopTable").innerHTML = mnth + " " + year;
			// 	document.getElementById("pieoff").innerHTML = mnth + " " + year;
			ntable.innerHTML = '';
			Percent_barchart.innerHTML = '';
			Daily_barchart.innerHTML = '';
			Percent_line.innerHTML = '';
			Daily_line.innerHTML = '';
			pieChart.innerHTML = '';
			offnet.innerHTML = '';
			Offnet_barchart.innerHTML = '';
			Offnet_line.innerHTML = '';
			pieOffnet.innerHTML = '';
			incoming.innerHTML = '';
			pieincoming.innerHTML = '';
			incoming_barchart.innerHTML = '';
			Incoming_line.innerHTML = '';

			document.getElementById('TopTable').innerHTML = mnth + ' ' + year + ' (In ' + unit + ')';
			document.getElementById('centerTable').innerHTML = mnth + ' ' + year + ' (In ' + unit + ')';
			document.getElementById('bottomTable').innerHTML = mnth + ' ' + year + ' (In ' + unit + ')';

			Table_top();
			barchart_top();
			Pie_top();
			Table_offnet();
			offnet_bar();
			Pie_offnet();
			Table_incoming();
			incoming_bar();
			incoming_pie();
		}

		//dateFormat: 'dd-mm-yy', 
	});
});


//Top table and 2 bar charts
function Table_top() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getDayByDayRev?year=' + year + '&month=' + mnth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.dayRevList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;
			var demodata = jsonData.dayRevList;
			var day = '';
			var voicerev = '';
			var otherRev = '';
			var smsrev = '';
			var datarev = '';
			var totalRev = '';
			var total_voice = jsonData.sumofvoiceRev;
			var total_sms = jsonData.sumofsmsrev;
			var total_data = jsonData.sumofdataRev;
			var total_other = jsonData.sumofotherRev;
			var total_totalrev = jsonData.sumoftotalRev;

			$.each(demodata, function (index, data) {
				voicerev += '<tc><td scope="col" style="text-align:right">' + data.voicerev + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				day += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
			});
			$.each(demodata, function (index, data) {
				smsrev += '<tc><td scope="col"  style="text-align:right">' + data.smsrev + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				datarev += '<tc><td scope="col" style="text-align:right">' + data.datarev + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				otherRev += '<tc><td scope="col" style="text-align:right">' + data.otherRev + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				totalRev += '<tc><td scope="col" style="text-align:right"><b>' + data.totalRev + '</b></td></tc>';
			});

			// console.log(sum);

			'<style>'
			'table '
			'{'
			'table.table table-bordered mb-0'
			'width: 100%'
			'}'
			$('#ntable').append('<table style="width:0px id="tablevalue_top" class="table table-bordered mb-0">'
				+ '<colgroup>'
				+ '<thead class="thead-dark">'
				+ '<tr>'
				+ '<th>Events</th>'
				//+'<th >May</th>'
				+ '<th>' + Month + day + '</th>'
				+ '</tr>'
				+ '</thead>'
				+ '<tbody id="tablevalue_top">'
				+ '<td><b>' + "DATA" + '</b></td>'
				+ '<td style="text-align:right">' + total_data + datarev + '</td>'
				+ '<tr>'
				+ '<td><b>' + "VOICE" + '</b></td>'
				+ '<td style="text-align:right">' + total_voice + voicerev + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "SMS" + '</b></td>'
				+ '<td style="text-align:right">' + total_sms + smsrev + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "Others" + '</b></td>'
				+ '<td style="text-align:right">' + total_other + otherRev + '</td>'
				+ '</tr>'
				+ '<tr class="bg-secondary text-white">'   // column highlighter
				+ '<td><b>' + "Total Revenue" + '</b></td>'
				+ '<td style="text-align:right"><b>' + total_totalrev + totalRev + '</b></td>'
				+ '</tr>'
				+ '</tbody>'
				+ '</table>'
			)
		}

	})
}

function barchart_top() {

	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getDayByDayRev?year=' + year + '&month=' + mnth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.dayRevList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;

			var trace1 = {
				type: 'bar',
				name: 'Voice Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "voicerev"),
			};
			var trace2 = {
				type: 'bar',
				name: 'SMS Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "smsrev"),
			};
			var trace3 = {
				type: 'bar',
				name: 'Data Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "datarev"),
			};
			var trace4 = {
				type: 'bar',
				name: 'Other Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "otherRev"),
			};
			var trace5 = {
				type: 'bar',
				name: '% Daily Growth',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "dayByPst"),
			};
			var data = [trace3, trace1, trace2, trace4];
			var data1 = [trace5];

			var layout = {
				autosize: true,
				width: 950,
				height: 300,
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
				width: 1400,
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
			Plotly.newPlot('Daily_barchart', data, layout, config);
			Plotly.newPlot('Percent_barchart', data1, layout1, config);
		}
	})
}


function top_line() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getDayByDayRev?year=' + year + '&month=' + mnth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.dayRevList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;

			var trace1 = {
				type: 'line',
				name: 'Voice Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "voicerev"),
			};
			var trace2 = {
				type: 'line',
				name: 'SMS Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "smsrev"),
			};
			var trace3 = {
				type: 'line',
				name: 'Data Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "datarev"),
			};
			var trace4 = {
				type: 'line',
				name: 'Other Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "otherRev"),
			};
			var trace5 = {
				type: 'line',
				name: '% Daily Growth',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "dayByPst"),
			};
			var data = [trace3, trace1, trace2, trace4];
			var data1 = [trace5];

			var layout = {
				autosize: true,
				width: 950,
				height: 300,
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
				width: 1400,
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
			Plotly.newPlot('Daily_line', data, layout, config);
			Plotly.newPlot('Percent_line', data1, layout1, config);
		}
	})
}

//pie chart top
function Pie_top() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getTotalRevByMonthly?year=' + year + '&month=' + mnth,
		dataType: 'json',
		//var a = (jsonData.frodcaseClose);
		success: function (jsonData) {
			function unpack(data, key) {
				return data.totalrevmonthlist.map(function (row) {
					return row[key];
				});
			}
			var trace1 = {
				type: 'pie',
				values: unpack(jsonData, "values"),
				labels: unpack(jsonData, "label"),
				textinfo: 'none',
				//textposition: "inside",
				hoverinfo: "percent+label+value",
				// insidetextorientation: "radial",
			};
			var data = [trace1];

			var layout = {
				showlegend: true,

				margin: { "t": 30, "b": 0, "l": 40, "r": 0 },
				height: 310,
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
			Plotly.newPlot('pieChart', data, layout, config);
		}
	})
}
function Table_offnet() {
	$.ajax({

		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getCategoryByrev?year=' + year + '&month=' + mnth + '&currency=' + unit,
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
			var others = '';
			var total_Day = '';
			var onnet_sum = jsonData.sumOfOnnet;
			var offnet_sum = jsonData.sumOfOffnet;
			var intl_sum = jsonData.sumOfIntl;
			var others_sum = jsonData.sumOfOthers;
			var total_totalrev = jsonData.sumOfTotal;

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
				intl += '<tc><td scope="col" style="text-align:right">' + data.intl + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				others += '<tc><td scope="col" style="text-align:right">' + data.others + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				total_Day += '<tc><td scope="col" style="text-align:right"><b>' + data.totalRev + '</b></td></tc>';
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
				+ '<td><b>' + "INTL" + '</b></td>'
				+ '<td style="text-align:right">' + intl_sum + intl + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "Others" + '</b></td>'
				+ '<td style="text-align:right">' + others_sum + others + '</td>'
				+ '</tr>'
				+ '<tr class="bg-secondary text-white">'
				+ '<td><b>' + "Total Revenue" + '</b></td>'
				+ '<td style="text-align:right"><b>' + total_totalrev + total_Day + '</b></td>'
				+ '</tr>'
				+ '</tbody>'
				+ '</table>'
			)
		}
	})
}
function offnet_bar() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getCategoryByrev?year=' + year + '&month=' + mnth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.categoryByrevList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;
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
				name: 'Intl Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "intl"),
			};
			var trace4 = {
				type: 'bar',
				name: 'Other Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "others"),
			};

			var data = [trace4, trace2, trace1, trace3];
			var layout1 = {
				autosize: true,
				width: 900,
				height: 300,
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

			var config = {
				responsive: true,
				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
				displaylogo: false,
			}
			Plotly.newPlot('Offnet_barchart', data, layout1, config);
		}
	})
}

function offnet_line() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getCategoryByrev?year=' + year + '&month=' + mnth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.categoryByrevList.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;

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
				name: 'Intl Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "intl"),
			};
			var trace4 = {
				type: 'line',
				name: 'Other Revenue',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "others"),
			};

			var data = [trace4, trace2, trace1, trace3];
			var layout1 = {
				autosize: true,
				width: 900,
				height: 300,
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

			var config = {
				responsive: true,
				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
				displaylogo: false,
			}
			Plotly.newPlot('Offnet_line', data, layout1, config);

		}
	})
}


//offnet pie chart
function Pie_offnet() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/getCategoryByRevMonthly?year=' + year + '&month=' + mnth,
		dataType: 'json',
		//var a = (jsonData.frodcaseClose);
		success: function (jsonData) {
			function unpack(data, key) {
				return data.monthlyCategoryrevlist.map(function (row) {
					return row[key];
				});
			}
			var trace1 = {
				type: 'pie',
				values: unpack(jsonData, "value"),
				labels: unpack(jsonData, "label"),
				textinfo: 'none',
				//textposition: "inside",
				hoverinfo: "percent+label+value",
				// insidetextorientation: "radial",
			};

			var data = [trace1];

			var layout = {
				showlegend: true,
				margin: { "t": 30, "b": 0, "l": 40, "r": 0 },
				height: 310,
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
			Plotly.newPlot('pieOffnet', data, layout, config);
		}
	})
}

//incoming outgoing table and outgoing pie

function Table_incoming() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/DayByEventTypeRev?year=' + year + '&month=' + mnth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {

				return data.categoryRevlist.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;
			var incoming_sum_mnth = jsonData.sumOfIncomingRev;
			var outgoing_sum_mnth = jsonData.sumOfOutGoingRev;
			var others_sum_mnth = jsonData.sumOfOtherRev;
			var total_sum_mnth = jsonData.sumOfTotalRev;

			// incoming_sum_mnth = parseInt(incoming_sum_mnth);
			// outgoing_sum_mnth = parseInt(outgoing_sum_mnth);
			// others_sum_mnth = parseInt(others_sum_mnth);
			// total_sum_mnth = parseInt(total_sum_mnth);
			//	console.log(incoming_sum_mnth);

			var demodata = jsonData.categoryRevlist;
			// console.log(incoming);
			// console.log(outgoing);
			// console.log(other);
			var tableDay = '';
			var incoming1 = '';
			var outgoing1 = '';
			var others = '';
			var total_rev = '';

			$.each(demodata, function (index, data) {
				outgoing1 += '<tc><td scope="col" style="text-align:right">' + data.outgoing + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				incoming1 += '<tc><td scope="col"  style="text-align:right">' + data.incomming + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				others += '<tc><td scope="col"  style="text-align:right">' + data.others + '</td></tc>';
			});
			$.each(demodata, function (index, data) {
				tableDay += '<tc><th scope="col"  style="text-align:center">' + data.day + '</th></tc>';
			});
			// $.each(demodata, function (index, data) {
			// 	others += '<tc><td scope="col" style="text-align:right">' + data.others + '</td></tc>';
			// });
			$.each(demodata, function (index, data) {
				total_rev += '<tc><td scope="cols" style="text-align:right"><b>' + data.totalrev + '</b></td></tc>';
			});
			'<style>'
			'table '
			'{'
			'table.table table-bordered mb-0'
			'width: 100%'
			'}'
			$('#incoming').append('<table style="width:0px id="tablevalue_incoming" class="table table-bordered mb-0">'
				+ '<colgroup>'
				+ '<thead class="thead-dark">'
				+ '<tr>'
				+ '<th>Events</th>'
				+ '<th>' + Month + tableDay + '</th>'
				+ '</tr>'
				+ '</thead>'
				+ '<tbody id="tablevalue_">'
				+ '<td><b>' + "OUTGOING" + '</b></td>'
				+ '<td style="text-align:right">' + outgoing_sum_mnth + outgoing1 + '</td>'
				+ '<tr>'
				+ '<td><b>' + "INCOMING" + '</b></td>'
				+ '<td style="text-align:right">' + incoming_sum_mnth + incoming1 + '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td><b>' + "Others" + '</b></td>'
				+ '<td style="text-align:right">' + others_sum_mnth + others + '</td>'
				+ '</tr>'
				+ '<tr class="bg-secondary text-white">'
				+ '<td><b>' + "Total Revenue" + '</b></td>'
				+ '<td style="text-align:right"><b>' + total_sum_mnth + total_rev + '</b></td>'
				+ '</tr>'
				+ '</tbody>'
				+ '</table>'
			)
		}
	})
}
function incoming_pie() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/monthlyEventCatgRev?year=' + year + '&month=' + mnth,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.monthlyEventCategList.map(function (row) {
					return row[key];
				});
			}
			var tracepie = {
				type: 'pie',
				values: unpack(jsonData, "rev"),
				labels: unpack(jsonData, 'service'),
				textinfo: 'none',
				//textposition: "inside",
				hoverinfo: "percent+label+value",
				// insidetextorientation: "radial",
			};

			var data = [tracepie];

			var layout = {
				showlegend: true,

				margin: { "t": 30, "b": 0, "l": 40, "r": 0 },
				height: 310,
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
			Plotly.newPlot('pieincoming', data, layout, config);
		}
	})
}
function incoming_bar() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/DayByEventTypeRev?year=' + year + '&month=' + mnth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {

				return data.categoryRevlist.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;

			var trace1 = {
				type: 'bar',
				name: 'Incoming',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "incomming"),
			};
			var trace2 = {
				type: 'bar',
				name: 'Outgoing',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "outgoing"),
			};
			var trace3 = {
				type: 'bar',
				name: 'Other',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "others"),
			};

			var data = [trace2, trace1, trace3];
			var layout1 = {
				autosize: true,
				width: 900,
				height: 300,
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

			var config = {
				responsive: true,
				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
				displaylogo: false,
			}
			Plotly.newPlot('incoming_barchart', data, layout1, config);
		}
	})
}
function incoming_line() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/rev/api/DayByEventTypeRev?year=' + year + '&month=' + mnth + '&currency=' + unit,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {

				return data.categoryRevlist.map(function (row) {
					return row[key];
				});
			}
			var Month = jsonData.month;
			var trace1 = {
				type: 'line',
				name: 'Incoming',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "incomming"),
			};
			var trace2 = {
				type: 'line',
				name: 'Outgoing',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "outgoing"),
			};
			var trace3 = {
				type: 'line',
				name: 'Other',
				x: unpack(jsonData, "day"),
				y: unpack(jsonData, "others"),
			};

			var data = [trace2, trace1, trace3];
			var layout1 = {
				autosize: true,
				width: 900,
				height: 300,
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
			var config = {
				responsive: true,
				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d'],
				displaylogo: false,
			}
			Plotly.newPlot('Incoming_line', data, layout1, config);
		}
	})
}
