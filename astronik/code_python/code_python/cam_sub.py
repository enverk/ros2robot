import cv2
import rclpy  # Python Client Library for ROS 2
from rclpy.node import Node  # Handles the creation of nodes
from sensor_msgs.msg import Image  # Image is the message type
from example_interfaces.msg import String
from astronik_interfaces.msg import CamPoints
from cv_bridge import CvBridge  # Package to convert between ROS and OpenCV Images
import numpy as np
from pyzbar.pyzbar import decode


class ImageSubscriber(Node):
    def __init__(self):
        super().__init__('cam_sub')
        self.sub_cam_ = self.create_subscription(
            Image, 'video_frames', self.listener_callback_cam, 1)
        self.sub_qr_ = self.create_subscription(
            String, 'data_frame', self.listener_callback_data, 20)
        self.sub_points_ = self.create_subscription(
            CamPoints, 'points_frame', self.listener_callback_points, 20)
        self.sub_cam_
        self.sub_qr_
        self.sub_points_
        self.frame = np.zeros((320, 240, 3), np.uint8)
        self.bridge = CvBridge()
        self.get_qr = 0
        self.get_logger().info('Cam Sub Started')

    def listener_callback_cam(self, data):
        self.frame = self.bridge.imgmsg_to_cv2(data)
        imgray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        ret, thresh = cv2.threshold(imgray, 20, 255, cv2.THRESH_BINARY_INV)
        cv2.imshow("thresh", thresh)
        cv2.waitKey(1)

    def listener_callback_data(self, msg):
        self.get_qr += 1
        self.get_logger().info('I heard ' + str(self.get_qr) + '. Qr: ' + msg.data)

    def listener_callback_points(self, msg):
        point_t_r = msg.point_top_right_x, msg.point_top_right_y
        point_t_l = msg.point_top_left_x, msg.point_top_left_y
        point_r_t = msg.point_right_top_x, msg.point_right_top_y
        point_r_b = msg.point_right_back_x, msg.point_right_back_y
        point_l_t = msg.point_left_top_x, msg.point_left_top_y
        point_l_b = msg.point_left_back_x, msg.point_left_back_y

        if point_t_r[0] != 0 or point_t_r[1] != 0 or point_t_l[0] != 0 or point_t_l[1] != 0:
            self.frame = cv2.line(self.frame, point_t_r,
                                  point_t_l, (0, 0, 255), 2)

        if point_r_t[0] != 0 or point_r_t[1] != 0 or point_r_b[0] != 0 or point_r_b[1] != 0:
            self.frame = cv2.line(self.frame, point_r_t,
                                  point_r_b, (0, 0, 255), 2)

        if point_l_t[0] != 0 or point_l_t[1] != 0 or point_l_b[0] != 0 or point_l_b[1] != 0:
            self.frame = cv2.line(self.frame, point_l_t,
                                  point_l_b, (0, 0, 255), 2)

        img = cv2.resize(self.frame, (640, 480))
        cv2.imshow("camera", img)
        cv2.waitKey(1)


def main(args=None):
    rclpy.init(args=args)
    image_subscriber = ImageSubscriber()
    rclpy.spin(image_subscriber)
    image_subscriber.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
