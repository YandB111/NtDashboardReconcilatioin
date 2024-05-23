package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.ReconciliationRevList;
import org.springframework.jdbc.core.RowMapper;

public class ReconciliationDayByRevDbMapper implements RowMapper<ReconciliationRevList>{
	public ReconciliationRevList mapRow(ResultSet res, int line) throws SQLException {
	    ReconciliationDayByRevDbExtractor reconciliationDayByRevDbExtractor = new ReconciliationDayByRevDbExtractor();
	    return reconciliationDayByRevDbExtractor.extractData(res);
	  }
}
