package org.ntdashboard.Model;

import java.util.List;

public class TrafficDayByRevList {
	
	
	
	private String day;
	private List<DayByRevList> dayList;
	private long dayByTotalRev;
	private int EventListSize;
	private String dayBypst;
	public TrafficDayByRevList() {
		
	}
	
	public TrafficDayByRevList(String day, List<DayByRevList> dayList, long dayByTotalRev, int eventListSize,
			String dayBypst) {
		
		this.day = day;
		this.dayList = dayList;
		this.dayByTotalRev = dayByTotalRev;
		EventListSize = eventListSize;
		this.dayBypst = dayBypst;
	}

	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public List<DayByRevList> getDayList() {
		return dayList;
	}
	public void setDayList(List<DayByRevList> dayList) {
		this.dayList = dayList;
	}
	public long getDayByTotalRev() {
		return dayByTotalRev;
	}
	public void setDayByTotalRev(long dayByTotalRev) {
		this.dayByTotalRev = dayByTotalRev;
	}
	public int getEventListSize() {
		return EventListSize;
	}
	public void setEventListSize(int eventListSize) {
		EventListSize = eventListSize;
	}
	
	public String getDayBypst() {
		return dayBypst;
	}

	public void setDayBypst(String dayBypst) {
		this.dayBypst = dayBypst;
	}

	@Override
	public String toString() {
		return "TrafficDayByRevList [day=" + day + ", dayList=" + dayList + ", dayByTotalRev=" + dayByTotalRev
				+ ", EventListSize=" + EventListSize + ", dayBypst=" + dayBypst + "]";
	}

	
	
	
	

}
