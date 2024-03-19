import cv2
import rclpy  # Python Client Library for ROS 2
from rclpy.node import Node  # Handles the creation of nodes
from sensor_msgs.msg import Image  # Image is the message type
from example_interfaces.msg import String
from astronik_interfaces.msg import CamPoints
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
        self.pub_points_ = self.create_publisher(
            CamPoints, 'points_frame', 20)
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

            imgray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            ret, thresh = cv2.threshold(imgray, 20, 255, cv2.THRESH_BINARY_INV)

            contours, hierarchy = cv2.findContours(
                thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            point_t_r = [0, 0]
            point_t_l = [0, 0]
            point_r_t = [0, 0]
            point_r_b = [0, 0]
            point_l_t = [0, 0]
            point_l_b = [0, 0]

            top_x_l = 160
            top_x_r = 0
            rig_y_t = 120
            rig_y_b = 0
            lef_y_t = 120
            lef_y_b = 0

            for cnt in contours:
                points = cnt.reshape(-1, 2)
                for point in points:
                    if point[1] < 5:
                        if top_x_r < point[0]:
                            point_t_r = point
                            top_x_r = point[0]

                        if top_x_l > point[0]:
                            point_t_l = point
                            top_x_l = point[0]

                    if point[0] > 155:
                        if rig_y_t > point[1]:
                            point_r_t = point
                            rig_y_t = point[1]

                        if rig_y_b < point[1]:
                            point_r_b = point
                            rig_y_b = point[1]

                    if point[0] < 5:
                        if lef_y_t > point[1]:
                            point_l_t = point
                            lef_y_t = point[1]

                        if lef_y_b < point[1]:
                            point_l_b = point
                            lef_y_b = point[1]

            msg_points = CamPoints()

            msg_points.point_top_right_x = int(point_t_r[0])
            msg_points.point_top_right_y = int(point_t_r[1])
            msg_points.point_top_left_x = int(point_t_l[0])
            msg_points.point_top_left_y = int(point_t_l[1])
            msg_points.point_right_top_x = int(point_r_t[0])
            msg_points.point_right_top_y = int(point_r_t[1])
            msg_points.point_right_back_x = int(point_r_b[0])
            msg_points.point_right_back_y = int(point_r_b[1])
            msg_points.point_left_top_x = int(point_l_t[0])
            msg_points.point_left_top_y = int(point_l_t[1])
            msg_points.point_left_back_x = int(point_l_b[0])
            msg_points.point_left_back_y = int(point_l_b[1])

            self.pub_points_.publish(msg_points)


def main(args=None):
    rclpy.init(args=args)
    image_publisher = ImagePublisher()
    rclpy.spin(image_publisher)
    image_publisher.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
