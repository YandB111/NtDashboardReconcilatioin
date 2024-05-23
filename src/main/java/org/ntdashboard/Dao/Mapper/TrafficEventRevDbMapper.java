package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Dao.Extractor.TrafficEventRevDbExtractor;
import org.ntdashboard.Model.TrafficEventRevList;
import org.springframework.jdbc.core.RowMapper;

public class TrafficEventRevDbMapper implements RowMapper<TrafficEventRevList> {

	@Override
	public TrafficEventRevList mapRow(ResultSet res, int line) throws SQLException {

		
		TrafficEventRevDbExtractor ext=new TrafficEventRevDbExtractor();
		
		
		return ext.extractData(res);
	}

}
