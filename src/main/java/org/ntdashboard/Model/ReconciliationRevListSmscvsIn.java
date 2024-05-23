package org.ntdashboard.Model;

public class ReconciliationRevListSmscvsIn {
	private String day;
	  
	  private String rtd_IN_Count;
	  
	  private String msc_IN_Count;
	  
	  private String ion_Count_Diff;
	  
	  private String rtd_IN_Dur;
	  
	  private String msc_IN_Dur;
	  
	  private String ion_DUr_Diff;
	  
	  private String count_varience;
	  
	  private String dur_varience;
	  
	  public ReconciliationRevListSmscvsIn() {}
	  
	  public ReconciliationRevListSmscvsIn(String day, String rtd_IN_Count, String msc_IN_Count, String ion_Count_Diff, String rtd_IN_Dur, String msc_IN_Dur, String ion_DUr_Diff, String count_varience, String dur_varience) {
	    this.day = day;
	    this.rtd_IN_Count = rtd_IN_Count;
	    this.msc_IN_Count = msc_IN_Count;
	    this.ion_Count_Diff = ion_Count_Diff;
	    this.rtd_IN_Dur = rtd_IN_Dur;
	    this.msc_IN_Dur = msc_IN_Dur;
	    this.ion_DUr_Diff = ion_DUr_Diff;
	    this.count_varience = count_varience;
	    this.dur_varience = dur_varience;
	  }
	  
	  public String getDay() {
	    return this.day;
	  }
	  
	  public void setDay(String day) {
	    this.day = day;
	  }
	  
	  public String getRtd_IN_Count() {
	    return this.rtd_IN_Count;
	  }
	  
	  public void setRtd_IN_Count(String rtd_IN_Count) {
	    this.rtd_IN_Count = rtd_IN_Count;
	  }
	  
	  public String getMsc_IN_Count() {
	    return this.msc_IN_Count;
	  }
	  
	  public void setMsc_IN_Count(String msc_IN_Count) {
	    this.msc_IN_Count = msc_IN_Count;
	  }
	  
	  public String getIon_Count_Diff() {
	    return this.ion_Count_Diff;
	  }
	  
	  public void setIon_Count_Diff(String ion_Count_Diff) {
	    this.ion_Count_Diff = ion_Count_Diff;
	  }
	  
	  public String getRtd_IN_Dur() {
	    return this.rtd_IN_Dur;
	  }
	  
	  public void setRtd_IN_Dur(String rtd_IN_Dur) {
	    this.rtd_IN_Dur = rtd_IN_Dur;
	  }
	  
	  public String getMsc_IN_Dur() {
	    return this.msc_IN_Dur;
	  }
	  
	  public void setMsc_IN_Dur(String msc_IN_Dur) {
	    this.msc_IN_Dur = msc_IN_Dur;
	  }
	  
	  public String getIon_DUr_Diff() {
	    return this.ion_DUr_Diff;
	  }
	  
	  public void setIon_DUr_Diff(String ion_DUr_Diff) {
	    this.ion_DUr_Diff = ion_DUr_Diff;
	  }
	  
	  public String getCount_varience() {
	    return this.count_varience;
	  }
	  
	  public void setCount_varience(String count_varience) {
	    this.count_varience = count_varience;
	  }
	  
	  public String getDur_varience() {
	    return this.dur_varience;
	  }
	  
	  public void setDur_varience(String dur_varience) {
	    this.dur_varience = dur_varience;
	  }
}
