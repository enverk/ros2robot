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
    if (komut_motor == "ILERI") robot_ileri();
    else if (komut_motor == "GERI") robot_geri();
    else if (komut_motor == "SAG") robot_sag();
    else if (komut_motor == "SOL") robot_sol();
    hareket();
  }
}

void hareket() {
  analogWrite(right_pwm, 255);
  analogWrite(left_pwm, 255);
  delay(1000);
  analogWrite(right_pwm, 0);
  analogWrite(left_pwm, 0);
}

void robot_ileri() {
  digitalWrite(right_direction, LOW);
  digitalWrite(left_direction, HIGH);
}

void robot_geri() {
  digitalWrite(right_direction, HIGH);
  digitalWrite(left_direction, LOW);
}

void robot_sag() {
  digitalWrite(right_direction, HIGH);
  digitalWrite(left_direction, HIGH);
}

void robot_sol() {
  digitalWrite(right_direction, LOW);
  digitalWrite(left_direction, LOW);
}
