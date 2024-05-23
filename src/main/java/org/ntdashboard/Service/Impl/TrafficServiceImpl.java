package org.ntdashboard.Service.Impl;

import org.ntdashboard.Dao.TrafficDao;
import org.ntdashboard.Model.TracfficRevDayByDayModel;
import org.ntdashboard.Model.TrafficEventByRevModel;
import org.ntdashboard.Model.TrafficRevCategoryModel;
import org.ntdashboard.Service.TrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrafficServiceImpl implements TrafficService {
	@Autowired
	TrafficDao trafficCategRevDbdao;

	@Override
	public TrafficRevCategoryModel getTrafficCatgRev(String year, String month, String currency) {

		TrafficRevCategoryModel trafficRevCategoryModel = new TrafficRevCategoryModel();

		trafficRevCategoryModel = trafficCategRevDbdao.getTrafficCategoryRev(year, month, currency);
		return trafficRevCategoryModel;
	}
	
	@Override
	public TracfficRevDayByDayModel getTrafficDayByDayRev(String year, String month, String currency) {
		
		TracfficRevDayByDayModel tracfficRevDayByDayModel=new TracfficRevDayByDayModel();
		tracfficRevDayByDayModel=trafficCategRevDbdao.getTrafficDayByDayRev(year, month, currency);
		
		return tracfficRevDayByDayModel;
	}
	
	@Override
	public TrafficEventByRevModel getTrafficEventByRev(String year, String month, String currency) {
		
		
		TrafficEventByRevModel trafficEventByRevModel=new TrafficEventByRevModel();
		trafficEventByRevModel=trafficCategRevDbdao.getTrafficEventbyRev(year, month, currency);
		return trafficEventByRevModel;
		
	}
}
