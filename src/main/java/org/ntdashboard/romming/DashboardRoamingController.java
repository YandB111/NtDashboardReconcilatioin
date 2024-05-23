package org.ntdashboard.romming;
/**
 * 
 * @author kashish
 *
 */

import org.ntdashboard.Service.RoamingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
@RequestMapping(value="/dashboard/roaming/api/")

public class DashboardRoamingController {
	
	
	@Autowired 
	RoamingService roamingDayByRevService;
	
	
	
	@RequestMapping(value="/RoamingDayByDayRev" ,method= {RequestMethod.GET,RequestMethod.POST})
	
	/*
	 * parameter year month and currency in tousand ,million and Billion
	 * Romaing  Day By Day Rev APi for First Table 
	 * Url for local Testing :http://localhost:8080/Dashboard/dashboard/roaming/RoamingDayByDayRev?year=2020&month=sep&currency=thousand
	 * url for live testing :https://192.168.167.5:8743/Dashboard/dashboard/roaming/RoamingDayByDayRev?year=2020&month=sep&currency=thousand 
	 */
	public @ResponseBody Object RoamingDayByDayRev(@RequestParam("year") String year,@RequestParam("month") String month
			,@RequestParam("currency") String currency)
	{
		return roamingDayByRevService.getRoamingDayByRev(year, month, currency);
	}
	
	/*
	 * Roaming Event Wise Rev  api for Second Table 
	 * 
	 * local url testing :http://localhost:8080/Dashboard/dashboard/roaming/RoamingEventByRev?year=2020&month=sep&currency=thousand
	 * url for live testing ::https://192.168.167.6:8743/Dashboard/dashboard/roaming/RoamingEventByRev?year=2020&month=sep&currency=thousand
	 * 
	 * 
	 * 
	 * 
	 */
	
	
	@RequestMapping(value="/RoamingEventByRev" ,method= {RequestMethod.GET,RequestMethod.POST})
    public @ResponseBody Object RoamingEventByRev(@RequestParam("year") String year,@RequestParam("month") String month
			,@RequestParam("currency") String currency)
	{
		return roamingDayByRevService.getEventRevRoaming(year, month, currency);
	}
	
	/*
	 * Roaming Tap out Day By day rev for Roaming out page 
	 * url for loacl Testing :http://localhost:8080/Dashboard/dashboard/roaming/Roaming_out_Rev?year=2020&month=sep&currency=thousand
	 * url for live testing :https://192.168.167.6:8743/Dashboard/dashboard/roaming/Roaming_out_Rev?year=2020&month=sep&currency=thousand
	 * 
	 */
	
	@RequestMapping(value="Roaming_out_Rev" ,method= {RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody Object Roaming_outEventByRev(@RequestParam("year") String year,@RequestParam("month") String month,
			@RequestParam("currency") String currency)
	{
		return roamingDayByRevService.getRoamingTapOutRev(year, month, currency);
		
	}
	
	/*
	 * Roaming Tap out Event By rev for the 2nd Table In Roaming Tap out page 
	 * 
	 * Testing local url:http://localhost:8080/Dashboard/dashboard/roaming/Roaming_out_EventRev?year=2020&month=sep&currency=thousand
	 * testing on live server:https://192.168.167.6:8743/Dashboard/dashboard/roaming/Roaming_out_EventRev?year=2020&month=sep&currency=thousand
	 * 
	 * 
	 */
	
	
	@RequestMapping(value="Roaming_out_EventRev", method= {RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody Object RoamingOutEventRev(@RequestParam("year") String year,@RequestParam("month") String month,
			@RequestParam("currency") String currency)
	{
		return roamingDayByRevService.getRoaingOutEventRev(year, month, currency);
		
	}
	
	
}
