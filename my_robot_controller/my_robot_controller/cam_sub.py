#!/usr/bin/python3



import rclpy

from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge
import cv2
from flask import Flask
from flask_socketio import SocketIO
import threading
from base64 import b64encode



app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")



class VideoStreamSubscriber(Node):
    def __init__(self):
        super().__init__('video_stream_subscriber')
        self.subscription = self.create_subscription(
            Image,
            '/video_frames',
            self.video_stream_callback,
            10)
        self.bridge = CvBridge()



    def video_stream_callback(self, msg):
        cv_image = self.bridge.imgmsg_to_cv2(msg, "bgr8")
        _, buffer = cv2.imencode('.jpg', cv_image, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
        encoded_image = b64encode(buffer).decode('utf-8')
        socketio.emit('video_frame', {'data': encoded_image})





def main(args=None):

    rclpy.init(args=args)
    video_stream_subscriber = VideoStreamSubscriber()
    def spin():
        rclpy.spin(video_stream_subscriber)
    t = threading.Thread(target=spin)
    t.start()
    socketio.run(app, host='0.0.0.0', port=3001)
    video_stream_subscriber.destroy_node()
    rclpy.shutdown()



if __name__ == '__main__':

    main()

