# Importing ROS2 and Required Libraries
import math
import rclpy
from serial import Serial
from rclpy.node import Node
from decimal import Decimal

# Importing ROS2 Message Objects to Use
from std_msgs.msg import String


# Creating a Class for the ROS2 Node that Listens to the Motion Information Coming from ROS2,
# Calculates the Motor Speeds and Transfers it to Arduino via Serial Communication
class Serial_Node_Write_Motor(Node):
    def __init__(self):
        super().__init__("Serial_Node_Write_Motor")

        # Creating a Serial Object to Communicate with Arduino
        self.ser = Serial("/dev/ttyUSB0", 115200, timeout=0.009)
        self.get_logger().info(self.ser.readline())

        # Determining Which Topic to Subscribe to in the ROS2 Network and
        # Determining Which Function to Run When Broadcasting
        self.subscription_motor = self.create_subscription(
            String, "serial_motor", self.listener_callback_subscription_motor, 2
        )

        # Creating a Timer for the Function to Be Run 10 Times a Second to
        # Check Whether Any Data Arrives from Serial Communication
        self.timer_serial_get = self.create_timer(0.1, self.serial_get)

    # Function Executed When Data Comes from the Topic on ROS2
    def listener_callback_subscription_motor(self, msg):
        self.get_logger().info('I heard "%s"' % msg.data)
        message = msg.data
        x = Decimal(message[: message.index(",")])
        y = Decimal(message[message.index(",") + 1 :])
        left_value, right_value = self.convert(x, y)

        if left_value < 0:
            left_flag = True
            left_value *= -1
        else:
            left_flag = False

        if right_value < 0:
            right_flag = True
            right_value *= -1
        else:
            right_flag = False

        self.left_speed = int(10000 - (left_value * 8325))
        self.right_speed = int(10000 - (right_value * 8325))

        if left_flag:
            self.left_speed *= -1
        if right_flag:
            self.right_speed *= -1

        self.serial_set()

    # Conversion Function that Calculates the Joystick Coordinate Data,
    # Right and Left Motors, Speeds and Directions Coming from ROS2
    def convert(self, x, y):
        r = math.hypot(x, y)
        t = math.atan2(y, x)
        t -= math.pi / 4
        left = r * math.cos(t)
        right = r * math.sin(t)
        left = left * math.sqrt(2)
        right = right * math.sqrt(2)
        return left, right

    # Function that Sends the Calculated Motor Speed ​​and Directions to Arduino via Serial Communication
    def serial_set(self):
        speed = str(self.left_speed) + "," + str(self.right_speed)
        self.get_logger().info(speed)
        self.ser.write(bytearray(speed, "ascii"))

    # Function That Reads and Informs Data When Data Comes from Arduino via Serial Communication
    def serial_get(self):
        if self.ser.in_waiting:
            self.get_logger().info("I Heard: " + self.ser.readline().rstrip())


def main(args=None):
    # Creating and Running a ROS2 Node
    rclpy.init(args=args)
    serial_node_write_motor = Serial_Node_Write_Motor()
    rclpy.spin(serial_node_write_motor)

    # Destruction of ROS2 and Serial Communication Objects
    serial_node_write_motor.ser.close()
    serial_node_write_motor.destroy_node()
    rclpy.shutdown()


if __name__ == "__main__":
    main()
