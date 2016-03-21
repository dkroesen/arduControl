package nl.arducontrol.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix="mongo")
public class MongoConfig {

    private String dbName;
    private String modelPackage;

    public String getDbName() {
        return dbName;
    }

    public String getModelPackage() {
        return modelPackage;
    }

    public void setDbName(final String dbName) {
        this.dbName = dbName;
    }

    public void setModelPackage(final String modelPackage) {
        this.modelPackage = modelPackage;
    }
}