#include <MPU9250_WE.h>
#include <Wire.h>
#define MPU9250_ADDR 0x68

MPU9250_WE myMPU9250 = MPU9250_WE(MPU9250_ADDR);

void setup() {
  //Comunicaions begins
  Serial.begin(115200);
  Wire.begin();

  //Start MPU9250
  if (!myMPU9250.init()) {}
  if (!myMPU9250.initMagnetometer()) {}

  //Settings MPU9250 Parameters
  delay(1000);
  myMPU9250.enableGyrDLPF();
  myMPU9250.setGyrDLPF(MPU9250_DLPF_2);
  myMPU9250.setSampleRateDivider(5);
  myMPU9250.setGyrRange(MPU9250_GYRO_RANGE_250);
  myMPU9250.setAccRange(MPU9250_ACC_RANGE_2G);
  myMPU9250.enableAccDLPF(true);
  myMPU9250.setAccDLPF(MPU9250_DLPF_2);
  myMPU9250.enableAccAxes(MPU9250_ENABLE_XYZ);
  myMPU9250.enableGyrAxes(MPU9250_ENABLE_XYZ);
  myMPU9250.setMagOpMode(AK8963_CONT_MODE_100HZ);

  //Calibrating MPU9250
  delay(200);
  myMPU9250.accOffsetVal = { 0.f, 0.f, 0.f };
  myMPU9250.gyrOffsetVal = { 0.f, 0.f, 0.f };
  xyzFloat accelSum = { 0.f, 0.f, 0.f };
  xyzFloat gyroSum = { 0.f, 0.f, 0.f };
  for (int i = 0; i < 1000; i++) {
    accelSum += myMPU9250.getAccRawValues();
    gyroSum += myMPU9250.getGyrRawValues();
    delay(1);
  }
  accelSum /= 1000.f;
  accelSum.z -= 16384.0f;
  myMPU9250.accOffsetVal = accelSum;
  myMPU9250.gyrOffsetVal = gyroSum / 1000.f;
}

void loop() {
  //Get and Serial Write MPU9250 Values With Frquency = 100
  xyzFloat accelValues = myMPU9250.getGValues();
  xyzFloat gyrValues = myMPU9250.getGyrValues();
  xyzFloat magValue = myMPU9250.getMagValues();
  float temp = myMPU9250.getTemperature();
  float resultantG = myMPU9250.getResultantG(accelValues);
  Serial.println(String(accelValues.x) + "," + accelValues.y + "," + accelValues.z + "," + gyrValues.x + "," + gyrValues.y + "," + gyrValues.z + "," + magValue.x + "," + magValue.y);
  delay(10);
}
