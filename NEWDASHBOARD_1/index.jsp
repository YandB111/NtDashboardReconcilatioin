<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ page import="com.connectiva.commons.signon.shared.CommonsUserPrincipal" %>
<%
 String contextPath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
%>

<!DOCTYPE html>
<html lang="en">

<head>
  
    <script src='<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/plotly-latest.min.js'></script>
	
    <script
  src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery-3.5.1.min.js"></script>
    <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery.min.js" type="text/javascript"></script>
          
     

  <!-- Meta Tags -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title style="color:#ff0000">iConnectiva</title>

  <!-- Google Fonts -->
  
  <!-- favicon -->
  <!-- <link rel="shortcut icon" href="./assets/img/favicon.png" /> -->
  <!-- <link rel="apple-touch-icon" href="./assets/img/apple-touch-icon-57x57.png" /> -->
  <!-- <link rel="apple-touch-icon" sizes="72x72" href="./assets/img/apple-touch-icon-72x72.png" /> -->
  <!-- <link rel="apple-touch-icon" sizes="114x114" href="./assets/img/apple-touch-icon-114x114.png" /> -->
  <link rel="apple-touch-icon" sizes="180x180" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/images/apple-touch-icon.png">
  <!--<link rel="icon" type="image/png" sizes="32x32" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"> -->
  <link rel="manifest" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/images/site.webmanifest">

  <!-- CSS -->
  <link href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/font-awesome.min.css" rel="stylesheet"
    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <link rel="stylesheet" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/bootstrap.min.css" />
  <link rel="stylesheet" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/dataTables.bootstrap4.min.css" />
  <link rel="stylesheet" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/gijgo.min.css" />
  <link rel="stylesheet" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/styles.css" />
  <link rel="stylesheet" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/jquery-ui.css" />
  <link rel="stylesheet" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/responsive.css" />
<link rel="stylesheet" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/font-awesome.min.css" />
  <link rel="stylesheet" href="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/css/daterangepicker.css" />

<!--[if IE]>
<script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/html5shiv.js"></script>
<![endif]-->
</head>

