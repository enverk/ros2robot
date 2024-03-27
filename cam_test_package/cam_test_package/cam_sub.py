import cv2
import rclpy  # Python Client Library for ROS 2
from rclpy.node import Node  # Handles the creation of nodes
from sensor_msgs.msg import Image  # Image is the message type
from example_interfaces.msg import String
from cv_bridge import CvBridge  # Package to convert between ROS and OpenCV Images
import numpy as np
from pyzbar.pyzbar import decode


class ImageSubscriber(Node):
    def __init__(self):
        super().__init__("cam_sub")
        self.sub_cam_ = self.create_subscription(
            Image, "video_frames", self.listener_callback_cam, 1
        )
        self.sub_qr_ = self.create_subscription(
            String, "data_frame", self.listener_callback_data, 20
        )
        self.sub_cam_
        self.sub_qr_
        self.frame = np.zeros((320, 240, 3), np.uint8)
        self.bridge = CvBridge()
        self.get_qr = 0
        self.get_logger().info("Cam Sub Started")

    def listener_callback_cam(self, data):
        self.frame = self.bridge.imgmsg_to_cv2(data)
        imgray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        ret, thresh = cv2.threshold(imgray, 20, 255, cv2.THRESH_BINARY_INV)
        cv2.imshow("thresh", thresh)
        cv2.waitKey(1)

    def listener_callback_data(self, msg):
        self.get_qr += 1
        self.get_logger().info("I heard " + str(self.get_qr) + ". Qr: " + msg.data)


def main(args=None):
    rclpy.init(args=args)
    image_subscriber = ImageSubscriber()
    rclpy.spin(image_subscriber)
    image_subscriber.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
