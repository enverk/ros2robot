#Robot Installation Sh

#ROS2 Humble Installation
sudo apt install software-properties-common -y
sudo add-apt-repository universe
sudo apt update -y && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
sudo apt update -y && sudo apt upgrade -y
sudo apt install ros-humble-ros-base python3-colcon-common-extensions python3-pip python3-opencv -y
pip install mediapipe flask flask_socketio
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
echo "source /usr/share/colcon_cd/function/colcon_cd.sh" >> ~/.bashrc
echo "export _colcon_cd_root=/opt/ros/humble/" >> ~/.bashrc
source ~/.bashrc

#SlLidar A1 Installation
git clone https://github.com/Slamtec/sllidar_ros2.git ~/ros2robot/src/sllidar

#Build Project
cd ~/ros2robot
colcon build --symlink-install
cd
echo "source ~/ros2robot/install/setup.bash" >> ~/.bashrc
source ~/.bashrc
sudo usermod -a -G dialout ros2-robot
