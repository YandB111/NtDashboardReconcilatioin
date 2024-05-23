package org.ntdashboard.Dao.Mapper;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
public class DateRangeExtractor implements ResultSetExtractor<List<String>> {
	  public List<String> extractData(ResultSet rs) throws SQLException, DataAccessException {
		    List<String> dateRangeList = new ArrayList<>();
		    dateRangeList.add(rs.getString("UPPERDATE"));
		    dateRangeList.add(rs.getString("LOWER_DATE"));
		    return dateRangeList;
	  }
}
