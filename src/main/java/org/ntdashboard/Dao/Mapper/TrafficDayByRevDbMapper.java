package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Dao.Extractor.TrafficDayByRevDbExtractor;
import org.ntdashboard.Model.DayByEventField;
import org.springframework.jdbc.core.RowMapper;

public class TrafficDayByRevDbMapper implements RowMapper<DayByEventField> {

	@Override
	public DayByEventField mapRow(ResultSet res, int line) throws SQLException {

		TrafficDayByRevDbExtractor trafficDayByRevDbExtractor=new TrafficDayByRevDbExtractor();
		return trafficDayByRevDbExtractor.extractData(res);
	}

}
