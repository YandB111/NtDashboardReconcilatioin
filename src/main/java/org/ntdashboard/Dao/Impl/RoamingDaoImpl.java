package org.ntdashboard.Dao.Impl;

import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import javax.sql.DataSource;

import org.ntdashboard.Dao.RoamingDao;
import org.ntdashboard.Dao.Mapper.RoamingDayByRevDbMapper;
import org.ntdashboard.Dao.Mapper.RoamingEventByDbMaper;
import org.ntdashboard.Dao.Mapper.RoamingOutDayByDbMapper;
import org.ntdashboard.Dao.Mapper.RoamingOutEventRevDbMapper;
import org.ntdashboard.Model.RoamingDayByRevList;
import org.ntdashboard.Model.RoamingDayByRevModel;
import org.ntdashboard.Model.RoamingEventByRevList;
import org.ntdashboard.Model.RoamingEventByRevModel;
import org.ntdashboard.Model.RoamingOutDayByRevList;
import org.ntdashboard.Model.RoamingOutDayByRevmodel;
import org.ntdashboard.Model.RoamingOutEventByRevList;
import org.ntdashboard.Model.RomaingOutEventRevModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class RoamingDaoImpl implements RoamingDao {

	@Autowired
	DataSource dataSource;

	@Override
	public RoamingDayByRevModel GetRoamingDayByRev(String year, String month, String currency) {

		RoamingDayByRevModel resp = new RoamingDayByRevModel();
		List<RoamingDayByRevList> list = null;
		List<RoamingDayByRevList> otherlist = new ArrayList<RoamingDayByRevList>();
		NumberFormat formatter = NumberFormat.getInstance();
		try {
			String sql = "SELECT A.EVENT_DATE,GPRS,SMS,VOICE,ATOTAL_REV,COALESCE(BTOTAL_REV,0) AS BTOTAL_REV,COALESCE(ROUND((ATOTAL_REV - BTOTAL_REV)/(BTOTAL_REV)*100,2),0) AS DIFF FROM (SELECT EVENT_DATE,SUM(CASE WHEN EVENT_TYPE_DESC='GPRS' THEN CHARGE ELSE 0 END) AS GPRS,SUM(CASE WHEN EVENT_TYPE_DESC='SMS' THEN CHARGE ELSE 0 END) AS SMS,SUM(CASE WHEN EVENT_TYPE_DESC='VOICE' THEN CHARGE ELSE 0 END) AS VOICE,SUM(CHARGE) AS ATOTAL_REV FROM business_users.DSH_TAPIN_ANALYSIS WHERE  EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON') AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) A LEFT JOIN (SELECT EVENT_DATE,SUM(NVL(CHARGE,0)) AS BTOTAL_REV FROM business_users.DSH_TAPIN_ANALYSIS WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON')-1 AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) B ON B.EVENT_DATE=A.EVENT_DATE -1 ORDER BY 1";
			String year_month = year + "-" + month;
			// sql =
			// LoaderProperties.roamingrev.getString("DAY_BY_DAY_ROAMING_REV_FIRST_TABLE");
			sql = sql.replaceAll("Year_Month1", year_month);
			System.out.println("running sql qury::" + sql);
			JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
			list = jdbcTemplate.query(sql, new RoamingDayByRevDbMapper());

			String currencyType = currency;
			String totalVoiceRev = null;
			String totalSMsRev = null;
			String totalGprsrev = null;
			String totalAllrev = null;
			double voiceSum = 0;
			double SmsSum = 0;
			double GpsrsSum = 0;
			double TotalSum = 0;
			double averagepst = 0;

			long voicecount = 0;
			long smscount = 0;
			long gprscount = 0;
			String Day = null;

			for (int i = 0; i < list.size(); i++) {
				Day = list.get(i).getDay();
				String voiceRev = list.get(i).getVoice();
				voicecount = voicecount + Long.parseLong(voiceRev);
				String smsRev = list.get(i).getSms();
				smscount = smscount + Long.parseLong(smsRev);
				String gprsRev = list.get(i).getGprs();
				gprscount = gprscount + Long.parseLong(gprsRev);
				String totalRev = list.get(i).getTotalrev();
				String pst = list.get(i).getPst();
				if (voiceRev == null) {
					voiceRev = Integer.toString(0);
				}
				if (smsRev == null) {
					smsRev = Integer.toString(0);
				}
				if (gprsRev == null) {
					gprsRev = Integer.toString(0);
				}

				if (totalRev == null) {
					totalRev = Integer.toString(0);
				}

				if (currencyType.equalsIgnoreCase("Thousand")) {
					double voiceRevn = (Double.parseDouble(voiceRev)) / 1000;
					voiceRev = String.valueOf(voiceRevn);
					double smsRevn = (Double.parseDouble(smsRev)) / 1000;
					smsRev = String.valueOf(smsRevn);
					double gprsRevn = (Double.parseDouble(gprsRev)) / 1000;
					gprsRev = String.valueOf(gprsRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000;
					totalRev = String.valueOf(totalRevn);

				} else if (currencyType.equalsIgnoreCase("Million")) {
					double voiceRevn = (Double.parseDouble(voiceRev)) / 1000000;
					voiceRev = String.valueOf(voiceRevn);
					double smsRevn = (Double.parseDouble(smsRev)) / 1000000;
					smsRev = String.valueOf(smsRevn);
					double gprsRevn = (Double.parseDouble(gprsRev)) / 1000000;
					gprsRev = String.valueOf(gprsRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000;
					totalRev = String.valueOf(totalRevn);

				} else if (currencyType.equalsIgnoreCase("Billion")) {
					double voiceRevn = (Double.parseDouble(voiceRev)) / 1000000000;
					voiceRev = String.valueOf(voiceRevn);
					double smsRevn = (Double.parseDouble(smsRev)) / 1000000000;
					smsRev = String.valueOf(smsRevn);
					double gprsRevn = (Double.parseDouble(gprsRev)) / 1000000000;
					gprsRev = String.valueOf(gprsRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000000;
					totalRev = String.valueOf(totalRevn);

				}

				else {
					double voiceRevn = Double.parseDouble(voiceRev);
					voiceRev = String.valueOf(voiceRevn);
					double smsRevn = Double.parseDouble(smsRev);
					smsRev = String.valueOf(smsRevn);
					double gprsRevn = Double.parseDouble(gprsRev);
					gprsRev = String.valueOf(gprsRevn);
					double totalRevn = Double.parseDouble(totalRev);
					totalRev = String.valueOf(totalRevn);

				}

				double VoiceRev = Double.parseDouble(voiceRev);
				voiceSum = voiceSum + VoiceRev;
				String formatVoiceRev = formatter.format(VoiceRev);

				double SmsRev = Double.parseDouble(smsRev);
				SmsSum = SmsSum + SmsRev;
				String formatsmseRev = formatter.format(SmsRev);

				double GprsRev = Double.parseDouble(gprsRev);
				GpsrsSum = GpsrsSum + GprsRev;
				String formatgprseRev = formatter.format(GprsRev);

				double TotaRev = Double.parseDouble(totalRev);
				TotalSum = TotalSum + TotaRev;
				String formattotalRev = formatter.format(TotaRev);
				averagepst = averagepst + Double.parseDouble(pst);

				pst = pst + "%";

				RoamingDayByRevList newobj = new RoamingDayByRevList(Day, formatVoiceRev, formatsmseRev, formatgprseRev,
						formattotalRev, pst);
				otherlist.add(newobj);
			}

			int Nday = Integer.parseInt(Day);
			double countpst = averagepst / Nday;
			String toatlcountpst = formatter.format(countpst);
			toatlcountpst = toatlcountpst + "%";
			totalVoiceRev = formatter.format(voiceSum);
			totalSMsRev = formatter.format(SmsSum);
			totalGprsrev = formatter.format(GpsrsSum);
			totalAllrev = formatter.format(TotalSum);
			String totalpst = String.format("%.3f", averagepst);
			totalpst = totalpst + "%";
			resp.setYear(year);
			resp.setMonth(month.toUpperCase());
			resp.setVoiceMonthlySum(totalVoiceRev);
			resp.setSmsMonthlySum(totalSMsRev);
			resp.setGprsMonthlySUm(totalGprsrev);
			resp.setToatlMonthlySum(totalAllrev);
			resp.setVoiceRev_pie(String.valueOf(voicecount));
			resp.setSmsRev_pie(String.valueOf(smscount));
			resp.setGprsRev_Pie(String.valueOf(gprscount));
			resp.setAveragepst(String.valueOf(totalpst));
			resp.setList(otherlist);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return resp;
	}

	@Override
	public RoamingEventByRevModel getEventRevOfRoaming(String year, String month, String currency) {

		RoamingEventByRevModel response = new RoamingEventByRevModel();
		List<RoamingEventByRevList> list = null;
		List<RoamingEventByRevList> data = new ArrayList<RoamingEventByRevList>();
		NumberFormat formatter = NumberFormat.getInstance();

		try {
			String year_month = year + "-" + month;
			String sql = "SELECT  A.EVENT_DATE,   COALESCE(ONNET, 0) AS ONNET,  COALESCE(OFFNET, 0) AS OFFNET, COALESCE(NATIONAL, 0) AS NATIONAL , COALESCE(INTERNATIONAL, 0) AS INTERNATIONAL,  COALESCE(OTHERS, 0) AS OTHERS,COALESCE(ATOTAL_REV, 0) AS ATOTAL_REV,   COALESCE(BTOTAL_REV, 0) AS BTOTAL_REV, COALESCE(ROUND((COALESCE(ATOTAL_REV, 0) - COALESCE(BTOTAL_REV, 0)) / NULLIF(COALESCE(BTOTAL_REV, 0), 0) * 100, 2), 0) AS DIFF FROM (SELECT EVENT_DATE,SUM(ONNET) AS ONNET,SUM(OFFNET) AS OFFNET,SUM(NATIONAL) AS NATIONAL,SUM(INTERNATIONAL) AS INTERNATIONAL,SUM(OTHERS) AS OTHERS,SUM(CHARGE) AS ATOTAL_REV FROM business_users.DSH_TAPIN_ANALYSIS WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON') AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) A LEFT JOIN (SELECT EVENT_DATE,SUM(NVL(CHARGE,0)) AS BTOTAL_REV FROM business_users.DSH_TAPIN_ANALYSIS WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON')-1 AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) B ON B.EVENT_DATE=A.EVENT_DATE -1 ORDER BY 1";
			String currencyType = currency;
			// sql =
			// LoaderProperties.roamingrev.getString("ROAMING_EVENT_BY_REV_FOR_2ND_TABLE");
			sql = sql.replaceAll("Year_Month1", year_month);
			System.out.println("Running query::" + sql);
			JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
			list = jdbcTemplate.query(sql, new RoamingEventByDbMaper());
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

			for (int i = 0; i < list.size(); i++) {
				Day = list.get(i).getDay();
				String onnetRev = list.get(i).getOnnet();
				onnetcount = onnetcount + Long.parseLong(onnetRev);
				String offnetRev = list.get(i).getOffnet();
				offnetcount = offnetcount + Long.parseLong(offnetRev);
				String nationalRev = list.get(i).getNational();
				nationalcount = nationalcount + Long.parseLong(nationalRev);
				String internationalRev = list.get(i).getInternational();
				internationalcount = internationalcount + Long.parseLong(internationalRev);
				String otherRev = list.get(i).getOthers();
				othercount = othercount + Long.parseLong(otherRev);
				String totalRev = list.get(i).getTotal();
				String pst = list.get(i).getPst();

				if (onnetRev == null) {
					onnetRev = Integer.toString(0);
				}
				if (offnetRev == null) {
					offnetRev = Integer.toString(0);
				}
				if (nationalRev == null) {
					nationalRev = Integer.toString(0);
				}

				if (internationalRev == null) {
					internationalRev = Integer.toString(0);
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
				} else if (currencyType.equalsIgnoreCase("MILLION")) {
					double onnetRevn = (Double.parseDouble(onnetRev)) / 1000000;
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = (Double.parseDouble(offnetRev)) / 1000000;
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = (Double.parseDouble(nationalRev)) / 1000000;
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = (Double.parseDouble(internationalRev)) / 1000000;
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = (Double.parseDouble(otherRev)) / 1000000;
					otherRev = String.valueOf(otherRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000;
					totalRev = String.valueOf(totalRevn);
				} else if (currencyType.equalsIgnoreCase("BILLION")) {
					double onnetRevn = (Double.parseDouble(onnetRev)) / 1000000000;
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = (Double.parseDouble(offnetRev)) / 1000000000;
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = (Double.parseDouble(nationalRev)) / 1000000000;
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = (Double.parseDouble(internationalRev)) / 1000000000;
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = (Double.parseDouble(otherRev)) / 1000000000;
					otherRev = String.valueOf(otherRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000000;
					totalRev = String.valueOf(totalRevn);

				} else {
					double onnetRevn = Double.parseDouble(onnetRev);
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = Double.parseDouble(offnetRev);
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = Double.parseDouble(nationalRev);
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = Double.parseDouble(internationalRev);
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = Double.parseDouble(otherRev);
					otherRev = String.valueOf(otherRevn);
					double totalRevn = Double.parseDouble(totalRev);
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
				RoamingEventByRevList roamingEventByRevList = new RoamingEventByRevList(Day, formatOnnetRev,
						formatOffetRev, formatNationalrev, formatInternationalrev, formatOtherRev, formattotalRev, pst);
				data.add(roamingEventByRevList);

			}

			int Nday = Integer.parseInt(Day);
			double countpst = averagepst / Nday;
			String toatlcountpst = formatter.format(countpst);
			toatlcountpst = toatlcountpst + "%";
			totalOnnetSUm = formatter.format(onnnetSum);
			totalOffnetSUm = formatter.format(offnetSum);
			totalNationalSum = formatter.format(nationalSum);
			totalInternationalSum = formatter.format(internationalSum);
			totalOtherSum = formatter.format(otherSum);
			totalallSum = formatter.format(totalSum);
			response.setYear(year);
			response.setMonth(month.toUpperCase());
			response.setOnnetSum(totalOnnetSUm);
			response.setOffnetsum(totalOffnetSUm);
			response.setNationalSUm(totalNationalSum);
			response.setInternationalSum(totalInternationalSum);
			response.setOthersSUm(totalOtherSum);
			response.setTotalSum(totalallSum);
			response.setAveragepst(toatlcountpst);
			response.setOnnetSum_pie(String.valueOf(onnetcount));
			response.setOffnetsum_pie(String.valueOf(offnetcount));
			response.setNationalSum_pie(String.valueOf(nationalcount));
			response.setInternationalSum_pie(String.valueOf(internationalcount));
			response.setOthersSum_pie(String.valueOf(othercount));
			response.setRoamingEventByRevList(data);

		}

		catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	@Override
	public RoamingOutDayByRevmodel getRoamingDailyRev(String year, String month, String currency) {

		RoamingOutDayByRevmodel resp = new RoamingOutDayByRevmodel();
		List<RoamingOutDayByRevList> list = null;
		List<RoamingOutDayByRevList> datalist = new ArrayList<RoamingOutDayByRevList>();
		NumberFormat formatter = NumberFormat.getInstance();

		try {

			String sql = "SELECT A.EVENT_DATE,GPRS,SMS,VOICE,ATOTAL_REV,COALESCE(BTOTAL_REV,0),COALESCE(ROUND(((ATOTAL_REV - BTOTAL_REV)/(CASE WHEN BTOTAL_REV=0 THEN 1 ELSE BTOTAL_REV END)*100),2),0) AS DIFF FROM (SELECT EVENT_DATE,SUM(CASE WHEN EVENT_TYPE_DESC='GPRS' THEN CHARGE ELSE 0 END) AS GPRS,SUM(CASE WHEN EVENT_TYPE_DESC='SMS' THEN CHARGE ELSE 0 END) AS SMS,SUM(CASE WHEN EVENT_TYPE_DESC='VOICE' THEN CHARGE ELSE 0 END) AS VOICE,SUM(CHARGE) AS ATOTAL_REV FROM business_users.DSH_TAPOUT_ANALYSIS WHERE  EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON') AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) A LEFT JOIN (SELECT EVENT_DATE,SUM(NVL(CHARGE,0)) AS BTOTAL_REV FROM business_users.DSH_TAPOUT_ANALYSIS WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON')-1 AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) B ON B.EVENT_DATE=A.EVENT_DATE -1 ORDER BY 1";
			String Year_Month = year + "-" + month;
			// sql =
			// LoaderProperties.roamingrev.getString("ROAMING_TAP_OUT_DAY_BY_DAY_REV");
			sql = sql.replaceAll("Year_Month1", Year_Month);
			System.out.println("running sql qury::" + sql);
			JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
			list = jdbcTemplate.query(sql, new RoamingOutDayByDbMapper());
			String currencyType = currency;
			String totalVoiceRev = null;
			String totalSMsRev = null;
			String totalGprsrev = null;
			String totalAllrev = null;
			double voiceSum = 0;
			double SmsSum = 0;
			double GpsrsSum = 0;
			double TotalSum = 0;
			double averagepst = 0;

			long voicecount = 0;
			long smscount = 0;
			long gprscount = 0;
			String Day = null;
			for (int i = 0; i < list.size(); i++) {
				Day = list.get(i).getDay();
				String voiceRev = list.get(i).getVoice();
				voicecount = voicecount + Long.parseLong(voiceRev);
				String smsRev = list.get(i).getSms();
				smscount = smscount + Long.parseLong(smsRev);
				String gprsRev = list.get(i).getGprs();
				gprscount = gprscount + Long.parseLong(gprsRev);
				String totalRev = list.get(i).getTotalrev();
				String pst = list.get(i).getPst();
				if (voiceRev == null) {
					voiceRev = Integer.toString(0);
				}
				if (smsRev == null) {
					smsRev = Integer.toString(0);
				}
				if (gprsRev == null) {
					gprsRev = Integer.toString(0);
				}

				if (totalRev == null) {
					totalRev = Integer.toString(0);
				}

				if (pst == null) {
					pst = Integer.toString(0);
				}
				if (currencyType.equalsIgnoreCase("Thousand")) {
					double voiceRevn = (Double.parseDouble(voiceRev)) / 1000;
					voiceRev = String.valueOf(voiceRevn);
					double smsRevn = (Double.parseDouble(smsRev)) / 1000;
					smsRev = String.valueOf(smsRevn);
					double gprsRevn = (Double.parseDouble(gprsRev)) / 1000;
					gprsRev = String.valueOf(gprsRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000;
					totalRev = String.valueOf(totalRevn);

				} else if (currencyType.equalsIgnoreCase("Million")) {
					double voiceRevn = (Double.parseDouble(voiceRev)) / 1000000;
					voiceRev = String.valueOf(voiceRevn);
					double smsRevn = (Double.parseDouble(smsRev)) / 1000000;
					smsRev = String.valueOf(smsRevn);
					double gprsRevn = (Double.parseDouble(gprsRev)) / 1000000;
					gprsRev = String.valueOf(gprsRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000;
					totalRev = String.valueOf(totalRevn);

				} else if (currencyType.equalsIgnoreCase("Billion")) {
					double voiceRevn = (Double.parseDouble(voiceRev)) / 1000000000;
					voiceRev = String.valueOf(voiceRevn);
					double smsRevn = (Double.parseDouble(smsRev)) / 1000000000;
					smsRev = String.valueOf(smsRevn);
					double gprsRevn = (Double.parseDouble(gprsRev)) / 1000000000;
					gprsRev = String.valueOf(gprsRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000000;
					totalRev = String.valueOf(totalRevn);

				}

				else {
					double voiceRevn = Double.parseDouble(voiceRev);
					voiceRev = String.valueOf(voiceRevn);
					double smsRevn = Double.parseDouble(smsRev);
					smsRev = String.valueOf(smsRevn);
					double gprsRevn = Double.parseDouble(gprsRev);
					gprsRev = String.valueOf(gprsRevn);
					double totalRevn = Double.parseDouble(totalRev);
					totalRev = String.valueOf(totalRevn);

				}

				double VoiceRev = Double.parseDouble(voiceRev);
				voiceSum = voiceSum + VoiceRev;
				String formatVoiceRev = formatter.format(VoiceRev);

				double SmsRev = Double.parseDouble(smsRev);
				SmsSum = SmsSum + SmsRev;
				String formatsmseRev = formatter.format(SmsRev);

				double GprsRev = Double.parseDouble(gprsRev);
				GpsrsSum = GpsrsSum + GprsRev;
				String formatgprseRev = formatter.format(GprsRev);

				double TotaRev = Double.parseDouble(totalRev);
				TotalSum = TotalSum + TotaRev;
				String formattotalRev = formatter.format(TotaRev);

				System.out.println("pst " + pst);
				averagepst = averagepst + Double.parseDouble(pst);
				System.out.println("Average pst" + averagepst);
				pst = pst + "%";

				RoamingOutDayByRevList newobj = new RoamingOutDayByRevList(Day, formatVoiceRev, formatsmseRev,
						formatgprseRev, formattotalRev, pst);

				datalist.add(newobj);
			}

			int Nday = Integer.parseInt(Day);
			double countpst = averagepst / Nday;
			String toatlcountpst = formatter.format(countpst);
			toatlcountpst = toatlcountpst + "%";
			totalVoiceRev = formatter.format(voiceSum);
			totalSMsRev = formatter.format(SmsSum);
			totalGprsrev = formatter.format(GpsrsSum);
			totalAllrev = formatter.format(TotalSum);
			String totalpst = String.format("%.3f", averagepst);
			totalpst = totalpst + "%";
			resp.setYear(year);
			resp.setMonth(month.toUpperCase());
			resp.setVoiceMonthlySum(totalVoiceRev);
			resp.setSmsMonthlySum(totalSMsRev);
			resp.setGprsMonthlySUm(totalGprsrev);
			resp.setToatlMonthlySum(totalAllrev);
			resp.setVoiceRev_pie(String.valueOf(voicecount));
			resp.setSmsRev_pie(String.valueOf(smscount));
			resp.setGprsRev_Pie(String.valueOf(gprscount));
			resp.setAveragepst(String.valueOf(totalpst));
			resp.setList(datalist);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return resp;
	}

	@Override
	public RomaingOutEventRevModel getRoamingTapOutRev(String year, String month, String currency) {
		RomaingOutEventRevModel response = new RomaingOutEventRevModel();
		List<RoamingOutEventByRevList> list = null;

		List<RoamingOutEventByRevList> adData = new ArrayList<RoamingOutEventByRevList>();

		NumberFormat formatter = NumberFormat.getInstance();

		try {

			String sql = "SELECT A.EVENT_DATE,ONNET,OFFNET,NATIONAL,INTERNATIONAL,OTHERS,ATOTAL_REV,COALESCE(BTOTAL_REV,0),COALESCE(ROUND(((ATOTAL_REV - BTOTAL_REV)/(CASE WHEN BTOTAL_REV=0 THEN 1 ELSE BTOTAL_REV END)*100),2),0) AS DIFF FROM (SELECT EVENT_DATE,SUM(ONNET) AS ONNET,SUM(OFFNET) AS OFFNET,SUM(NATIONAL) AS NATIONAL,SUM(INTERNATIONAL) AS INTERNATIONAL,SUM(OTHERS) AS OTHERS,SUM(CHARGE) AS ATOTAL_REV FROM business_users.DSH_TAPOUT_ANALYSIS WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON') AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) A LEFT JOIN (SELECT EVENT_DATE,SUM(NVL(CHARGE,0)) AS BTOTAL_REV FROM business_users.DSH_TAPOUT_ANALYSIS WHERE EVENT_DATE >=TO_DATE('Year_Month1','YYYY-MON')-1 AND EVENT_DATE <=LAST_DAY(TO_DATE('Year_Month1','YYYY-MON')) GROUP BY EVENT_DATE) B ON B.EVENT_DATE=A.EVENT_DATE -1 ORDER BY 1";
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

			Calendar mCalendar = Calendar.getInstance();
			String currmonth = mCalendar.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.getDefault());
			int curryear = Calendar.getInstance().get(Calendar.YEAR);
//			int day=Calendar.getInstance().get(Calendar.DATE-7);
			System.out.println("current year is ::" + curryear);
			System.out.println("current month is ::" + currmonth);
			// System.out.println("current Date is ::"+day);
			mCalendar.add(Calendar.DATE, -7);
			// Date dateBefore7Days = mCalendar.getTime();
			String newdate = sdf.format(mCalendar.getTime());
			System.out.println("new Date is " + newdate);
			String currencyType = currency;
			String year_month = year + "-" + month;
			// sql =
			// LoaderProperties.roamingrev.getString("ROAMING_TAP_OUT_EVENT_BY_REV_FOR_LAST_TABLE");
			sql = sql.replaceAll("Year_Month1", year_month);
			System.out.println("Running query::" + sql);
			JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

			list = jdbcTemplate.query(sql, new RoamingOutEventRevDbMapper());
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
			for (int i = 0; i < list.size(); i++) {
				Day = list.get(i).getDay();
				String onnetRev = list.get(i).getOnnet();
				onnetcount = onnetcount + Long.parseLong(onnetRev);
				String offnetRev = list.get(i).getOffnet();
				offnetcount = offnetcount + Long.parseLong(offnetRev);
				String nationalRev = list.get(i).getNational();
				nationalcount = nationalcount + Long.parseLong(nationalRev);
				String internationalRev = list.get(i).getInternational();
				internationalcount = internationalcount + Long.parseLong(internationalRev);
				String otherRev = list.get(i).getOthers();
				othercount = othercount + Long.parseLong(otherRev);
				String totalRev = list.get(i).getTotal();
				String pst = list.get(i).getPst();

				if (onnetRev == null) {
					onnetRev = Integer.toString(0);
				}
				if (offnetRev == null) {
					offnetRev = Integer.toString(0);
				}
				if (nationalRev == null) {
					nationalRev = Integer.toString(0);
				}

				if (internationalRev == null) {
					internationalRev = Integer.toString(0);
				}

				if (otherRev == null) {
					otherRev = Integer.toString(0);
				}
				if (totalRev == null) {
					totalRev = Integer.toString(0);
				}

				if (year.isEmpty() && month.isEmpty()) {

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
				} else if (currencyType.equalsIgnoreCase("MILLION")) {
					double onnetRevn = (Double.parseDouble(onnetRev)) / 1000000;
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = (Double.parseDouble(offnetRev)) / 1000000;
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = (Double.parseDouble(nationalRev)) / 1000000;
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = (Double.parseDouble(internationalRev)) / 1000000;
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = (Double.parseDouble(otherRev)) / 1000000;
					otherRev = String.valueOf(otherRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000;
					totalRev = String.valueOf(totalRevn);
				} else if (currencyType.equalsIgnoreCase("BILLION")) {
					double onnetRevn = (Double.parseDouble(onnetRev)) / 1000000000;
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = (Double.parseDouble(offnetRev)) / 1000000000;
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = (Double.parseDouble(nationalRev)) / 1000000000;
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = (Double.parseDouble(internationalRev)) / 1000000000;
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = (Double.parseDouble(otherRev)) / 1000000000;
					otherRev = String.valueOf(otherRevn);
					double totalRevn = (Double.parseDouble(totalRev)) / 1000000000;
					totalRev = String.valueOf(totalRevn);

				} else {
					double onnetRevn = Double.parseDouble(onnetRev);
					onnetRev = String.valueOf(onnetRevn);
					double offnetRevn = Double.parseDouble(offnetRev);
					offnetRev = String.valueOf(offnetRevn);
					double nationalRevn = Double.parseDouble(nationalRev);
					nationalRev = String.valueOf(nationalRevn);
					double internationalRevn = Double.parseDouble(internationalRev);
					internationalRev = String.valueOf(internationalRevn);
					double otherRevn = Double.parseDouble(otherRev);
					otherRev = String.valueOf(otherRevn);
					double totalRevn = Double.parseDouble(totalRev);
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
				RoamingOutEventByRevList roamingOutEventByRevList = new RoamingOutEventByRevList(Day, formatOnnetRev,
						formatOffetRev, formatNationalrev, formatInternationalrev, formatOtherRev, formattotalRev, pst);
				adData.add(roamingOutEventByRevList);

			}

			int Nday = Integer.parseInt(Day);
			double countpst = averagepst / Nday;
			String toatlcountpst = formatter.format(countpst);
			toatlcountpst = toatlcountpst + "%";
			totalOnnetSUm = formatter.format(onnnetSum);
			totalOffnetSUm = formatter.format(offnetSum);
			totalNationalSum = formatter.format(nationalSum);
			totalInternationalSum = formatter.format(internationalSum);
			totalOtherSum = formatter.format(otherSum);
			totalallSum = formatter.format(totalSum);
			response.setYear(year);
			response.setMonth(month.toUpperCase());
			response.setOnnetSum(totalOnnetSUm);
			response.setOffnetsum(totalOffnetSUm);
			response.setNationalSUm(totalNationalSum);
			response.setInternationalSum(totalInternationalSum);
			response.setOthersSUm(totalOtherSum);
			response.setTotalSum(totalallSum);
			response.setAveragepst(toatlcountpst);
			response.setOnnetSum_pie(String.valueOf(onnetcount));
			response.setOffnetsum_pie(String.valueOf(offnetcount));
			response.setNationalSum_pie(String.valueOf(nationalcount));
			response.setInternationalSum_pie(String.valueOf(internationalcount));
			response.setOthersSum_pie(String.valueOf(othercount));
			response.setRoamingOutEventByRevList(adData);

		}

		catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}

}
