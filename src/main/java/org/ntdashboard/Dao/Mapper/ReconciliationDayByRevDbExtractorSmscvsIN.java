package org.ntdashboard.Dao.Mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ntdashboard.Model.ReconciliationRevListSmscvsIn;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

public class ReconciliationDayByRevDbExtractorSmscvsIN implements ResultSetExtractor<ReconciliationRevListSmscvsIn> {
	public ReconciliationRevListSmscvsIn extractData(ResultSet res) throws SQLException, DataAccessException {
		ReconciliationRevListSmscvsIn reconciliationRevList = new ReconciliationRevListSmscvsIn();
	    reconciliationRevList.setDay(res.getString("day"));
	    reconciliationRevList.setRtd_IN_Count(res.getString("IN_COUNT"));
	    reconciliationRevList.setMsc_IN_Count(res.getString("SWT_COUNT"));
	    reconciliationRevList.setIon_Count_Diff(res.getString("COUNT_DIFF"));
	    reconciliationRevList.setRtd_IN_Dur(res.getString("IN_DUR"));
	    reconciliationRevList.setMsc_IN_Dur(res.getString("SWT_DUR"));
	    reconciliationRevList.setIon_DUr_Diff(res.getString("DUR_DIFF"));
	    reconciliationRevList.setCount_varience("0");
	    reconciliationRevList.setDur_varience("0");
	    return reconciliationRevList;
	  } 

}
