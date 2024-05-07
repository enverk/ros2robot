#define right_enable 22
#define right_direction 24
#define right_pwm 3
#define left_enable 23
#define left_direction 25
#define left_pwm 2

void setup() {
  Serial.begin(115200);
  Serial.println("Ready");

  pinMode(right_enable, OUTPUT);
  pinMode(right_direction, OUTPUT);
  pinMode(right_pwm, OUTPUT);
  pinMode(left_enable, OUTPUT);
  pinMode(left_direction, OUTPUT);
  pinMode(left_pwm, OUTPUT);

  digitalWrite(right_enable, LOW);
  digitalWrite(right_direction, LOW);
  analogWrite(right_pwm, 0);
  digitalWrite(left_enable, LOW);
  digitalWrite(left_direction, LOW);
  analogWrite(left_pwm, 0);
}

void loop() {
  if (Serial.available()) {
    String komut_motor = Serial.readString();
    komut_motor.trim();
    double x = komut_motor.substring(0, komut_motor.indexOf(',')).toDouble();
    double y = komut_motor.substring(komut_motor.indexOf(',') + 1).toDouble();
    convert(x,y);
    move(x,y);
  }
}

void convert(double &x, double &y) {
  double r = sqrt(sq(x) + sq(y));
  double t = atan2(y, x);
  t -= PI / 4;
  double left = r * cos(t);
  double right = r * sin(t);
  left = left * sqrt(2);
  right = right * sqrt(2);
  if (y < 0) {
    double temp = left;
    left = right;
    right = temp;
  }
  x = left;
  y = right;
}

void move(double x,double y) {
  if (x<0){
    x=x*-1;
    digitalWrite(left_direction,LOW);
  }
  else digitalWrite(left_direction,HIGH);

  if (y<0){
    y=y*-1;
    digitalWrite(right_direction,HIGH);
  }
  else digitalWrite(right_direction,LOW);

  analogWrite(left_pwm,x);
  analogWrite(right_pwm,y);
}
