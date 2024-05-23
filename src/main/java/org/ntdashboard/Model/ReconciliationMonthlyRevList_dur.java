package org.ntdashboard.Model;

public class ReconciliationMonthlyRevList_dur {
	private String rtd_In_dur;
	  
	  private String msc_In_dur;
	  
	  private String dur_diff;
	  
	  public ReconciliationMonthlyRevList_dur() {}
	  
	  public ReconciliationMonthlyRevList_dur(String rtd_In_dur, String msc_In_dur, String dur_diff) {
	    this.rtd_In_dur = rtd_In_dur;
	    this.msc_In_dur = msc_In_dur;
	    this.dur_diff = dur_diff;
	  }
	  
	  public String getRtd_In_dur() {
	    return this.rtd_In_dur;
	  }
	  
	  public void setRtd_In_dur(String rtd_In_dur) {
	    this.rtd_In_dur = rtd_In_dur;
	  }
	  
	  public String getMsc_In_dur() {
	    return this.msc_In_dur;
	  }
	  
	  public void setMsc_In_dur(String msc_In_dur) {
	    this.msc_In_dur = msc_In_dur;
	  }
	  
	  public String getDur_diff() {
	    return this.dur_diff;
	  }
	  
	  public void setDur_diff(String dur_diff) {
	    this.dur_diff = dur_diff;
	  }
}
