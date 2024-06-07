#Server Installation Sh

#ROS2 Humble Installation
sudo apt install software-properties-common -y
sudo add-apt-repository universe
sudo apt update -y && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
sudo apt update -y && sudo apt upgrade -y
sudo apt install ros-humble-ros-base python3-colcon-common-extensions python3-pip python3-opencv
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
echo "source /usr/share/colcon_cd/function/colcon_cd.sh" >> ~/.bashrc
echo "export _colcon_cd_root=/opt/ros/humble/" >> ~/.bashrc
source ~/.bashrc

#Mosquitto MQTT Broker Inastallation
sudo apt update -y && sudo apt full-upgrade -y && sudo apt install mosquitto mosquitto-clients -y
sudo bash -c 'echo "allow_anonymous true" >> /etc/mosquitto/conf.d/mosquitto.conf'
sudo bash -c 'echo "listener 1883 0.0.0.0" >> /etc/mosquitto/conf.d/mosquitto.conf'
sudo systemctl restart mosquitto.service

#GO Installation
wget -c https://go.dev/dl/go1.22.4.linux-arm64.tar.gz
sudo tar -C /usr/local/ -xzf go1.22.4.linux-arm64.tar.gz
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/.local/go
export PATH=$PATH:$HOME/go/bin
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc
echo "export GOPATH=$HOME/.local/go" >> ~/.bashrc
echo "export PATH=$PATH:$HOME/go/bin" >> ~/.bashrc

#Build Project
cd ~/ros2robot
colcon build --symlink-install
cd
echo "source ~/ros2robot/install/setup.bash" >> ~/.bashrc
source ~/.bashrc
