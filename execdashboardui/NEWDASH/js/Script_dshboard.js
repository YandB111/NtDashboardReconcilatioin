var usertype = '';
var selectservice = '';
var strtDate = '';
var endDate = '';
var month;
var year;
var tabledata = '';

var curr_date= new Date();

// d.setMonth(d.getMonth() - 1);
// console.log(d);

curr_date = new Date(curr_date).toUTCString();
curr_date = curr_date.split(' ').slice(1, 4).join('-');
//console.log(curr_date);
var keyop_date=curr_date;


curr_date = new Date(curr_date).toUTCString();
curr_date = curr_date.split(' ').slice(2, 4).join('-');
var userdate="";
var fullDay="";
function getValue()
{
    userdate =document.getElementById('myBirthday').value;
    var parts =userdate .split('-');
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    var Cm=parts[2].toLocaleString('default',{date:'short'});
    var Cm1=parts[1].toLocaleString('default',{date:'short'});
    var Cm2=parts[0].toLocaleString('default',{date:'short'});
    fullDay=Cm+'-'+Cm1+'-'+Cm2;
    console.log("the complete date  is "+fullDay);
    KRF_table();
}


var d = new Date();
d.setMonth(d.getMonth()-1);

d=new Date(d).toUTCString();
d=d.split(' ').slice(2,4).join('-');
var krf_strt=d;
var krf_end=curr_date;
//console.log(krf_strt,krf_end);

curr_date = new Date(curr_date).toUTCString();
curr_date = curr_date.split(' ').slice(2, 4).join('-');
//console.log(curr_date);
var today;
var date;

var current_date=new Date(current_date).toUTCString();
current_date=current_date.split(' ').slice(2,3).join('-');

var current_date1=new Date(current_date1).toUTCString();
current_date1=current_date1.split(' ').slice(3,4).join('-');

var pie_mnth = current_date;
var pie_year = current_date1;

var top10_mnth = '';
var top10_year = '';
var top4_mnth = '';
var top4_year = '';
var keyop_mnth ='';
var keyop_year = '';
//document.getElementById("pie").innerHTML= "% of total revenue " +curr_date;

$(document).ready(function () {
	main();
	//	Key_Operation(); 
});

 


//pie chart date picker 
$(function () {
	$("#pie_chart").datepicker({
		changeMonth: true,
		changeYear: true,
		// changeDate:true,
		showDate: true,
		showButtonPanel: true,
		dateFormat: 'MM yy ',

		onClose: function (dateText, inst) {
			$(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
			pie_mnth = inst.selectedMonth;
			pie_year = inst.selectedYear;
			
	if (pie_mnth == '0') {
		pie_mnth = 'Jan';
	}
	if (pie_mnth == '1') {
		pie_mnth = 'Feb';
	}
	if (pie_mnth == '2') {
		pie_mnth = 'Mar';
	}
	if (pie_mnth == '3') {
		pie_mnth = 'Apr';
	}
	if (pie_mnth == '4') {
		pie_mnth = 'May';
	}
	if (pie_mnth == '5') {
		pie_mnth = 'Jun';
	}
	if (pie_mnth == '6') {
		pie_mnth = 'Jul';
	}
	if (pie_mnth == '7') {
		pie_mnth = 'Aug';
	}
	if (pie_mnth == '8') {
		pie_mnth = 'Sep';
	}
	if (pie_mnth == '9') {
		pie_mnth = 'Oct';
	}
	if (pie_mnth == '10') {
		pie_mnth = 'Nov';
	}
	if (pie_mnth == '11') {
		pie_mnth = 'Dec';
	}
			document.getElementById("pie").innerHTML=pie_mnth+" "+pie_year;
			pie_chart();
		}

		//dateFormat: 'dd-mm-yy', 
	});
});
//top 10 date picker
$(function () {
	$("#Top_10").datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: 'MM yy',
		onClose: function (dateText, inst) {
			$(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
			top10_mnth = inst.selectedMonth;
			top10_year = inst.selectedYear;
			date = (today.getMonth()+1);
			if (top10_mnth == '0') {
				top10_mnth = 'Jan';
			}
			if (top10_mnth == '1') {
				top10_mnth = 'Feb';
			}
			if (top10_mnth == '2') {
				top10_mnth = 'Mar';
			}
			if (top10_mnth == '3') {
				top10_mnth = 'Apr';
			}
			if (top10_mnth == '4') {
				top10_mnth = 'May';
			}
			if (top10_mnth == '5') {
				top10_mnth = 'Jun';
			}
			if (top10_mnth == '6') {
				top10_mnth = 'Jul';
			}
			if (top10_mnth == '7') {
				top10_mnth = 'Aug';
			}
			if (top10_mnth == '8') {
				top10_mnth = 'Sep';
			}
			if (top10_mnth == '9') {
				top10_mnth = 'Oct';
			}
			if (top10_mnth == '10') {
				top10_mnth = 'Nov';
			}
			if (top10_mnth == '11') {
				top10_mnth = 'Dec';
			}
			document.getElementById("Top10").innerHTML=top10_mnth+" "+top10_year;
			
			TopX_Roaming();
		}
		//dateFormat: 'dd-mm-yy', 
	});
});

