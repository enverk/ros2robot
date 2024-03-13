import rclpy
from rclpy.node import Node
from example_interfaces.msg import String
from astronik_interfaces.msg import CamPoints
from time import sleep
import serial


class KontrolNode(Node):
    def __init__(self):
        super().__init__("kontrol")
        self.sub_points_ = self.create_subscription(
            CamPoints, 'points_frame', self.listener_callback_points, 20)
        self.serial_mega = serial.Serial('/dev/ttyACM0', 115200, timeout=.1)
        self.serial_mega.reset_input_buffer()
        self.timer_serial_get = self.create_timer(0.1, self.serial_get)
        self.timer_serial_set = self.create_timer(0.1, self.serial_set)
        self.hub_motor_r = int()
        self.hub_motor_l = int()
        self.point_t_r = 0, 0
        self.point_t_l = 0, 0
        self.point_r_t = 0, 0
        self.point_r_b = 0, 0
        self.point_l_t = 0, 0
        self.point_l_b = 0, 0

    def listener_callback_points(self, msg):
        self.point_t_r = msg.point_top_right_x, msg.point_top_right_y
        self.point_t_l = msg.point_top_left_x, msg.point_top_left_y
        self.point_r_t = msg.point_right_top_x, msg.point_right_top_y
        self.point_r_b = msg.point_right_back_x, msg.point_right_back_y
        self.point_l_t = msg.point_left_top_x, msg.point_left_top_y
        self.point_l_b = msg.point_left_back_x, msg.point_left_back_y

    def serial_get(self):
        sleep(.01)
        self.sensors = self.serial_mega.readline().decode('utf-8').rstrip()
        sensor_string = self.sensors[15:19]
        print(sensor_string)
        self.degree = (int(sensor_string)-1100)*360/900

    def serial_set(self):
        self.speed_hub_r = 2000
        self.speed_hub_l = 2000

        if self.point_t_r[0] != 0 and self.point_t_l[0] != 0:
            self.size_l = self.point_t_l[0]
            self.size_r = 160-self.point_t_r[0]
            self.size_t = self.point_t_r[0]-self.point_t_l[0]
            self.speed_tork_r = 20*self.size_l/self.size_r
            self.speed_tork_l = 20*self.size_r/self.size_l
            if self.size_l < self.size_r:
                self.speed_hub_r = self.speed_hub_r-self.speed_tork_r
            elif self.size_r < self.size_l:
                self.speed_hub_l = self.speed_hub_l-self.speed_tork_l
            self.serial_mega.write(
                str(self.speed_hub_r)+","+str(self.speed_hub_l))

        elif self.point_r_t and self.point_r_b:
            degree_prev = self.degree
            degree_next = degree_prev+90
            if degree_next > 360:
                degree_next = degree_prev-360
            self.serial_mega.writelines("1100,"+str(self.speed_hub_l))
            while self.degree < degree_next+5 and self.degree > degree_next-5:
                pass

        elif self.point_l_t and self.point_l_b:
            degree_prev = self.degree
            degree_next = degree_prev-90
            if degree_next < 0:
                degree_next = degree_prev+360
            self.serial_mega.write(str(self.speed_hub_r)+",1100")
            while self.degree < degree_next+5 and self.degree > degree_next-5:
                pass

        self.serial_mega.write(
            String(int(self.speed_hub_r)+","+int(self.speed_hub_l)))


def main(args=None):
    rclpy.init(args=args)
    node = KontrolNode()
    rclpy.spin(node)
    rclpy.shutdown()


if __name__ == "__main__":
    main()
