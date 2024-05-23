package org.ntdashboard.Dao.Extractor;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.DayByEventField;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;


public class TrafficDayByRevDbExtractor implements ResultSetExtractor<DayByEventField> {

	@Override
	public DayByEventField extractData(ResultSet res) throws SQLException, DataAccessException {
		// TODO Auto-generated method stub
		
		
		DayByEventField list=new DayByEventField();
		
		//list.setDay(res.getString("DATEWISE"));
		String date =res.getString("DATEWISE");
		//String year = date.substring(0,4);
		//String month = date.substring(5,7);
		String day = date.substring(8,10);
		//System.out.println(day);
		if(day.equalsIgnoreCase("01")||day.equalsIgnoreCase("02")||day.equalsIgnoreCase("03")||day.equalsIgnoreCase("04")||day.equalsIgnoreCase("05")||day.equalsIgnoreCase("06")||day.equalsIgnoreCase("07")||day.equalsIgnoreCase("08")||day.equalsIgnoreCase("09"))
		{
			day=day.replaceAll("0", "");
		}
		list.setDay(day);
		String eventTypeDesc=res.getString("EVENT_TYPE_DESC");
		eventTypeDesc=eventTypeDesc.replaceAll(" ", "_");
		list.setEventtypedesc(eventTypeDesc);
		list.setCountCdrs(res.getString("CDRS_COUNT"));
		return list;
	}

}
