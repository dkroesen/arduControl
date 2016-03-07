package nl.arducontrol.components;

import nl.arducontrol.config.SerialConfig;
import nl.arducontrol.serial.SerialPortConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SerialConnector {

    private final SerialConfig serialConfig;

    private final SerialPortConnector serialPortConnector;

    @Autowired
    public SerialConnector(final SerialConfig serialConfig) {
        this.serialConfig = serialConfig;
        serialPortConnector = new SerialPortConnector();
        serialPortConnector.setPortName(serialConfig.getComport());
    }

    public boolean connect(){
        boolean connected = false;
        try {
            connected = serialPortConnector.initialize();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return connected;
    }

    public boolean send(String message){
        boolean success = false;
        try {
            serialPortConnector.sendData(message+"\n");
            success = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return success;

    }

    public boolean disconnect(){
        serialPortConnector.close();
        return true;
    }

}