//top 4 date picker
$(function () {
	$("#Top_4").datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: 'MM yy',
		onClose: function (dateText, inst) {
			$(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
			top4_mnth = inst.selectedMonth;
			top4_year = inst.selectedYear;
			if (top4_mnth == '0') {
				top4_mnth = 'Jan';
			}
			if (top4_mnth == '1') {
				top4_mnth = 'Feb';
			}
			if (top4_mnth == '2') {
				top4_mnth = 'Mar';
			}
			if (top4_mnth == '3') {
				top4_mnth = 'Apr';
			}
			if (top4_mnth == '4') {
				top4_mnth = 'May';
			}
			if (top4_mnth == '5') {
				top4_mnth = 'Jun';
			}
			if (top4_mnth == '6') {
				top4_mnth = 'Jul';
			}
			if (top4_mnth == '7') {
				top4_mnth = 'Aug';
			}
			if (top4_mnth == '8') {
				top4_mnth = 'Sep';
			}
			if (top4_mnth == '9') {
				top4_mnth = 'Oct';
			}
			if (top4_mnth == '10') {
				top4_mnth = 'Nov';
			}
			if (top4_mnth == '11') {
				top4_mnth = 'Dec';
			}
			document.getElementById("Top4").innerHTML=top4_mnth+' '+ top4_year;
			
			TopX_Recharge();
		}
		//dateFormat: 'dd-mm-yy', 
	});
});

//key operational date range
$(function () {
	$("#key_op").datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: 'MM yy',
		onClose: function (dateText, inst) {
			$(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
			keyop_mnth = inst.selectedMonth;
			keyop_year = inst.selectedYear;
			if (keyop_mnth == '0') {
				keyop_mnth = 'Jan';
			}
			if (keyop_mnth == '1') {
				keyop_mnth = 'Feb';
			}
			if (keyop_mnth == '2') {
				keyop_mnth = 'Mar';
			}
			if (keyop_mnth == '3') {
				keyop_mnth = 'Apr';
			}
			if (keyop_mnth == '4') {
				keyop_mnth = 'May';
			}
			if (keyop_mnth == '5') {
				keyop_mnth = 'Jun';
			}
			if (keyop_mnth == '6') {
				keyop_mnth = 'Jul';
			}
			if (keyop_mnth == '7') {
				keyop_mnth = 'Aug';
			}
			if (keyop_mnth == '8') {
				keyop_mnth = 'Sep';
			}
			if (keyop_mnth == '9') {
				keyop_mnth = 'Oct';
			}
			if (keyop_mnth == '10') {
				keyop_mnth = 'Nov';
			}
			if (keyop_mnth == '11') {
				keyop_mnth = 'Dec';
			}
			ntable.innerHTML = '';
			Key_Operation();
		}
		//dateFormat: 'dd-mm-yy', 
	});
});
//apply button on filter
function filter_top() {
	usertype = document.getElementById("user_type").value;
	selectservice = document.getElementById("select_service").value;
	$('.float-div').removeClass('open');
	$('.float_overlay').removeClass('d-block');
	lineChart();
	Day_bar();

}

