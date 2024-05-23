<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%-- <%@ page import="com.connectiva.commons.signon.shared.CommonsUserPrincipal" %> --%>
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
              <div class="card mb-3">
                <div class="card-header card-title">MSC vs. IN Reconciliation - <span id="Top"></span>
                  <a href="#" class="btn btn-primary float-btn float-right text-dark bg-transparent mt-0 mr-0" id="filter_bar"><i
                    class="fa fa-filter"></i></a>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-12">
                      <div id="Table1" class="table-responsive">
                       </div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Record Count Wise Monthly Exception Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="pie_count">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-8">
                      <table class="table table-bordered mb-3">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Day-On-Day Record Count Wise Exception Analysis</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="bar_record">
                            </td>
                          </tr>
                          <!-- <tr>
                            <td id="line_record"></td>
                          </tr> -->
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Duration Wise Monthly Exception Details</th>
                          </tr>
                        </thead>
                        <tbody>r
                          <tr>
                            <td id="pie_duration">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-md-8">
                      <table class="table table-bordered mb-3">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Day-On-Day Duration Wise Exception Analysis</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="bar_count">
                            </td>
                          </tr>
                          <!-- <tr>
                            <td id="line_count"></td>
                          </tr> -->
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <table class="table table-bordered mb-0">
                        <thead class="thead-dark">
                          <tr>
                            <th scope="col">Exception Comparison</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td id="bar_variance">
                            </td>
                          </tr>
                          <!-- <tr>
                            <td id="line_variance"></td>
                          </tr> -->
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--/graph-->
          </div>
        </div>
      </section>
      <!--//Revenue Analysis section-->

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
                      <!-- <option value="">Select Month</option> -->
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
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
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
                  <button type="submit" class="btn btn-primary" onclick="filter_top()"
                    class="float_close">Apply</button>
                  <button type="reset" class="btn btn-primary" onclick="Reload()" class="float_close">Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>

    </div>
  </div>

<script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery-3.5.1.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/popper.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/NTDashboard/js/script_reconcilation.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/bootstrap.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/gijgo.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery.dataTables.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/dataTables.bootstrap4.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/jquery-ui.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/moment.min.js"></script>
  <script src="<%=contextPath%>/cs-execdashboard/portlets/ctva/execdashboardui/NEWDASH/js/daterangepicker.js"></script>  <script>
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
d.setMonth(d.getMonth()-1);

d=new Date(d).toUTCString();
d=d.split(' ').slice(2,3).join('-');

    today=new Date();
    var month=new Date().toLocaleString('en-us',{month:'long',year:'numeric',day:'numeric'})
    month=new Date(month).toUTCString();
    month=month.split(' ').slice(2,3).join('-');

    var year=new Date();
    year=new Date(year).toLocaleString('en-us',{month:'long',year:'numeric',day:'numeric'})
    year=new Date(year).toUTCString();
    year=year.split(' ').slice(3,4).join('-');

    document.getElementById('Top').innerHTML = d + ' ' + year + ' (In ' + unit + ')';

  </script>
  </body>

</html>
