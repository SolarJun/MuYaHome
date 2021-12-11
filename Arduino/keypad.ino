#include <Ethernet.h>
#include <SPI.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

boolean receive_data = false;
boolean data_check = false;
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };    // mac 주소만 변경해주자

EthernetClient client;
byte server[] = {118,67,130,241}; //서버의 ip를 적어주자
char web = "118.67.130.241";
String params = "";
String line = "";
String message = "";


// 0x27 I2C 주소를 가지고 있는 16x2 LCD객체 생성
LiquidCrystal_I2C lcd(0x27, 16, 2);

int analogPin = 0;
int val = 0;

int Key1 = 940; // 1
int Key1Sub = 1025;
int Key2 = 880; // 2
int Key2Sub = 940;
int Key3 = 835; // 3
int Key3Sub = 880;
int Key4 = 795; //4
int Key4Sub = 835;
int Key5 = 765; // 5
int Key5Sub = 795;
int Key6 = 740; // 6
int Key6Sub = 765;
int Key7 = 720; // 7
int Key7Sub = 740;
int Key8 = 700; // 8
int Key8Sub = 720;
int Key9 = 685; // 9
int Key9Sub = 700;
int Key0 = 655; // 0
int Key0Sub = 665;
int KeyStar = 665; // *
int KeyStarSub = 685;
int KeySharp = 645; // #
int KeySharpSub = 655;

String hoNum; // ex) 104호:0104, 1503호:1503


void getServer(){
    Serial.println(("Starting connection to server...")); 
    if (client.connect(server, 8080)) { 
        Serial.println(("Connected to server")); 
        client.print("GET ");
        client.print("/arduino/keypad"+params);
        client.println(" HTTP/1.1");
        client.print("Host: ");
        client.println(web);
        client.println("Connection: close");
        client.println();
        
        data_check = true;  
        // 서버에서 받은 값 line 변수에 입력
        while(data_check){ 
            char c = client.read();
            if(c=='{')
            {
                receive_data = true;
            }
            else if(receive_data==true)
            {
                if(c=='}') {
                    message = json_parser(line, "message");
                    Serial.println(message);
                    Serial.println(data_check);
                    line = "";
                    receive_data = false;
                    data_check = false;
                    client.stop();
                    lcd.clear();
                    lcd.setCursor(2, 0);
                    lcd.print("House Number");
                    lcd.setCursor(2, 1);
                    lcd.print(message);
                    if(message.equals("Call Failure")) {
                        delay(3000);
                        lcd.clear();
                    } else {
                      // 인터폰 송수신 후 Call Success 메시지 수신시 작성                     
                    }
                } else {
                    line+=c;
                    Serial.println(line);
                }
            }
        }
    }
}

void lcdView() {
  if(hoNum.length()>4) {
    pressAgain();
  } else {
    lcd.setCursor(6, 1);
    lcd.print(hoNum);
  }
}

void pressAgain() {
    lcd.setCursor(2, 1);
    lcd.print("Press Again!");
    hoNum = "";
    delay(1500);
    lcd.clear();
}

String json_parser(String s, String a) { 
    String val; 
    if (s.indexOf(a) != -1) 
    { 
        int st_index = s.indexOf(a); 
        int val_index = s.indexOf(':', st_index); 
        if (s.charAt(val_index + 1) == '"')
        { 
            int ed_index = s.indexOf('"', val_index + 2); 
            val = s.substring(val_index + 2, ed_index);
        } 
        else 
        { 
            int ed_index = s.indexOf(',', val_index + 1); 
            val = s.substring(val_index + 1, ed_index); 
        } 
    } else 
    { 
        Serial.print(a); 
        Serial.println(F(" is not available")); 
    } 
    return val; 
}

void setup() {

    // LCD 초기화 및 백라이트 활성화
    lcd.init();
    lcd.backlight();
    
    // put your setup code here, to run once:
    Serial.begin(9600);
  
    Ethernet.begin(mac);                       // mac 주소 이용해 알아서 IP등록이 된다.
    Serial.println(Ethernet.localIP());       // 할당된 내 IP주소를 시리얼모니터롤 볼 수 있다.
    delay(1000);
  
    Serial.println("connecting...");
    client.connect(server, 8080);             // 연결시도  만약 연결이 안되면 오래 지연됨
    if (client.connected()) {
        Serial.println("good");
        client.print("GET ");
        client.print("/arduino/keypad");
        client.println(" HTTP/1.1");
    
        client.print("Host: ");
    
        client.println(web);
    
        client.println("Connection: close");
    
        client.println();
    } else { 
  
      Serial.println("fail");
    }
}

void loop() {
  
    val = analogRead(analogPin);
    Serial.println(val);
    lcd.setCursor(2, 0);
    lcd.print("House Number");
  
    if(val>=Key1 && val<=Key1Sub) {
      hoNum += "1";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key2 && val<=Key2Sub) {
      hoNum += "2";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key3 && val<=Key3Sub) {
      hoNum += "3";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key4 && val<=Key4Sub) {
      hoNum += "4";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key5 && val<=Key5Sub) {
      hoNum += "5";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key6 && val<=Key6Sub) {
      hoNum += "6";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key7 && val<=Key7Sub) {
      hoNum += "7";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key8 && val<=Key8Sub) {
      hoNum += "8";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key9 && val<=Key9Sub) {
      hoNum += "9";
      Serial.println(hoNum);
      lcdView();
    } else if(val>=Key0 && val<=Key0Sub) {
      hoNum += "0";
      Serial.println(hoNum);
      lcdView();
    } if(val>=KeyStar && val<=KeyStarSub) {
        // *
        Serial.println(hoNum);
        if(hoNum.length()==4) {
            lcd.setCursor(4, 1);
            lcd.print("Calling");
      
            // 서버에 보내기
            params = "?signal="+hoNum;
            hoNum = "";
            getServer();
//            if(!client.connected() || data_check==true) {
//                  client.stop();
//                  String message = json_parser(line, "message");
//                  Serial.println(message);
//                  data_check=false;
//            }
          
//              hoNum = "";
        } else {
            pressAgain();
        }
    } else if(val>=KeySharp && val<=KeySharpSub) {
        // #
        if(hoNum.length()!=0) {
            hoNum = "";
            pressAgain();
            Serial.println(hoNum);
        }
    }
  
    delay(200);
}
