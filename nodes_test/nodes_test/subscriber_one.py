# ROS2 istemci kütüphanelerini dahil edip gerekli nesneler isimlendirilmektedir.
import rclpy
from rclpy.node import Node

# ROS2 içerisinde bulunan yada proje amaçlı oluşturulan mesaj türleri kaynak koda tanıtılmaktadır.
from std_msgs.msg import String


# ROS2 içerisinde bir Node(Düğüm) Nesnesi oluşturularak gerekli nitelikler eklenmektedir.
# Bu kaynak kodunda iki tane yayın yapan yayıncının,
# ilk yayınını dinleyen abonenin kodları yazılmaktadır.
class Subscriber_One(Node):
    def __init__(self):
        super().__init__("Subscriber_One")

        # Bu kod satırında dinleyicinin hangi mesaj türünü ve hangi isimi dinlediğini belirterek,
        # dinleme gerçekleştiğinde hangi fonksiyonu çalıştıracağı belirtilmektedir.
        self.subscription = self.create_subscription(
            String, "publication_one", self.listener_callback, 10
        )

    # Dinleme gerçekleştiğinde çalışan fonksiyonun gerçekleştireceği eylemlerin bulunduğu fonksiyon.
    def listener_callback(self, msg):
        self.get_logger().info('I heard "%s"' % msg.data)


# Son olarak ana fonksiyon ve içerisinde yazılan Düğüme ait bir nesne oluşturulmuştur.
def main(args=None):
    rclpy.init(args=args)
    subscriber_one = Subscriber_One()
    rclpy.spin(subscriber_one)

    # Düğüm sonlandığında Düğüm silinmiştir.
    subscriber_one.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
