package org.ntdashboard.Service.Impl;

import org.ntdashboard.Dao.RoamingDao;
import org.ntdashboard.Model.RoamingDayByRevModel;
import org.ntdashboard.Model.RoamingEventByRevModel;
import org.ntdashboard.Model.RoamingOutDayByRevmodel;
import org.ntdashboard.Model.RomaingOutEventRevModel;
import org.ntdashboard.Service.RoamingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoamingServiceImpl implements RoamingService {
	@Autowired
	private RoamingDao roamingOutDayByRevDao;

	@Override
	public RoamingOutDayByRevmodel getRoamingTapOutRev(String year, String month, String currency) {

		RoamingOutDayByRevmodel model = new RoamingOutDayByRevmodel();
		model = roamingOutDayByRevDao.getRoamingDailyRev(year, month, currency);

		return model;
	}

	@Override
	public RoamingDayByRevModel getRoamingDayByRev(String year, String month, String currency) {

		RoamingDayByRevModel roamingDayByRevModel = new RoamingDayByRevModel();

		roamingDayByRevModel = roamingOutDayByRevDao.GetRoamingDayByRev(year, month, currency);

		return roamingDayByRevModel;
	}

	@Override
	public RoamingEventByRevModel getEventRevRoaming(String year, String month, String currency) {

		RoamingEventByRevModel model = new RoamingEventByRevModel();

		model = roamingOutDayByRevDao.getEventRevOfRoaming(year, month, currency);

		return model;
	}

	@Override
	public RomaingOutEventRevModel getRoaingOutEventRev(String year, String month, String currency) {

		RomaingOutEventRevModel model = new RomaingOutEventRevModel();
		model = roamingOutDayByRevDao.getRoamingTapOutRev(year, month, currency);

		return model;
	}
}
