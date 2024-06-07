// Adding I2C and MPU9250 Libraries
#include <MPU9250_WE.h>
#include <Wire.h>

// Introducing MPU9250 variable
#define CALIBRATE_COUNT_MPU 1000
#define MPU9250_ADDR 0x68

MPU9250_WE myMPU = MPU9250_WE(MPU9250_ADDR);
unsigned long previous_time_mpu = millis();
int period_mpu = 10;

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
int period_motor_left = 15000;
int period_motor_right = 15000;

void setup() {
  // Begining Communications
  Serial.begin(115200);
  Wire.begin();

  // Starting MPU9250
  if (!myMPU.init()) {}
  if (!myMPU.initMagnetometer()) {}

  // Setting MPU9250 Parameters
  delay(CALIBRATE_COUNT_MPU);
  myMPU.enableGyrDLPF();
  myMPU.setGyrDLPF(MPU9250_DLPF_2);
  myMPU.setSampleRateDivider(5);
  myMPU.setGyrRange(MPU9250_GYRO_RANGE_250);
  myMPU.setAccRange(MPU9250_ACC_RANGE_2G);
  myMPU.enableAccDLPF(true);
  myMPU.setAccDLPF(MPU9250_DLPF_2);
  myMPU.enableAccAxes(MPU9250_ENABLE_XYZ);
  myMPU.enableGyrAxes(MPU9250_ENABLE_XYZ);
  myMPU.setMagOpMode(AK8963_CONT_MODE_100HZ);

  // Calibrating the MPU9250
  delay(200);
  myMPU.accOffsetVal = { 0.f, 0.f, 0.f };
  myMPU.gyrOffsetVal = { 0.f, 0.f, 0.f };
  xyzFloat accelSum = { 0.f, 0.f, 0.f };
  xyzFloat gyroSum = { 0.f, 0.f, 0.f };
  for (int i = 0; i < CALIBRATE_COUNT_MPU; i++) {
    accelSum += myMPU.getAccRawValues();
    gyroSum += myMPU.getGyrRawValues();
    delay(1);
  }
  accelSum /= CALIBRATE_COUNT_MPU;
  accelSum.z -= 16384.0f;
  myMPU.accOffsetVal = accelSum;
  myMPU.gyrOffsetVal = gyroSum / CALIBRATE_COUNT_MPU;

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
  fMpu();
  fSerialRead();
  fMotorMove();
  digitalWrite(motor_right_pwm, LOW);
  digitalWrite(motor_left_pwm, LOW);
}

// Reading MPU9250's Data in Each Period and Sending it via Serial Communication
void fMpu() {
  unsigned long current_time_millis = millis();
  if (current_time_millis - previous_time_mpu > period_mpu) {
    xyzFloat accelValues = myMPU.getGValues();
    xyzFloat gyrValues = myMPU.getGyrValues();
    xyzFloat magValue = myMPU.getMagValues();
    float temp = myMPU.getTemperature();
    float resultantG = myMPU.getResultantG(accelValues);
    Serial.println(String(accelValues.x) + "," + accelValues.y + "," + accelValues.z + "," + gyrValues.x + "," + gyrValues.y + "," + gyrValues.z + "," + magValue.x + "," + magValue.y);
  }
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

// Determining the Direction of Motors
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

  //Left Motor Controll
  if (period_motor_left == 15000) {
    digitalWrite(motor_left_enable, HIGH);
    digitalWrite(motor_left_pwm, LOW);
  } else if (current_time_micros - previous_time_motor_left > period_motor_left) {
    digitalWrite(motor_left_enable, LOW);
    digitalWrite(motor_left_pwm, HIGH);
    previous_time_motor_left = current_time_micros;
  }

  // Right Motor Controll
  if (period_motor_right == 15000) {
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