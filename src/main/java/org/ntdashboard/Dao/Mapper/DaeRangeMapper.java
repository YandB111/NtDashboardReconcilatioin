package org.ntdashboard.Dao.Mapper;



import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.RowMapper;
public class DaeRangeMapper implements RowMapper<List<String>> {
	  public List<String> mapRow(ResultSet rs, int rowNum) throws SQLException {
		    DateRangeExtractor extractor = new DateRangeExtractor();
		    return extractor.extractData(rs);
		  } 
}
