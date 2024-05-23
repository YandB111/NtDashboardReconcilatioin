package org.ntdashboard.Dao.Extractor;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.RoamingEventByRevList;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class RoamingEventByRevDbExtractor implements ResultSetExtractor<RoamingEventByRevList> {

	@Override
	public RoamingEventByRevList extractData(ResultSet res) throws SQLException, DataAccessException {

		RoamingEventByRevList roamingEventByRevList=new RoamingEventByRevList();
		String date=res.getString("EVENT_DATE");
		String day = date.substring(8,10);
		roamingEventByRevList.setDay(day);
		roamingEventByRevList.setOnnet(res.getString("ONNET"));
		roamingEventByRevList.setOffnet(res.getString("OFFNET"));
		roamingEventByRevList.setNational(res.getString("NATIONAL"));
		roamingEventByRevList.setInternational(res.getString("INTERNATIONAL"));
		roamingEventByRevList.setOthers(res.getString("OTHERS"));
		roamingEventByRevList.setTotal(res.getString("ATOTAL_REV"));
		roamingEventByRevList.setPst(res.getString("DIFF"));
		
		return roamingEventByRevList;
	}

}
