#!/usr/bin/python3
import rclpy
from rclpy.node import Node
import paho.mqtt.client as mqtt
from std_msgs.msg import String

class MqttRosBridge(Node):
    def __init__(self):
        super().__init__('mqtt_ros_bridge')
        self.get_logger().info("ROS 2 MQTT Bridge Başlatıldı")
        
        # MQTT Client ayarları
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = self.on_mqtt_connect
        self.mqtt_client.on_message = self.on_mqtt_message
        self.mqtt_client.connect("localhost", 1883)
        self.mqtt_client.subscribe("controller/movement")  

        # ROS 2 Publisher
        self.publisher_ = self.create_publisher(String, 'serial_motor', 10)

        # MQTT döngüsünü başlat
        self.mqtt_client.loop_start()

    def on_mqtt_connect(self, client, userdata, flags, rc):
        if rc == 0:
            self.get_logger().info("MQTT Broker'a bağlanıldı")
        else:
            self.get_logger().error("MQTT Broker'a bağlanılamadı, hata kodu: " + str(rc))

    def on_mqtt_message(self, client, userdata, msg):
        mqtt_message = msg.payload.decode()
        self.get_logger().info('Alınan MQTT Mesajı: ' + mqtt_message)
        
        # MQTT mesajını ROS 2 topic'ine yayınlama
        ros_message = String()
        ros_message.data = mqtt_message
        self.publisher_.publish(ros_message)
        

def main(args=None):
    rclpy.init(args=args)
    mqtt_ros_bridge = MqttRosBridge()
    rclpy.spin(mqtt_ros_bridge)
    mqtt_ros_bridge.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
