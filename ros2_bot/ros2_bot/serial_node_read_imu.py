# Importing ROS2 and Required Libraries
import rclpy
import numpy
import math
from rclpy.node import Node
from serial import Serial

# Importing ROS2 Message Objects to Use
from std_msgs.msg import String
from sensor_msgs.msg import Imu


# Creating a Class for the ROS2 Node that Listens to the Motion Information Coming from ROS2,
# Calculates the Motor Speeds and Transfers it to Arduino via Serial Communication
class Serial_Node_Read_Imu(Node):
    def __init__(self):
        super().__init__("Serial_Node_Read_Imu")
        self.ser = Serial("/dev/ttyUSB0", 115200, timeout=0.009)
        self.get_logger().info(self.ser.readline())

        # Altta bulunan iki kod satırında yapılacak yayınların,
        # hangi mesaj türü ve hangi isim ile yayın yapılacakları belirlenmiştir.
        self.publisher_imu = self.create_publisher(Imu, "imu", 2)
        self.time_period_publisher_imu = 0.009
        self.timer_publisher_imu = self.create_timer(
            self.time_period_publisher_imu, self.timer_callback_publisher_imu
        )

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

    def timer_callback_one_(self, data):
        msg_one_ = String()
        msg_one_.data = data
        self.publisher_imu.publish(msg_one_)
        self.get_logger().info('Published one: "%s"' % msg_one_.data)


# Son olarak ana fonksiyon ve içerisinde yazılan Düğüme ait bir nesne oluşturulmuştur.
def main(args=None):
    rclpy.init(args=args)
    serial_node_read_imu = Serial_Node_Read_Imu()
    rclpy.spin(serial_node_read_imu)

    # Düğüm sonlandığında Düğüm silinmiştir.
    serial_node_read_imu.ser.close()
    serial_node_read_imu.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
