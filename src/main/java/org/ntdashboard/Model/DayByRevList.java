package org.ntdashboard.Model;

public class DayByRevList {
	
	
	private String eventFiledName;
	private String cdrscount;
	public DayByRevList() {
		
	}
	public DayByRevList(String eventFiledName, String cdrscount) {
		
		this.eventFiledName = eventFiledName;
		this.cdrscount = cdrscount;
	}
	public String getEventFiledName() {
		return eventFiledName;
	}
	public void setEventFiledName(String eventFiledName) {
		this.eventFiledName = eventFiledName;
	}
	public String getCdrscount() {
		return cdrscount;
	}
	public void setCdrscount(String cdrscount) {
		this.cdrscount = cdrscount;
	}
	@Override
	public String toString() {
		return "DayByRevList [eventFiledName=" + eventFiledName + ", cdrscount=" + cdrscount + "]";
	}
	
	


}
