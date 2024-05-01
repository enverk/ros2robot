import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from serial import Serial


class Serial_Motor_Node(Node):
    def __init__(self):
        super().__init__("Serial_Motor_Node")
        self.ser = Serial("/dev/ttyUSB0", 115200, timeout=0.1)
        self.get_logger().info(self.ser.readline())

        # Bu kod satırında dinleyicinin hangi mesaj türünü ve hangi isimi dinlediğini belirterek,
        # dinleme gerçekleştiğinde hangi fonksiyonu çalıştıracağı belirtilmektedir.
        self.subscription = self.create_subscription(
            String, "serial_motor", self.listener_callback, 10
        )

    # Dinleme gerçekleştiğinde çalışan fonksiyonun gerçekleştireceği eylemlerin bulunduğu fonksiyon.
    def listener_callback(self, msg):
        self.get_logger().info('I heard "%s"' % msg.data)
        metin = msg.data
        self.ser.write(bytearray(metin,'ascii'))


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
    
#test
