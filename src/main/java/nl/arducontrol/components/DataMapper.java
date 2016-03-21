package nl.arducontrol.components;

import com.mongodb.MongoClient;
import nl.arducontrol.config.MongoConfig;
import nl.arducontrol.model.db.Device;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.UnknownHostException;
import java.util.List;

@Component
public class DataMapper {

    private Datastore dataStore;
    private MongoConfig mongoConfig;
    private Morphia morphia = null;

    @Autowired
    public DataMapper(final MongoConfig mongoConfig) {
        this.mongoConfig = mongoConfig;
        init();
    }

    private void init() {
        if (morphia == null) {
            morphia = new Morphia();
            morphia.mapPackage(mongoConfig.getModelPackage());
            try {
                dataStore = morphia.createDatastore(new MongoClient(), mongoConfig.getDbName());
            } catch (UnknownHostException e) {
                System.out.println("Unable to init DataMapper due to exception: " + e.getMessage());
            }
            dataStore.ensureIndexes();
        }
    }

    public List retrieveDataObjects(final Class T) {
        final Query query = dataStore.createQuery(T);
        return query.asList();
    }

    public void createDevice(final String name, final String deviceId, final String description) {
        final Device device = new Device();
        device.setDeviceName(name);
        device.setDeviceId(deviceId);
        device.setDescription(description);
        dataStore.save(device);
    }

    public void removeDevice(final String name){
        dataStore.delete(dataStore.createQuery(Device.class).filter("deviceName", name));
    }

}