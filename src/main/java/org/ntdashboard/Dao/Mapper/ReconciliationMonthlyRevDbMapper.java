package org.ntdashboard.Dao.Mapper;

import java.util.List;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.ntdashboard.Model.ReconciliationMonthlyRevList;
import org.springframework.jdbc.core.RowMapper;

public class ReconciliationMonthlyRevDbMapper implements RowMapper<List<ReconciliationMonthlyRevList>> {
	public List<ReconciliationMonthlyRevList> mapRow(ResultSet res, int arg1) throws SQLException {
	    ResultSetMetaData rsMeta = res.getMetaData();
	    int colCount = rsMeta.getColumnCount();
	    List<ReconciliationMonthlyRevList> list = new ArrayList<>();
	    Map<String, Object> columns = new HashMap<>();
	    for (int i = 1; i <= colCount; i++) {
	      String colmnname = rsMeta.getColumnLabel(i);
	      Object colmnval = res.getObject(i);
	      columns.put(colmnname, colmnval);
	    } 
	    for (Map.Entry<String, Object> entry : columns.entrySet()) {
	      String key = entry.getKey();
	      key = key.replaceAll("_", " ");
	      String value = "" + entry.getValue();
	      ReconciliationMonthlyRevList reconciliationMonthlyRevList1 = new ReconciliationMonthlyRevList(key, value);
	      list.add(reconciliationMonthlyRevList1);
	    } 
	    return list;
	  }
}
