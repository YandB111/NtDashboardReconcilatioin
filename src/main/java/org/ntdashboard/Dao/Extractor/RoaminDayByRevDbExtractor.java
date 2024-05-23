package org.ntdashboard.Dao.Extractor;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.RoamingDayByRevList;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class RoaminDayByRevDbExtractor implements ResultSetExtractor<RoamingDayByRevList> {

	@Override
	public RoamingDayByRevList extractData(ResultSet res) throws SQLException, DataAccessException {
		
		RoamingDayByRevList datalist=new RoamingDayByRevList();
		
		String date=res.getString("EVENT_DATE");
	    String day = date.substring(8,10);
		datalist.setDay(day);
		datalist.setVoice(res.getString("VOICE"));
		datalist.setSms(res.getString("SMS"));
		datalist.setGprs(res.getString("GPRS"));
	datalist.setTotalrev(res.getString("ATOTAL_REV"));
	datalist.setPst(res.getString("DIFF"));

		return datalist;
	}

}