//reload button on filter
function Reload() {
	window.location.reload();
}


//date range for bar and line
$(function () {
	//Date range as a button
	$('#daterange-btnup').daterangepicker(
		{
			// ranges: {
			// 	'Today': [moment(), moment()],
			// 	'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			// 	'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			// 	'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			// 	'This Month': [moment().startOf('month'), moment().endOf('month')],
			// 	'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			// },
			startDate: moment().subtract(29, 'days'),
			endDate: moment(),

		},

		function (start, end) {
			$('#daterange-btnup span').html(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'))
			//	 strtDate=start._d;

			strtDate = start._d;
			strtDate = new Date(strtDate).toUTCString();
			strtDate = strtDate.split(' ').slice(1, 4).join(' ');
			// console.log(strtDate);

			endDate = end._d;
			endDate = new Date(endDate).toUTCString();
			endDate = endDate.split(' ').slice(1, 4).join(' ');
			// console.log(endDate);
			//	 console.log(strtDate);
			//	 console.log(endDate);
			lineChart();
			Day_bar();
		}
	)

	//Date picker
	$('#datepicker').datepicker({
		autoclose: true
	})

});

//  date range krf table

$(function() {

	$('input[name="datefilter"]').daterangepicker({
		autoUpdateInput: false,
		locale: {
			cancelLabel: 'Clear'
		}
	});
	
	$('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
		$(this).val(picker.startDate.format('MMM-YYYY') + ' - ' + picker.endDate.format('MMM-YYYY'));

		krf_strt=picker.startDate. _d;
			krf_strt = new Date(krf_strt).toUTCString();
			krf_strt = krf_strt.split(' ').slice(2,4).join(' ');
			krf_strt=krf_strt.replace(" ","-");

			krf_end=picker.endDate. _d;
			krf_end = new Date(krf_end).toUTCString();
			krf_end = krf_end.split(' ').slice(2, 4).join(' ');
			krf_end=krf_end.replace(" ","-");
			
			tablevalue.innerHTML = '';
			KRF_table();
			//console.log(krf_strt,krf_end);
		
	//console.log(krf_strt,krf_end);
	});
	
	$('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
		$(this).val('');
	});
	
	});
	


//date range for key operational

