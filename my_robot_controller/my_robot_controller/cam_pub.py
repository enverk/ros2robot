import rclpy
from rclpy.node import Node
import cv2
from flask import Flask
from flask_socketio import SocketIO
from base64 import b64encode
import threading
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

class VideoStreamNode(Node):
    def __init__(self):
        super().__init__('video_stream_node')
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  # Daha düşük çözünürlük
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        if not self.cap.isOpened():
            self.get_logger().error('Kamera açılamıyor')
            exit()
        else:
            self.get_logger().info('Kamera başarıyla açıldı')

    def capture_video(self):
        frame_rate = 10  # saniyede 10 kare
        prev = 0
        while rclpy.ok():
            time_elapsed = time.time() - prev
            ret, frame = self.cap.read()
            if not ret:
                self.get_logger().error("Kamera'dan görüntü alınamıyor")
                continue
            if time_elapsed > 1./frame_rate:
                prev = time.time()
                _, buffer = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), 50])
                encoded_image = b64encode(buffer).decode('utf-8')
                socketio.emit('video_frame', {'data': encoded_image})

def main(args=None):
    rclpy.init(args=args)
    node = VideoStreamNode()
    flask_thread = threading.Thread(target=lambda: socketio.run(app, host='0.0.0.0', port=3002))
    camera_thread = threading.Thread(target=node.capture_video)
    flask_thread.start()
    camera_thread.start()
    try:
        flask_thread.join()
        camera_thread.join()
    except KeyboardInterrupt:
        print('Interrupted')
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
