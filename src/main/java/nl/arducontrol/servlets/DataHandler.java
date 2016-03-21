package nl.arducontrol.servlets;

import nl.arducontrol.components.DataMapper;
import nl.arducontrol.components.SerialConnector;
import nl.arducontrol.model.db.Device;
import nl.arducontrol.utils.JsonResponseHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequestMapping("/rest/data")
@RestController
public class DataHandler {

    @Autowired
    private DataMapper dataMapper;

    @RequestMapping(method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE}, path = "/device/addtest")
    public ResponseEntity<String> addTestData() {
        try {
            dataMapper.createDevice("testDevice1", "0000111", "This is a test device");
            dataMapper.createDevice("testDevice2", "0000222", "This is a test device");
            dataMapper.createDevice("testDevice3", "0000333", "This is a test device");

            return new ResponseEntity<>(JsonResponseHelper.createJsonResponse(true), HttpStatus.OK);
        } catch(Throwable e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = {MediaType.APPLICATION_JSON_VALUE}, path = "/device/add")
    public ResponseEntity<String> addDevice(final @RequestBody String deviceId) {
        try {
            dataMapper.createDevice(deviceId, deviceId, "This is a test device");
            return new ResponseEntity<>(JsonResponseHelper.createJsonResponse(true), HttpStatus.OK);
        } catch(Throwable e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE}, path = "/device/all")
    public ResponseEntity<String> getDevices() {
        try {
            return new ResponseEntity<>(JsonResponseHelper.createJsonResponse(dataMapper.retrieveDataObjects(Device.class)), HttpStatus.OK);
        } catch(Throwable e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE}, path = "/device/remove")
    public ResponseEntity<String> removeDevice(final @RequestBody String name) {
        try {
            dataMapper.removeDevice(name);
            return new ResponseEntity<>(JsonResponseHelper.createJsonResponse(true), HttpStatus.OK);
        } catch(Throwable e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
