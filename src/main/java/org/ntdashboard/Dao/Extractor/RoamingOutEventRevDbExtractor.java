package org.ntdashboard.Dao.Extractor;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.RoamingOutEventByRevList;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class RoamingOutEventRevDbExtractor implements ResultSetExtractor<RoamingOutEventByRevList>{

	@Override
	public RoamingOutEventByRevList extractData(ResultSet res) throws SQLException, DataAccessException {

		RoamingOutEventByRevList roamingOutEventByRevList=new RoamingOutEventByRevList();
		
		String date=res.getString("EVENT_DATE");
		String day = date.substring(8,10);
		roamingOutEventByRevList.setDay(day);
		roamingOutEventByRevList.setOnnet(res.getString("ONNET"));
		roamingOutEventByRevList.setOffnet(res.getString("OFFNET"));
		roamingOutEventByRevList.setNational(res.getString("NATIONAL"));
		roamingOutEventByRevList.setInternational(res.getString("INTERNATIONAL"));
		roamingOutEventByRevList.setOthers(res.getString("OTHERS"));
		roamingOutEventByRevList.setTotal(res.getString("ATOTAL_REV"));
		roamingOutEventByRevList.setPst(res.getString("DIFF"));
		return roamingOutEventByRevList;
	}

}
