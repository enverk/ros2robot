#!/usr/bin/python3
import rclpy
from rclpy.node import Node
from rclpy.timer import Timer
from std_msgs.msg import String
import paho.mqtt.client as mqtt

class RosToMqttBridge(Node):
    def __init__(self):
        super().__init__('ros_to_mqtt_bridge')
        self.get_logger().info("ROS 2'den MQTT'ye Köprü Başlatıldı")

        # MQTT Client ayarları
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.connect("localhost", 1883)  # MQTT broker adresi ve port numarası
        self.mqtt_client.loop_start()

        # Periyodik olarak MQTT'ye mesaj gönderme
        self.timer = self.create_timer(5, self.timer_callback)  # Her 5 saniyede bir çalışacak

    def timer_callback(self):
        # MQTT'ye belirli bir mesajı yayınlama
        mqtt_message = "Ben MQTT'den yazıyorum"
        self.mqtt_client.publish("mqtt_topic", mqtt_message)
        self.get_logger().info('MQTT\'ye Mesaj Gönderildi: "%s"' % mqtt_message)

def main(args=None):
    rclpy.init(args=args)
    ros_to_mqtt_bridge = RosToMqttBridge()
    rclpy.spin(ros_to_mqtt_bridge)
    ros_to_mqtt_bridge.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
