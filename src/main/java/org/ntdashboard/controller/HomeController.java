package org.ntdashboard.controller;

import org.ntdashboard.Service.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping({"/dashboard/reconciliation/api/"})
public class HomeController {
  @Autowired
  Services reconciliationService;
  
  @RequestMapping(value = {"/reconciliationDayByRev"}, method = {RequestMethod.GET, RequestMethod.POST})
  @ResponseBody
  public Object reconciliationDayByRev(@RequestParam("year") String year, @RequestParam("month") String month, @RequestParam("currency") String currency) {
    return this.reconciliationService.getReconciliationDayByRev(year, month, currency);
  }
  
  @RequestMapping(value = {"/reconciliationMonthlyRev"}, method = {RequestMethod.GET, RequestMethod.POST})
  @ResponseBody
  public Object reconciliationMonthlyRev(@RequestParam("year") String year, @RequestParam("month") String month) {
    return this.reconciliationService.getReconcilationMonthlyRev(year, month);
  }
  
  @RequestMapping(value = {"/reconciliationOfTapoutDayByRev"}, method = {RequestMethod.GET, RequestMethod.POST})
  @ResponseBody
  public Object reconciliationDayByRevSvsTapout(@RequestParam("year") String year, @RequestParam("month") String month, @RequestParam("currency") String currency) {
    return this.reconciliationService.getReconciliationDayRevSwtVsTapout(year, month, currency);
  }
  
  @RequestMapping(value = {"/reconciliationOfTapoutMonthlyRev"}, method = {RequestMethod.GET, RequestMethod.POST})
  @ResponseBody
  public Object reconciliationMonthlyRevSvsTapout(@RequestParam("year") String year, @RequestParam("month") String month) {
    return this.reconciliationService.getMonthlyReconciliationRevSwtVsTapout(year, month);
  }
  
  @RequestMapping(value = {"/reconciliationOfSmscDayByRev"}, method = {RequestMethod.GET, RequestMethod.POST})
  @ResponseBody
  public Object reconciliationDayByRevSmscVsIn(@RequestParam("year") String year, @RequestParam("month") String month, @RequestParam("currency") String currency) {
    return this.reconciliationService.getReconciliationDayRevSmscVsIn(year, month, currency);
  }
  
  @RequestMapping(value = {"/reconciliationOfSmscMonthlyRev"}, method = {RequestMethod.GET, RequestMethod.POST})
  @ResponseBody
  public Object reconciliationMonthlyRevSmscVsIn(@RequestParam("year") String year, @RequestParam("month") String month) {
    return this.reconciliationService.getMonthlyReconciliationSmscVsIn(year, month);
  }
}
