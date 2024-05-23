package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.ReconciliationMonthlyRevList;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class ReconciliationMonthlyDbExtractor implements ResultSetExtractor<ReconciliationMonthlyRevList> {
	public ReconciliationMonthlyRevList extractData(ResultSet res) throws SQLException, DataAccessException {
	    return null;
	  }
}
