package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Dao.Extractor.RoamingOutEventRevDbExtractor;
import org.ntdashboard.Model.RoamingOutEventByRevList;
import org.springframework.jdbc.core.RowMapper;

public class RoamingOutEventRevDbMapper  implements RowMapper<RoamingOutEventByRevList>{

	@Override
	public RoamingOutEventByRevList mapRow(ResultSet res, int arg1) throws SQLException {

		RoamingOutEventRevDbExtractor extractor=new RoamingOutEventRevDbExtractor();
		return extractor.extractData(res);
	}

}
