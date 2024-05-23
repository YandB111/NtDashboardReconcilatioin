package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Dao.Extractor.RoamingEventByRevDbExtractor;
import org.ntdashboard.Model.RoamingEventByRevList;
import org.springframework.jdbc.core.RowMapper;

public class RoamingEventByDbMaper implements RowMapper<RoamingEventByRevList> {

	@Override
	public RoamingEventByRevList mapRow(ResultSet res, int line) throws SQLException {
		
		RoamingEventByRevDbExtractor roamingEventByRevDbExtractor=new RoamingEventByRevDbExtractor();
		return roamingEventByRevDbExtractor.extractData(res);
	}

}
