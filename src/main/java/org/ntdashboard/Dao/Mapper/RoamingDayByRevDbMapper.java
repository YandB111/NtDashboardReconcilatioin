package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Dao.Extractor.RoaminDayByRevDbExtractor;
import org.ntdashboard.Model.RoamingDayByRevList;
import org.springframework.jdbc.core.RowMapper;

public class RoamingDayByRevDbMapper implements RowMapper<RoamingDayByRevList> {

	@Override
	public RoamingDayByRevList mapRow(ResultSet res, int line) throws SQLException {

		RoaminDayByRevDbExtractor extractor=new RoaminDayByRevDbExtractor();
		
		return extractor.extractData(res);
	}

}
