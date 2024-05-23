package org.ntdashboard.Dao;

import org.ntdashboard.Model.RoamingDayByRevModel;
import org.ntdashboard.Model.RoamingEventByRevModel;
import org.ntdashboard.Model.RoamingOutDayByRevmodel;
import org.ntdashboard.Model.RomaingOutEventRevModel;

public interface RoamingDao {
	public RoamingDayByRevModel GetRoamingDayByRev(String year,String month,String currency);
	public RoamingEventByRevModel getEventRevOfRoaming(String year,String month,String currency);
	public RoamingOutDayByRevmodel getRoamingDailyRev(String year,String month,String currency);
	public RomaingOutEventRevModel getRoamingTapOutRev(String year,String month,String currency);
	
}
