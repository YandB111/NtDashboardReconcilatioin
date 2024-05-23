package org.ntdashboard.Model;

import java.util.List;

public class TrafficEventByRevModel {
	
	private String year;
	private String month;
	private String onnetSum;
	private String offnetSUm;
	private String nationalSum;
	private String internationalSum;
	private String OthersSum;
	private String totalSUm;
	private String averagepst;
	private String onnetSum_pie;
	private String ofnetSum_pie;
	private String nationalSum_pie;
	private String internationalSUm_pie;
	private String othersSum_pie;
	private List<TrafficEventRevList> list;
	public TrafficEventByRevModel() {
		
	}
	
	public TrafficEventByRevModel(String year, String month, String onnetSum, String offnetSUm, String nationalSum,
			String internationalSum, String othersSum, String totalSUm, String averagepst, String onnetSum_pie,
			String ofnetSum_pie, String nationalSum_pie, String internationalSUm_pie, String othersSum_pie,
			List<TrafficEventRevList> list) {
		
		this.year = year;
		this.month = month;
		this.onnetSum = onnetSum;
		this.offnetSUm = offnetSUm;
		this.nationalSum = nationalSum;
		this.internationalSum = internationalSum;
		OthersSum = othersSum;
		this.totalSUm = totalSUm;
		this.averagepst = averagepst;
		this.onnetSum_pie = onnetSum_pie;
		this.ofnetSum_pie = ofnetSum_pie;
		this.nationalSum_pie = nationalSum_pie;
		this.internationalSUm_pie = internationalSUm_pie;
		this.othersSum_pie = othersSum_pie;
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
	
	public String getOnnetSum() {
		return onnetSum;
	}
	public void setOnnetSum(String onnetSum) {
		this.onnetSum = onnetSum;
	}
	public String getOffnetSUm() {
		return offnetSUm;
	}
	public void setOffnetSUm(String offnetSUm) {
		this.offnetSUm = offnetSUm;
	}
	
	
	
	public String getNationalSum() {
		return nationalSum;
	}

	public void setNationalSum(String nationalSum) {
		this.nationalSum = nationalSum;
	}

	public String getInternationalSum() {
		return internationalSum;
	}

	public void setInternationalSum(String internationalSum) {
		this.internationalSum = internationalSum;
	}

	public String getOthersSum() {
		return OthersSum;
	}
	public void setOthersSum(String othersSum) {
		OthersSum = othersSum;
	}
	public String getTotalSUm() {
		return totalSUm;
	}
	public void setTotalSUm(String totalSUm) {
		this.totalSUm = totalSUm;
	}
	public String getAveragepst() {
		return averagepst;
	}
	public void setAveragepst(String averagepst) {
		this.averagepst = averagepst;
	}
	
	public String getOnnetSum_pie() {
		return onnetSum_pie;
	}
	public void setOnnetSum_pie(String onnetSum_pie) {
		this.onnetSum_pie = onnetSum_pie;
	}
	public String getOfnetSum_pie() {
		return ofnetSum_pie;
	}
	public void setOfnetSum_pie(String ofnetSum_pie) {
		this.ofnetSum_pie = ofnetSum_pie;
	}
	
	public String getNationalSum_pie() {
		return nationalSum_pie;
	}

	public void setNationalSum_pie(String nationalSum_pie) {
		this.nationalSum_pie = nationalSum_pie;
	}

	public String getInternationalSUm_pie() {
		return internationalSUm_pie;
	}

	public void setInternationalSUm_pie(String internationalSUm_pie) {
		this.internationalSUm_pie = internationalSUm_pie;
	}

	public String getOthersSum_pie() {
		return othersSum_pie;
	}
	public void setOthersSum_pie(String othersSum_pie) {
		this.othersSum_pie = othersSum_pie;
	}
	public List<TrafficEventRevList> getList() {
		return list;
	}
	public void setList(List<TrafficEventRevList> list) {
		this.list = list;
	}
	

}
