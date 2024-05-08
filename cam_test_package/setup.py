from setuptools import setup

package_name = 'cam_test_package'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='b1ack0d3ath',
    maintainer_email='b1ack0d3ath@todo.todo',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'cam_pub = cam_test_package.cam_pub:main',
            'cam_sub = cam_test_package.cam_sub:main',
            'qr_pub = cam_test_package.qr_code_publisher_node:main',
            'qr_sub = cam_test_package.qr_code_reader_node:main'
        ],
    },
)
