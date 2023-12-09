from setuptools import find_packages, setup

package_name = 'nodes_test'

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
    description='ROS2 test',
    license='Lisans',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'publishers = nodes_test.publishers:main',
            'subscriber_one = nodes_test.subscriber_one:main',
            'subscriber_two = nodes_test.subscriber_two:main',
        ]
    },
)
