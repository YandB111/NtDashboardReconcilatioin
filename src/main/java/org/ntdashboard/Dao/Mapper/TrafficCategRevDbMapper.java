package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Dao.Extractor.TrafficCategRevDbExtractor;
import org.ntdashboard.Model.TrafficCategoryRevList;
import org.springframework.jdbc.core.RowMapper;

public class TrafficCategRevDbMapper implements RowMapper<TrafficCategoryRevList> {

	@Override
	public TrafficCategoryRevList mapRow(ResultSet res, int line) throws SQLException {

		TrafficCategRevDbExtractor trafficCategRevDbExtractor=new TrafficCategRevDbExtractor();
		
		return trafficCategRevDbExtractor.extractData(res);
	}

}
