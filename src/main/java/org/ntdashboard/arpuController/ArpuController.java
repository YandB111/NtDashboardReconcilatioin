package org.ntdashboard.arpuController;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.ntdashboard.Service.Plot_dashboard_service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping({"/dashboard/arpu/api/"})
public class ArpuController {
    private static final Logger logger = LoggerFactory.getLogger(ArpuController.class);

    @Autowired
    Plot_dashboard_service dashboard_service;

    @RequestMapping(value = {"/"}, method = {RequestMethod.GET})
    public String home(Model model) {
        try {
            logger.info("Welcome home!");
            // Additional logic for home page if needed
            return "home";
        } catch (Exception e) {
            logger.error("An error occurred while processing the home request", e);
            return "error";
        }
    }

    
    @ResponseBody
    @RequestMapping(value = {"/Average_revenue_total_arpu"}, method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<String> getaverageTotalArpu(Model model, HttpServletRequest request) {
        try {
            String action = request.getParameter("action");
            String fromDate = request.getParameter("fromDate");
            String toDate = request.getParameter("toDate");
            String frequency = request.getParameter("frequency");
            String position = request.getParameter("position");
            String argument = request.getParameter("argument");

            List<Map<String, Object>> averageRevenueList = dashboard_service.getAverageRevenue(action, fromDate, toDate, frequency);
            StringBuilder responseBuilder = new StringBuilder();
            responseBuilder.append("["); // Start of JSON array

            // Iterate over each item in the averageRevenueList
            for (Map<String, Object> item : averageRevenueList) {
                responseBuilder.append("{\"arpu\": \"").append(item.get("arpu")).append("\", \"date\": \"").append(item.get("newdate")).append("\"},");
            }

            // Remove the trailing comma if there are elements in the list
            if (!averageRevenueList.isEmpty()) {
                responseBuilder.deleteCharAt(responseBuilder.length() - 1);
            }

            responseBuilder.append("]"); // End of JSON array

            return new ResponseEntity<>(responseBuilder.toString(), HttpStatus.OK);
        } catch (Exception e) {
            logger.error("An error occurred while processing the Average_revenue_total_arpu request", e);
            return new ResponseEntity<>("An error occurred while processing the request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseBody
    @RequestMapping(value = {"/SubscriberGrowthServlet"}, method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<String> geLineDashData(Model model, HttpServletRequest request) {
        try {
            String action = request.getParameter("action");
            String fromDate = request.getParameter("fromDate");
            String toDate = request.getParameter("toDate");
            String frequency = request.getParameter("frequency");
            String position = request.getParameter("position");
            String argument = request.getParameter("argument");

            List<Map<String, Object>> dashLineChart = dashboard_service.getdashLineChart(action, fromDate, toDate, frequency);

            StringBuilder responseBuilder = new StringBuilder();
            responseBuilder.append("["); // Start of JSON array

            // Iterate over each item in the dashLineChart list
            for (Map<String, Object> item : dashLineChart) {
                String eventDate = (String) item.get("event_date");
                String formattedEventDate = (String) item.get("formatted_event_date");
                String subsCount = String.valueOf(item.get("subs_count"));
                String demo = (String) item.get("demo");

                // Construct the JSON object
                responseBuilder.append("{")
                               .append("\"event_date\": \"").append(eventDate).append("\", ")
                               .append("\"formatted_event_date\": \"").append(formattedEventDate).append("\", ")
                               .append("\"subs_count\": ").append(subsCount).append(", ")
                               .append("\"user\": \"").append(demo).append("\"")
                               .append("}")
                               .append(", "); // Comma to separate objects
            }

            // Remove the trailing comma if there are any items
            if (!dashLineChart.isEmpty()) {
                responseBuilder.delete(responseBuilder.length() - 2, responseBuilder.length());
            }

            responseBuilder.append("]"); // End of JSON array

            // Return the JSON response
            return ResponseEntity.ok(responseBuilder.toString());
        } catch (Exception e) {
            logger.error("An error occurred while processing the SubscriberGrowthServlet request", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ResponseBody
    @RequestMapping(value = {"/getDateRange"}, method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<List<String>> getDbDateRange(HttpServletRequest request) {
        try {
            List<String> dbDateRange = dashboard_service.getDbDateRange();
            return new ResponseEntity<>(dbDateRange, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("An error occurred while processing the getDateRange request", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
