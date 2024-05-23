package org.ntdashboard.Dao.Extractor;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.RoamingOutDayByRevList;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class RoamingOutDayRevDbExtractor implements ResultSetExtractor<RoamingOutDayByRevList> {

	@Override
	public RoamingOutDayByRevList extractData(ResultSet res) throws SQLException, DataAccessException {
		RoamingOutDayByRevList datalist=new RoamingOutDayByRevList();
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