//graph validation 
function main() {

	var Dashboard =
		$.ajax({
			url: 'https://192.168.167.6:8743/Dashboard/dashboard/api/Graph_validation',
			dataType: 'json',
			success: function (jsonData) {
				//	var a=(jsonData.frodcaseClose);
				function unpack(data, key) {
					return data.graphValidationList.map(function (row) {
						return row[key];
					});
				}
				var demodata = jsonData.graphValidationList;
				var graph_id = new Array(demodata.length);
				var graph_sts = new Array(demodata.length);
				for (var i = 0; i < demodata.length; i++) {
					var obj = demodata[i];
					graph_id[i] = obj.graphId;
					graph_sts[i] = obj.graphStatus;
				}
				for (var i = 0; i < demodata.length; i++) {
					if (graph_id[i] == 'REV_DAY_BY_DAY_LINE' && graph_sts[i] == 'true') {
						lineChart();
					}
					else if (graph_id[i] == 'REV_DAY_BY_DAY_BAR' && graph_sts[i] == 'true') {
						Day_bar();
					}
					else if (graph_id[i] == 'REV_KEY_FIG' && graph_sts[i] == 'true') {
						KRF_table();
					}
					else if (graph_id[i] == 'REV_CURRENT_MON' && graph_sts[i] == 'true') {
						pie_chart();
					}
					else if (graph_id[i] == 'TOPX_ROAM_PARTNER' && graph_sts[i] == 'true') {
						TopX_Roaming();
					}
					else if (graph_id[i] == 'KEY_RECONCILAIATION' && graph_sts[i] == 'true') {
						Key_Reconcillation();
					}
					else if (graph_id[i] == 'TOPX_REC_VOUCHER' && graph_sts[i] == 'true') {
						TopX_Recharge();
					}
					else if (graph_id[i] == 'KEY_OPARTIONLA_KPI' && graph_sts[i] == 'true') {
						Key_Operation();
					}
					else if (graph_id[i] == 'ALARM_CASES_KPI' && graph_sts[i] == 'true') {
						Key_Cases();
					}
				}
			}
		})
	// lineChart();
	// Day_bar();
	// pie_chart();
	// KRF_table();
	// TopX_Recharge();
	// TopX_Roaming();
	// Key_Operation();
	// pie_chart_small();
	// Key_Reconcillation();
	// Key_Cases();

	//line chart Day-on-Day Revenue Growth 


}
function lineChart() {

	$.ajax({
		url: "https://192.168.167.6:8743/Dashboard/dashboard/api/monthlyRevenue?Start_date=" + strtDate + "&End_date=" + endDate + "&User=" + usertype + "&Service=" + selectservice,

		dataType: 'json',
		success: function (jsonData) {

			//$('#tablevalue').html(tabledata);	
			//console.log(jsonData);
			// var data = JSON.stringify(jsonData);
			function unpack(data, key) {
				return data.monthlyRevtrendlist.map(function (row) {
					return row[key];
				});
			}
			var demodata = jsonData.monthlyRevtrendlist;
			var tc = new Array(demodata.length);
			for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];
				tc[i] = obj.revenue;
			}

			var trace1 = {
				type: 'line',
				name: 'Monthly Revenue',
				x: unpack(jsonData, "eventMonth"),
				y: unpack(jsonData, "revenue"),
				//   text: tc.map(String),
				//   textposition: 'inside',
			};


			var data = [trace1];

			var layout = {
				dragmode: "pan",
				barmode: "group",
				showlegend: false,
				width: 650,
				height: 400,

				displayModeBar: false,

				xaxis: {
					//title:'Month',
				},
				yaxis: {
					autorange: true,
					fixedrange: true,
					//title: "Revenue",
				},
				font: {
					family: 'Arial, Helvetica, sans-serif',
				}
			};

			var config = {
				responsive: true,
				modeBarButtonsToRemove: ['select2d', 'pan2d', 'lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'zoom2d', 'autoScale2d', 'logo'],
				displaylogo: false,
			}
			Plotly.newPlot('myDiv', data, layout, config);
		}
	})
}
//bar Chart Day-on-Day revenue growth
function Day_bar() {
	$.ajax({
		url: "https://192.168.167.6:8743/Dashboard/dashboard/api/monthlyRevenue?Start_date=" + strtDate + "&End_date=" + endDate + "&User=" + usertype + "&Service=" + selectservice,
		dataType: 'json',
		success: function (jsonData) {
			// console.log(tabledata);
			//$('#tablevalue').html(tabledata);
			//console.log(jsonData);
			// var data = JSON.stringify(jsonData);
			function unpack(data, key) {
				return data.monthlyRevtrendlist.map(function (row) {
					return row[key];
				});
			}
			var demodata = jsonData.monthlyRevtrendlist;
			var tc = new Array(demodata.length);
			for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];
				tc[i] = obj.revenue;

			}


			var trace1 = {
				type: 'bar',
				name: 'Monthly Revenue',
				x: unpack(jsonData, "eventMonth"),
				y: unpack(jsonData, "revenue"),
				text: tc.map(String),
				hoverinfo: 'y',
				textposition: 'auto',
				marker: {
					color: ['rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)','rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)', 'rgba(100, 102, 195, 1)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(255, 105, 0, 1)', 'rgba(24,24,204,1)', 'rgba(0,128,0,0.8)'],
					cliponaxis: false,
					//bar outline
					//   line: {
					//       width: 2.0
					//   }
				}
			};


			var data = [trace1];

			var layout = {
				autosize: true,
				width: 650,
				height: 400,
				dragmode: "pan",
				barmode: "group",
				showlegend: false,

				hoverinfo: 'y',
				displayModeBar: false,

				xaxis: {
					//	title:'Month',

				},
				yaxis: {
					autorange: true,
					fixedrange: true,
					automargin: true,
					//	range: [0, 9000000000],
					// title: "Revenue"

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
			Plotly.newPlot('Day_bar', data, layout, config);
		}
	})
}

