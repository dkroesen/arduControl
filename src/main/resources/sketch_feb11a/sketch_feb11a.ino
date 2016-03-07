/*
  Sketch to run a traffic light and RGB led based 
  on serial read from jenkinstoarduino app
*/
  
String command = ""; 
boolean commandIsReceived = false;
// Prefix expected for all commands
String commandMask = "jta";
// Commands whe expect to receive
String REDCOMMAND = "R";
String YELLOWCOMMAND = "Y";
String GREENCOMMAND = "G";
String CHECKCOMMAND = "CHECK";
String LEDONCOMMAND = "LEDON";
String LEDOFFCOMMAND = "LEDOFF";
String STATUSCOMMAND = "STAT";// with the value appended like STAT25 
// Needed ports for the trafficlight
int REDLIGHT = 5;
int YELLOWLIGHT = 6;
int GREENLIGHT = 7;
int LEDLIGHT = 13;
// Needed ports for the RGB led
int STATUSLIGHTR = 4;
int STATUSLIGHTG = 3;
int STATUSLIGHTB = 2;
// For debug purposes
String stat = " status light: ";


void setup() {
  Serial.begin(9600);
  command.reserve(200);
  pinMode(REDLIGHT,OUTPUT);
  pinMode(YELLOWLIGHT,OUTPUT);
  pinMode(GREENLIGHT,OUTPUT);
  pinMode(STATUSLIGHTR,OUTPUT);
  pinMode(STATUSLIGHTG,OUTPUT);
  pinMode(STATUSLIGHTB,OUTPUT);
  pinMode(LEDLIGHT, OUTPUT);
}

void loop() {
  if(commandIsReceived) {
    Serial.println(checkCommand());
    command = "";
    commandIsReceived = false;
  }
}


/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent() {
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read(); 
    // add it to the inputString:
    if (inChar == '\n') {
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
      commandIsReceived = true;
      return;
    } 
    command += inChar;
  }
}

boolean checkCommand(){
  String commandPart = command.substring(3);
  if(command.startsWith(commandMask)){
    if (commandPart == REDCOMMAND){
      setLight(REDLIGHT);
      return true;
    } else if (commandPart == YELLOWCOMMAND){
      setLight(YELLOWLIGHT);
      return true;
    } else if (commandPart == GREENCOMMAND){
      setLight(GREENLIGHT);
      return true;
    } else if (commandPart == LEDONCOMMAND){
      ledLight(1);
      return true;
    } else if (commandPart == LEDOFFCOMMAND){
      ledLight(2);
      return true;
    } else if (commandPart == CHECKCOMMAND) {
      checkStatus();
      return true;
    } else if (commandPart.startsWith(STATUSCOMMAND)){
      String percentString = commandPart.substring(4);
      char charBuffer[percentString.length()+1];
      percentString.toCharArray(charBuffer,percentString.length()+1);
      int value = atoi(charBuffer);
      setStatusLight(value);
      return true;
    }
    Serial.println("command not reconized: "+commandPart);
    command = "";
    return false;
  }
  Serial.println("prefix not reconized in :"+command);
  command = "";
  return false;
}

void checkStatus(){
      Serial.println("debug status information");
      String debugInfo = "Red:";
      debugInfo += digitalRead(REDLIGHT);
      debugInfo += " Orange:";
      debugInfo += digitalRead(YELLOWLIGHT);
      debugInfo += " green:";
      debugInfo += digitalRead(GREENLIGHT);
      debugInfo += stat;
      Serial.println(debugInfo);
}

void ledLight(int onOff){
  switch(onOff){
     case 1:
      digitalWrite(LEDLIGHT,HIGH);
      break;
     case 2:
      digitalWrite(LEDLIGHT,LOW);
      break;
  }
}

void setLight(int light){
  switch(light){
    case 5:
      digitalWrite(REDLIGHT,HIGH);
      
      digitalWrite(YELLOWLIGHT,LOW);
      digitalWrite(GREENLIGHT,LOW);
      break;
    case 6:
      digitalWrite(REDLIGHT,LOW);
      digitalWrite(YELLOWLIGHT,HIGH);
      digitalWrite(GREENLIGHT,LOW);
      break;
    case 7:
      digitalWrite(REDLIGHT,LOW);
      digitalWrite(YELLOWLIGHT,LOW);
      digitalWrite(GREENLIGHT,HIGH);
      break;
    case 13:
      digitalWrite(LEDLIGHT,HIGH);
      break;
  }
}

void setStatusLight(int percent){
 // For debug purposes
 //String stat = "statusVal:";
 //stat +=percent;
 
 if (percent >= 0 && percent <= 25 ){
  //Red
   analogWrite(STATUSLIGHTR,255);
   analogWrite(STATUSLIGHTG,0);
   analogWrite(STATUSLIGHTB,0);
   // For debug purposes
   stat = "status light:red";
   //Serial.println(stat);
 } else if (percent > 25 && percent <= 50){
   // Purple
   analogWrite(STATUSLIGHTR,255);
   analogWrite(STATUSLIGHTG,0);
   analogWrite(STATUSLIGHTB,255);
   // For debug purposes
   stat ="status light:purple";
   //Serial.println(stat);
 }else if (percent > 50 && percent <= 75){
   // Yellow
   analogWrite(STATUSLIGHTR,255);
   analogWrite(STATUSLIGHTG,255);
   analogWrite(STATUSLIGHTB,0);
   // For debug purposes
   stat ="status light:yellow";
   //Serial.println(stat);
 } else if(percent > 75 ) {
   // Green
   analogWrite(STATUSLIGHTR,0);
   analogWrite(STATUSLIGHTG,255);
   analogWrite(STATUSLIGHTB,0);
   // For debug purposes
   stat ="status light:green";
   //Serial.println(stat);
 }
}




