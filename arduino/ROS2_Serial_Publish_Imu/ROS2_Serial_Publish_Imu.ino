// Adding I2C and MPU9250 Libraries
#include <MPU9250_WE.h>
#include <Wire.h>

// Introducing MPU9250 variable
#define CALIBRATE_COUNT_MPU 1000
#define MPU9250_ADDR 0x68

MPU9250_WE myMPU = MPU9250_WE(MPU9250_ADDR);
unsigned long previous_time_mpu = millis();
int period_mpu = 10;

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
}

void loop() {
  fMpu();
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
