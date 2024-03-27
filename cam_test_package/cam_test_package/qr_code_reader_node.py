import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2
from pyzbar.pyzbar import decode

class QRCodeReaderNode(Node):
    def __init__(self):
        super().__init__('qr_code_reader')
        self.subscription = self.create_subscription(Image, 'camera/image_raw', self.image_callback, 10)
        self.cv_bridge = CvBridge()

    def image_callback(self, msg):
        try:
            frame = self.cv_bridge.imgmsg_to_cv2(msg, 'bgr8')
            decoded_objects = decode(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY))
            for obj in decoded_objects:
                x, y, w, h = obj.rect
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                qr_data = obj.data.decode('utf-8')
                self.get_logger().info('QR Code: %s' % qr_data)
            cv2.imshow('QR Code Reader', frame)
            cv2.waitKey(1)
        except Exception as e:
            self.get_logger().error('Error processing image: %s' % e)

def main(args=None):
    rclpy.init(args=args)
    qr_code_reader = QRCodeReaderNode()
    rclpy.spin(qr_code_reader)
    qr_code_reader.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
