package nl.arducontrol.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix="serial")
public class SerialConfig {

    private String comport;
    private String baudrate;

    public String getBaudrate() {
        return baudrate;
    }

    public void setBaudrate(final String baudrate) {
        this.baudrate = baudrate;
    }

    public String getComport() {
        return comport;
    }

    public void setComport(final String comport) {
        this.comport = comport;
    }
}
