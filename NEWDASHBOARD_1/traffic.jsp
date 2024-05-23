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


      <!--Key Revenue Figures and TopX Roaming Partners section-->
      <section class="revenue_section mt-3">
        <div class="container-fluid">
          <div class="row">
            <!--graph-->
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-title">Event Wise Traffic Analysis - <span id='TopTable'></span>
                  <a href="#" class="btn btn-primary mt-0 mr-0 float-btn float-right text-dark bg-transparent"
                    id="filter_bar"><i class="fa fa-filter"></i></a>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div id="ntable" class="table-responsive">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/graph-->
          </div>
        </div>

        <!--charge section-->
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Event Wise Monthly Traffic Bifurcation </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="PieChart_1">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-8">
                      <table class="table table-bordered table-hide mb-3">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Day-On-Day Event Wise Growth Analysis And Traffic Statistics</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="BarChart_1"></td>
                          </tr>
                          <!-- <tr>
                            <td id="LineChart_1"></td>
                          </tr> -->
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-12">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Day On Day Growth Analysis(%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="BarChart_percent"></td>
                          </tr>
                          <!-- <tr>
                            <td id="LineChart_percent"></td>
                          </tr> -->
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

      <!--TABLE 2-->
      <section class="revenue_section mt-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-title">Event Category Wise Traffic Analysis - <span id='centerTable'></span>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div id="table2" class="table-responsive">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Category Wise Monthly Traffic Bifurcation </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="PieChart_2">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-8">
                      <table class="table table-bordered mb-3">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Day-On-Day Event Category Wise Growth Analysis And Traffic Statistics </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="BarChart_2">
                            </td>
                          </tr>
                          <!-- <tr>
                            <td id="LineChart_2">
                            </td>
                          </tr> -->
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-12">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Day On Day Growth Analysis(%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="BarChart_percent_2"></td>
                          </tr>
                          <!-- <tr>
                            <td id="LineChart_percent_2"></td>
                          </tr> -->
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
      <!-- Revenue : Voice - Outgoing - Incoming & Others(SMS - GPRS)  -->

      <section class="revenue_section mt-3 mb-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-title">Status Wise SMS Traffic Analysis - <span id='bottomTable'></span>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div id="table3" class=table-responsive>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Status Wise Monthly Bifurcation </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="PieChart_3">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-8">
                      <table class="table table-bordered mb-3">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Day-On-Day Status Wise Growth Analysis And Traffic Statistics</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="BarChart_3">
                            </td>
                          </tr>
                          <!-- <tr>
                            <td id="LineChart_3">
                            </td>
                          </tr> -->
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-12">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Day On Day Growth Analysis(%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="BarChart_percent_3"></td>
                          </tr>
                          <!-- <tr>
                            <td id="LineChart_percent_3"></td>
                          </tr> -->
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

        <!-- filter chart and units-->

        <div id="float-div" class="float-div">
          <div class="position-div">
            <div class="float-frame">
              <div class="flaot_div_header">
                <Span class="due_bal_amt"><strong>Filter</strong></Span>
                <a href="#" class="float_close"><i class="fa fa-close"></i></a>
              </div>
              <form class="mt-0">
                <div class="row">
                  <!-- <div class="col-md-3">
                    <div class="form-group">
                      <label>Month</label>
                      <div class="input-group">
                        <input class="float-right monthpicker d-inline-block border-0 bg-transparent w-100" type="text"
                          id="date_filter">
                        <i class="fa fa-calendar fa_custom_calendar"></i>
                      </div>
                    </div>
                  </div> -->
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Select Month</label>
                      <select class="custom-select" name="chartMonth" id="Chart_Month">
                        <!-- <option selected value="">Select Month</option> -->
                        <option value="Jan">January</option>
                        <option value="Feb">February</option>
                        <option value="Mar">March</option>
                        <option value="Apr">April</option>
                        <option value="May">May</option>
                        <option value="Jun">June</option>
                        <option value="Jul">July</option>
                        <option value="Aug">August</option>
                        <option value="Sep">September</option>
                        <option value="Oct">October</option>
                        <option value="Nov">November</option>
                        <option value="Dec">December</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Select Year</label>
                      <select class="custom-select" name="chartYear" id="Chart_Year">
                        <option value="2019">2019</option>
                        <option selected value="2020">2020</option>
                        <option value="2021">2021</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Select Chart Type</label>
                      <select class="custom-select" name="chartType" id="Chart_type">
                        <option value="Bar">Bar Chart</option>
                        <option value="Line">Line Chart</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Select Unit</label>
                      <select class="custom-select" name="unit" id="Unit_value">
                        <option value="Thousand">Thousand</option>
                        <option selected value="Million">Million</option>
                        <option value="Billion">Billion</option>
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
    </div>
  
    </div>
  </div>


<script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery-3.5.1.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/popper.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/script_traffic.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/bootstrap.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/gijgo.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery.dataTables.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/dataTables.bootstrap4.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery-ui.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/moment.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/daterangepicker.js"></script>  
  <script>

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
    var d = new Date();
    d.setMonth(d.getMonth() - 1);

    d = new Date(d).toUTCString();
    d = d.split(' ').slice(2, 3).join('-');

    today = new Date();
    var month = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })
    month = new Date(month).toUTCString();
    month = month.split(' ').slice(2, 3).join('-');

    var year = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })
    year = new Date(year).toUTCString();
    year = year.split(' ').slice(3, 4).join('-');
    unit = document.getElementById("Unit_value").value;
    // console.log(month, year);

    document.getElementById('TopTable').innerHTML = month + ' ' + year + ' (In ' + unit + ')';
    document.getElementById('centerTable').innerHTML = month + ' ' + year + ' (In ' + unit + ')';
    document.getElementById('bottomTable').innerHTML = month + ' ' + year + ' (In ' + unit + ')';
  </script>

</body>

</html>