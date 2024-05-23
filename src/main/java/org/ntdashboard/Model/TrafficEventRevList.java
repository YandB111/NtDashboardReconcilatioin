package org.ntdashboard.Model;

public class TrafficEventRevList {

	private String day;
	private String onnet;
	private String offnet;
	private String national;
	private String international;
	private String others;
	private String total;
	private String pst;
	public TrafficEventRevList() {
		
	}
	
	public TrafficEventRevList(String day, String onnet, String offnet, String national, String international,
			String others, String total, String pst) {
		
		this.day = day;
		this.onnet = onnet;
		this.offnet = offnet;
		this.national = national;
		this.international = international;
		this.others = others;
		this.total = total;
		this.pst = pst;
	}

	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getOnnet() {
		return onnet;
	}
	public void setOnnet(String onnet) {
		this.onnet = onnet;
	}
	public String getOffnet() {
		return offnet;
	}
	public void setOffnet(String offnet) {
		this.offnet = offnet;
	}
	
	public String getNational() {
		return national;
	}

	public void setNational(String national) {
		this.national = national;
	}

	public String getInternational() {
		return international;
	}

	public void setInternational(String international) {
		this.international = international;
	}

	public String getOthers() {
		return others;
	}
	public void setOthers(String others) {
		this.others = others;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getPst() {
		return pst;
	}
	public void setPst(String pst) {
		this.pst = pst;
	}

	@Override
	public String toString() {
		return "TrafficEventRevList [day=" + day + ", onnet=" + onnet + ", offnet=" + offnet + ", national=" + national
				+ ", international=" + international + ", others=" + others + ", total=" + total + ", pst=" + pst + "]";
	}
	
	
}