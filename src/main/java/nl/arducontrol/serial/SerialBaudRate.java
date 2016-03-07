/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package nl.arducontrol.serial;

/**
 *
 * @author ben
 */
public enum SerialBaudRate {
    RATE300(300),
    RATE600(600),
    RATE1200(1200),
    RATE2400(2400),
    RATE4800(4800),
    RATE9600(9600),
    RATE14400(14400),
    RATE19200(19200),
    RATE28800(28800),
    RATE38400(38400),
    RATE57600(57600),
    RATE115200(115200);
    
    private int baudRate;
    
    SerialBaudRate(int baudRate){
        this.baudRate = baudRate;
    }

    /**
     * @return the baudRate
     */
    public int getBaudRate() {
        return baudRate;
    }
    
    @Override
    public String toString(){
        return ""+this.baudRate;
    }
}
