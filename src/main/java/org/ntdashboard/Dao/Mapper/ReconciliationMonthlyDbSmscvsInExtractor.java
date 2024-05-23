package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;


import org.ntdashboard.Model.ReconciliationMonthlyRevListSmscvsIn;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class ReconciliationMonthlyDbSmscvsInExtractor implements ResultSetExtractor<ReconciliationMonthlyRevListSmscvsIn> {
	public ReconciliationMonthlyRevListSmscvsIn extractData(ResultSet res) throws SQLException, DataAccessException {
	    return null;
	  }

}
