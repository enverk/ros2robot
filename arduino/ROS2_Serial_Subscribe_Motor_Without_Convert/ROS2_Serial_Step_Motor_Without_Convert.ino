#define right_enable 23
#define right_direction 25
#define right_pwm 2
#define left_enable 22
#define left_direction 24
#define left_pwm 3

unsigned long previous_motor_time_right = micros();
unsigned long previous_motor_time_left = micros();

int motor_period_left, motor_period_right;

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
  digitalWrite(right_pwm, LOW);
  digitalWrite(left_enable, LOW);
  digitalWrite(left_direction, LOW);
  digitalWrite(left_pwm, LOW);
}

void loop() {
  if (Serial.available()) {
    String komut_motor;
    while (Serial.available()) {
      komut_motor += char(Serial.read());
      delayMicroseconds(90);
    }
    Serial.println(komut_motor);
    motor_period_left = komut_motor.substring(0, komut_motor.indexOf(',')).toInt();
    motor_period_right = komut_motor.substring(komut_motor.indexOf(',') + 1).toInt();
    rotation();
  }
  digitalWrite(right_pwm, LOW);
  digitalWrite(left_pwm, LOW);
  move();
}

void rotation() {
  if (motor_period_left < 0) {
    motor_period_left *= -1;
    digitalWrite(left_direction, HIGH);
  } else {
    digitalWrite(left_direction, LOW);
  }

  if (motor_period_right < 0) {
    motor_period_right *= -1;
    digitalWrite(right_direction, LOW);
  } else {
    digitalWrite(right_direction, HIGH);
  }
}

void move() {
  unsigned long current_time = micros();

  if (motor_period_left == 10000)
    digitalWrite(left_enable, HIGH);
    digitalWrite(left_pwm, LOW);
  else if (current_time - previous_motor_time_left > motor_period_left) {
    digitalWrite(left_enable, LOW);
    digitalWrite(left_pwm, HIGH);
    previous_motor_time_left = current_time;
  }

  if (motor_period_right == 10000)
    digitalWrite(right_enable, HIGH)
    digitalWrite(right_pwm, LOW);
  else if (current_time - previous_motor_time_right > motor_period_right) {
    digitalWrite(right_enable, LOW);
    digitalWrite(right_pwm, HIGH);
    previous_motor_time_right = current_time;
  }
  
  digitalWrite(right_pwm, LOW);
  digitalWrite(left_pwm, LOW);
}
