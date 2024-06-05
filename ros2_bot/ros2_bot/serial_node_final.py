# Importing ROS2 and Required Librarie
import math
import rclpy
import numpy
from serial import Serial
from rclpy.node import Node
from decimal import Decimal

# Importing ROS2 Message Objects to Use
from std_msgs.msg import String
from sensor_msgs.msg import Imu


# Creating a Class for the ROS2 Node that Listens to the Motion Information Coming from ROS2,
# Calculates the Motor Speeds and Transfers it to Arduino via Serial Communication
class Serial_Node_Final(Node):
    def __init__(self):
        super().__init__("Serial_Node_Final")

        # Creating a Serial Object to Communicate with Arduino
        self.ser = Serial("/dev/ttyUSB1", 115200, timeout=0.009)
        self.get_logger().info(self.ser.readline())

        # Determining Which Topic to Subscribe to in the ROS2 Network and
        # Determining Which Function to Run When Broadcasting
        self.subscription_motor = self.create_subscription(
            String, "serial_motor", self.listener_callback_subscription_motor, 2
        )

        # Altta bulunan iki kod satırında yapılacak yayınların,
        # hangi mesaj türü ve hangi isim ile yayın yapılacakları belirlenmiştir.
        self.publisher_imu = self.create_publisher(Imu, "imu", 2)
        self.time_period_publisher_imu = 0.009
        self.timer_publisher_imu = self.create_timer(
            self.time_period_publisher_imu, self.timer_callback_publisher_imu
        )

    # Function Executed When Data Comes from the Topic on ROS2
    def listener_callback_subscription_motor(self, msg):
        self.get_logger().info('I heard "%s"' % msg.data)
        message = msg.data
        x = Decimal(message[: message.index(",")])
        y = Decimal(message[message.index(",") + 1 :])
        left_value, right_value = self.convert(x, y)

        if left_value < 0:
            left_flag = True
            left_value *= -1
        else:
            left_flag = False

        if right_value < 0:
            right_flag = True
            right_value *= -1
        else:
            right_flag = False

        self.left_speed = int(10000 - (left_value * 8325))
        self.right_speed = int(10000 - (right_value * 8325))

        if left_flag:
            self.left_speed *= -1
        if right_flag:
            self.right_speed *= -1

        self.serial_set()

    # Conversion Function that Calculates the Joystick Coordinate Data,
    # Right and Left Motors, Speeds and Directions Coming from ROS2
    def convert(self, x, y):
        r = math.hypot(x, y)
        t = math.atan2(y, x)
        t -= math.pi / 4
        left = r * math.cos(t)
        right = r * math.sin(t)
        left = left * math.sqrt(2)
        right = right * math.sqrt(2)
        return left, right

    # Function that Sends the Calculated Motor Speed ​​and Directions to Arduino via Serial Communication
    def serial_set(self):
        speed = str(self.left_speed) + "," + str(self.right_speed)
        self.get_logger().info(speed)
        self.ser.write(bytearray(speed, "ascii"))

    # Birinci yayıncının belirlenen periyotlarda ne yayınlayacağı belirtilmiştir.
    def timer_callback_publisher_imu(self):
        if self.ser.in_waiting:
            values = self.ser.readline().rstrip()
            self.get_logger().info(values)
            values = values.decode("utf-8")
            values = values.split(",")
            values = numpy.asarray(values, dtype=float)
            msg = Imu()
            msg.header.stamp = self.get_clock().now().to_msg()
            msg.header.frame_id = "base_link"
            msg.linear_acceleration_covariance = [0.0] * 9
            msg.linear_acceleration.x = values[0]
            msg.linear_acceleration.y = values[1]
            msg.linear_acceleration.z = values[2]
            msg.angular_velocity_covariance[0] = 0
            msg.angular_velocity.x = values[3]
            msg.angular_velocity.y = values[4]
            msg.angular_velocity.z = values[5]
            msg.orientation_covariance = [0.0] * 9
            magValueX = values[6]
            magValueY = values[7]
            msg = self.calculateOrientation(msg, magValueX, magValueY)
            self.publisher_imu.publish(msg)

    def calculateOrientation(self, msg, magValueX, magValueY):
        yaw = math.atan2(magValueY, magValueX)
        roll = math.atan2(msg.linear_acceleration.y, msg.linear_acceleration.z)
        pitch = math.atan2(
            -msg.linear_acceleration.y,
            math.sqrt(
                msg.linear_acceleration.y * msg.linear_acceleration.y
                + msg.linear_acceleration.z * msg.linear_acceleration.z
            ),
        )

        cy = math.cos(yaw * 0.5)
        sy = math.sin(yaw * 0.5)
        cr = math.cos(roll * 0.5)
        sr = math.sin(roll * 0.5)
        cp = math.cos(pitch * 0.5)
        sp = math.sin(pitch * 0.5)

        msg.orientation.x = cy * cp * sr - sy * sp * cr
        msg.orientation.y = sy * cp * sr + cy * sp * cr
        msg.orientation.z = sy * cp * cr - cy * sp * sr
        msg.orientation.w = cy * cp * cr + sy * sp * sr

        return msg


def main(args=None):
    rclpy.init(args=args)
    serial_node_final = Serial_Node_Final()
    rclpy.spin(serial_node_final)

    serial_node_final.ser.close()
    serial_node_final.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
