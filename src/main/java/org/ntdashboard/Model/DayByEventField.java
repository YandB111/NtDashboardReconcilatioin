package org.ntdashboard.Model;

public class DayByEventField {
	
	
	private String day;
	private  String eventtypedesc;
	private String countCdrs;
	public DayByEventField() {
		
	}
	public DayByEventField(String day, String eventtypedesc, String countCdrs) {
		
		this.day = day;
		this.eventtypedesc = eventtypedesc;
		this.countCdrs = countCdrs;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getEventtypedesc() {
		return eventtypedesc;
	}
	public void setEventtypedesc(String eventtypedesc) {
		this.eventtypedesc = eventtypedesc;
	}
	public String getCountCdrs() {
		return countCdrs;
	}
	public void setCountCdrs(String countCdrs) {
		this.countCdrs = countCdrs;
	}
	@Override
	public String toString() {
		return "DayByEventField [day=" + day + ", eventtypedesc=" + eventtypedesc + ", countCdrs=" + countCdrs + "]";
	}
	
	

}
