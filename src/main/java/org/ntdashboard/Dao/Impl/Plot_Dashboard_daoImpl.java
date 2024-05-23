package org.ntdashboard.Dao.Impl;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.ntdashboard.Dao.Mapper.DaeRangeMapper;
import org.ntdashboard.Dao.Plot_dashboard_Dao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class Plot_Dashboard_daoImpl implements Plot_dashboard_Dao {
	@Autowired
	DataSource dataSource;

	@Autowired
	DataSource dataSource1;

	public List<Map<String, Object>> getDashLineChart(String action, String fromdate, String todate, String frequency) {
	    System.out.println("the function getDashLineChart is calling and the query running is given below ");
	    String sql = "SELECT \r\n"
	    		+ "    TO_CHAR(a.event_date, 'dd-Mon-yyyy') AS formatted_event_date,\r\n"
	    		+ "    'Active' AS demo,\r\n"
	    		+ "    SUM(a.subs_actv_count) AS subs_count,\r\n"
	    		+ "    a.event_date \r\n"
	    		+ "FROM \r\n"
	    		+ "    orv5_etl.dsh_subs_grwth_daily a \r\n"
	    		+ "WHERE \r\n"
	    		+ "    a.event_date BETWEEN TO_DATE(?, 'dd-Mon-yyyy') AND TO_DATE(?, 'dd-Mon-yyyy')\r\n"
	    		+ "GROUP BY \r\n"
	    		+ "    TO_CHAR(a.event_date, 'dd-Mon-yyyy'), a.event_date \r\n"
	    		+ "\r\n"
	    		+ "UNION ALL \r\n"
	    		+ "\r\n"
	    		+ "SELECT \r\n"
	    		+ "    TO_CHAR(a.event_date, 'dd-Mon-yyyy') AS formatted_event_date,\r\n"
	    		+ "    'InActive' AS demo,\r\n"
	    		+ "    SUM(a.SUBS_INACTV_COUNT) AS subs_count,\r\n"
	    		+ "    a.event_date \r\n"
	    		+ "FROM \r\n"
	    		+ "    orv5_etl.dsh_subs_grwth_daily a \r\n"
	    		+ "WHERE \r\n"
	    		+ "    a.event_date BETWEEN TO_DATE(?, 'dd-Mon-yyyy') AND TO_DATE(?, 'dd-Mon-yyyy')\r\n"
	    		+ "GROUP BY \r\n"
	    		+ "    TO_CHAR(a.event_date, 'dd-Mon-yyyy'), a.event_date\r\n"
	    		+ "ORDER BY \r\n"
	    		+ "    demo, \r\n"
	    		+ "    event_date;\r\n"
	    		+ "";
	    System.out.println("query : " + sql);
	    
	    JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource);
	    
	    List<Map<String, Object>> resultSet = jdbcTemplate.query(sql, 
	        new Object[] { fromdate, todate, fromdate, todate }, 
	        new RowMapper<Map<String, Object>>() {
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
	        });
	    return resultSet;
	}


	public List<Map<String, Object>> getAverageRevenue(String action, String fromdate, String todate,
			String frequency) {
		System.out.println("the function getAverageRevenue is calling and the query running is given below ");
		System.out.println("from date in function" + fromdate);
		System.out.println("To date in function" + todate);
		String sql = "SELECT \r\n" + "    TO_CHAR(event_date, 'dd-Mon-yyyy') AS newDate,\r\n"
				+ "    ROUND(SUM(trv) / SUM(count), 2) AS ARPU\r\n" + "FROM \r\n" + "    (\r\n" + "        SELECT  \r\n"
				+ "            event_date,\r\n" + "            SUM(tot_rev) AS trv,\r\n"
				+ "            (SUM(subs_count) / COUNT(*)) AS count\r\n" + "        FROM \r\n"
				+ "            orv5_etl.dsh_rev_daily  \r\n" + "        WHERE \r\n"
				+ "            event_date BETWEEN TO_DATE('" + fromdate + "', 'dd-Mon-yyyy') AND TO_DATE('" + todate
				+ "', 'dd-Mon-yyyy')\r\n" + "        GROUP BY \r\n"
				+ "            event_date, subs_bu_desc, srv_type_desc\r\n" + "        ORDER BY \r\n"
				+ "            event_date\r\n" + "    ) AS subquery\r\n" + "GROUP BY \r\n" + "    event_date \r\n"
				+ "ORDER BY \r\n" + "    event_date;\r\n";
		System.out.println("query : " + sql);
		JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource1);
		List<Map<String, Object>> resultSet = jdbcTemplate.query(sql.toString(), new RowMapper<Map<String, Object>>() {
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
		});
		return resultSet;
	}

	public List<String> getDbDateRange() {
		String sql = "SELECT \r\n" + "    TO_CHAR(a.UPPER_BOUND_DATE, 'dd-Mon-yyyy') AS UPPERDATE,\r\n"
				+ "    TO_CHAR(a.LOWER_BOUND_DATE, 'dd-Mon-yyyy') AS LOWER_DATE \r\n" + "FROM \r\n"
				+ "    orv5_etl.DSH_STATUS a \r\n" + "WHERE \r\n" + "    a.SOURCE_TABLE = 'DSH_SUBS_GRWTH_DAILY';\r\n"
				+ "";
		List<String> newlist = null;
		System.out.println("the runing sqlquery is" + sql);
		try {
		    JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource1);
		    List<List<String>> daterange = jdbcTemplate.query(sql, (RowMapper) new DaeRangeMapper());
		    
		    if (!daterange.isEmpty()) {
		        newlist = daterange.get(0);
		        for (int i = 0; i < newlist.size(); i++) {
		            System.out.println(((String) newlist.get(i)).toString());
		        }
		    } else {
		        System.out.println("No date range found.");
		    }
		} catch (Exception e) {
		    e.printStackTrace();
		}

		return newlist;
	}

}
