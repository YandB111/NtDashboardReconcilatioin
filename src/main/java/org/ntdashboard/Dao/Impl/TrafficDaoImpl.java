package org.ntdashboard.Dao.Impl;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.sql.DataSource;

import org.ntdashboard.Dao.TrafficDao;
import org.ntdashboard.Dao.Mapper.TrafficCategRevDbMapper;
import org.ntdashboard.Dao.Mapper.TrafficDayByRevDbMapper;
import org.ntdashboard.Dao.Mapper.TrafficEventRevDbMapper;
import org.ntdashboard.Model.DayByEventField;
import org.ntdashboard.Model.DayByRevList;
import org.ntdashboard.Model.TracfficRevDayByDayModel;
import org.ntdashboard.Model.TrafficCategoryRevList;
import org.ntdashboard.Model.TrafficDayByRevList;
import org.ntdashboard.Model.TrafficEventByRevModel;
import org.ntdashboard.Model.TrafficEventRevList;
import org.ntdashboard.Model.TrafficRevCategoryModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository
@Transactional
public class TrafficDaoImpl implements TrafficDao {

	@Autowired
	DataSource dataSource;

	@Override
	public TrafficEventByRevModel getTrafficEventbyRev(String year, String month, String currency) {

		TrafficEventByRevModel resp = new TrafficEventByRevModel();
		List<TrafficEventRevList> hlist = null;
		List<TrafficEventRevList> trafficEventRevList = new ArrayList<TrafficEventRevList>();
		try {
			NumberFormat formatter = NumberFormat.getInstance();
			String sql = "\r\n"
					+ "SELECT /*+ PARALLEL(A,10) PARALLEL(B,10) */ DATEWISE,ONNET,OFFNET,NATIONAL,INTERNATIONAL,OTHERS,TOTAL_CDRS_COUNT,B.CDRS_COUNT,ROUND((A.TOTAL_CDRS_COUNT - B.CDRS_COUNT)/(B.CDRS_COUNT)*100,2) AS DIFF FROM (SELECT TO_CHAR(EVENT_DATE,'DD') AS DATEWISE,EVENT_DATE,SUM(PRE_ONNET_CDRS_COUNT + POST_ONNET_CDRS_COUNT) AS ONNET,SUM(PRE_OFFNET_CDRS_COUNT + POST_OFFNET_CDRS_COUNT) AS OFFNET,SUM(PRE_NLD_CDRS_COUNT + POST_NLD_CDRS_COUNT) AS NATIONAL,SUM(PRE_ILD_CDRS_COUNT + POST_ILD_CDRS_COUNT) AS INTERNATIONAL,ROUND(SUM(CDRS_COUNT) - SUM(PRE_ONNET_CDRS_COUNT + POST_ONNET_CDRS_COUNT + PRE_OFFNET_CDRS_COUNT + POST_OFFNET_CDRS_COUNT + PRE_NLD_CDRS_COUNT + POST_NLD_CDRS_COUNT + PRE_ILD_CDRS_COUNT + POST_ILD_CDRS_COUNT)) AS OTHERS,SUM(NVL(CDRS_COUNT,0)) AS TOTAL_CDRS_COUNT FROM business_users.DSH_REVENUE_EVENT_WISE WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON') AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY TO_CHAR(EVENT_DATE,'DD'),EVENT_DATE) A LEFT JOIN (SELECT EVENT_DATE,SUM(NVL(CDRS_COUNT,0)) AS CDRS_COUNT FROM business_users.DSH_REVENUE_EVENT_WISE WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON')-1 AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) B ON B.EVENT_DATE=A.EVENT_DATE -1 ORDER BY 1\r\n"
					+ "";
			String year_month = year + "-" + month;
			String currencyType = currency;
			//sql = LoaderProperties.trafficrev.getString("TRAFFIC_DAY_BY_DAY_EVENT_REV");
			sql = sql.replaceAll("Year_Month1", year_month);
			System.out.println("sql=" + sql);
			JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
			hlist = jdbcTemplate.query(sql, new TrafficEventRevDbMapper());
			resp.setList(hlist);
			double nationalSum = 0;
			double internationalSum = 0;
			double onnnetSum = 0;
			double offnetSum = 0;
			double otherSum = 0;
			double totalSum = 0;
			double averagepst = 0;
			String totalNationalSum = null;
			String totalInternationalSum = null;
			String totalOnnetSUm = null;
			String totalOffnetSUm = null;
			String totalOtherSum = null;
			String totalallSum = null;
			String Day = null;
			long nationalcount = 0;
			long internationalcount = 0;
			long onnetcount = 0;
			long offnetcount = 0;
			long othercount = 0;

			for (int i = 0; i < hlist.size(); i++) {

				Day = hlist.get(i).getDay();

				String onnetRev = hlist.get(i).getOnnet();
				onnetcount = onnetcount + Long.parseLong(onnetRev);
				String offnetRev = hlist.get(i).getOffnet();
				offnetcount = offnetcount + Long.parseLong(offnetRev);
				String otherRev = hlist.get(i).getOthers();
				String nationalRev = hlist.get(i).getNational();
				nationalcount = nationalcount + Long.parseLong(nationalRev);
				String internationalRev = hlist.get(i).getInternational();
				internationalcount = internationalcount + Long.parseLong(internationalRev);
				othercount = othercount + Long.parseLong(otherRev);
				String totalRev = hlist.get(i).getTotal();
				String pst = hlist.get(i).getPst();

				if (nationalRev == null) {
					nationalRev = Integer.toString(0);
				}

				if (internationalRev == null) {
					internationalRev = Integer.toString(0);
				}

				if (onnetRev == null) {
					onnetRev = Integer.toString(0);
				}
				if (offnetRev == null) {
					offnetRev = Integer.toString(0);
				}
				if (otherRev == null) {
					otherRev = Integer.toString(0);
				}
				if (totalRev == null) {
					totalRev = Integer.toString(0);
				}

				if (currencyType.equalsIgnoreCase("THOUSAND")) {
					double onnetRevn = (Double.parseDouble(onnetRev)) / 1000;
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = (Double.parseDouble(offnetRev)) / 1000;
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = (Double.parseDouble(nationalRev)) / 1000;
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = (Double.parseDouble(internationalRev)) / 1000;
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = (Double.parseDouble(otherRev)) / 1000;
					otherRev = String.valueOf(otherRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000;
					totalRev = String.valueOf(totalRevn);
				}
				if (currencyType.equalsIgnoreCase("MILLION")) {
					double onnetRevn = (Double.parseDouble(onnetRev)) / 1000000;
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = (Double.parseDouble(offnetRev)) / 1000000;
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = (Double.parseDouble(nationalRev)) / 1000;
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = (Double.parseDouble(internationalRev)) / 1000;
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = (Double.parseDouble(otherRev)) / 1000000;
					otherRev = String.valueOf(otherRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000;
					totalRev = String.valueOf(totalRevn);
				}
				if (currencyType.equalsIgnoreCase("BILLION")) {
					double onnetRevn = (Double.parseDouble(onnetRev)) / 1000000000;
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = (Double.parseDouble(offnetRev)) / 1000000000;
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = (Double.parseDouble(nationalRev)) / 1000;
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = (Double.parseDouble(internationalRev)) / 1000;
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = (Double.parseDouble(otherRev)) / 1000000000;
					otherRev = String.valueOf(otherRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000000;
					totalRev = String.valueOf(totalRevn);

				}
				double OnnetRev = Double.parseDouble(onnetRev);
				onnnetSum = onnnetSum + OnnetRev;
				String formatOnnetRev = formatter.format(onnnetSum);
				double OffnetRev = Double.parseDouble(offnetRev);
				offnetSum = offnetSum + OffnetRev;
				String formatOffetRev = formatter.format(offnetSum);
				double NationalRev = Double.parseDouble(nationalRev);
				nationalSum = nationalSum + NationalRev;
				String formatNationalrev = formatter.format(nationalSum);
				double InterNationalRev = Double.parseDouble(internationalRev);
				internationalSum = internationalSum + InterNationalRev;
				String formatInternationalrev = formatter.format(internationalSum);
				double OtherRev = Double.parseDouble(otherRev);
				otherSum = otherSum + OtherRev;
				String formatOtherRev = formatter.format(otherSum);
				double TotalRev = Double.parseDouble(totalRev);
				totalSum = totalSum + TotalRev;
				String formattotalRev = formatter.format(totalSum);
				averagepst = averagepst + Double.parseDouble(pst);
				pst = pst + "%";
				TrafficEventRevList revlist = new TrafficEventRevList(Day, formatOnnetRev, formatOffetRev,
						formatNationalrev, formatInternationalrev, formatOtherRev, formattotalRev, pst);
				trafficEventRevList.add(revlist);

			}
			resp.setMonth(month.toUpperCase());
			resp.setYear(year);
			totalNationalSum = formatter.format(nationalSum);
			resp.setNationalSum_pie(String.valueOf(nationalcount));
			resp.setNationalSum(totalNationalSum);

			totalInternationalSum = formatter.format(internationalSum);
			resp.setInternationalSUm_pie(String.valueOf(internationalcount));
			resp.setInternationalSum(totalInternationalSum);
			int Nday = Integer.parseInt(Day);
			double countpst = averagepst / Nday;
			String toatlcountpst = formatter.format(countpst);
			toatlcountpst = toatlcountpst + "%";
			totalOnnetSUm = formatter.format(onnnetSum);

			resp.setOnnetSum_pie(String.valueOf(onnetcount));
			resp.setOnnetSum(totalOnnetSUm);
			totalOffnetSUm = formatter.format(offnetSum);

			resp.setOfnetSum_pie(String.valueOf(offnetcount));
			resp.setOffnetSUm(totalOffnetSUm);
			totalOtherSum = formatter.format(otherSum);

			resp.setOthersSum_pie(String.valueOf(othercount));
			resp.setOthersSum(totalOtherSum);
			totalallSum = formatter.format(totalSum);
			resp.setTotalSUm(totalallSum);
			resp.setAveragepst(toatlcountpst);
			resp.setList(trafficEventRevList);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return resp;
	}

	@Override

	public TracfficRevDayByDayModel getTrafficDayByDayRev(String year, String month, String currency) {
		TracfficRevDayByDayModel response = new TracfficRevDayByDayModel();
		List<TrafficDayByRevList> list = new ArrayList<TrafficDayByRevList>();
		TrafficDayByRevList datalist = null;
		List<DayByEventField> eventlist = null;
		List<String> distinctfieldlist = new ArrayList<String>();

		try {
			// NumberFormat formatter = NumberFormat.getInstance();
			String Year_Month = year + "-" + month;
			String sql = "SELECT * FROM (SELECT /*+ PARALLEL(A,10) */ TO_CHAR(EVENT_DATE,'YYYY-MM-DD') AS DATEWISE,EVENT_TYPE_DESC,SUM(NVL(CDRS_COUNT,0)) AS CDRS_COUNT FROM business_users.DSH_REVENUE_EVENT_WISE A WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON')-1 AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY TO_CHAR(EVENT_DATE,'YYYY-MM-DD'),EVENT_TYPE_DESC) WHERE CDRS_COUNT!=0 ORDER BY 1,2";
			// SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			//sql = LoaderProperties.trafficrev.getString("TRAFFIC_FIRST_GRAPH");
			sql = sql.replaceAll("Year_Month1", Year_Month);
			sql = sql.replaceAll("--", "-");
			List<String> founddataval = new ArrayList<String>();
			// List<String> notfoundVal = new ArrayList<String>();
			Calendar mCalendar = Calendar.getInstance();
			String currmonth = mCalendar.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());
			int curryear = Calendar.getInstance().get(Calendar.YEAR);
			System.out.println("current year is ::" + curryear);
			System.out.println("current month is ::" + currmonth);
			// System.out.println("current Date is ::"+day);
			mCalendar.add(Calendar.DATE, -7);
			// Date dateBefore7Days = mCalendar.getTime();
			// String newdate = sdf.format(mCalendar.getTime());
			// System.out.println("new Date is " + newdate);
			// System.out.println(Year_Month);
			// System.out.println("sql" + sql);
			int a = 0;
			int j = 0;
			long totalDayCdrsCount = 0;
			double averagepst = 0;
			Set<String> set = new HashSet<>(distinctfieldlist);
			JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
			eventlist = jdbcTemplate.query(sql, new TrafficDayByRevDbMapper());
			for (int k = 0; k < eventlist.size(); k++) {
				set.add(eventlist.get(k).getEventtypedesc());
			}
			distinctfieldlist.clear();
			distinctfieldlist.addAll(set);
			HashMap<String, Long> map = new HashMap<String, Long>();
			Long[] pstlist = new Long[eventlist.size()];
			long monthlyTotalCdrsCount = 0;
			int day1val = 0;
			String firstday = eventlist.get(day1val).getDay();
			String lastDay = null;
			for (int i = 0; i < eventlist.size();) {
				String Day = null;
				datalist = new TrafficDayByRevList();
				List<DayByRevList> data = new ArrayList<DayByRevList>();
				DayByRevList event = null;
				int daylistsize = 0;

				while (Integer.parseInt(eventlist.get(a).getDay()) == j

						|| eventlist.get(a).getDay().equalsIgnoreCase(firstday)) {
					event = new DayByRevList();
					if (daylistsize < set.size()) {
						long cdrscount = Long.parseLong(eventlist.get(a).getCountCdrs());
						totalDayCdrsCount = totalDayCdrsCount + cdrscount;
						String eventtype = eventlist.get(a).getEventtypedesc();
						String DayByCdr = eventlist.get(a).getCountCdrs();
						event.setEventFiledName(eventtype);
						event.setCdrscount(DayByCdr);
						Day = eventlist.get(a).getDay();

						data.add(event);
					} else {

						break;
					}
					i++;
					a++;
					daylistsize++;
					if (a == eventlist.size()) {
						break;
					}
				}

				String newfield = null;
				if (data.size() != set.size()) {
					for (int l = 0; l < data.size(); l++) {
						if (data.get(l).getEventFiledName().equalsIgnoreCase("FAX")) {
							newfield = data.get(l).getEventFiledName();
							founddataval.add(data.get(l).getEventFiledName());
						}

					}
					if (newfield == null) {
						event = new DayByRevList();
						event.setEventFiledName("Fax");
						event.setCdrscount("0");
						data.add(event);
					}
				}

				j++;
				pstlist[j] = totalDayCdrsCount;
				String formatpst = null;
				if (j >= 2) {
					double currentrev = (double) pstlist[j];
					double prevrev = (double) pstlist[j - 1];
					double diff = currentrev - prevrev;
					double div = diff / currentrev;
					String formatval = String.format("%.3f", div);
					double pst = (Double.parseDouble(formatval)) * 100;
					formatpst = String.format("%.2f", pst);
				} else {
					formatpst = Integer.toString(0);
				}
				averagepst = averagepst + Double.parseDouble(formatpst);
				formatpst = formatpst + "%";
				datalist.setDay(Day);
				lastDay = Day;
				datalist.setDayByTotalRev(totalDayCdrsCount);
				datalist.setDayBypst(formatpst);
				monthlyTotalCdrsCount = monthlyTotalCdrsCount + totalDayCdrsCount;
				int eventlistSize = data.size();
				for (int k = 0; k < eventlistSize; k++) {

					if (map.containsKey(data.get(k).getEventFiledName())) {
						long prevcount = map.get(data.get(k).getEventFiledName());
						long currenctcount = prevcount + Long.parseLong(data.get(k).getCdrscount());
						map.put(data.get(k).getEventFiledName(), currenctcount);
					}

					else {
						map.put(data.get(k).getEventFiledName(), Long.parseLong(data.get(k).getCdrscount()));
					}
				}

				datalist.setEventListSize(eventlistSize);
				datalist.setDayList(data);
				if (j >= 2) {
					list.add(datalist);
					response.setTrafficDayByRevList(list);
				}

			}

			String totalpst = String.format("%.3f", averagepst);
			double monthlypst = (Double.parseDouble(totalpst)) / (Double.parseDouble(lastDay));
			String monthlyAvgPst = String.format("%.3f", monthlypst);
			monthlyAvgPst = monthlyAvgPst + "%";
			response.setAveragePst(monthlyAvgPst);
			response.setMonthlyCdrsCount(monthlyTotalCdrsCount);
			response.setCdrCountMonthlySumlist(map);
			response.setMonth(month.toUpperCase());
			response.setYear(year);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}

	@Override
	public TrafficRevCategoryModel getTrafficCategoryRev(String year, String month, String currency) {

		TrafficRevCategoryModel resp = new TrafficRevCategoryModel();
		List<TrafficCategoryRevList> list = null;
		List<TrafficCategoryRevList> trafficCategoryRevList = new ArrayList<TrafficCategoryRevList>();
		NumberFormat formatter = NumberFormat.getInstance();

		try {
			String Year_Month = year + "-" + month;
			String sql = "SELECT /*+ PARALLEL(A,10) PARALLEL(B,10) */ DATEWISE,SUBMITTED,DELIVERED,DELETED,EXPIRED,REJECTED,A.TOTAL_CDRS,B.TOTAL_CDRS AS BTOTAL_CDRS,ROUND((A.TOTAL_CDRS - B.TOTAL_CDRS)/(B.TOTAL_CDRS)*100,2) AS DIFF FROM (SELECT TO_CHAR(EVENT_DATE,'DD') AS DATEWISE,EVENT_DATE,SUM(CASE WHEN STATUS_DESC='SUBMITTED' THEN SMS_COUNT ELSE 0 END) AS SUBMITTED,SUM(CASE WHEN STATUS_DESC='DELIVERED' THEN SMS_COUNT ELSE 0 END) AS DELIVERED,SUM(CASE WHEN STATUS_DESC='DELETED' THEN SMS_COUNT ELSE 0 END) AS DELETED,SUM(CASE WHEN STATUS_DESC='EXPIRED' THEN SMS_COUNT ELSE 0 END) AS EXPIRED,SUM(CASE WHEN STATUS_DESC='REJECTED' THEN SMS_COUNT ELSE 0 END) AS REJECTED,SUM(NVL(SMS_COUNT,0)) AS TOTAL_CDRS FROM business_users.SMSC_TRAFFIC WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON') AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY TO_CHAR(EVENT_DATE,'DD'),EVENT_DATE) A LEFT JOIN (SELECT EVENT_DATE,SUM(NVL(SMS_COUNT,0)) AS TOTAL_CDRS FROM business_users.SMSC_TRAFFIC WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON')-1 AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) B ON B.EVENT_DATE=A.EVENT_DATE -1 ORDER BY 1";
			String currencyType = currency;
			//sql = LoaderProperties.trafficrev.getString("TRAFFIC_REV_CATEGORY_FORTHIRD_TABLE");
			sql = sql.replaceAll("Year_Month1", Year_Month);
			System.out.println("sql=" + sql);
			JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
			list = jdbcTemplate.query(sql, new TrafficCategRevDbMapper());
			resp.setTrafficCategoryRevList(list);
			double deletedsum = 0;
			double deliveredSum = 0;
			double expiredSum = 0;
			double rejectedSum = 0;
			double submittedSUm = 0;
			double totalSum = 0;
//				double pstsum=0;
			double averagepst = 0;
			String totalDeleted = null;
			String totaldelivered = null;
			String totalexpired = null;
			String Totalrejected = null;
			String totalsubmited = null;
			String totalall = null;
			String Day = null;
			long deletedcount = 0;
			long deliveredcount = 0;
			long expiredcount = 0;
			long rejectedcount = 0;
			long subbmitedcount = 0;
			for (int i = 0; i < list.size(); i++) {
				Day = list.get(i).getDay();
				String deleted = list.get(i).getDeleted();
				deletedcount = deletedcount + Long.parseLong(deleted);
				String delivered = list.get(i).getDelivered();
				deliveredcount = deliveredcount + Long.parseLong(delivered);
				String expired = list.get(i).getExpired();
				expiredcount = expiredcount + Long.parseLong(expired);
				String rejected = list.get(i).getRejected();
				rejectedcount = rejectedcount + Long.parseLong(rejected);
				String submitted = list.get(i).getSubmited();
				subbmitedcount = subbmitedcount + Long.parseLong(submitted);
				String total = list.get(i).getTotal();
				String pst = list.get(i).getPst();
				if (deleted == null) {
					deleted = Integer.toString(0);
				}
				if (delivered == null) {
					delivered = Integer.toString(0);
				}
				if (expired == null) {
					expired = Integer.toString(0);
				}
				if (rejected == null) {
					rejected = Integer.toString(0);
				}
				if (submitted == null) {
					submitted = Integer.toString(0);
				}
				if (total == null) {
					total = Integer.toString(0);
				}
				if (pst == null) {
					pst = Integer.toString(0);
				}
				if (currencyType.equalsIgnoreCase("THOUSAND")) {
					double DeletedRevn = (Double.parseDouble(deleted)) / 1000;
					deleted = String.valueOf(DeletedRevn);
					double DeliverdReven = (Double.parseDouble(delivered)) / 1000;
					delivered = String.valueOf(DeliverdReven);
					double ExpiredRevn = (Double.parseDouble(expired)) / 1000;
					expired = String.valueOf(ExpiredRevn);
					double RejectedRevn = (Double.parseDouble(rejected)) / 1000;
					rejected = String.valueOf(RejectedRevn);
					double SubmittedRevn = (Double.parseDouble(submitted)) / 1000;
					submitted = String.valueOf(SubmittedRevn);
					double TotalRevn = (Double.parseDouble(total)) / 1000;
					total = String.valueOf(TotalRevn);
				}
				if (currencyType.equalsIgnoreCase("MILLION")) {
					double DeletedRevn = (Double.parseDouble(deleted)) / 1000000;
					deleted = String.valueOf(DeletedRevn);
					double DeliverdReven = (Double.parseDouble(delivered)) / 1000000;
					delivered = String.valueOf(DeliverdReven);
					double ExpiredRevn = (Double.parseDouble(expired)) / 1000000;
					expired = String.valueOf(ExpiredRevn);
					double RejectedRevn = (Double.parseDouble(rejected)) / 1000000;
					rejected = String.valueOf(RejectedRevn);
					double SubmittedRevn = (Double.parseDouble(submitted)) / 1000000;
					submitted = String.valueOf(SubmittedRevn);
					double TotalRevn = (Double.parseDouble(total)) / 1000000;
					total = String.valueOf(TotalRevn);
				}
				if (currencyType.equalsIgnoreCase("BILLION")) {
					double DeletedRevn = (Double.parseDouble(deleted)) / 1000000000;
					deleted = String.valueOf(DeletedRevn);
					double DeliverdReven = (Double.parseDouble(delivered)) / 1000000000;
					delivered = String.valueOf(DeliverdReven);
					double ExpiredRevn = (Double.parseDouble(expired)) / 1000000000;
					expired = String.valueOf(ExpiredRevn);
					double RejectedRevn = (Double.parseDouble(rejected)) / 1000000000;
					rejected = String.valueOf(RejectedRevn);
					double SubmittedRevn = (Double.parseDouble(submitted)) / 1000000000;
					submitted = String.valueOf(SubmittedRevn);
					double TotalRevn = (Double.parseDouble(total)) / 1000000000;
					total = String.valueOf(TotalRevn);
				}

				double DeletedRev = Double.parseDouble(deleted);
				deletedsum = deletedsum + DeletedRev;
				String formatDelete = formatter.format(DeletedRev);
				double DeliveredRev = Double.parseDouble(delivered);
				deliveredSum = deliveredSum + DeliveredRev;
				String formatDelivered = formatter.format(DeliveredRev);
				double ExpiredRev = Double.parseDouble(expired);
				expiredSum = expiredSum + ExpiredRev;
				String formatExpired = formatter.format(ExpiredRev);
				double RejectedRvn = Double.parseDouble(rejected);
				rejectedSum = rejectedSum + RejectedRvn;
				String formatRejected = formatter.format(RejectedRvn);
				double SubbmitedRev = Double.parseDouble(submitted);
				submittedSUm = submittedSUm + SubbmitedRev;
				String formatSubmited = formatter.format(SubbmitedRev);
				double TotalRev = Double.parseDouble(total);
				totalSum = totalSum + TotalRev;
				String formatTotal = formatter.format(TotalRev);
				// double pstSum=pstSum+Double.parseDouble(pst);
				averagepst = averagepst + Double.parseDouble(pst);
				pst = pst + "%";
				TrafficCategoryRevList datalist = new TrafficCategoryRevList(Day, formatDelete, formatDelivered,
						formatExpired, formatRejected, formatSubmited, formatTotal, pst);

				trafficCategoryRevList.add(datalist);
			}

			System.out.println(deletedcount);
//				String deletedPie=null;
//				String deliveredPie=null;
//				String expiredPie=null;
//				String rejectedPie=null;
//				String subbmittedPie=null;
			int Nday = Integer.parseInt(Day);
			double countpst = averagepst / Nday;
			String toatlcountpst = formatter.format(countpst);
			toatlcountpst = toatlcountpst + "%";
			totalDeleted = formatter.format(deletedsum);
			// deletedPie=totalDeleted.replaceAll(",", "");
			totaldelivered = formatter.format(deliveredSum);
			// deliveredPie=totaldelivered.replaceAll(",", "");
			totalexpired = formatter.format(expiredSum);
			// expiredPie=totalexpired.replaceAll(",", "");
			Totalrejected = formatter.format(rejectedSum);
			// rejectedPie=Totalrejected.replaceAll(",", "");
			totalsubmited = formatter.format(submittedSUm);
			// subbmittedPie=totalsubmited.replaceAll(",", "");
			totalall = formatter.format(totalSum);
			resp.setDeletedSum(totalDeleted);
			resp.setDeliverdSum(totaldelivered);
			resp.setExpiredSum(totalexpired);
			resp.setRejectedSum(Totalrejected);
			resp.setSubmitedSum(totalsubmited);
			resp.setTotalrevSum(totalall);
			resp.setAvegpst(String.valueOf(averagepst));
			resp.setDeletedPie(String.valueOf(deletedcount));
			resp.setDeliverdPie(String.valueOf(deliveredcount));
			resp.setExpiredPie(String.valueOf(expiredcount));
			resp.setRejectedPie(String.valueOf(rejectedcount));
			resp.setSubmitedPie(String.valueOf(subbmitedcount));
			resp.setAvegpst(toatlcountpst);
			resp.setMonth(month.toUpperCase());
			resp.setYear(year);
			resp.setTrafficCategoryRevList(trafficCategoryRevList);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return resp;
	}

}
