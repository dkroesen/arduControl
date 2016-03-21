package nl.arducontrol.model.db;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexed;
import org.mongodb.morphia.utils.IndexDirection;

@Entity
public class Device {

    @Id
    @Indexed(value = IndexDirection.ASC, name = "deviceName", unique = true)
    private String deviceName;

    private String deviceId;

    private String description;

    private boolean connected;


    public String getDeviceName() {
        return deviceName;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(final String deviceId) {
        this.deviceId = deviceId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public void setDeviceName(final String deviceName) {
        this.deviceName = deviceName;
    }
}
