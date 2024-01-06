#!/usr/bin/python3
import cv2
import rclpy  # Python Client Library for ROS 2
from rclpy.node import Node  # Handles the creation of nodes
from sensor_msgs.msg import Image  # Image is the message type
from example_interfaces.msg import String
from cv_bridge import CvBridge  # Package to convert between ROS and OpenCV Images
import numpy as np
from pyzbar.pyzbar import decode


class ImageSubscriber(Node):
    def _init_(self):
        super()._init_('cam_sub')
        self.subscription_cam = self.create_subscription(
            Image, 'video_frames', self.listener_callback_cam, 1)
        self.subscription_data = self.create_subscription(
            String, 'data_frame', self.listener_callback_data, 10)
        self.subscription_cam
        self.subscription_data
        self.br = CvBridge()
        self.get_qr = 0
        self.get_logger().info('Cam Sub Started')

    def listener_callback_cam(self, data):
        current_frame = self.br.imgmsg_to_cv2(data)
        cv2.imshow("camera", current_frame)
        cv2.waitKey(1)

    def listener_callback_data(self, msg):
        self.get_qr += 1
        self.get_logger().info('I heard ' + str(self.get_qr) + '. Qr: ' + msg.data)


def main(args=None):
    rclpy.init(args=args)
    image_s = ImageSubscriber()
    rclpy.spin(image_s)
    image_s.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()