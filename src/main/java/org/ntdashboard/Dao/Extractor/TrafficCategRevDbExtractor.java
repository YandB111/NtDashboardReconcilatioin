package org.ntdashboard.Dao.Extractor;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.TrafficCategoryRevList;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class TrafficCategRevDbExtractor implements ResultSetExtractor<TrafficCategoryRevList> {

	@Override
	public TrafficCategoryRevList extractData(ResultSet res) throws SQLException, DataAccessException {
		
		TrafficCategoryRevList tflist=new TrafficCategoryRevList();
		
		tflist.setDay(res.getString("DATEWISE"));
		tflist.setDeleted(res.getString("DELETED"));
		tflist.setDelivered(res.getString("DELIVERED"));
		tflist.setExpired(res.getString("EXPIRED"));
		tflist.setRejected(res.getString("REJECTED"));
		tflist.setSubmited(res.getString("SUBMITTED"));
		tflist.setTotal(res.getString("TOTAL_CDRS"));
		tflist.setPst(res.getString("DIFF"));
		
		return tflist;
	}

}
