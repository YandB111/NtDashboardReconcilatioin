package org.ntdashboard.Service;

import org.ntdashboard.Model.RoamingDayByRevModel;
import org.ntdashboard.Model.RoamingEventByRevModel;
import org.ntdashboard.Model.RoamingOutDayByRevmodel;
import org.ntdashboard.Model.RomaingOutEventRevModel;

public interface RoamingService {

	  public  RoamingDayByRevModel getRoamingDayByRev(String year,String month,String currency);
	  public RoamingEventByRevModel getEventRevRoaming(String year,String month ,String currency);
	  public RoamingOutDayByRevmodel getRoamingTapOutRev(String year,String month,String currency);
	  public RomaingOutEventRevModel getRoaingOutEventRev(String year,String month,String currency);

}
