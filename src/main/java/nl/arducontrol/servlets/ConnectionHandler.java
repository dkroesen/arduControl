package nl.arducontrol.servlets;

import nl.arducontrol.components.SerialConnector;
import nl.arducontrol.utils.JsonResponseHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Component
@RequestMapping("/rest/connection")
@RestController
public class ConnectionHandler {

    @Autowired
    private SerialConnector serialConnector;

    @RequestMapping(method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE}, path = "/connect")
    public ResponseEntity<String> connect() {
        try {
            return new ResponseEntity<>(JsonResponseHelper.createJsonResponse(serialConnector.connect()), HttpStatus.OK);
        } catch(Throwable e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE}, path = "/send/{message}")
    public ResponseEntity<String> send(final @PathVariable("message") String message) {
        try {
            return new ResponseEntity<>(JsonResponseHelper.createJsonResponse(serialConnector.send(message)), HttpStatus.OK);
        } catch(Throwable e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE}, path = "/disconnect")
    public ResponseEntity<String> disconnect() {
        try {
            return new ResponseEntity<>(JsonResponseHelper.createJsonResponse(serialConnector.disconnect()), HttpStatus.OK);
        } catch(Throwable e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
