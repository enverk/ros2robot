import cv2
import mediapipe as mp
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

cap = cv2.VideoCapture(0)

# Setup mediapipe instance
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()

        # Recolor image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False

        # Make detection
        results = pose.process(image)

        # Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Extract landmarks
        try:
            landmarks = results.pose_landmarks.landmark

            # Get shoulder coordinates
            left_shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                             landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            right_shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                              landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]

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

            a = 0.3 - shoulder_width * distance_x_normalized
            b = 0.3 - shoulder_width * distance_y_normalized

            print("Distance along X axis:", distance_x_normalized)
            print("Distance along Y axis:", distance_y_normalized)
            print("Shoulder Width:", shoulder_width)
            print("Direction (X, Y):", direction_x, direction_y)

            # Use direction_x and direction_y to control your robot's movement

        except Exception as e:
            print("Error:", e)

        # Render detections
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                  mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                                  mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
                                  )

        cv2.imshow('Mediapipe Feed', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()