package org.ntdashboard.Model;

public class RoamingOutDayByRevList {
	
	
	private String Day;
	private String voice;
	private String sms;
	private String gprs;
	private String totalrev;
	private String pst;
	public RoamingOutDayByRevList() {
		
	}
	public RoamingOutDayByRevList(String day, String voice, String sms, String gprs, String totalrev, String pst) {
		
		Day = day;
		this.voice = voice;
		this.sms = sms;
		this.gprs = gprs;
		this.totalrev = totalrev;
		this.pst = pst;
	}
	public String getDay() {
		return Day;
	}
	public void setDay(String day) {
		Day = day;
	}
	public String getVoice() {
		return voice;
	}
	public void setVoice(String voice) {
		this.voice = voice;
	}
	public String getSms() {
		return sms;
	}
	public void setSms(String sms) {
		this.sms = sms;
	}
	public String getGprs() {
		return gprs;
	}
	public void setGprs(String gprs) {
		this.gprs = gprs;
	}
	public String getTotalrev() {
		return totalrev;
	}
	public void setTotalrev(String totalrev) {
		this.totalrev = totalrev;
	}
	public String getPst() {
		return pst;
	}
	public void setPst(String pst) {
		this.pst = pst;
	}
	@Override
	public String toString() {
		return "RoamingOutDayByRevList [Day=" + Day + ", voice=" + voice + ", sms=" + sms + ", gprs=" + gprs
				+ ", totalrev=" + totalrev + ", pst=" + pst + "]";
	}
	
	
	

}
