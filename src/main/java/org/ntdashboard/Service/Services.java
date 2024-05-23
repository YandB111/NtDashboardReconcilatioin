package org.ntdashboard.Service;

import org.ntdashboard.Model.ReconciliationDayByRevModel;
import org.ntdashboard.Model.ReconciliationDayByRevSmscvsInModel;
import org.ntdashboard.Model.ReconciliationMonthlyRevModel;
import org.ntdashboard.Model.ReconciliationMonthlyRevSmscvsInModel;

public interface Services {
  ReconciliationDayByRevModel getReconciliationDayByRev(String paramString1, String paramString2, String paramString3);
  
  ReconciliationMonthlyRevModel getReconcilationMonthlyRev(String paramString1, String paramString2);
  
  ReconciliationDayByRevModel getReconciliationDayRevSwtVsTapout(String paramString1, String paramString2, String paramString3);
  
  ReconciliationMonthlyRevModel getMonthlyReconciliationRevSwtVsTapout(String paramString1, String paramString2);
  
  ReconciliationDayByRevSmscvsInModel getReconciliationDayRevSmscVsIn(String paramString1, String paramString2, String paramString3);
  
  ReconciliationMonthlyRevSmscvsInModel getMonthlyReconciliationSmscVsIn(String paramString1, String paramString2);
}
