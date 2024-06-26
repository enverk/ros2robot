from setuptools import find_packages, setup

package_name = 'ros2_bot'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='b1ack0d3ath',
    maintainer_email='dogrueyup2@gmail.com',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'serial_motor_node = ros2_bot.serial_motor_node:main',
            'serial_motor_node_test = ros2_bot.serial_motor_node_test:main',
            'serial_motor_node_convert = ros2_bot.serial_motor_node_convert:main',
            'serial_node_write_motor = ros2_bot.serial_node_write_motor:main',
            'serial_node_read_imu = ros2_bot.serial_node_read_imu:main',
            'serial_node_final = ros2_bot.serial_node_final:main'
        ],
    },
)