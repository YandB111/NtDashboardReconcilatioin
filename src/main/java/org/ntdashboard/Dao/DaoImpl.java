 package org.ntdashboard.Dao;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import javax.sql.DataSource;
import org.ntdashboard.Dao.Mapper.ReconciliationDayByRevDbMapper;
import org.ntdashboard.Dao.Mapper.ReconciliationDayByRevSmscvsInDbMapper;
import org.ntdashboard.Dao.Mapper.ReconciliationMonthlyRevDbMapper;
import org.ntdashboard.Dao.Mapper.ReconciliationMonthlyRevDbSmscvsInMapper;
import org.ntdashboard.Model.ReconciliationDayByRevModel;
import org.ntdashboard.Model.ReconciliationDayByRevSmscvsInModel;
import org.ntdashboard.Model.ReconciliationMonthlyRevList;
import org.ntdashboard.Model.ReconciliationMonthlyRevListSmscvsIn;
import org.ntdashboard.Model.ReconciliationMonthlyRevListSmscvsIn_dur;
import org.ntdashboard.Model.ReconciliationMonthlyRevList_count;
import org.ntdashboard.Model.ReconciliationMonthlyRevList_dur;
import org.ntdashboard.Model.ReconciliationMonthlyRevModel;
import org.ntdashboard.Model.ReconciliationMonthlyRevSmscvsInList_count;
import org.ntdashboard.Model.ReconciliationMonthlyRevSmscvsInModel;
import org.ntdashboard.Model.ReconciliationRevList;
import org.ntdashboard.Model.ReconciliationRevListSmscvsIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class DaoImpl implements Dao {
  @Autowired
  public DataSource dataSource;
  
  public ReconciliationDayByRevModel GetReconCiliationDayRev(String year, String month, String currency) {
    ReconciliationDayByRevModel reconciliationDayByRevModel = new ReconciliationDayByRevModel();
    List<ReconciliationRevList> reconciliationRevList = null;
    List<ReconciliationRevList> hlist = new ArrayList<>();
    try {
      Calendar mCalendar = Calendar.getInstance();
      String currmonth = mCalendar.getDisplayName(2, 2, Locale.getDefault());
      int curryear = Calendar.getInstance().get(1);
      String currYearMonth = curryear + "-" + currmonth;
      System.out.println("Default date is " + currYearMonth);
      NumberFormat formatter = NumberFormat.getInstance();
      String Yearmonth = year + "-" + month;
      System.out.println(Yearmonth);
      String currencytype = currency;
      String sql = "SELECT /*+ parallel(a,10) parallel(b,10) */ to_char(a.event_date,'DD')as day,ROUND(SUM(a.IN_DUR)/1000) AS IN_DUR,ROUND(SUM(a.SWT_DUR)/1000,2) AS SWT_DUR,ROUND(SUM(a.IN_DUR-a.SWT_DUR)/1000) AS DUR_DIFF,ROUND(SUM(a.IN_DUR-a.SWT_DUR) / SUM(b.IN_DUR-b.SWT_DUR)*100,2) as PST2,ROUND(SUM(a.IN_COUNT)/1000) AS IN_COUNT,ROUND(SUM(a.SWT_COUNT)/1000) AS SWT_COUNT,ROUND(SUM(a.IN_COUNT-a.SWT_COUNT)/1000) AS COUNT_DIFF,round((ROUND(SUM(a.IN_COUNT-a.SWT_COUNT)/1000) / ROUND(SUM(b.IN_COUNT-b.SWT_COUNT)/1000) *100),2) as PST1 FROM business_users.DSH_KPI_RECO a INNER JOIN business_users.DSH_KPI_RECO b on b.event_date = a.event_date -1 and b.KPI_NAME=a.KPI_NAME where a.KPI_NAME='SWT_VS_IN' and a.event_date >= to_date('<Year_Month>','YYYY-MON') and a.event_date <=last_day(to_date('<Year_Month>','YYYY-MON')) GROUP BY to_char(a.event_date,'DD') ORDER By 1";
      if (year.isEmpty() && month.isEmpty()) {
        sql = sql.replaceAll("<Year_Month>", currYearMonth);
        System.out.println("For default date::" + sql);
      } else {
        sql = sql.replaceAll("<Year_Month>", Yearmonth);
        System.out.println("For given date::" + sql);
      } 
      JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource);
      double rtd_IN_Countsum = 0.0D;
      double msc_IN_CountSum = 0.0D;
      double ion_Count_DiffSum = 0.0D;
      double rtd_IN_DurSum = 0.0D;
      double msc_IN_DurSum = 0.0D;
      double ion_Dur_DiffSum = 0.0D;
      String totalrtd_IN = null;
      String totalMsc_IN = null;
      String total_Count_DifF = null;
      String totalIN_DurSum = null;
      String totalMsc_DurSum = null;
      String totalDurDiffSum = null;
      double countVarienceSum = 0.0D;
      double durationVarienceSum = 0.0D;
      String count_In_sum = null;
      String count_msc_sum = null;
      String count_diff_sum = null;
      String dur_in_sum = null;
      String dur_msc_sum = null;
      String dur_diff_sum = null;
      String day = null;
      reconciliationRevList = jdbcTemplate.query(sql, (RowMapper)new ReconciliationDayByRevDbMapper());
      for (int i = 0; i < reconciliationRevList.size(); i++) {
        day = ((ReconciliationRevList)reconciliationRevList.get(i)).getDay();
        String rtd_IN_Count = ((ReconciliationRevList)reconciliationRevList.get(i)).getRtd_IN_Count();
        String msc_IN_Count = ((ReconciliationRevList)reconciliationRevList.get(i)).getMsc_IN_Count();
        String ion_Count_Diff = ((ReconciliationRevList)reconciliationRevList.get(i)).getIon_Count_Diff();
        String rtd_IN_Dur = ((ReconciliationRevList)reconciliationRevList.get(i)).getRtd_IN_Dur();
        String msc_IN_Dur = ((ReconciliationRevList)reconciliationRevList.get(i)).getMsc_IN_Dur();
        String ion_Dur_Diff = ((ReconciliationRevList)reconciliationRevList.get(i)).getIon_DUr_Diff();
        String Count_Varience = ((ReconciliationRevList)reconciliationRevList.get(i)).getCount_varience().substring(0, 4);
        String Dur_Varience = ((ReconciliationRevList)reconciliationRevList.get(i)).getDur_varience().substring(0, 4);
        if (rtd_IN_Count == null)
          rtd_IN_Count = Integer.toString(0); 
        if (msc_IN_Count == null)
          msc_IN_Count = Integer.toString(0); 
        if (ion_Count_Diff == null)
          ion_Count_Diff = Integer.toString(0); 
        if (rtd_IN_Dur == null)
          rtd_IN_Dur = Integer.toString(0); 
        if (msc_IN_Dur == null)
          msc_IN_Dur = Integer.toString(0); 
        if (ion_Dur_Diff == null)
          ion_Dur_Diff = Integer.toString(0); 
        if (Count_Varience == null)
          Count_Varience = Integer.toString(0); 
        if (Dur_Varience == null)
          Dur_Varience = Integer.toString(0); 
        if (currencytype.equalsIgnoreCase("Million")) {
          double Rtd_ION_COUNT = Double.parseDouble(rtd_IN_Count) / 1000000.0D;
          rtd_IN_Count = String.valueOf(Rtd_ION_COUNT);
          double MSC_ION_COUNT = Double.parseDouble(msc_IN_Count) / 1000000.0D;
          msc_IN_Count = String.valueOf(MSC_ION_COUNT);
          double ion_Diff = Double.parseDouble(ion_Count_Diff) / 1000000.0D;
          ion_Count_Diff = String.valueOf(ion_Diff);
          double rtd_ION_Dur = Double.parseDouble(rtd_IN_Dur) / 1000000.0D;
          rtd_IN_Dur = String.valueOf(rtd_ION_Dur);
          double msc_ION_Dur = Double.parseDouble(msc_IN_Dur) / 1000000.0D;
          msc_IN_Dur = String.valueOf(msc_ION_Dur);
          double ION_DIFF = Double.parseDouble(ion_Dur_Diff) / 1000000.0D;
          ion_Dur_Diff = String.valueOf(ION_DIFF);
          double COUNT_VARIENEC = Double.parseDouble(Count_Varience) / 1000000.0D;
          Count_Varience = String.valueOf(COUNT_VARIENEC);
          double DUR_VARIENCE = Double.parseDouble(Dur_Varience) / 1000000.0D;
          Dur_Varience = String.valueOf(DUR_VARIENCE);
        } else if (currencytype.equalsIgnoreCase("Billion")) {
          double Rtd_ION_COUNT = Double.parseDouble(rtd_IN_Count) / 1.0E9D;
          rtd_IN_Count = String.valueOf(Rtd_ION_COUNT);
          double MSC_ION_COUNT = Double.parseDouble(msc_IN_Count) / 1.0E9D;
          msc_IN_Count = String.valueOf(MSC_ION_COUNT);
          double ion_Diff = Double.parseDouble(ion_Count_Diff) / 1.0E9D;
          ion_Count_Diff = String.valueOf(ion_Diff);
          double rtd_ION_Dur = Double.parseDouble(rtd_IN_Dur) / 1.0E9D;
          rtd_IN_Dur = String.valueOf(rtd_ION_Dur);
          double msc_ION_Dur = Double.parseDouble(msc_IN_Dur) / 1.0E9D;
          msc_IN_Dur = String.valueOf(msc_ION_Dur);
          double ION_DIFF = Double.parseDouble(ion_Dur_Diff) / 1.0E9D;
          ion_Dur_Diff = String.valueOf(ION_DIFF);
          double COUNT_VARIENEC = Double.parseDouble(Count_Varience) / 1.0E9D;
          Count_Varience = String.valueOf(COUNT_VARIENEC);
          double DUR_VARIENCE = Double.parseDouble(Dur_Varience) / 1000000.0D;
          Dur_Varience = String.valueOf(DUR_VARIENCE);
        } 
        double Rtd_IN_COUNT = Double.parseDouble(rtd_IN_Count);
        rtd_IN_Countsum += Rtd_IN_COUNT;
        totalrtd_IN = formatter.format(rtd_IN_Countsum);
        String format_rtd_in_count = formatter.format(Rtd_IN_COUNT);
        double MSC_IN_COUNT = Double.parseDouble(msc_IN_Count);
        msc_IN_CountSum += MSC_IN_COUNT;
        totalMsc_IN = formatter.format(msc_IN_CountSum);
        String formatMscINCount = formatter.format(MSC_IN_COUNT);
        double ION_DIFF_COUNT = Double.parseDouble(ion_Count_Diff);
        ion_Count_DiffSum += ION_DIFF_COUNT;
        total_Count_DifF = formatter.format(ion_Count_DiffSum);
        String format_ION_COUNT_DIFF = formatter.format(ION_DIFF_COUNT);
        double RTD_ION_DUR = Double.parseDouble(rtd_IN_Dur);
        rtd_IN_DurSum += RTD_ION_DUR;
        totalIN_DurSum = formatter.format(rtd_IN_DurSum);
        String Format_rtd_IN_dur = formatter.format(RTD_ION_DUR);
        double MSC_IN_DUR = Double.parseDouble(msc_IN_Dur);
        msc_IN_DurSum += MSC_IN_DUR;
        totalMsc_DurSum = formatter.format(msc_IN_DurSum);
        String format_MSC_IN_Dur = formatter.format(MSC_IN_DUR);
        double ION_DUR_DIFF = Double.parseDouble(ion_Dur_Diff);
        ion_Dur_DiffSum += ION_DUR_DIFF;
        totalDurDiffSum = formatter.format(ion_Dur_DiffSum);
        String format_ION_Dur_Diff = formatter.format(ION_DUR_DIFF);
        countVarienceSum += Double.parseDouble(Count_Varience);
        Count_Varience = Count_Varience.substring(0, 4) + "%";
        System.out.println(Count_Varience);
        durationVarienceSum += Double.parseDouble(Dur_Varience);
        Dur_Varience = Dur_Varience.substring(0, 4) + "%";
        System.out.println(Dur_Varience);
        ReconciliationRevList reconciliationRevlist = new ReconciliationRevList(day, format_rtd_in_count, formatMscINCount, format_ION_COUNT_DIFF, Format_rtd_IN_dur, format_MSC_IN_Dur, format_ION_Dur_Diff, Count_Varience, Dur_Varience);
        hlist.add(reconciliationRevlist);
      } 
      System.out.println("day is reached here " + day);
      int Nday = Integer.parseInt(day);
      double countpst = countVarienceSum / Nday;
      String toatlcountpst = formatter.format(countpst);
      toatlcountpst = toatlcountpst + "%";
      double durpst = durationVarienceSum / Nday;
      String toatldurtpst = formatter.format(durpst);
      count_In_sum = totalrtd_IN.replaceAll(",", "");
      count_msc_sum = totalMsc_IN.replaceAll(",", "");
      count_diff_sum = total_Count_DifF.replaceAll(",", "");
      dur_in_sum = totalIN_DurSum.replaceAll(",", "");
      dur_msc_sum = totalMsc_DurSum.replaceAll(",", "");
      dur_diff_sum = totalDurDiffSum.replaceAll(",", "");
      toatldurtpst = toatldurtpst + "%";
      reconciliationDayByRevModel.setMonth(month.toUpperCase());
      reconciliationDayByRevModel.setYear(year);
      reconciliationDayByRevModel.setRtd_In_Sum(totalrtd_IN);
      reconciliationDayByRevModel.setMsc_In_sum(totalMsc_IN);
      reconciliationDayByRevModel.setCount_diffsum(total_Count_DifF);
      reconciliationDayByRevModel.setRtd_dur_sum(totalIN_DurSum);
      reconciliationDayByRevModel.setMsc_dur_sum(totalMsc_DurSum);
      reconciliationDayByRevModel.setDur_diffsum(totalDurDiffSum);
      reconciliationDayByRevModel.setCountAvgVarience(toatlcountpst);
      reconciliationDayByRevModel.setDurAvgVarience(toatldurtpst);
      reconciliationDayByRevModel.setReconciliationRevList(hlist);
      reconciliationDayByRevModel.setCount_In_sum(count_In_sum);
      reconciliationDayByRevModel.setCount_msc_sum(count_msc_sum);
      reconciliationDayByRevModel.setCount_diff_sum(count_diff_sum);
      reconciliationDayByRevModel.setDur_in_sum(dur_in_sum);
      reconciliationDayByRevModel.setDur_msc_sum(dur_msc_sum);
      reconciliationDayByRevModel.setDur_diff_sum(dur_diff_sum);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return reconciliationDayByRevModel;
  }
  
  public ReconciliationMonthlyRevModel getMonthlyReconciliationRev(String year, String month) {
    ReconciliationMonthlyRevModel response = new ReconciliationMonthlyRevModel();
    ReconciliationMonthlyRevList reconciliationMonthlyRevList = new ReconciliationMonthlyRevList();
    List<ReconciliationMonthlyRevList> hlist = null;
    List<ReconciliationMonthlyRevList_dur> durlist = new ArrayList<>();
    List<ReconciliationMonthlyRevList_count> countlist = new ArrayList<>();
    try {
      String yearMonth = year + "-" + month;
      String sql = "SELECT /*+ parallel(a,10) parallel(b,10) */ ROUND(SUM(a.IN_DUR)/1000)AS IN_DUR,ROUND(SUM(a.SWT_DUR)/1000,2) AS SWT_DUR,ROUND(SUM(a.IN_DUR-a.SWT_DUR)/1000)AS DUR_DIFF,ROUND(SUM(a.IN_COUNT)/1000) AS IN_COUNT,ROUND(SUM(a.SWT_COUNT)/1000) AS SWT_COUNT,ROUND(SUM(a.IN_COUNT-a.SWT_COUNT)/1000) AS COUNT_DIFF FROM business_users.DSH_KPI_RECO a INNER JOIN business_users.DSH_KPI_RECO b on b.event_date = a.event_date -1 and b.KPI_NAME=a.KPI_NAME where a.KPI_NAME='SWT_VS_IN' and a.event_date >= to_date('<Year_Month>','YYYY-MON') and a.event_date <=last_day(to_date('<Year_Month>','YYYY-MON'))";
      sql = sql.replaceAll("<Year_Month>", yearMonth);
      JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource);
      List<List<ReconciliationMonthlyRevList>> list2 = jdbcTemplate.query(sql, (RowMapper)new ReconciliationMonthlyRevDbMapper());
      hlist = list2.get(0);
      List<String> name = new ArrayList<>();
      List<String> value = new ArrayList<>();
      Map<String, String> map = new HashMap<>();
      for (ReconciliationMonthlyRevList stu : hlist)
        map.put(stu.getLabel(), stu.getValue()); 
      for (Map.Entry<String, String> entry : map.entrySet()) {
        String fieldname = entry.getKey();
        name.add(fieldname);
        String fieldValue = entry.getValue();
        value.add(fieldValue);
      } 
      String msc_dur = value.get(0);
      String dur_diff = value.get(2);
      String in_dur = value.get(3);
      ReconciliationMonthlyRevList_dur reconciliationMonthlyRevList_dur = new ReconciliationMonthlyRevList_dur(in_dur, msc_dur, dur_diff);
      durlist.add(reconciliationMonthlyRevList_dur);
      String in_count = value.get(5);
      String msc_count = value.get(4);
      String count_diff = value.get(1);
      ReconciliationMonthlyRevList_count reconciliationMonthlyRevList_count = new ReconciliationMonthlyRevList_count(in_count, msc_count, count_diff);
      countlist.add(reconciliationMonthlyRevList_count);
      response.setReconciliationMonthlyRevList_count(countlist);
      response.setReconciliationMonthlyRevList_dur(durlist);
      if (hlist != null && hlist.size() > 0)
        reconciliationMonthlyRevList = hlist.get(0); 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return response;
  }
  
  public ReconciliationDayByRevModel getReconciliationDayRevSwtVsTapout(String year, String month, String currency) {
    ReconciliationDayByRevModel reconciliationDayByRevModel = new ReconciliationDayByRevModel();
    List<ReconciliationRevList> reconciliationRevList = null;
    List<ReconciliationRevList> hlist = new ArrayList<>();
    try {
      Calendar mCalendar = Calendar.getInstance();
      String currmonth = mCalendar.getDisplayName(2, 2, Locale.getDefault());
      int curryear = Calendar.getInstance().get(1);
      String currYearMonth = curryear + "-" + currmonth;
      System.out.println("Default date is " + currYearMonth);
      NumberFormat formatter = NumberFormat.getInstance();
      String Yearmonth = year + "-" + month;
      System.out.println(Yearmonth);
      String currencytype = currency;
      String sql = "SELECT /*+ parallel(a,10) parallel(b,10) */ to_char(a.event_date,'DD')as day,ROUND(SUM(a.IN_DUR)/1000) AS IN_DUR,ROUND(SUM(a.SWT_DUR)/1000,2) AS SWT_DUR,ROUND(SUM(a.IN_DUR-a.SWT_DUR)/1000) AS DUR_DIFF,ROUND(SUM(a.IN_DUR-a.SWT_DUR) / SUM(b.IN_DUR-b.SWT_DUR)*100,2) as PST2,ROUND(SUM(a.IN_COUNT)/1000) AS IN_COUNT,ROUND(SUM(a.SWT_COUNT)/1000) AS SWT_COUNT,ROUND(SUM(a.IN_COUNT-a.SWT_COUNT)/1000) AS COUNT_DIFF,round((ROUND(SUM(a.IN_COUNT-a.SWT_COUNT)/1000) / ROUND(SUM(b.IN_COUNT-b.SWT_COUNT)/1000) *100),2) as PST1 FROM business_users.DSH_KPI_RECO a INNER JOIN business_users.DSH_KPI_RECO b on b.event_date = a.event_date -1 and b.KPI_NAME=a.KPI_NAME where a.KPI_NAME='SWT_VS_TAPOUT' and a.event_date >= to_date('<Year_Month>','YYYY-MON') and a.event_date <=last_day(to_date('<Year_Month>','YYYY-MON')) GROUP BY to_char(a.event_date,'DD') ORDER By 1";
      if (year.isEmpty() && month.isEmpty()) {
        sql = sql.replaceAll("<Year_Month>", currYearMonth);
        System.out.println("For default date::" + sql);
      } else {
        sql = sql.replaceAll("<Year_Month>", Yearmonth);
        System.out.println("For given date::" + sql);
      } 
      JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource);
      double rtd_IN_Countsum = 0.0D;
      double msc_IN_CountSum = 0.0D;
      double ion_Count_DiffSum = 0.0D;
      double rtd_IN_DurSum = 0.0D;
      double msc_IN_DurSum = 0.0D;
      double ion_Dur_DiffSum = 0.0D;
      String totalrtd_IN = null;
      String totalMsc_IN = null;
      String total_Count_DifF = null;
      String totalIN_DurSum = null;
      String totalMsc_DurSum = null;
      String totalDurDiffSum = null;
      double countVarienceSum = 0.0D;
      double durationVarienceSum = 0.0D;
      String count_In_sum = null;
      String count_msc_sum = null;
      String count_diff_sum = null;
      String dur_in_sum = null;
      String dur_msc_sum = null;
      String dur_diff_sum = null;
      String day = null;
      reconciliationRevList = jdbcTemplate.query(sql, (RowMapper)new ReconciliationDayByRevDbMapper());
      for (int i = 0; i < reconciliationRevList.size(); i++) {
        day = ((ReconciliationRevList)reconciliationRevList.get(i)).getDay();
        String rtd_IN_Count = ((ReconciliationRevList)reconciliationRevList.get(i)).getRtd_IN_Count();
        String msc_IN_Count = ((ReconciliationRevList)reconciliationRevList.get(i)).getMsc_IN_Count();
        String ion_Count_Diff = ((ReconciliationRevList)reconciliationRevList.get(i)).getIon_Count_Diff();
        String rtd_IN_Dur = ((ReconciliationRevList)reconciliationRevList.get(i)).getRtd_IN_Dur();
        String msc_IN_Dur = ((ReconciliationRevList)reconciliationRevList.get(i)).getMsc_IN_Dur();
        String ion_Dur_Diff = ((ReconciliationRevList)reconciliationRevList.get(i)).getIon_DUr_Diff();
        String Count_Varience = ((ReconciliationRevList)reconciliationRevList.get(i)).getCount_varience().substring(0, 4);
        String Dur_Varience = ((ReconciliationRevList)reconciliationRevList.get(i)).getDur_varience().substring(0, 4);
        if (rtd_IN_Count == null)
          rtd_IN_Count = Integer.toString(0); 
        if (msc_IN_Count == null)
          msc_IN_Count = Integer.toString(0); 
        if (ion_Count_Diff == null)
          ion_Count_Diff = Integer.toString(0); 
        if (rtd_IN_Dur == null)
          rtd_IN_Dur = Integer.toString(0); 
        if (msc_IN_Dur == null)
          msc_IN_Dur = Integer.toString(0); 
        if (ion_Dur_Diff == null)
          ion_Dur_Diff = Integer.toString(0); 
        if (Count_Varience == null)
          Count_Varience = Integer.toString(0); 
        if (Dur_Varience == null)
          Dur_Varience = Integer.toString(0); 
        if (currencytype.equalsIgnoreCase("Million")) {
          double Rtd_ION_COUNT = Double.parseDouble(rtd_IN_Count) / 1000000.0D;
          rtd_IN_Count = String.valueOf(Rtd_ION_COUNT);
          double MSC_ION_COUNT = Double.parseDouble(msc_IN_Count) / 1000000.0D;
          msc_IN_Count = String.valueOf(MSC_ION_COUNT);
          double ion_Diff = Double.parseDouble(ion_Count_Diff) / 1000000.0D;
          ion_Count_Diff = String.valueOf(ion_Diff);
          double rtd_ION_Dur = Double.parseDouble(rtd_IN_Dur) / 1000000.0D;
          rtd_IN_Dur = String.valueOf(rtd_ION_Dur);
          double msc_ION_Dur = Double.parseDouble(msc_IN_Dur) / 1000000.0D;
          msc_IN_Dur = String.valueOf(msc_ION_Dur);
          double ION_DIFF = Double.parseDouble(ion_Dur_Diff) / 1000000.0D;
          ion_Dur_Diff = String.valueOf(ION_DIFF);
          double COUNT_VARIENEC = Double.parseDouble(Count_Varience) / 1000000.0D;
          Count_Varience = String.valueOf(COUNT_VARIENEC);
          double DUR_VARIENCE = Double.parseDouble(Dur_Varience) / 1000000.0D;
          Dur_Varience = String.valueOf(DUR_VARIENCE);
        } else if (currencytype.equalsIgnoreCase("Billion")) {
          double Rtd_ION_COUNT = Double.parseDouble(rtd_IN_Count) / 1.0E9D;
          rtd_IN_Count = String.valueOf(Rtd_ION_COUNT);
          double MSC_ION_COUNT = Double.parseDouble(msc_IN_Count) / 1.0E9D;
          msc_IN_Count = String.valueOf(MSC_ION_COUNT);
          double ion_Diff = Double.parseDouble(ion_Count_Diff) / 1.0E9D;
          ion_Count_Diff = String.valueOf(ion_Diff);
          double rtd_ION_Dur = Double.parseDouble(rtd_IN_Dur) / 1.0E9D;
          rtd_IN_Dur = String.valueOf(rtd_ION_Dur);
          double msc_ION_Dur = Double.parseDouble(msc_IN_Dur) / 1.0E9D;
          msc_IN_Dur = String.valueOf(msc_ION_Dur);
          double ION_DIFF = Double.parseDouble(ion_Dur_Diff) / 1.0E9D;
          ion_Dur_Diff = String.valueOf(ION_DIFF);
          double COUNT_VARIENEC = Double.parseDouble(Count_Varience) / 1.0E9D;
          Count_Varience = String.valueOf(COUNT_VARIENEC);
          double DUR_VARIENCE = Double.parseDouble(Dur_Varience) / 1000000.0D;
          Dur_Varience = String.valueOf(DUR_VARIENCE);
        } 
        double Rtd_IN_COUNT = Double.parseDouble(rtd_IN_Count);
        rtd_IN_Countsum += Rtd_IN_COUNT;
        totalrtd_IN = formatter.format(rtd_IN_Countsum);
        String format_rtd_in_count = formatter.format(Rtd_IN_COUNT);
        double MSC_IN_COUNT = Double.parseDouble(msc_IN_Count);
        msc_IN_CountSum += MSC_IN_COUNT;
        totalMsc_IN = formatter.format(msc_IN_CountSum);
        String formatMscINCount = formatter.format(MSC_IN_COUNT);
        double ION_DIFF_COUNT = Double.parseDouble(ion_Count_Diff);
        ion_Count_DiffSum += ION_DIFF_COUNT;
        total_Count_DifF = formatter.format(ion_Count_DiffSum);
        String format_ION_COUNT_DIFF = formatter.format(ION_DIFF_COUNT);
        double RTD_ION_DUR = Double.parseDouble(rtd_IN_Dur);
        rtd_IN_DurSum += RTD_ION_DUR;
        totalIN_DurSum = formatter.format(rtd_IN_DurSum);
        String Format_rtd_IN_dur = formatter.format(RTD_ION_DUR);
        double MSC_IN_DUR = Double.parseDouble(msc_IN_Dur);
        msc_IN_DurSum += MSC_IN_DUR;
        totalMsc_DurSum = formatter.format(msc_IN_DurSum);
        String format_MSC_IN_Dur = formatter.format(MSC_IN_DUR);
        double ION_DUR_DIFF = Double.parseDouble(ion_Dur_Diff);
        ion_Dur_DiffSum += ION_DUR_DIFF;
        totalDurDiffSum = formatter.format(ion_Dur_DiffSum);
        String format_ION_Dur_Diff = formatter.format(ION_DUR_DIFF);
        countVarienceSum += Double.parseDouble(Count_Varience);
        Count_Varience = Count_Varience.substring(0, 4) + "%";
        System.out.println(Count_Varience);
        durationVarienceSum += Double.parseDouble(Dur_Varience);
        Dur_Varience = Dur_Varience.substring(0, 4) + "%";
        System.out.println(Dur_Varience);
        ReconciliationRevList reconciliationRevlist = new ReconciliationRevList(day, format_rtd_in_count, formatMscINCount, format_ION_COUNT_DIFF, Format_rtd_IN_dur, format_MSC_IN_Dur, format_ION_Dur_Diff, Count_Varience, Dur_Varience);
        hlist.add(reconciliationRevlist);
      } 
      System.out.println("day is reached here " + day);
      int Nday = Integer.parseInt(day);
      double countpst = countVarienceSum / Nday;
      String toatlcountpst = formatter.format(countpst);
      toatlcountpst = toatlcountpst + "%";
      double durpst = durationVarienceSum / Nday;
      String toatldurtpst = formatter.format(durpst);
      count_In_sum = totalrtd_IN.replaceAll(",", "");
      count_msc_sum = totalMsc_IN.replaceAll(",", "");
      count_diff_sum = total_Count_DifF.replaceAll(",", "");
      dur_in_sum = totalIN_DurSum.replaceAll(",", "");
      dur_msc_sum = totalMsc_DurSum.replaceAll(",", "");
      dur_diff_sum = totalDurDiffSum.replaceAll(",", "");
      toatldurtpst = toatldurtpst + "%";
      reconciliationDayByRevModel.setMonth(month.toUpperCase());
      reconciliationDayByRevModel.setYear(year);
      reconciliationDayByRevModel.setRtd_In_Sum(totalrtd_IN);
      reconciliationDayByRevModel.setMsc_In_sum(totalMsc_IN);
      reconciliationDayByRevModel.setCount_diffsum(total_Count_DifF);
      reconciliationDayByRevModel.setRtd_dur_sum(totalIN_DurSum);
      reconciliationDayByRevModel.setMsc_dur_sum(totalMsc_DurSum);
      reconciliationDayByRevModel.setDur_diffsum(totalDurDiffSum);
      reconciliationDayByRevModel.setCountAvgVarience(toatlcountpst);
      reconciliationDayByRevModel.setDurAvgVarience(toatldurtpst);
      reconciliationDayByRevModel.setReconciliationRevList(hlist);
      reconciliationDayByRevModel.setCount_In_sum(count_In_sum);
      reconciliationDayByRevModel.setCount_msc_sum(count_msc_sum);
      reconciliationDayByRevModel.setCount_diff_sum(count_diff_sum);
      reconciliationDayByRevModel.setDur_in_sum(dur_in_sum);
      reconciliationDayByRevModel.setDur_msc_sum(dur_msc_sum);
      reconciliationDayByRevModel.setDur_diff_sum(dur_diff_sum);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return reconciliationDayByRevModel;
  }
  
  public ReconciliationMonthlyRevModel getMonthlyReconciliationRevSwtVsTapout(String year, String month) {
    ReconciliationMonthlyRevModel response = new ReconciliationMonthlyRevModel();
    ReconciliationMonthlyRevList reconciliationMonthlyRevList = new ReconciliationMonthlyRevList();
    List<ReconciliationMonthlyRevList> hlist = null;
    List<ReconciliationMonthlyRevList_dur> durlist = new ArrayList<>();
    List<ReconciliationMonthlyRevList_count> countlist = new ArrayList<>();
    try {
      String yearMonth = year + "-" + month;
      String sql = "SELECT /*+ parallel(a,10) parallel(b,10) */ ROUND(SUM(a.IN_DUR)/1000)AS IN_DUR,ROUND(SUM(a.SWT_DUR)/1000,2) AS SWT_DUR,ROUND(SUM(a.IN_DUR-a.SWT_DUR)/1000)AS DUR_DIFF,ROUND(SUM(a.IN_COUNT)/1000) AS IN_COUNT,ROUND(SUM(a.SWT_COUNT)/1000) AS SWT_COUNT,ROUND(SUM(a.IN_COUNT-a.SWT_COUNT)/1000) AS COUNT_DIFF FROM business_users.DSH_KPI_RECO a INNER JOIN business_users.DSH_KPI_RECO b on b.event_date = a.event_date -1 and b.KPI_NAME=a.KPI_NAME where a.KPI_NAME='SWT_VS_TAPOUT' and a.event_date >= to_date('<Year_Month>','YYYY-MON') and a.event_date <=last_day(to_date('<Year_Month>','YYYY-MON'))";
      sql = sql.replaceAll("<Year_Month>", yearMonth);
      JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource);
      List<List<ReconciliationMonthlyRevList>> list2 = jdbcTemplate.query(sql, (RowMapper)new ReconciliationMonthlyRevDbMapper());
      hlist = list2.get(0);
      List<String> name = new ArrayList<>();
      List<String> value = new ArrayList<>();
      Map<String, String> map = new HashMap<>();
      for (ReconciliationMonthlyRevList stu : hlist)
        map.put(stu.getLabel(), stu.getValue()); 
      for (Map.Entry<String, String> entry : map.entrySet()) {
        String fieldname = entry.getKey();
        name.add(fieldname);
        String fieldValue = entry.getValue();
        value.add(fieldValue);
      } 
      String msc_dur = value.get(0);
      String dur_diff = value.get(2);
      String in_dur = value.get(3);
      ReconciliationMonthlyRevList_dur reconciliationMonthlyRevList_dur = new ReconciliationMonthlyRevList_dur(in_dur, msc_dur, dur_diff);
      durlist.add(reconciliationMonthlyRevList_dur);
      String in_count = value.get(5);
      String msc_count = value.get(4);
      String count_diff = value.get(1);
      ReconciliationMonthlyRevList_count reconciliationMonthlyRevList_count = new ReconciliationMonthlyRevList_count(in_count, msc_count, count_diff);
      countlist.add(reconciliationMonthlyRevList_count);
      response.setReconciliationMonthlyRevList_count(countlist);
      response.setReconciliationMonthlyRevList_dur(durlist);
      if (hlist != null && hlist.size() > 0)
        reconciliationMonthlyRevList = hlist.get(0); 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return response;
  }
  
  public ReconciliationDayByRevSmscvsInModel getReconciliationDayRevSmscVsIn(String year, String month, String currency) {
	    ReconciliationDayByRevSmscvsInModel reconciliationDayByRevModel = new ReconciliationDayByRevSmscvsInModel();
	    List<ReconciliationRevListSmscvsIn> reconciliationRevList = null;
	    List<ReconciliationRevListSmscvsIn> hlist = new ArrayList<>();
	    try {
	      Calendar mCalendar = Calendar.getInstance();
	      String currmonth = mCalendar.getDisplayName(2, 2, Locale.getDefault());
	      int curryear = Calendar.getInstance().get(1);
	      String currYearMonth = curryear + "-" + currmonth;
	      System.out.println("Default date is " + currYearMonth);
	      NumberFormat formatter = NumberFormat.getInstance();
	      String Yearmonth = year + "-" + month;
	      System.out.println(Yearmonth);
	      String currencytype = currency;
	      String sql = "SELECT  \r\n"
	      		+ "    /*+ parallel(a,10) parallel(b,10) */\r\n"
	      		+ "    TO_CHAR(a.event_date, 'DD') AS day, \r\n"
	      		+ "    ROUND(SUM(a.IN_DUR)) AS IN_DUR,\r\n"
	      		+ "    ROUND(SUM(a.SWT_DUR)) AS SWT_DUR, \r\n"
	      		+ "    ROUND(SUM(a.IN_DUR - a.SWT_DUR)) AS DUR_DIFF,\r\n"
	      		+ "    '0' AS PST2,\r\n"
	      		+ "    ROUND(SUM(a.in1) / 1000) AS IN_COUNT,\r\n"
	      		+ "    ROUND(SUM(a.msc) / 1000) AS SWT_COUNT, \r\n"
	      		+ "    ROUND(SUM(a.in1 - a.msc) / 1000) AS COUNT_DIFF,\r\n"
	      		+ "    ROUND((ROUND(SUM(a.in1 - a.msc) / 1000) / ROUND(SUM(b.in1 - b.msc) / 1000) * 100), 2) AS PST1 \r\n"
	      		+ "FROM \r\n"
	      		+ "    business_users.DSH_KPI_RECO a \r\n"
	      		+ "INNER JOIN \r\n"
	      		+ "    business_users.DSH_KPI_RECO b ON b.event_date = a.event_date - 1 \r\n"
	      		+ "                                       AND b.KPI_NAME = a.KPI_NAME \r\n"
	      		+ "WHERE \r\n"
	      		+ "    a.KPI_NAME = 'SMSC_VS_IN' \r\n"
	      		+ "    AND TO_CHAR(a.event_date, 'YYYY-Mon') = '<Year_Month>'\r\n"
	      		+ "GROUP BY \r\n"
	      		+ "    TO_CHAR(a.event_date, 'DD') \r\n"
	      		+ "ORDER BY \r\n"
	      		+ "    1;\r\n"
	      		+ "";
	      if (year.isEmpty() && month.isEmpty()) {
	        sql = sql.replaceAll("<Year_Month>", currYearMonth);
	        System.out.println("For default date::" + sql);
	      } else {
	        sql = sql.replaceAll("<Year_Month>", Yearmonth);
	        System.out.println("For given date::" + sql);
	      } 
	      JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource);
	      double rtd_IN_Countsum = 0.0D;
	      double msc_IN_CountSum = 0.0D;
	      double ion_Count_DiffSum = 0.0D;
	      double rtd_IN_DurSum = 0.0D;
	      double msc_IN_DurSum = 0.0D;
	      double ion_Dur_DiffSum = 0.0D;
	      String totalrtd_IN = null;
	      String totalMsc_IN = null;
	      String total_Count_DifF = null;
	      String totalIN_DurSum = null;
	      String totalMsc_DurSum = null;
	      String totalDurDiffSum = null;
	      double countVarienceSum = 0.0D;
	      double durationVarienceSum = 0.0D;
	      String count_In_sum = null;
	      String count_msc_sum = null;
	      String count_diff_sum = null;
	      String dur_in_sum = null;
	      String dur_msc_sum = null;
	      String dur_diff_sum = null;
	      String day = null;
	      reconciliationRevList = jdbcTemplate.query(sql, (RowMapper) new ReconciliationDayByRevSmscvsInDbMapper());
	      for (int i = 0; i < reconciliationRevList.size(); i++) {
	        day = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getDay();
	        String rtd_IN_Count = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getRtd_IN_Count();
	        String msc_IN_Count = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getMsc_IN_Count();
	        String ion_Count_Diff = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getIon_Count_Diff();
	        String rtd_IN_Dur = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getRtd_IN_Dur();
	        String msc_IN_Dur = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getMsc_IN_Dur();
	        String ion_Dur_Diff = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getIon_DUr_Diff();
	        String Count_Varience = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getCount_varience();
	        String Dur_Varience = ((ReconciliationRevListSmscvsIn)reconciliationRevList.get(i)).getDur_varience();
	        if (rtd_IN_Count == null)
	          rtd_IN_Count = Integer.toString(0); 
	        if (msc_IN_Count == null)
	          msc_IN_Count = Integer.toString(0); 
	        if (ion_Count_Diff == null)
	          ion_Count_Diff = Integer.toString(0); 
	        if (rtd_IN_Dur == null)
	          rtd_IN_Dur = Integer.toString(0); 
	        if (msc_IN_Dur == null)
	          msc_IN_Dur = Integer.toString(0); 
	        if (ion_Dur_Diff == null)
	          ion_Dur_Diff = Integer.toString(0); 
	        if (Count_Varience == null)
	          Count_Varience = Integer.toString(0); 
	        if (Dur_Varience == null)
	          Dur_Varience = Integer.toString(0); 
	        if (currencytype.equalsIgnoreCase("Million")) {
	          double Rtd_ION_COUNT = Double.parseDouble(rtd_IN_Count) / 1000000.0D;
	          rtd_IN_Count = String.valueOf(Rtd_ION_COUNT);
	          double MSC_ION_COUNT = Double.parseDouble(msc_IN_Count) / 1000000.0D;
	          msc_IN_Count = String.valueOf(MSC_ION_COUNT);
	          double ion_Diff = Double.parseDouble(ion_Count_Diff) / 1000000.0D;
	          ion_Count_Diff = String.valueOf(ion_Diff);
	          double rtd_ION_Dur = Double.parseDouble(rtd_IN_Dur) / 1000000.0D;
	          rtd_IN_Dur = String.valueOf(rtd_ION_Dur);
	          double msc_ION_Dur = Double.parseDouble(msc_IN_Dur) / 1000000.0D;
	          msc_IN_Dur = String.valueOf(msc_ION_Dur);
	          double ION_DIFF = Double.parseDouble(ion_Dur_Diff) / 1000000.0D;
	          ion_Dur_Diff = String.valueOf(ION_DIFF);
	          double COUNT_VARIENEC = Double.parseDouble(Count_Varience) / 1000000.0D;
	          Count_Varience = String.valueOf(COUNT_VARIENEC);
	          double DUR_VARIENCE = Double.parseDouble(Dur_Varience) / 1000000.0D;
	          Dur_Varience = String.valueOf(DUR_VARIENCE);
	        } else if (currencytype.equalsIgnoreCase("Billion")) {
	          double Rtd_ION_COUNT = Double.parseDouble(rtd_IN_Count) / 1.0E9D;
	          rtd_IN_Count = String.valueOf(Rtd_ION_COUNT);
	          double MSC_ION_COUNT = Double.parseDouble(msc_IN_Count) / 1.0E9D;
	          msc_IN_Count = String.valueOf(MSC_ION_COUNT);
	          double ion_Diff = Double.parseDouble(ion_Count_Diff) / 1.0E9D;
	          ion_Count_Diff = String.valueOf(ion_Diff);
	          double rtd_ION_Dur = Double.parseDouble(rtd_IN_Dur) / 1.0E9D;
	          rtd_IN_Dur = String.valueOf(rtd_ION_Dur);
	          double msc_ION_Dur = Double.parseDouble(msc_IN_Dur) / 1.0E9D;
	          msc_IN_Dur = String.valueOf(msc_ION_Dur);
	          double ION_DIFF = Double.parseDouble(ion_Dur_Diff) / 1.0E9D;
	          ion_Dur_Diff = String.valueOf(ION_DIFF);
	          double COUNT_VARIENEC = Double.parseDouble(Count_Varience) / 1.0E9D;
	          Count_Varience = String.valueOf(COUNT_VARIENEC);
	          double DUR_VARIENCE = Double.parseDouble(Dur_Varience) / 1000000.0D;
	          Dur_Varience = String.valueOf(DUR_VARIENCE);
	        } 
	        double Rtd_IN_COUNT = Double.parseDouble(rtd_IN_Count);
	        rtd_IN_Countsum += Rtd_IN_COUNT;
	        totalrtd_IN = formatter.format(rtd_IN_Countsum);
	        String format_rtd_in_count = formatter.format(Rtd_IN_COUNT);
	        double MSC_IN_COUNT = Double.parseDouble(msc_IN_Count);
	        msc_IN_CountSum += MSC_IN_COUNT;
	        totalMsc_IN = formatter.format(msc_IN_CountSum);
	        String formatMscINCount = formatter.format(MSC_IN_COUNT);
	        double ION_DIFF_COUNT = Double.parseDouble(ion_Count_Diff);
	        ion_Count_DiffSum += ION_DIFF_COUNT;
	        total_Count_DifF = formatter.format(ion_Count_DiffSum);
	        String format_ION_COUNT_DIFF = formatter.format(ION_DIFF_COUNT);
	        double RTD_ION_DUR = Double.parseDouble(rtd_IN_Dur);
	        rtd_IN_DurSum += RTD_ION_DUR;
	        totalIN_DurSum = formatter.format(rtd_IN_DurSum);
	        String Format_rtd_IN_dur = formatter.format(RTD_ION_DUR);
	        double MSC_IN_DUR = Double.parseDouble(msc_IN_Dur);
	        msc_IN_DurSum += MSC_IN_DUR;
	        totalMsc_DurSum = formatter.format(msc_IN_DurSum);
	        String format_MSC_IN_Dur = formatter.format(MSC_IN_DUR);
	        double ION_DUR_DIFF = Double.parseDouble(ion_Dur_Diff);
	        ion_Dur_DiffSum += ION_DUR_DIFF;
	        totalDurDiffSum = formatter.format(ion_Dur_DiffSum);
	        String format_ION_Dur_Diff = formatter.format(ION_DUR_DIFF);
	        countVarienceSum += Double.parseDouble(Count_Varience);
	        Count_Varience = Count_Varience + "%";
	        System.out.println(Count_Varience);
	        durationVarienceSum += Double.parseDouble(Dur_Varience);
	        Dur_Varience = Dur_Varience + "%";
	        System.out.println(Dur_Varience);
	        ReconciliationRevListSmscvsIn reconciliationRevlist = new ReconciliationRevListSmscvsIn(day, format_rtd_in_count, formatMscINCount, format_ION_COUNT_DIFF, Format_rtd_IN_dur, format_MSC_IN_Dur, format_ION_Dur_Diff, Count_Varience, Dur_Varience);
	        hlist.add(reconciliationRevlist);
	      } 
	      System.out.println("day is reached here " + day);
	      int Nday = Integer.parseInt(day);
	      double countpst = countVarienceSum / Nday;
	      String toatlcountpst = formatter.format(countpst);
	      toatlcountpst = toatlcountpst + "%";
	      double durpst = durationVarienceSum / Nday;
	      String toatldurtpst = formatter.format(durpst);
	      count_In_sum = totalrtd_IN.replaceAll(",", "");
	      count_msc_sum = totalMsc_IN.replaceAll(",", "");
	      count_diff_sum = total_Count_DifF.replaceAll(",", "");
	      dur_in_sum = totalIN_DurSum.replaceAll(",", "");
	      dur_msc_sum = totalMsc_DurSum.replaceAll(",", "");
	      dur_diff_sum = totalDurDiffSum.replaceAll(",", "");
	      toatldurtpst = toatldurtpst + "%";
	      reconciliationDayByRevModel.setMonth(month.toUpperCase());
	      reconciliationDayByRevModel.setYear(year);
	      reconciliationDayByRevModel.setRtd_In_Sum(totalrtd_IN);
	      reconciliationDayByRevModel.setMsc_In_sum(totalMsc_IN);
	      reconciliationDayByRevModel.setCount_diffsum(total_Count_DifF);
	      reconciliationDayByRevModel.setRtd_dur_sum(totalIN_DurSum);
	      reconciliationDayByRevModel.setMsc_dur_sum(totalMsc_DurSum);
	      reconciliationDayByRevModel.setDur_diffsum(totalDurDiffSum);
	      reconciliationDayByRevModel.setCountAvgVarience(toatlcountpst);
	      reconciliationDayByRevModel.setDurAvgVarience(toatldurtpst);
	      reconciliationDayByRevModel.setReconciliationRevList(hlist);
	      reconciliationDayByRevModel.setCount_In_sum(count_In_sum);
	      reconciliationDayByRevModel.setCount_msc_sum(count_msc_sum);
	      reconciliationDayByRevModel.setCount_diff_sum(count_diff_sum);
	      reconciliationDayByRevModel.setDur_in_sum(dur_in_sum);
	      reconciliationDayByRevModel.setDur_msc_sum(dur_msc_sum);
	      reconciliationDayByRevModel.setDur_diff_sum(dur_diff_sum);
	    } catch (Exception e) {
	      e.printStackTrace();
	    } 
	    return reconciliationDayByRevModel;
	  }
	  

	  public ReconciliationMonthlyRevSmscvsInModel getMonthlyReconciliationSmscVsIn(String year, String month) {
	    ReconciliationMonthlyRevSmscvsInModel response = new ReconciliationMonthlyRevSmscvsInModel();
	    ReconciliationMonthlyRevListSmscvsIn reconciliationMonthlyRevList = new ReconciliationMonthlyRevListSmscvsIn();
	    List<ReconciliationMonthlyRevListSmscvsIn> hlist = null;
	    List<ReconciliationMonthlyRevListSmscvsIn_dur> durlist = new ArrayList<>();
	    List<ReconciliationMonthlyRevSmscvsInList_count> countlist = new ArrayList<>();
	    try {
	      String yearMonth = year + "-" + month;
	      String sql = "SELECT  \r\n"
	      		+ "    /*+ parallel(a,10) parallel(b,10) */\r\n"
	      		+ "    TO_CHAR(a.event_date, 'DD') AS day, \r\n"
	      		+ "    ROUND(SUM(a.IN_DUR)) AS IN_DUR,\r\n"
	      		+ "    ROUND(SUM(a.SWT_DUR)) AS SWT_DUR, \r\n"
	      		+ "    ROUND(SUM(a.IN_DUR - a.SWT_DUR)) AS DUR_DIFF,\r\n"
	      		+ "    '0' AS PST2,\r\n"
	      		+ "    ROUND(SUM(a.in1) / 1000) AS IN_COUNT,\r\n"
	      		+ "    ROUND(SUM(a.msc) / 1000) AS SWT_COUNT, \r\n"
	      		+ "    ROUND(SUM(a.in1 - a.msc) / 1000) AS COUNT_DIFF,\r\n"
	      		+ "    ROUND((ROUND(SUM(a.in1 - a.msc) / 1000) / ROUND(SUM(b.in1 - b.msc) / 1000) * 100), 2) AS PST1 \r\n"
	      		+ "FROM \r\n"
	      		+ "    business_users.DSH_KPI_RECO a \r\n"
	      		+ "INNER JOIN \r\n"
	      		+ "    business_users.DSH_KPI_RECO b ON b.event_date = a.event_date - 1 \r\n"
	      		+ "                                       AND b.KPI_NAME = a.KPI_NAME \r\n"
	      		+ "WHERE \r\n"
	      		+ "    a.KPI_NAME = 'SMSC_VS_IN' \r\n"
	      		+ "    AND TO_CHAR(a.event_date, 'YYYY-Mon') = '<Year_Month>' -- Selecting February 2024 in 'YYYY-MON' format\r\n"
	      		+ "GROUP BY \r\n"
	      		+ "    TO_CHAR(a.event_date, 'DD') \r\n"
	      		+ "ORDER BY \r\n"
	      		+ "    1;";
	      sql = sql.replaceAll("<Year_Month>", yearMonth);
	      JdbcTemplate jdbcTemplate = new JdbcTemplate(this.dataSource);
	      List<List<ReconciliationMonthlyRevListSmscvsIn>> list2 = jdbcTemplate.query(sql, (RowMapper)new ReconciliationMonthlyRevDbSmscvsInMapper());
	      hlist = list2.get(0);
	      List<String> name = new ArrayList<>();
	      List<String> value = new ArrayList<>();
	      Map<String, String> map = new HashMap<>();
	      for (ReconciliationMonthlyRevListSmscvsIn stu : hlist)
	        map.put(stu.getLabel(), stu.getValue()); 
	      for (Map.Entry<String, String> entry : map.entrySet()) {
	        String fieldname = entry.getKey();
	        name.add(fieldname);
	        String fieldValue = entry.getValue();
	        value.add(fieldValue);
	      } 
	      String msc_dur = value.get(0);
	      String dur_diff = value.get(2);
	      String in_dur = value.get(3);
	      ReconciliationMonthlyRevListSmscvsIn_dur reconciliationMonthlyRevList_dur = new ReconciliationMonthlyRevListSmscvsIn_dur(in_dur, msc_dur, dur_diff);
	      durlist.add(reconciliationMonthlyRevList_dur);
	      String in_count = value.get(5);
	      String msc_count = value.get(4);
	      String count_diff = value.get(1);
	      ReconciliationMonthlyRevSmscvsInList_count reconciliationMonthlyRevList_count = new ReconciliationMonthlyRevSmscvsInList_count(in_count, msc_count, count_diff);
	      countlist.add(reconciliationMonthlyRevList_count);
	      response.setReconciliationMonthlyRevList_count(countlist);
	      response.setReconciliationMonthlyRevList_dur(durlist);
	      if (hlist != null && hlist.size() > 0)
	        reconciliationMonthlyRevList = hlist.get(0); 
	    } catch (Exception e) {
	      e.printStackTrace();
	    } 
	    return response;
	  }
	}

