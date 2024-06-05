# ROS2 istemci kütüphanelerini dahil edip gerekli nesneler isimlendirilmektedir.
import rclpy
from rclpy.node import Node
import cv2
import mediapipe as mp
import numpy as np


# ROS2 içerisinde bulunan yada proje amaçlı oluşturulan mesaj türleri kaynak koda tanıtılmaktadır.
from std_msgs.msg import String


# ROS2 içerisinde bir Node(Düğüm) Nesnesi oluşturularak gerekli nitelikler eklenmektedir.
# Bu kaynak kodunda iki tane yayıncı yazılımı gerçekleştirilerek,
# farklı düğümlerin farklı yayınları dinlemesi amaçlanmaktadır.
class HumanTracking(Node):
	def __init__(self):
		super().__init__("human_tracking")
		self.publisher_ = self.create_publisher(String, "serial_motor", 10)
		self.timer_period = 0.1  
		self.mp_drawing = mp.solutions.drawing_utils
		self.mp_pose = mp.solutions.pose
		self.cap=cv2.VideoCapture(0)
		self.timer = self.create_timer(self.timer_period, self.timer_callback)
		self.pose = self.mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)


    # Birinci yayıncının belirlenen periyotlarda ne yayınlayacağı belirtilmiştir.
	def timer_callback(self):
		ret, frame = self.cap.read()
		if not ret:
			return

		# Recolor image to RGB
		image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
		image.flags.writeable = False

		# Make detection
		results = self.pose.process(image)

		# Recolor back to BGR
		image.flags.writeable = True
		image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

		# Extract landmarks
		try:
			landmarks = results.pose_landmarks.landmark

			# Get shoulder coordinates
			left_shoulder = [landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
							landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
			right_shoulder = [landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
							landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]

			# Calculate shoulder width
			shoulder_width = np.linalg.norm(np.array(left_shoulder) - np.array(right_shoulder))

			# Calculate shoulder midpoint
			shoulder_midpoint_x = int((left_shoulder[0] + right_shoulder[0]) / 2 * frame.shape[1])
			shoulder_midpoint_y = int((left_shoulder[1] + right_shoulder[1]) / 2 * frame.shape[0])

			# Draw circle at shoulder midpoint
			cv2.circle(image, (shoulder_midpoint_x, shoulder_midpoint_y), 5, (255, 0, 0), -1)

			# Draw reference point at the center of the frame
			center_x = frame.shape[1] // 2
			center_y = frame.shape[0] // 3  # Yarısı yerine üçte birini alıyoruz
			cv2.circle(image, (center_x, center_y), 5, (0, 0, 255), -1)

			# Normalize the shoulder midpoint x-coordinate between -1 and 1
			direction_x = 2 * (shoulder_midpoint_x / frame.shape[1] - 0.5)  # Normalized between -1 and 1
			direction_y = 2 * (shoulder_midpoint_y / frame.shape[0] - 0.5)  # Normalized between -1 and 1

			# Calculate distance along X and Y axes
			distance_x_normalized = (shoulder_midpoint_x / frame.shape[1] - center_x / frame.shape[1]) * 2
			distance_y_normalized = (center_y / frame.shape[0] - shoulder_midpoint_y / frame.shape[0]) * 2

			a = (0.3 - shoulder_width) * distance_x_normalized
			b = (0.3 - shoulder_width) * distance_y_normalized

			print("Distance along X axis:", distance_x_normalized)
			print("Distance along Y axis:", distance_y_normalized)
			print("Shoulder Width:", shoulder_width)
			print("Direction (X, Y):", direction_x, direction_y)

			# Use direction_x and direction_y to control your robot's movement

			# Render detections
			self.mp_drawing.draw_landmarks(image, results.pose_landmarks, self.mp_pose.POSE_CONNECTIONS,
								self.mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
								self.mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
								)
			msg = String()
			msg.data = f"{a},{b}"
			self.publisher_.publish(msg)

		except Exception as e:
			print("Error:", e)

		
		
	
	
		
# Son olarak ana fonksiyon ve içerisinde yazılan Düğüme ait bir nesne oluşturulmuştur.
def main(args=None):
    rclpy.init(args=args)
    human_tracking= HumanTracking()
    rclpy.spin(human_tracking)

    # Düğüm sonlandığında Düğüm silinmiştir.
    human_tracking.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
