package org.ntdashboard.Dao;

import org.ntdashboard.Model.TracfficRevDayByDayModel;
import org.ntdashboard.Model.TrafficEventByRevModel;
import org.ntdashboard.Model.TrafficRevCategoryModel;

public interface TrafficDao {
	
	public TracfficRevDayByDayModel getTrafficDayByDayRev(String year,String month,String currency);
	public TrafficEventByRevModel getTrafficEventbyRev(String year,String month, String currency);
	public TrafficRevCategoryModel getTrafficCategoryRev(String year,String month,String currency);

}
