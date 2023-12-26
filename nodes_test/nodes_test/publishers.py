# ROS2 istemci kütüphanelerini dahil edip gerekli nesneler isimlendirilmektedir.
import rclpy
from rclpy.node import Node

# ROS2 içerisinde bulunan yada proje amaçlı oluşturulan mesaj türleri kaynak koda tanıtılmaktadır.
from std_msgs.msg import String


# ROS2 içerisinde bir Node(Düğüm) Nesnesi oluşturularak gerekli nitelikler eklenmektedir.
# Bu kaynak kodunda iki tane yayıncı yazılımı gerçekleştirilerek,
# farklı düğümlerin farklı yayınları dinlemesi amaçlanmaktadır.
class Publishers(Node):
    def __init__(self):
        super().__init__("Publishers")

        # Altta bulunan iki kod satırında yapılacak yayınların,
        # hangi mesaj türü ve hangi isim ile yayın yapılacakları belirlenmiştir.
        self.publisher_one_ = self.create_publisher(String, "publication_one", 10)
        self.publisher_two_ = self.create_publisher(String, "publication_two", 10)

        # Hangi yayının hangi periyotlar ile yayın yapacağının belirlenmişti.
        timer_period_one_ = 0.5
        timer_period_two_ = 1

        # Belirlenen periyotlarda hangi fonksiyonların çalışacağı belirtilmiştir.
        self.timer_one_ = self.create_timer(timer_period_one_, self.timer_callback_one_)
        self.timer_two_ = self.create_timer(timer_period_two_, self.timer_callback_two_)

        # Ek olarak yayınlarda kullanmak amacı ile değişkenler oluşturulmuştur.
        self.published_number_one_ = 0
        self.published_number_two_ = 0

    # Birinci yayıncının belirlenen periyotlarda ne yayınlayacağı belirtilmiştir.
    def timer_callback_one_(self):
        msg_one_ = String()
        msg_one_.data = "Publication one: %d" % self.published_number_one_
        self.publisher_one_.publish(msg_one_)
        self.get_logger().info('Published one: "%s"' % msg_one_.data)
        self.published_number_one_ += 1

    # İkinci yayıncının ne yayınlayacağı belirtilmiştir.
    def timer_callback_two_(self):
        msg_two_ = String()
        msg_two_.data = "Publication two: %d" % self.published_number_two_
        self.publisher_two_.publish(msg_two_)
        self.get_logger().info('Published two: "%s"' % msg_two_.data)
        self.published_number_two_ += 1


# Son olarak ana fonksiyon ve içerisinde yazılan Düğüme ait bir nesne oluşturulmuştur.
def main(args=None):
    rclpy.init(args=args)
    publishers = Publishers()
    rclpy.spin(publishers)

    # Düğüm sonlandığında Düğüm silinmiştir.
    publishers.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
