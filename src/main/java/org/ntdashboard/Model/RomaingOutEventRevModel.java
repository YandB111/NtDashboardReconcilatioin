package org.ntdashboard.Model;

import java.util.List;

public class RomaingOutEventRevModel {
	
	private String year;
	private String month;
	private String onnetSum;
	private String offnetsum;
	private String nationalSUm;
	private String internationalSum;
	private String othersSUm;
	private String totalSum;
	private String onnetSum_pie;
	private String offnetsum_pie;
	private String  nationalSum_pie;
	private String internationalSum_pie;
	private String othersSum_pie;
	private String averagepst;
	private List<RoamingOutEventByRevList> roamingOutEventByRevList;
	public RomaingOutEventRevModel() {
		
	}
	public RomaingOutEventRevModel(String year, String month, String onnetSum, String offnetsum, String nationalSUm,
			String internationalSum, String othersSUm, String totalSum, String onnetSum_pie, String offnetsum_pie,
			String nationalSum_pie, String internationalSum_pie, String othersSum_pie, String averagepst,
			List<RoamingOutEventByRevList> roamingOutEventByRevList) {
		
		this.year = year;
		this.month = month;
		this.onnetSum = onnetSum;
		this.offnetsum = offnetsum;
		this.nationalSUm = nationalSUm;
		this.internationalSum = internationalSum;
		this.othersSUm = othersSUm;
		this.totalSum = totalSum;
		this.onnetSum_pie = onnetSum_pie;
		this.offnetsum_pie = offnetsum_pie;
		this.nationalSum_pie = nationalSum_pie;
		this.internationalSum_pie = internationalSum_pie;
		this.othersSum_pie = othersSum_pie;
		this.averagepst = averagepst;
		this.roamingOutEventByRevList = roamingOutEventByRevList;
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
	public String getOnnetSum() {
		return onnetSum;
	}
	public void setOnnetSum(String onnetSum) {
		this.onnetSum = onnetSum;
	}
	public String getOffnetsum() {
		return offnetsum;
	}
	public void setOffnetsum(String offnetsum) {
		this.offnetsum = offnetsum;
	}
	public String getNationalSUm() {
		return nationalSUm;
	}
	public void setNationalSUm(String nationalSUm) {
		this.nationalSUm = nationalSUm;
	}
	public String getInternationalSum() {
		return internationalSum;
	}
	public void setInternationalSum(String internationalSum) {
		this.internationalSum = internationalSum;
	}
	public String getOthersSUm() {
		return othersSUm;
	}
	public void setOthersSUm(String othersSUm) {
		this.othersSUm = othersSUm;
	}
	public String getTotalSum() {
		return totalSum;
	}
	public void setTotalSum(String totalSum) {
		this.totalSum = totalSum;
	}
	public String getOnnetSum_pie() {
		return onnetSum_pie;
	}
	public void setOnnetSum_pie(String onnetSum_pie) {
		this.onnetSum_pie = onnetSum_pie;
	}
	public String getOffnetsum_pie() {
		return offnetsum_pie;
	}
	public void setOffnetsum_pie(String offnetsum_pie) {
		this.offnetsum_pie = offnetsum_pie;
	}
	public String getNationalSum_pie() {
		return nationalSum_pie;
	}
	public void setNationalSum_pie(String nationalSum_pie) {
		this.nationalSum_pie = nationalSum_pie;
	}
	public String getInternationalSum_pie() {
		return internationalSum_pie;
	}
	public void setInternationalSum_pie(String internationalSum_pie) {
		this.internationalSum_pie = internationalSum_pie;
	}
	public String getOthersSum_pie() {
		return othersSum_pie;
	}
	public void setOthersSum_pie(String othersSum_pie) {
		this.othersSum_pie = othersSum_pie;
	}
	public String getAveragepst() {
		return averagepst;
	}
	public void setAveragepst(String averagepst) {
		this.averagepst = averagepst;
	}
	public List<RoamingOutEventByRevList> getRoamingOutEventByRevList() {
		return roamingOutEventByRevList;
	}
	public void setRoamingOutEventByRevList(List<RoamingOutEventByRevList> roamingOutEventByRevList) {
		this.roamingOutEventByRevList = roamingOutEventByRevList;
	}
	@Override
	public String toString() {
		return "RomaingOutEventRevModel [year=" + year + ", month=" + month + ", onnetSum=" + onnetSum + ", offnetsum="
				+ offnetsum + ", nationalSUm=" + nationalSUm + ", internationalSum=" + internationalSum + ", othersSUm="
				+ othersSUm + ", totalSum=" + totalSum + ", onnetSum_pie=" + onnetSum_pie + ", offnetsum_pie="
				+ offnetsum_pie + ", nationalSum_pie=" + nationalSum_pie + ", internationalSum_pie="
				+ internationalSum_pie + ", othersSum_pie=" + othersSum_pie + ", averagepst=" + averagepst
				+ ", roamingOutEventByRevList=" + roamingOutEventByRevList + "]";
	}
	
	

}
