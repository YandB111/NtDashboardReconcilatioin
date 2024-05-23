package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;


import org.ntdashboard.Model.ReconciliationRevListSmscvsIn;
import org.springframework.jdbc.core.RowMapper;

public class ReconciliationDayByRevSmscvsInDbMapper implements RowMapper<ReconciliationRevListSmscvsIn>{
		public ReconciliationRevListSmscvsIn mapRow(ResultSet res, int line) throws SQLException {
			ReconciliationDayByRevDbExtractorSmscvsIN reconciliationDayByRevDbExtractor = new ReconciliationDayByRevDbExtractorSmscvsIN();
		    return reconciliationDayByRevDbExtractor.extractData(res);
		  }
}
