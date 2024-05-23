package org.ntdashboard.utility;

public class UtilityHelper {
	
	public static String getJqxToMysqlDate(String date) {
		     String[] dateArr = date.split("/");
		   
		     if (dateArr[0].length() < 2) {
		    	 dateArr[0] = "0" + dateArr[0];
		     }
		    if (dateArr[1].length() < 2) {
		    	dateArr[1] = "0" + dateArr[1];
		     }
		    String formatedDate = String.valueOf(dateArr[2]) + "-" + dateArr[0] + "-" + dateArr[1];
		    
		    return formatedDate;
		   }

}
