package org.ntdashboard.Dao;

import java.util.List;

import org.ntdashboard.Model.ReconciliationDayByRevModel;
import org.ntdashboard.Model.ReconciliationDayByRevSmscvsInModel;
import org.ntdashboard.Model.ReconciliationMonthlyRevModel;
import org.ntdashboard.Model.ReconciliationMonthlyRevSmscvsInModel;



public interface Dao {

	ReconciliationDayByRevModel GetReconCiliationDayRev(String paramString1, String paramString2, String paramString3);
	 ReconciliationMonthlyRevModel getMonthlyReconciliationRev(String paramString1, String paramString2);
	 
	 ReconciliationDayByRevModel getReconciliationDayRevSwtVsTapout(String paramString1, String paramString2, String paramString3);
	 ReconciliationMonthlyRevModel getMonthlyReconciliationRevSwtVsTapout(String paramString1, String paramString2);
	 
	 ReconciliationDayByRevSmscvsInModel getReconciliationDayRevSmscVsIn(String paramString1, String paramString2, String paramString3);
	 ReconciliationMonthlyRevSmscvsInModel getMonthlyReconciliationSmscVsIn(String paramString1, String paramString2);

}