<body>
  <div class="fullPage">
    <div class="full-content">


      <!--Search section-->

      <section class="revenue_section mt-3">
        <div class="container-fluid">
          <div class="row">
            <!--graph-->

            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-title">Day-on-Day Revenue Growth for the Month <a href="#"
                    class="btn btn-primary float-btn float-right text-dark bg-transparent" id="filter_bar"><i
                      class="fa fa-filter"></i></a></div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <div id='myDiv' style="margin-top: 10px">
                      </div>
                    </div>
                    <div class="row mt-6">
                      <div id='Day_bar' style="max-width:700px"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
      <!--//Search-->

      <!--Key Revenue Figures and TopX Roaming Partners section-->
      <section class="revenue_section mt-3">
        <div class="container-fluid">
          <div class="row ">
            <!--graph-->
            <div class="col-md-7">
              <div class="card">
                <div class="card-header card-title ">Key Revenue Figures  <div class="custom_daterange">
                <input type="date"  name="birthday" id="myBirthday" style="float-right">
                <button type="button" onclick="getValue()">Apply</button>

                </div></div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <!--  <div id='KRF_table'></div>  -->
                      <table class="table table-bordered mb-0" id='tablevalue'>

                        <!-- </tbody> -->
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="card">
                <div class="card-header card-title month_date" >% of Total Revenue - <span id='pie'></span> 
                  <input class="float-right monthpicker d-inline-block border-0 bg-transparent" type="text" id="pie_chart">
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">

                      <div id='pieChart'></div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
      </section>

      <!--//Key Revenue Figures and TopX Roaming Partners section-->
      <section class="revenue_section mt-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header card-title month_date">Top 10 Roaming Partners - <span id='Top10'></span> 
                  <input class="float-right monthpicker d-inline-block border-0 bg-transparent" type="text" id="Top_10">
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 topX_Roaming_partners">
                      <div id="TopX_Roaming"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header card-title month_date"> Top 4 Recharge - <span id='Top4'></span> <input
                    class="float-right monthpicker d-inline-block border-0 bg-transparent" type="text" id="Top_4"></div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12 topX_Roaming_partners">
                      <div id="TopX_Recharge"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
      <!--Key Reconciliation KPIs section-->
      <section class="revenue_section mt-3">
        <div class="container-fluid">
          <div class="row">
            <!--graph-->
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-title">Key Reconciliation KPIs</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col" style="text-align:center">KPI Name</th>
                            <th scope="col" style="text-align:cenetr">Source(s)</th>
                            <th scope="col" style="text-align:center">Value</th>
                            <th scope="col" style="text-align:center">Variance</th>
                            <th scope="col" style="text-align:center">Unit</th>
                            <!--   <th scope="col">Variance</th> -->
                          </tr>
                        </thead>
                        <tbody id='tablevalue2'>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/graph-->
            <!--//Search bar-->
            <!--//Search bar-->
          </div>
        </div>
      </section>
      <!--//Key Reconciliation KPIs section-->

      <!--Key Operational KPIs section-->
      <section class="revenue_section mt-3 mb-3">
        <div class="container-fluid">
          <div class="row">
            <!--graph-->
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-title">Key Operational KPIs <i class="float-right fa fa-calendar fa_custom_calendar"></i><input
                  class="float-right monthpicker d-inline-block border-0 bg-transparent" type="text" id="key_op"></div>
                  
                <div class="card-body">
                  <div class="row">
                    <div id="ntable" class="col-md-12">
                      <!-- <table  id="key_Operational" class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Adapter Name</th>
                            <th scope="col">Process Status</th>
                            <th scope="col">Files</th>

                              <th scope="col">Distribution</th>
                          </tr>
                        </thead>
                        <tbody id='tablevalue1'>

                        </tbody> 
                      </table>  -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-header card-title">Key Cases & Alarm KPIs - <span id='key_cases'></span></div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <table class="table table-bordered mb-0">
                        <tbody id='tablevalue3'>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--/graph-->
      <!--//Search bar-->




      <!--//Key Operational KPIs section-->
      <!----Footer section--->
      <!-- <footer>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <p class="text-center">Copyright © 2020 Altruist Technologies. All Rights Reserved - <a href="#">Privacy
                  Policy</a>| <a href="#">Terms & Conditions</a></p>
            </div>
          </div>
        </div>
      </footer> -->
      <!----Footer section close--->

      <div id="float-div" class="float-div">
        <div class="position-div">
          <div class="float-frame">
            <div class="flaot_div_header">
              <Span class="due_bal_amt"><strong>Filter</strong></Span>
              <a href="#" class="float_close"><i class="fa fa-close"></i></a>
            </div>
            <form class="mt-2">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="invisible">filter</label>
                    <div class="input-group">
                      <button type="button" class="btn btn-default float-right" id="daterange-btnup">
                        <span>
                          <i class="fa fa-calendar"></i> Date Range
                        </span>
                        <i class="fa fa-caret-down"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <form >
                <div class="col-md-4">
                  <div class="form-group" >
                    <label for="exampleInputEmail1">Select User Type</label>
                    <select class="custom-select" name="usertype" id="user_type">
                      <option value="">ALL</option>
                      <option value="PostPaid">Post Paid</option>
                      <option value="PrePaid">Pre Paid</option>
                      <!-- <option value="3">Three</option> -->
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group" >
                    <label for="exampleInputEmail1">Select Service</label>
                    <select class="custom-select" name="selectservice" id="select_service">
                      <option value="">ALL</option>
                      <option value="Voice">Voice</option>
                      <option value="Data">Data</option>
                      <option value="SMS">SMS</option>
                    </select>
                  </div>
                </div>
                </form>
              </div>
              
              <div class="row">
                <div class="col-md-12 text-right">
                  <button type="submit" class="btn btn-primary" onclick="filter_top()" class="float_close">Apply</button>
                  <button type="reset" class="btn btn-primary" onclick="Reload()" class="float_close">Reset</button>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- key operational filter-->

     

       <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/popper.min.js"></script>
      <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/Script_dshboard.js"></script>
      <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/bootstrap.min.js"></script>
      <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/gijgo.min.js"></script>
      <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery.dataTables.min.js"></script>
      <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/dataTables.bootstrap4.min.js"></script>
      <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery-ui.min.js"></script>
      <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/moment.min.js"></script>
      <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/daterangepicker.js"></script>

      
      <div class="float_overlay" style="display: none"></div>
      <!-- <script>
        $(function () {
          $("#key_Operational").DataTable({
            "order": [],
            "autoWidth": false,
          });
        });
      </script> -->
      <script>
       
        // date and filter barchart and line chart
        $(document).ready(function () {
          $('#filter_bar').on('click', function () {
            $('#float-div').addClass('open');
            $('.float_overlay').addClass('d-block');
          });
          $('.float_close').on('click', function () {
            $('.float-div').removeClass('open');
            $('.float_overlay').removeClass('d-block');
          });
        });

        $(document).ready(function () {
          $('#filter_down').on('click', function () {
            $('#key_operational').addClass('open');
            $('.float_overlay').addClass('d-block');
          });
          $('.float_close').on('click', function () {
            $('.float-div').removeClass('open');
            $('.float_overlay').removeClass('d-block');
          });
        });

        
        
        today = new Date();
     var month=   new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
     month=new Date(month).toUTCString();
month=month.split(' ').slice(2,3).join('-');

var year=   new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})
year=new Date(year).toUTCString();
year=year.split(' ').slice(3,4).join('-');
    // console.log(month,year);
  
  
  //    date = (today.getMonth()+1);
  // month= today.getFullYear();


document.getElementById('Top4').innerHTML=month +' '+year;
//console.log(date,month);

document.getElementById('Top10').innerHTML=month +' '+year;
//console.log(date,month);

document.getElementById('pie').innerHTML=month +' '+year;
//console.log(date,month);
document.getElementById('key_cases').innerHTML=month +' '+year;


       
      </script>
</body>

</html>


 
