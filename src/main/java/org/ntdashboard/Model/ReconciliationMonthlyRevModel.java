package org.ntdashboard.Model;

import java.util.List;

public class ReconciliationMonthlyRevModel {
	private String year;
	  
	  private String month;
	  
	  private List<ReconciliationMonthlyRevList> reconciliationMonthlyRevList;
	  
	  private List<ReconciliationMonthlyRevList_count> reconciliationMonthlyRevList_count;
	  
	  private List<ReconciliationMonthlyRevList_dur> reconciliationMonthlyRevList_dur;
	  
	  public String getYear() {
	    return this.year;
	  }
	  
	  public void setYear(String year) {
	    this.year = year;
	  }
	  
	  public String getMonth() {
	    return this.month;
	  }
	  
	  public void setMonth(String month) {
	    this.month = month;
	  }
	  
	  public List<ReconciliationMonthlyRevList> getReconciliationMonthlyRevList() {
	    return this.reconciliationMonthlyRevList;
	  }
	  
	  public void setReconciliationMonthlyRevList(List<ReconciliationMonthlyRevList> reconciliationMonthlyRevList) {
	    this.reconciliationMonthlyRevList = reconciliationMonthlyRevList;
	  }
	  
	  public List<ReconciliationMonthlyRevList_count> getReconciliationMonthlyRevList_count() {
	    return this.reconciliationMonthlyRevList_count;
	  }
	  
	  public void setReconciliationMonthlyRevList_count(List<ReconciliationMonthlyRevList_count> reconciliationMonthlyRevList_count) {
	    this.reconciliationMonthlyRevList_count = reconciliationMonthlyRevList_count;
	  }
	  
	  public List<ReconciliationMonthlyRevList_dur> getReconciliationMonthlyRevList_dur() {
	    return this.reconciliationMonthlyRevList_dur;
	  }
	  
	  public void setReconciliationMonthlyRevList_dur(List<ReconciliationMonthlyRevList_dur> reconciliationMonthlyRevList_dur) {
	    this.reconciliationMonthlyRevList_dur = reconciliationMonthlyRevList_dur;
	  }
}
