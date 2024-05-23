  $(document).ready(function(){
	piechart();
})

function piechart()
{
	$.ajax({
		url:'https://192.168.167.6:8743/Dashboard/dashboard/api/totalRevenue?Start_date=09-may-2020&End_date=22-jun-2020',
		dataType:'json',
		success:function(jsonData)
		{
             // console.log(tabledata);
			//$('#tablevalue').html(tabledata);
			//console.log(jsonData);
			// var data = JSON.stringify(jsonData);
				function unpack(data,key) {
				return data.totalRevTrendList.map(function(row) {
						return row[key];
					});
				}
			 
            
			 var data = [{
					  type: 'pie',
					  values: unpack(jsonData, "value"),
					  labels: unpack(jsonData, "label"),
					  marker: {
					     
					      line: {
					          width: 1.0
					      }
					  }
					};


					var data = [ trace1 ];

					var layout = {
			                    showlegend: true,
								width:550,
								height:300,
								displayModeBar: false,

					};

					var config = {responsive: true,
					modeBarButtonsToRemove:['select2d','pan2d','lasso2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian','zoom2d','autoScale2d','logo'],
					displaylogo: false,
					}
					Plotly.newPlot('pieChart', data, layout,config);
		}
		})
	}
