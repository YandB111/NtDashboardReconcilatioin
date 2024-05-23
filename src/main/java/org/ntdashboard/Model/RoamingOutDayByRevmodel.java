package org.ntdashboard.Model;

import java.util.List;

public class RoamingOutDayByRevmodel {

	
	private String year;
	private String month;
	private String voiceMonthlySum;
	private String smsMonthlySum;
	private String gprsMonthlySUm;
	private String toatlMonthlySum;
	private String voiceRev_pie;
	private String smsRev_pie;
	private String gprsRev_Pie;
	private String averagepst;
	private List<RoamingOutDayByRevList> list;
	public RoamingOutDayByRevmodel() {
		
	}
	public RoamingOutDayByRevmodel(String year, String month, String voiceMonthlySum, String smsMonthlySum,
			String gprsMonthlySUm, String toatlMonthlySum, String voiceRev_pie, String smsRev_pie, String gprsRev_Pie,
			String averagepst, List<RoamingOutDayByRevList> list) {
		
		this.year = year;
		this.month = month;
		this.voiceMonthlySum = voiceMonthlySum;
		this.smsMonthlySum = smsMonthlySum;
		this.gprsMonthlySUm = gprsMonthlySUm;
		this.toatlMonthlySum = toatlMonthlySum;
		this.voiceRev_pie = voiceRev_pie;
		this.smsRev_pie = smsRev_pie;
		this.gprsRev_Pie = gprsRev_Pie;
		this.averagepst = averagepst;
		this.list = list;
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
	public String getVoiceMonthlySum() {
		return voiceMonthlySum;
	}
	public void setVoiceMonthlySum(String voiceMonthlySum) {
		this.voiceMonthlySum = voiceMonthlySum;
	}
	public String getSmsMonthlySum() {
		return smsMonthlySum;
	}
	public void setSmsMonthlySum(String smsMonthlySum) {
		this.smsMonthlySum = smsMonthlySum;
	}
	public String getGprsMonthlySUm() {
		return gprsMonthlySUm;
	}
	public void setGprsMonthlySUm(String gprsMonthlySUm) {
		this.gprsMonthlySUm = gprsMonthlySUm;
	}
	public String getToatlMonthlySum() {
		return toatlMonthlySum;
	}
	public void setToatlMonthlySum(String toatlMonthlySum) {
		this.toatlMonthlySum = toatlMonthlySum;
	}
	public String getVoiceRev_pie() {
		return voiceRev_pie;
	}
	public void setVoiceRev_pie(String voiceRev_pie) {
		this.voiceRev_pie = voiceRev_pie;
	}
	public String getSmsRev_pie() {
		return smsRev_pie;
	}
	public void setSmsRev_pie(String smsRev_pie) {
		this.smsRev_pie = smsRev_pie;
	}
	public String getGprsRev_Pie() {
		return gprsRev_Pie;
	}
	public void setGprsRev_Pie(String gprsRev_Pie) {
		this.gprsRev_Pie = gprsRev_Pie;
	}
	public String getAveragepst() {
		return averagepst;
	}
	public void setAveragepst(String averagepst) {
		this.averagepst = averagepst;
	}
	public List<RoamingOutDayByRevList> getList() {
		return list;
	}
	public void setList(List<RoamingOutDayByRevList> list) {
		this.list = list;
	}
	@Override
	public String toString() {
		return "RoamingOutDayByRevmodel [year=" + year + ", month=" + month + ", voiceMonthlySum=" + voiceMonthlySum
				+ ", smsMonthlySum=" + smsMonthlySum + ", gprsMonthlySUm=" + gprsMonthlySUm + ", toatlMonthlySum="
				+ toatlMonthlySum + ", voiceRev_pie=" + voiceRev_pie + ", smsRev_pie=" + smsRev_pie + ", gprsRev_Pie="
				+ gprsRev_Pie + ", averagepst=" + averagepst + ", list=" + list + "]";
	}
	
	
	
	
}
