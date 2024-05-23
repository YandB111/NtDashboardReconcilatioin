package org.ntdashboard.Model;

import java.util.List;
import java.util.Map;

public class TracfficRevDayByDayModel {
	
private String year;
private String month;
private long monthlyCdrsCount;
private String averagePst;
private List<TrafficDayByRevList> trafficDayByRevList;
private Map<String ,Long> cdrCountMonthlySumlist;
public TracfficRevDayByDayModel() {
	
}


public TracfficRevDayByDayModel(String year, String month, long monthlyCdrsCount, String averagePst,
		List<TrafficDayByRevList> trafficDayByRevList, Map<String, Long> cdrCountMonthlySumlist) {
	super();
	this.year = year;
	this.month = month;
	this.monthlyCdrsCount = monthlyCdrsCount;
	this.averagePst = averagePst;
	this.trafficDayByRevList = trafficDayByRevList;
	this.cdrCountMonthlySumlist = cdrCountMonthlySumlist;
}


public String getYear() {
	return year;
}
public void setYear(String year) {
	this.year = year;
}
public String getMonth() {
	return month;
}
public void setMonth(String month) {
	this.month = month;
}
public long getMonthlyCdrsCount() {
	return monthlyCdrsCount;
}
public void setMonthlyCdrsCount(long monthlyCdrsCount) {
	this.monthlyCdrsCount = monthlyCdrsCount;
}
public String getAveragePst() {
	return averagePst;
}
public void setAveragePst(String averagePst) {
	this.averagePst = averagePst;
}
public List<TrafficDayByRevList> getTrafficDayByRevList() {
	return trafficDayByRevList;
}
public void setTrafficDayByRevList(List<TrafficDayByRevList> trafficDayByRevList) {
	this.trafficDayByRevList = trafficDayByRevList;
	
}



public Map<String, Long> getCdrCountMonthlySumlist() {
	return cdrCountMonthlySumlist;
}


public void setCdrCountMonthlySumlist(Map<String, Long> cdrCountMonthlySumlist) {
	this.cdrCountMonthlySumlist = cdrCountMonthlySumlist;
}


@Override
public String toString() {
	return "TracfficRevDayByDayModel [year=" + year + ", month=" + month + ", monthlyCdrsCount=" + monthlyCdrsCount
			+ ", averagePst=" + averagePst + ", trafficDayByRevList=" + trafficDayByRevList
			+ ", cdrCountMonthlySumlist=" + cdrCountMonthlySumlist + "]";
}




}
