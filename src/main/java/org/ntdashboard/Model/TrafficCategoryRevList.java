package org.ntdashboard.Model;

public class TrafficCategoryRevList {
	
	private String day;
	private String deleted;
	private String  delivered;
	private String expired;
	private String rejected;
	private String submited;
	private String total;
	private String pst;
	
	public TrafficCategoryRevList() {
		
	}

	public TrafficCategoryRevList(String day, String deleted, String delivered, String expired, String rejected,
			String submited, String total, String pst) {
		
		this.day = day;
		this.deleted = deleted;
		this.delivered = delivered;
		this.expired = expired;
		this.rejected = rejected;
		this.submited = submited;
		this.total = total;
		this.pst = pst;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getDelivered() {
		return delivered;
	}

	public void setDelivered(String delivered) {
		this.delivered = delivered;
	}

	public String getExpired() {
		return expired;
	}

	public void setExpired(String expired) {
		this.expired = expired;
	}

	public String getRejected() {
		return rejected;
	}

	public void setRejected(String rejected) {
		this.rejected = rejected;
	}

	public String getSubmited() {
		return submited;
	}

	public void setSubmited(String submited) {
		this.submited = submited;
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
	

}
