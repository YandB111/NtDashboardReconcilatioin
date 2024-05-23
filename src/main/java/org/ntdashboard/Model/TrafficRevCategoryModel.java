package org.ntdashboard.Model;

import java.util.List;

public class TrafficRevCategoryModel {
	
	
String year;
String month;
String  deletedSum;
String deliverdSum;
String expiredSum;
String  rejectedSum;
String submitedSum;
String totalrevSum;
String avegpst;
String deletedPie;
String deliverdPie;
String expiredPie;
String  rejectedPie;
String submitedPie;


private List<TrafficCategoryRevList> trafficCategoryRevList;


public TrafficRevCategoryModel() {
	super();
	// TODO Auto-generated constructor stub
}


public TrafficRevCategoryModel(String year, String month, String deletedSum, String deliverdSum, String expiredSum,
		String rejectedSum, String submitedSum, String totalrevSum, String avegpst, String deletedPie,
		String deliverdPie, String expiredPie, String rejectedPie, String submitedPie,
		List<TrafficCategoryRevList> trafficCategoryRevList) {
	
	this.year = year;
	this.month = month;
	this.deletedSum = deletedSum;
	this.deliverdSum = deliverdSum;
	this.expiredSum = expiredSum;
	this.rejectedSum = rejectedSum;
	this.submitedSum = submitedSum;
	this.totalrevSum = totalrevSum;
	this.avegpst = avegpst;
	this.deletedPie = deletedPie;
	this.deliverdPie = deliverdPie;
	this.expiredPie = expiredPie;
	this.rejectedPie = rejectedPie;
	this.submitedPie = submitedPie;
	this.trafficCategoryRevList = trafficCategoryRevList;
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


public String getDeletedSum() {
	return deletedSum;
}


public void setDeletedSum(String deletedSum) {
	this.deletedSum = deletedSum;
}


public String getDeliverdSum() {
	return deliverdSum;
}


public void setDeliverdSum(String deliverdSum) {
	this.deliverdSum = deliverdSum;
}


public String getExpiredSum() {
	return expiredSum;
}


public void setExpiredSum(String expiredSum) {
	this.expiredSum = expiredSum;
}


public String getRejectedSum() {
	return rejectedSum;
}


public void setRejectedSum(String rejectedSum) {
	this.rejectedSum = rejectedSum;
}


public String getSubmitedSum() {
	return submitedSum;
}


public void setSubmitedSum(String submitedSum) {
	this.submitedSum = submitedSum;
}


public String getTotalrevSum() {
	return totalrevSum;
}


public void setTotalrevSum(String totalrevSum) {
	this.totalrevSum = totalrevSum;
}


public String getAvegpst() {
	return avegpst;
}


public void setAvegpst(String avegpst) {
	this.avegpst = avegpst;
}


public String getDeletedPie() {
	return deletedPie;
}


public void setDeletedPie(String deletedPie) {
	this.deletedPie = deletedPie;
}


public String getDeliverdPie() {
	return deliverdPie;
}


public void setDeliverdPie(String deliverdPie) {
	this.deliverdPie = deliverdPie;
}


public String getExpiredPie() {
	return expiredPie;
}


public void setExpiredPie(String expiredPie) {
	this.expiredPie = expiredPie;
}


public String getRejectedPie() {
	return rejectedPie;
}


public void setRejectedPie(String rejectedPie) {
	this.rejectedPie = rejectedPie;
}


public String getSubmitedPie() {
	return submitedPie;
}


public void setSubmitedPie(String submitedPie) {
	this.submitedPie = submitedPie;
}


public List<TrafficCategoryRevList> getTrafficCategoryRevList() {
	return trafficCategoryRevList;
}


public void setTrafficCategoryRevList(List<TrafficCategoryRevList> trafficCategoryRevList) {
	this.trafficCategoryRevList = trafficCategoryRevList;
}


}
