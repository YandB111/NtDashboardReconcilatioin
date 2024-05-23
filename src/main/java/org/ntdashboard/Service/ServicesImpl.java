package org.ntdashboard.Service;

import org.ntdashboard.Dao.Dao;
import org.ntdashboard.Model.ReconciliationDayByRevModel;
import org.ntdashboard.Model.ReconciliationDayByRevSmscvsInModel;
import org.ntdashboard.Model.ReconciliationMonthlyRevModel;
import org.ntdashboard.Model.ReconciliationMonthlyRevSmscvsInModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicesImpl implements Services {
  @Autowired
  Dao reconciliationDayByRevDao;
  
  public ReconciliationDayByRevModel getReconciliationDayByRev(String year, String month, String currency) {
    ReconciliationDayByRevModel reconciliationDayByRevModel = new ReconciliationDayByRevModel();
    reconciliationDayByRevModel = this.reconciliationDayByRevDao.GetReconCiliationDayRev(year, month, currency);
    return reconciliationDayByRevModel;
  }
  
  public ReconciliationMonthlyRevModel getReconcilationMonthlyRev(String year, String month) {
    ReconciliationMonthlyRevModel reconciliationMonthlyRevModel = new ReconciliationMonthlyRevModel();
    reconciliationMonthlyRevModel = this.reconciliationDayByRevDao.getMonthlyReconciliationRev(year, month);
    reconciliationMonthlyRevModel.setMonth(month.toUpperCase());
    reconciliationMonthlyRevModel.setYear(year);
    return reconciliationMonthlyRevModel;
  }
  
  public ReconciliationDayByRevModel getReconciliationDayRevSwtVsTapout(String year, String month, String currency) {
    ReconciliationDayByRevModel reconciliationDayByRevModel = new ReconciliationDayByRevModel();
    reconciliationDayByRevModel = this.reconciliationDayByRevDao.getReconciliationDayRevSwtVsTapout(year, month, currency);
    return reconciliationDayByRevModel;
  }
  
  public ReconciliationMonthlyRevModel getMonthlyReconciliationRevSwtVsTapout(String year, String month) {
    ReconciliationMonthlyRevModel reconciliationMonthlyRevModel = new ReconciliationMonthlyRevModel();
    reconciliationMonthlyRevModel = this.reconciliationDayByRevDao.getMonthlyReconciliationRevSwtVsTapout(year, month);
    reconciliationMonthlyRevModel.setMonth(month.toUpperCase());
    reconciliationMonthlyRevModel.setYear(year);
    return reconciliationMonthlyRevModel;
  }
  
  public ReconciliationDayByRevSmscvsInModel getReconciliationDayRevSmscVsIn(String year, String month, String currency) {
	  ReconciliationDayByRevSmscvsInModel reconciliationDayByRevModel = new ReconciliationDayByRevSmscvsInModel();
    reconciliationDayByRevModel = this.reconciliationDayByRevDao.getReconciliationDayRevSmscVsIn(year, month, currency);
    return reconciliationDayByRevModel;
  }
  
  public ReconciliationMonthlyRevSmscvsInModel getMonthlyReconciliationSmscVsIn(String year, String month) {
	  ReconciliationMonthlyRevSmscvsInModel reconciliationMonthlyRevModel = new ReconciliationMonthlyRevSmscvsInModel();
    reconciliationMonthlyRevModel = this.reconciliationDayByRevDao.getMonthlyReconciliationSmscVsIn(year, month);
    reconciliationMonthlyRevModel.setMonth(month.toUpperCase());
    reconciliationMonthlyRevModel.setYear(year);
    return reconciliationMonthlyRevModel;
  }
}
