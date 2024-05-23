package org.ntdashboard.Dao.Impl;



import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import org.springframework.jdbc.core.RowMapper;
public class Plot_Dashboard_daoImpl_1 {

	
	public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
	    Map<String, Object> map = new HashMap<>();
	    DateFormat nice = new SimpleDateFormat("yyyy-MM-dd");
	    ResultSetMetaData meta = rs.getMetaData();
	    for (int i = 1; i <= meta.getColumnCount(); i++) {
	      Object o = rs.getObject(i);
	      if (o instanceof java.util.Date)
	        o = nice.format(o); 
	      map.put(meta.getColumnName(i), o);
	    } 
	    return map;
	  }
}