//pie chart
function pie_chart() {
	
	if (pie_mnth == '0') {
		pie_mnth = 'Jan';
	}
	if (pie_mnth == '1') {
		pie_mnth = 'Feb';
	}
	if (pie_mnth == '2') {
		pie_mnth = 'Mar';
	}
	if (pie_mnth == '3') {
		pie_mnth = 'Apr';
	}
	if (pie_mnth == '4') {
		pie_mnth = 'May';
	}
	if (pie_mnth == '5') {
		pie_mnth = 'Jun';
	}
	if (pie_mnth == '6') {
		pie_mnth = 'Jul';
	}
	if (pie_mnth == '7') {
		pie_mnth = 'Aug';
	}
	if (pie_mnth == '8') {
		pie_mnth = 'Sep';
	}
	if (pie_mnth == '9') {
		pie_mnth = 'Oct';
	}
	if (pie_mnth == '10') {
		pie_mnth = 'Nov';
	}
	if (pie_mnth == '11') {
		pie_mnth = 'Dec';
	}
// 	 today = new Date();
// 
// document.getElementById("pie").innerHTML= "% of Total Revenue " +pie_mnth+" "+pie_year;




	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/api/totalRevenue?year=' + pie_year + '&month=' + pie_mnth,
		dataType: 'json',
		//var a = (jsonData.frodcaseClose);
		success: function (jsonData) {
			var month1= (jsonData.currentmonth);
			var year1= (jsonData.currentyear);
			//console.log(jsonData);
		//	document.getElementById("pie").innerHTML= "% of Total Revenue " +month1+" "+year1;
			function unpack(data, key) {
				return data.totalRevTrendList.map(function (row) {
					return row[key];
				});
			}
		//	document.getElementById("pie").innerHTML=date;
			//console.log(date);

			var trace1 = {
				type: 'pie',
				values: unpack(jsonData, "value"),
				labels: unpack(jsonData, "label"),
				textinfo: 'percent',
				textposition:'auto',
				hoverinfo: "percent+label+value",
				// insidetextorientation: "radial",
			};


			var data = [trace1];

			var layout = {
				showlegend: true,

				margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
				height: 285,
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

//table Key Revenue Figures
var param="10-10-2020";
console.log("new complete date is "+fullDay);
console.log("current Date is"+curr_date);
function KRF_table() {
document.getElementById("tablevalue").innerHTML = "";
tabledata="";
        $.ajax({
                 url: 'https://192.168.167.6:8743/Dashboard/dashboard/api/comaprisonRevenue?Start_Month='+fullDay,
		dataType: 'json',
		success: function (jsonData) {
			var strt_mnth = (jsonData.start_Month);
			var end_mnth = (jsonData.end_Month);
			var year = (jsonData.year);
			function unpack(data, key) {
				return data.comparisonrevTrendList.map(function (row) {
					return row[key];
				});
			}
                        var demodata = jsonData.comparisonrevTrendList;
			var imgArray = new Array(demodata.length);
			var z = 1;
				for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];

				if (obj.w_r_t_last_month == 0.0 + "%")
				{
					imgArray[i] = "linear.png";
					
				}
				else if (obj.w_r_t_last_month > 0 + "%") {

					imgArray[i] = "up.png";
					}
				else if (obj.w_r_t_last_month < 0 + "%") {
					imgArray[i] = "down.png";
					
				}
			}

			tabledata += '<thead class="thead-dark"><tr><th>' + "Key Revenue Figures" + '</th><th>' + krf_strt + " " + " <br>USD<small> (in Mn.)</small>" + '</th><th>' + krf_end + " " + " <br>USD<small> (in Mn.)</small>" + '</th><th>' + "Comparison" + '</th></tr>';
			$.each(demodata, function (index, data) {
		      tabledata += '<tbody><tr><td>' + data.key_Revenue_Figures + '</td><td style="text-align:right">' + data.lastMonthRev + '</td><td style="text-align:right">' + data.currntmonthRevenue + '</td><td style="text-align:right"> ' + data.w_r_t_last_month + '<img src="https://192.168.167.6:8743/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/images/' + imgArray[index] + '"></img></td></tr></tbody>';
			});
                       $('#tablevalue').append(tabledata);
                        
		

		}
	})
}

//Top 10 Roaming Partners
function TopX_Roaming() {
	if (top10_mnth == '0') {
		top10_mnth = 'Jan';
	}
	if (top10_mnth == '1') {
		top10_mnth = 'Feb';
	}
	if (top10_mnth == '2') {
		top10_mnth = 'Mar';
	}
	if (top10_mnth == '3') {
		top10_mnth = 'Apr';
	}
	if (top10_mnth == '4') {
		top10_mnth = 'May';
	}
	if (top10_mnth == '5') {
		top10_mnth = 'Jun';
	}
	if (top10_mnth == '6') {
		top10_mnth = 'Jul';
	}
	if (top10_mnth == '7') {
		top10_mnth = 'Aug';
	}
	if (top10_mnth == '8') {
		top10_mnth = 'Sep';
	}
	if (top10_mnth == '9') {
		top10_mnth = 'Oct';
	}
	if (top10_mnth == '10') {
		top10_mnth = 'Nov';
	}
	if (top10_mnth == '11') {
		top10_mnth = 'Dec';
	}

	// today = new Date();
	// date = (today.getMonth()+1);
	// document.getElementById("Top10").innerHTML=top10_mnth+" "+top10_year;
	
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/api/TopxRoamingPartner?year=' + top10_year + '&month=' + top10_mnth,
		dataType: 'json',
		success: function (jsonData) {
		var month=(jsonData.month);
		var year=(jsonData.year);
	//	document.getElementById("Top10").innerHTML= "Top 10 Roaming Partners - "+ month+" "+year;
			function unpack(data, key) {
				return data.topXRoaminPartnerlist.map(function (row) {
					return row[key];
				});
			}
			var demodata = jsonData.topXRoaminPartnerlist;
			var tc = new Array(demodata.length);
			for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];
				tc[i] = obj.total_Charge;
			}
			//	console.log(tc);

			var trace1 = {
				type: 'bar',
				//	orientation:"h",
				x: unpack(jsonData, "roaming_Partners"),
				y: unpack(jsonData, "total_Charge"),
				text: tc.map(String),
				hoverinfo: 'y',
				textposition: 'auto',
				marker: {
					color: ['rgba(204,24,200,1)', 'rgba(222,45,38,0.8)', 'rgba(24,204,204,1)', 'rgba(204,204,24,1)', 'rgba(24,24,204,1)', 'rgba(24,204,24,1)', 'rgba(274,24,200,1)', 'rgba(522,45,38,0.8)', 'rgba(24,800,400,1)', 'rgba(550,587,24,1)', 'rgba(10,844,2,1)', 'rgba(24,204,24,1)'],
					//bar outline
					//   line: {
					//       width: 2.0
					//   }
				}
			};

			var data = [trace1];

			var layout = {
				dragmode: "pan",
				barmode: "group",
				showlegend: false,
				width: '600',

				height: 500,

				displayModeBar: false,

				xaxis: {
					//	title:'Roaming Partners',
					showgrid: false,
					tickangle: -45,
				},
				yaxis: {
					autorange: true,
					fixedrange: true,

					//  title: "Total Charge",
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
			Plotly.newPlot('TopX_Roaming', data, layout, config);
		}
	})
}

