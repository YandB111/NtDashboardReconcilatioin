package org.ntdashboard.CheckController;

import org.ntdashboard.Dao.ExclusionListDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping({"/dashboard/msisdn/api/"})
public class CheckNumberController {
    @Autowired
    private ExclusionListDao exclusionListDao;

    @RequestMapping(value = {"/check"}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ResponseEntity<?> checkServedMsisdn(@RequestParam("msisdn") String servedMsisdn, Model model) {
        System.out.println("Received request for checking served MSISDN: " + servedMsisdn);
        boolean exists = exclusionListDao.isServedMsisdnExists(servedMsisdn);
        System.out.println("Served MSISDN exists: " + exists);
        return ResponseEntity.ok().body("{\"exists\": " + exists + ", \"msisdn\": \"" + servedMsisdn + "\"}");
    }

    @RequestMapping(value = {"/checkAdd"}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ResponseEntity<?> addServedMsisdn(@RequestParam("msisdn") String servedMsisdn) {
        System.out.println("Received request to add served MSISDN: " + servedMsisdn);
        exclusionListDao.addServedMsisdn(servedMsisdn);
        return ResponseEntity.ok().body("{\"message\": \"Served MSISDN added successfully.\"}");
    }

    @RequestMapping(value = {"/checkDelete"}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public ResponseEntity<?> deleteServedMsisdn(@RequestParam("msisdn") String servedMsisdn) {
        System.out.println("Received request to delete served MSISDN: " + servedMsisdn);
        exclusionListDao.deleteServedMsisdn(servedMsisdn);
        return ResponseEntity.ok().body("{\"message\": \"Served MSISDN deleted successfully.\"}");
    }
}
