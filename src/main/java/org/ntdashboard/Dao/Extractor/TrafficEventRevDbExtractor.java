package org.ntdashboard.Dao.Extractor;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.TrafficEventRevList;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class TrafficEventRevDbExtractor implements ResultSetExtractor<TrafficEventRevList> {

	@Override
	public TrafficEventRevList extractData(ResultSet res) throws SQLException, DataAccessException {
		
		TrafficEventRevList revlist=new TrafficEventRevList();
		revlist.setDay(res.getString("DATEWISE"));
		revlist.setNational(res.getString("NATIONAL"));
		revlist.setInternational(res.getString("INTERNATIONAL"));
		revlist.setOnnet(res.getString("ONNET"));
		revlist.setOffnet(res.getString("OFFNET"));
		revlist.setOthers(res.getString("OTHERS"));
		revlist.setTotal(res.getString("TOTAL_CDRS_COUNT"));
		revlist.setPst(res.getString("DIFF"));
		
		return revlist;
	}

}