//Top 4 Recharge List
function TopX_Recharge() {
	if (top4_mnth == '0') {
		top4_mnth = 'Jan';
	}
	if (top4_mnth == '1') {
		top4_mnth = 'Feb';
	}
	if (top4_mnth == '2') {
		top4_mnth = 'Mar';
	}
	if (top4_mnth == '3') {
		top4_mnth = 'Apr';
	}
	if (top4_mnth == '4') {
		top4_mnth = 'May';
	}
	if (top4_mnth == '5') {
		top4_mnth = 'Jun';
	}
	if (top4_mnth == '6') {
		top4_mnth = 'Jul';
	}
	if (top4_mnth == '7') {
		top4_mnth = 'Aug';
	}
	if (top4_mnth == '8') {
		top4_mnth = 'Sep';
	}
	if (top4_mnth == '9') {
		top4_mnth = 'Oct';
	}
	if (top4_mnth == '10') {
		top4_mnth = 'Nov';
	}
	if (top4_mnth == '11') {
		top4_mnth = 'Dec';
	}

	// today = new Date();
	// date = (today.getMonth()+1);
	//document.getElementById("Top4").innerHTML= top4_mnth+" "+top4_year;
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/api/TopxRechargeVoucher?year=' + top4_year + '&month=' + top4_mnth,
		
		dataType: 'json',
		
		success: function (jsonData) {
			 month=(jsonData.month);
			 year=(jsonData.year);
		//console.log(month);
		//	document.getElementById("Top4").innerHTML="Top 4 Recharge List - "+ month+" "+year
			function unpack(data, key) {
				return data.topxRechargeList.map(function (row) {
					return row[key];
				});
			}
			var demodata = jsonData.topxRechargeList;
			var tc = new Array(demodata.length);
			for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];
				tc[i] = obj.rc_count;
			}
			//	console.log(tc);

			var trace1 = {
				type: 'bar',
				//	orientation:"h",
				x: unpack(jsonData, "recharge_amount"),
				y: unpack(jsonData, "rc_count"),
				text: tc.map(String),
				hoverinfo: 'y',
				textposition: 'auto',
				marker: {
					color: ['rgba(0,128,0,0.8)', 'rgba(255,255,0,0.7)', 'rgba(24,204,204,1)', 'rgba(255,0,0,0.7)', 'rgba(24,24,204,1)'],
					//bar outline
					//   line: {
					//       width: 2.0
					//   }
				}
			};

			var data = [trace1];

			var layout = {
				dragmode: "pan",
				barmode: "group",
				showlegend: false,
				width: '600',
				height: 500,

				displayModeBar: false,

				xaxis: {
					//	title:'Recharge Amount',
					showgrid: false,
				},
				yaxis: {
					autorange: true,
					fixedrange: true,
					//  title: "Recharge Count"
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
			Plotly.newPlot('TopX_Recharge', data, layout, config);
		}
	})
}

