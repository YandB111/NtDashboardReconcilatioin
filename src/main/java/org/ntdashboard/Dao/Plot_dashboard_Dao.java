package org.ntdashboard.Dao;

import java.util.List;
import java.util.Map;
public interface Plot_dashboard_Dao {
	List<Map<String, Object>> getDashLineChart(String paramString1, String paramString2, String paramString3, String paramString4);
	  
	  List<Map<String, Object>> getAverageRevenue(String paramString1, String paramString2, String paramString3, String paramString4);
	  
	  List<String> getDbDateRange();
}
