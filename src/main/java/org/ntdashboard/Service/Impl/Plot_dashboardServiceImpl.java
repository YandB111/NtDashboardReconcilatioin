package org.ntdashboard.Service.Impl;
import java.util.List;
import java.util.Map;

import org.ntdashboard.Dao.Plot_dashboard_Dao;
import org.ntdashboard.Service.Plot_dashboard_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Plot_dashboardServiceImpl implements Plot_dashboard_service {
	  @Autowired
	  Plot_dashboard_Dao dashDao;
	  
	  public List<Map<String, Object>> getdashLineChart(String action, String fromdate, String todate, String frequency) {
	    return this.dashDao.getDashLineChart(action, fromdate, todate, frequency);
	  }
	  
	  public List<Map<String, Object>> getAverageRevenue(String action, String fromdate, String todate, String frequency) {
	    return this.dashDao.getAverageRevenue(action, fromdate, todate, frequency);
	  }
	  
	  public List<String> getDbDateRange() {
	    return this.dashDao.getDbDateRange();
	  }

}
