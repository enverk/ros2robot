import cv2
import rclpy  # Python Client Library for ROS 2
from rclpy.node import Node  # Handles the creation of nodes
from sensor_msgs.msg import Image  # Image is the message type
from example_interfaces.msg import String
from cv_bridge import CvBridge  # Package to convert between ROS and OpenCV Images
import numpy as np
from pyzbar.pyzbar import decode


class ImagePublisher(Node):

    def __init__(self):
        super().__init__('cam_pub')
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 160)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 120)
        self.pub_qr_ = self.create_publisher(
            String, 'data_frame', 20)
        self.pub_image_ = self.create_publisher(
            Image, 'video_frames', 1)
        self.timer_period_ = 0.1
        self.read_qr = 0
        self.string_qr = ''
        self.timer = self.create_timer(self.timer_period_, self.timer_callback)
        self.bridge = CvBridge()
        self.get_logger().info('Cam Pub Started')

    def timer_callback(self):
        ret, frame = self.cap.read()
        if ret == True:
            read_string_qr = ''
            self.pub_image_.publish(self.bridge.cv2_to_imgmsg(frame))
            for barcode in decode(frame):
                read_string_qr = barcode.data.decode('utf-8')

            if self.string_qr != read_string_qr and read_string_qr:
                self.string_qr = read_string_qr
                msg_qr = String()
                self.read_qr += 1
                msg_qr.data = read_string_qr
                self.pub_qr_.publish(msg_qr)
                self.get_logger().info('I Publish ' + str(self.read_qr) + '. Qr: ' + msg_qr.data)


def main(args=None):
    rclpy.init(args=args)
    image_publisher = ImagePublisher()
    rclpy.spin(image_publisher)
    image_publisher.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
