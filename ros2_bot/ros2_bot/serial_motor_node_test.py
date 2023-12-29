# ROS2 istemci kütüphanelerini dahil edip gerekli nesneler isimlendirilmektedir.
import rclpy
from rclpy.node import Node

# ROS2 içerisinde bulunan yada proje amaçlı oluşturulan mesaj türleri kaynak koda tanıtılmaktadır.
from std_msgs.msg import String


# ROS2 içerisinde bir Node(Düğüm) Nesnesi oluşturularak gerekli nitelikler eklenmektedir.
# Bu kaynak kodunda iki tane yayıncı yazılımı gerçekleştirilerek,
# farklı düğümlerin farklı yayınları dinlemesi amaçlanmaktadır.
class Serial_Motor_Node_Test(Node):
    def __init__(self):
        super().__init__("Serial_Motor_Node_Test")

        # Altta bulunan iki kod satırında yapılacak yayınların,
        # hangi mesaj türü ve hangi isim ile yayın yapılacakları belirlenmiştir.
        self.publisher_one_ = self.create_publisher(String, "serial_motor", 10)

    # Birinci yayıncının belirlenen periyotlarda ne yayınlayacağı belirtilmiştir.
    def timer_callback_one_(self, data):
        msg_one_ = String()
        msg_one_.data = data
        self.publisher_one_.publish(msg_one_)
        self.get_logger().info('Published one: "%s"' % msg_one_.data)


# Son olarak ana fonksiyon ve içerisinde yazılan Düğüme ait bir nesne oluşturulmuştur.
def main(args=None):
    rclpy.init(args=args)
    publisher = Serial_Motor_Node_Test()
    print("basladi")
    publisher.get_logger().info("basladi")
    data = "ILERI"
    while True:
        data = input()
        print(data)
        publisher.timer_callback_one_(data)

    rclpy.spin(publisher)
    # Düğüm sonlandığında Düğüm silinmiştir.
    publisher.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
