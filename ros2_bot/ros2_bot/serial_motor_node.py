import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from serial import Serial

class Serial_Motor_Node(Node):
    def __init__(self):
        super().__init__("Serial_Motor_Node")
        self.ser = Serial('/dev/ttyACM0', 115200,timeout=.1)
        self.get_logger().info(self.ser.readline())

        # Bu kod satırında dinleyicinin hangi mesaj türünü ve hangi isimi dinlediğini belirterek,
        # dinleme gerçekleştiğinde hangi fonksiyonu çalıştıracağı belirtilmektedir.
        self.subscription = self.create_subscription(
            String, "serial_motor", self.listener_callback, 10
        )

    # Dinleme gerçekleştiğinde çalışan fonksiyonun gerçekleştireceği eylemlerin bulunduğu fonksiyon.
    def listener_callback(self, msg):
        self.get_logger().info('I heard "%s"' % msg.data)
        self.ser.write(msg.data)



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