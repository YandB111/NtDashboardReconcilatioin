package org.ntdashboard.traffic;

import org.ntdashboard.Service.TrafficService;
/**
 * 
 * @author kashish
 *
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/dashboard/traffic/api/")
public class TrafficController {

	
	@Autowired
	TrafficService trafficDayByDayRevService;
	
	
	
	/*
	 * 
	 * Traffic Day By day for First table  Api 
	 * url for local testing :	//http://localhost:8080/Dashboard/dashboard/traffic/trafficRevenueDayByDay?year=2020&month=aug&currency=Billion

	 */
	@RequestMapping(value="/trafficRevenueDayByDay",method= {RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody Object trafficRevDayByDay(@RequestParam("year") String year,@RequestParam("month") String month,
			@RequestParam("currency") String currency)
	{
		return  trafficDayByDayRevService.getTrafficDayByDayRev(year, month, currency);
	}
	
	/*
	 * 
	 * Traffic Day By Day Rev Event  Wise for 2nd Table  api
	 * 	 * url for local testing :	//http://localhost:8080/Dashboard/dashboard/traffic/trafficRevenueGraph?year=2020&month=aug&currency=Billion

	 */
	@RequestMapping(value="/trafficRevenueGraph",method= {RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody Object trafficRevenueCategoryWise(@RequestParam("year") String year,@RequestParam("month") String month,
			@RequestParam("currency") String currency)
	{
		return  trafficDayByDayRevService.getTrafficEventByRev(year, month, currency);
	}
	
	/*
	 * 
	 * Traffic Day By Day Rev Category Wise for 3rd  Table  api
	 * 	 * url for local testing :	//http://localhost:8080/Dashboard/dashboard/traffic/trafficRevenueCategory?year=2020&month=aug&currency=Billion

	 */
	@RequestMapping(value="/trafficRevenueCategory",method= {RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody Object trafficRevenueThirdTable(@RequestParam("year") String year,@RequestParam("month") String month,
			@RequestParam("currency") String currency)
	{
		return  trafficDayByDayRevService.getTrafficCatgRev(year, month, currency);
	}

}
