package org.ntdashboard.Service;

import org.ntdashboard.Model.TracfficRevDayByDayModel;
import org.ntdashboard.Model.TrafficEventByRevModel;
import org.ntdashboard.Model.TrafficRevCategoryModel;

public interface TrafficService {
	public TrafficRevCategoryModel getTrafficCatgRev(String year, String month, String currency);

	public TracfficRevDayByDayModel getTrafficDayByDayRev(String year, String month, String currency);

	public TrafficEventByRevModel getTrafficEventByRev(String year, String month, String currency);
}
