import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2
import numpy as np

class CameraPublisherNode(Node):
    def __init__(self):
        super().__init__('camera_publisher')
        self.publisher_ = self.create_publisher(Image, 'camera/image_raw', 10)
        self.timer = self.create_timer(1.0 / 30, self.publish_image)
        self.cv_bridge = CvBridge()
        self.cap = cv2.VideoCapture(0)

    def publish_image(self):
        ret, frame = self.cap.read()
        if ret:
            img_msg = self.cv_bridge.cv2_to_imgmsg(frame, encoding="bgr8")
            self.publisher_.publish(img_msg)

def main(args=None):
    rclpy.init(args=args)
    camera_publisher = CameraPublisherNode()
    rclpy.spin(camera_publisher)
    camera_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()

