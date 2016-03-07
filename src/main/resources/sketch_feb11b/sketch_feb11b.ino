int led = 13; // LED connected to digital pin 13
int pts = 2;  // Powertail Switch 2 connected to digital pin 2
String recv = ""; // byte received on the serial port
boolean commandIsReceived = false;
 
void setup() {
  // initialize onboard LED (led), Powertail (pts) and serial port
  pinMode(led, OUTPUT);
  pinMode(pts, OUTPUT);
  Serial.begin(9600);
  recv.reserve(200);
}
 
void loop()
{
  // if serial port is available, read incoming bytes
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read(); 
    // add it to the inputString:
    if (inChar == '\n') {
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
      commandIsReceived = true;
    }else { 
      recv += inChar;
      // confirm values received in serial monitor window
      Serial.print("--Arduino received: ");
      Serial.println(recv);
    }

    if(commandIsReceived){
      handleCommand(recv);  
    }

  }
}
  
void handleCommand(String command){
    if(command == "ledon"){
        digitalWrite(led, HIGH);
    }else if(command == "ledoff"){
        digitalWrite(led, LOW);
    }        
    commandIsReceived = false;
    recv = "";  
}

