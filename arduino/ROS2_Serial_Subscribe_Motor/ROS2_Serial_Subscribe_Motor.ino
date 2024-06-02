// Introducing Stepper Motor Driver Pins
#define motor_right_enable 23
#define motor_right_direction 25
#define motor_right_pwm 2
#define motor_left_enable 22
#define motor_left_direction 24
#define motor_left_pwm 3

// Creating Microsecond Time Variables of Right and Left Motors
unsigned long previous_time_motor_right = micros();
unsigned long previous_time_motor_left = micros();

// Creation of Step Periods of Motors
int period_motor_left = 10000;
int period_motor_right = 10000;

void setup() {
  // Begining Communications
  Serial.begin(115200);
  //Serial.println("Ready");

  // Making Initial Configuration Settings of Motor Drives
  pinMode(motor_right_enable, OUTPUT);
  pinMode(motor_right_direction, OUTPUT);
  pinMode(motor_right_pwm, OUTPUT);
  pinMode(motor_left_enable, OUTPUT);
  pinMode(motor_left_direction, OUTPUT);
  pinMode(motor_left_pwm, OUTPUT);

  digitalWrite(motor_right_enable, LOW);
  digitalWrite(motor_right_direction, LOW);
  digitalWrite(motor_right_pwm, LOW);
  digitalWrite(motor_left_enable, LOW);
  digitalWrite(motor_left_direction, LOW);
  digitalWrite(motor_left_pwm, LOW);
}

void loop() {
  fSerialRead();
  fMotorMove();
  digitalWrite(motor_right_pwm, LOW);
  digitalWrite(motor_left_pwm, LOW);
}

// Controlling Serial Communication and Reading Data
void fSerialRead() {
  if (Serial.available()) {
    String serial_value;
    while (Serial.available()) {
      serial_value += char(Serial.read());
      delayMicroseconds(90);
    }

    // Parsing and Assigning Data
    //Serial.println(serial_value);
    period_motor_left = serial_value.substring(0, serial_value.indexOf(',')).toInt();
    period_motor_right = serial_value.substring(serial_value.indexOf(',') + 1).toInt();
    fMotorRotation();
  }
}

// Determining the Directions of Motors
void fMotorRotation() {
  if (period_motor_left < 0) {
    period_motor_left *= -1;
    digitalWrite(motor_left_direction, HIGH);
  } else {
    digitalWrite(motor_left_direction, LOW);
  }

  if (period_motor_right < 0) {
    period_motor_right *= -1;
    digitalWrite(motor_right_direction, LOW);
  } else {
    digitalWrite(motor_right_direction, HIGH);
  }
}

// Checking Data and Moving the Motors
void fMotorMove() {
  unsigned long current_time_micros = micros();

  // Left Motor Controll
  if (period_motor_left == 10000) {
    digitalWrite(motor_left_enable, HIGH);
    digitalWrite(motor_left_pwm, LOW);
  } else if (current_time_micros - previous_time_motor_left > period_motor_left) {
    digitalWrite(motor_left_enable, LOW);
    digitalWrite(motor_left_pwm, HIGH);
    previous_time_motor_left = current_time_micros;
  }

  // Right Motor Controll
  if (period_motor_right == 10000) {
    digitalWrite(motor_right_enable, HIGH);
    digitalWrite(motor_right_pwm, LOW);
  } else if (current_time_micros - previous_time_motor_right > period_motor_right) {
    digitalWrite(motor_right_enable, LOW);
    digitalWrite(motor_right_pwm, HIGH);
    previous_time_motor_right = current_time_micros;
  }

  // Deactivating Step Pins of Motor Drivers
  digitalWrite(motor_right_pwm, LOW);
  digitalWrite(motor_left_pwm, LOW);
}