//Key Operational KPIs table pie charts
function Key_Operation() {
	if (keyop_mnth == '0') {
		keyop_mnth = 'Jan';
	}
	if (keyop_mnth == '1') {
		keyop_mnth = 'Feb';
	}
	if (keyop_mnth == '2') {
		keyop_mnth = 'Mar';
	}
	if (keyop_mnth == '3') {
		keyop_mnth = 'Apr';
	}
	if (keyop_mnth == '4') {
		keyop_mnth = 'May';
	}
	if (keyop_mnth == '5') {
		keyop_mnth = 'Jun';
	}
	if (keyop_mnth == '6') {
		keyop_mnth = 'Jul';
	}
	if (keyop_mnth == '7') {
		keyop_mnth = 'Aug';
	}
	if (keyop_mnth == '8') {
		keyop_mnth = 'Sep';
	}
	if (keyop_mnth == '9') {
		keyop_mnth = 'Oct';
	}
	if (keyop_mnth == '10') {
		keyop_mnth = 'Nov';
	}
	if (keyop_mnth == '11') {
		keyop_mnth = 'Dec';
	}
	console.log(keyop_mnth);
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/api/KeyOperational?year=' + keyop_year + '&month=' + keyop_mnth,
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.keyOperationalList.map(function (row) {
					return row[key];
				});
			}
			var demodata = jsonData.keyOperationalList;
			var tabledata = '';
			$.each(demodata, function (index, data) {
				tabledata += '<tr><td>' + data.adaptor_Name + '</td><td>' + data.process_status + '</td><td>' + data.file + '</td></tr>';
			});
			//$('#tablevalue1').append(tabledata);
			$('#ntable').append('<table  id="key_Operational" class="table table-bordered mb-0">'
				+ '<thead class="thead-dark">'
				+ '<tr>'
				+ '<th scope="col" style="text-align:left">Adapter Name</th>'
				+ '<th scope="col" style="text-align:left">Process Status</th>'
				+ '<th scope="col" style="text-align:left">Files</th>'
				+ '</tr>'
				+ '</thead>'
				+ '<tbody id="tablevalue1">'
				+ tabledata
				+ '</tbody>'
				+ '</table>'
			);
			$("#key_Operational").DataTable({
				"order": [],
				"autoWidth": false,
			});
		}
	})
}


