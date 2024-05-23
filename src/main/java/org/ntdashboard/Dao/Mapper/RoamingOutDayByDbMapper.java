package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Dao.Extractor.RoamingOutDayRevDbExtractor;
import org.ntdashboard.Model.RoamingOutDayByRevList;
import org.springframework.jdbc.core.RowMapper;

public class RoamingOutDayByDbMapper implements RowMapper<RoamingOutDayByRevList> {

	@Override
	public RoamingOutDayByRevList mapRow(ResultSet res, int arg1) throws SQLException {
		
		RoamingOutDayRevDbExtractor extractor= new RoamingOutDayRevDbExtractor();
		
		return extractor.extractData(res);
	}

}
