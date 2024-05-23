package org.ntdashboard.Service;

import java.util.List;
import java.util.Map;
public interface Plot_dashboard_service {
	 List<Map<String, Object>> getdashLineChart(String paramString1, String paramString2, String paramString3, String paramString4);
	  
	  List<Map<String, Object>> getAverageRevenue(String paramString1, String paramString2, String paramString3, String paramString4);
	  
	  List<String> getDbDateRange();
}
