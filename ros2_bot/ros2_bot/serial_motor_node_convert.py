import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from serial import Serial
import math
from time import sleep
from decimal import Decimal


class Serial_Motor_Node(Node):
    def __init__(self):
        super().__init__("Serial_Motor_Node")
        self.ser = Serial("/dev/ttyUSB0", 115200, timeout=0.1)
        self.get_logger().info(self.ser.readline())
        self.left_speed = 10000
        self.right_speed = 10000

        # Bu kod satırında dinleyicinin hangi mesaj türünü ve hangi isimi dinlediğini belirterek,
        # dinleme gerçekleştiğinde hangi fonksiyonu çalıştıracağı belirtilmektedir.
        self.subscription = self.create_subscription(
            String, "serial_motor", self.listener_callback, 10
        )

        self.timer_serial_set = self.create_timer(1, self.serial_set)
        self.timer_serial_get = self.create_timer(1, self.serial_get)

    # Dinleme gerçekleştiğinde çalışan fonksiyonun gerçekleştireceği eylemlerin bulunduğu fonksiyon.
    def listener_callback(self, msg):
        self.get_logger().info('I heard "%s"' % msg.data)
        metin = msg.data
        x = Decimal(metin[: metin.index(",")])
        y = Decimal(metin[metin.index(",") + 1 :])
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

    def convert(self, x, y):
        r = math.hypot(x, y)
        t = math.atan2(y, x)
        t -= math.pi / 4
        left = r * math.cos(t)
        right = r * math.sin(t)
        left = left * math.sqrt(2)
        right = right * math.sqrt(2)
        return left, right

    def serial_set(self):
        speed = str(self.left_speed) + "," + str(self.right_speed)
        self.get_logger().info(speed)
        self.ser.write(bytearray(speed, "ascii"))

    def serial_get(self):
        sleep(.01)
        self.get_logger().info("Alinan: " + str(self.ser.readline().rstrip()))


def main(args=None):
    print("Hi from ros2_bot.")
    rclpy.init(args=args)
    serial_motor_node = Serial_Motor_Node()
    rclpy.spin(serial_motor_node)

    # Düğüm sonlandığında Düğüm silinmiştir.
    serial_motor_node.ser.close()
    serial_motor_node.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
