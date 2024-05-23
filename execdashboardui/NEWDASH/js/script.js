$(document).ready(function () {
	Table_top();
});

function Table_top(){
    $.ajax({
		url: 'https://192.168.167.5:8743/Dashboard/dashboard/rev/api/getDayByDayRev?year=2020&month=may',
		dataType: 'json',
		success: function (jsonData) {
			function unpack(data, key) {
				return data.dayRevList.map(function (row) {
					return row[key];
				});
			}

			var demodata = jsonData.dayRevList;
			var tableTop = '';
			var tableTop1 = '';
			var tableTop2 = '';
			var tableTop3 = '';
			var tableTop4 = '';

			$.each(demodata ,function (index, data) {
				tableTop += '<tc><td scope="col" style="text-align:center">' + data.voicerev + '</td></tc>';
		
				
			// +'<tc><td scope="row" style="text-align:right">' + data.smsrev + '</td></tc>'+'<tc><td scope="row" style="text-align:right">' + data.datarev + '</td></tc>'+'<tc><td scope="row" style="text-align:right"> ' + data.otherRev + '</td></tc>';
			 });
			 $.each(demodata ,function (index, data) {
			 tableTop1 += '<tc><td scope="col"  style="text-align:center">' + data.smsrev + '</td></tc>';
			 });
			 $.each(demodata ,function (index, data) {
				tableTop2 += '<tc><td scope="col" style="text-align:center">' + data.datarev + '</td></tc>';
				});
				$.each(demodata ,function (index, data) {
					tableTop3 += '<tc><td scope="col" style="text-align:center">' + data.otherRev + '</td></tc>';
					});
					$.each(demodata ,function (index, data) {
						tableTop4 += '<tc><td scope="col" style="text-align:center"><b>' + data.totalRev + '</b></td></tc>';
						});
			$('#ntable').append('<table  id="tablevalue_top" class="table table-bordered mb-0">'
			+'<colgroup>'
				+ '<thead class="thead-dark">'
				+ '<tr>'
				+ '<th scope="col">Events</th>'
				+'<th scope="col">May</th>'
				+'<th scope="col">1</th>'
				+'<th scope="col">2</th>'
				+'<th scope="col">3</th>'
				+'<th scope="col">4</th>'
				+'<th scope="col">5</th>'
				+'<th scope="col">6</th>'
				+'<th scope="col">7</th>'
				+'<th scope="col">8</th>'
				+'<th scope="col">9</th>'
				+'<th scope="col">10</th>'
				+'<th scope="col">11</th>'
				+'<th scope="col">12</th>'
				+'<th scope="col">13</th>'
				+'<th scope="col">14</th>'
				+'<th scope="col">15</th>'
				+'<th scope="col">16</th>'
				+'<th scope="col">17</th>'
				+'<th scope="col">18</th>'
				+'<th scope="col">19</th>'
				+'<th scope="col">20</th>'
				+'<th scope="col">21</th>'
				+'<th scope="col">22</th>'
				+'<th scope="col">23</th>'
				+'<th scope="col">24</th>'
				+'<th scope="col">25</th>'
				+'<th scope="col">26</th>'
				+'<th scope="col">27</th>'
				+'<th scope="col">28</th>'
				+'<th scope="col">29</th>'
				+'<th scope="col">30</th>'
				+'<th scope="col">31</th>'
			
				+ '</tr>'
				+ '</thead>'
				+ '<tbody id="tablevalue_top">'
				+'<td><b>'+"VOICE"+ '</b></td>'
				+'<td>'+"a "+ tableTop+'</td>'
				+'<tr>'
				+'<td><b>'+"SMS"+ '</b></td>'
				+'<td >'+tableTop1+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td><b>'+"DATA"+ '</b></td>'
				+'<td>'+tableTop2+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td><b>'+"Others"+ '</b></td>'
				+'<td>'+tableTop3+'</td>'
				+'</tr>'
				+'<tr class="bg-secondary text-white">'
				+'<td><b>'+"Total Revenue"+ '</b></td>'
				+'<td >'+tableTop4+'</td>'
				+'</tr>'
				+ '</tbody>'
				+ '</table>'
			)
	//		$('#tablevalue_top').append(tableTop);
		

		}
	})
}