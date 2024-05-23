package org.ntdashboard.Model;

import java.util.List;

public class ReconciliationMonthlyRevSmscvsInModel {
	private String year;
	  
	  private String month;
	  
	  private List<ReconciliationMonthlyRevListSmscvsIn> reconciliationMonthlyRevList;
	  
	  private List<ReconciliationMonthlyRevSmscvsInList_count> reconciliationMonthlyRevList_count;
	  
	  private List<ReconciliationMonthlyRevListSmscvsIn_dur> reconciliationMonthlyRevList_dur;
	  
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
	  
	  public List<ReconciliationMonthlyRevListSmscvsIn> getReconciliationMonthlyRevList() {
	    return this.reconciliationMonthlyRevList;
	  }
	  
	  public void setReconciliationMonthlyRevList(List<ReconciliationMonthlyRevListSmscvsIn> reconciliationMonthlyRevList) {
	    this.reconciliationMonthlyRevList = reconciliationMonthlyRevList;
	  }
	  
	  public List<ReconciliationMonthlyRevSmscvsInList_count> getReconciliationMonthlyRevList_count() {
	    return this.reconciliationMonthlyRevList_count;
	  }
	  
	  public void setReconciliationMonthlyRevList_count(List<ReconciliationMonthlyRevSmscvsInList_count> reconciliationMonthlyRevList_count) {
	    this.reconciliationMonthlyRevList_count = reconciliationMonthlyRevList_count;
	  }
	  
	  public List<ReconciliationMonthlyRevListSmscvsIn_dur> getReconciliationMonthlyRevList_dur() {
	    return this.reconciliationMonthlyRevList_dur;
	  }
	  
	  public void setReconciliationMonthlyRevList_dur(List<ReconciliationMonthlyRevListSmscvsIn_dur> reconciliationMonthlyRevList_dur) {
	    this.reconciliationMonthlyRevList_dur = reconciliationMonthlyRevList_dur;
	  }
}
