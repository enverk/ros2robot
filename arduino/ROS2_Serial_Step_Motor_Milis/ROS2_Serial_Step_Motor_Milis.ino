#define right_enable 23
#define right_direction 25
#define right_pwm 2
#define left_enable 22
#define left_direction 24
#define left_pwm 3

unsigned long get_time() {
  return micros();
}

unsigned long previous_time_motor_right = get_time();
unsigned long previous_time_motor_left = get_time();

long motor_interval_right, motor_interval_left;

double x = 0, y = 0;
double right = 0, left = 0;

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
    String komut_motor = Serial.readString();
    komut_motor.trim();
    x = komut_motor.substring(0, komut_motor.indexOf(',')).toDouble();
    y = komut_motor.substring(komut_motor.indexOf(',') + 1).toDouble();
      Serial.println(String(x) + " " + y);
      convert();
      rotation();
  }
  digitalWrite(right_pwm, LOW);
  digitalWrite(left_pwm, LOW);
  move();
}

void convert() {
  double r = hypot(x, y);
  double t = atan2(y, x);
  t -= PI / 4;
  x = r * cos(t);
  y = r * sin(t);
  x = (x * sqrt(2)) / 1;
  y = (y * sqrt(2)) / 1;
  Serial.println(String(x) + " " + y);
}

void rotation() {
  if (y < 0) {
    right = y * -1;
    digitalWrite(right_direction, LOW);
  } else {
    right = y;
    digitalWrite(right_direction, HIGH);
  }

  if (x < 0) {
    left = x * -1;
    digitalWrite(left_direction, HIGH);
  } else {
    left = x;
    digitalWrite(left_direction, LOW);
  }

  motor_interval_right = 10000 - ((right * 9000));
  motor_interval_left = 10000 - ((left * 9000));
  Serial.println(String(left) + " " + right);
  Serial.println(String(motor_interval_left) + " " + motor_interval_right);
}

void move() {
  unsigned long current_time = get_time();
  if (current_time - previous_time_motor_right > motor_interval_right) {
    digitalWrite(right_pwm, HIGH);
    previous_time_motor_right = current_time;
  }

  if (current_time - previous_time_motor_left > motor_interval_left) {
    digitalWrite(left_pwm, HIGH);
    previous_time_motor_left = current_time;
  }
}