//table Key Reconciliation KPIs table horizontal bars

function Key_Reconcillation() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/api/Key_Reconciliation?year=2020&month=jul',
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.keyReconciliationlist.map(function (row) {
					return row[key];
				});
			}

			
			var demodata = jsonData.keyReconciliationlist;
			var tabledata = '';

			var varience = new Array(demodata.length);
			var z = 1;
			
				for (var i = 0; i < demodata.length; i++) {
				var obj = demodata[i];

				if (obj.varience > 0 )
				{
					varience[i] = 'success';
					
				}
				else if (obj.varience < 0) {

					varience[i] = 'danger';
					}
			}

			
			$.each(demodata, function (index, data) {

					tabledata += '<tr><td style="text-align:center">' + data.kpiName + '</td><td style="text-align:center"><b>' + "MSC" + '<br><small>VS</small><br>' + "Rated" + '</b></td><td style="text-align:center"><b>' + data.msc + '</b><br> <br><b>' + data.rated + '</b></td><td style="text-align:center">  <span class="badge badge-'+varience[index]+'"><b>'+ data.varience + '</b></span></td><td style="text-align:center">' + data.type + '</td></tr>';			});


			$('#tablevalue2').append(tabledata);


		}
	})
}

//table Key Cases & Alarm KPIs

function Key_Cases() {
	$.ajax({
		url: 'https://192.168.167.6:8743/Dashboard/dashboard/api/Alarm_KPIs',
		dataType: 'json',
		success: function (jsonData) {
			var a = (jsonData.frodcaseClose);
			function unpack(data, key) {
				return data.alarmcasesList.map(function (row) {
					return row[key];
				});
			}
			var demodata = jsonData.alarmcasesList;
			var tabledata = '';
			tabledata += '<tr><td>Percent (%) Fraud Cases Closed</td><td>' + a + '</td></tr>';


			$.each(demodata, function (index, data) {

				tabledata += '<tr><td>' + data.caseName + '</td><td>' + data.count + '</td></tr>';
			});
			$('#tablevalue3').append(tabledata);
		}
	})
}
