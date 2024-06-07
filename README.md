# ROS 2 Robot Project

## Kurulum ve Kullanım Kılavuzu

### 1. Raspberry Pi Imager Programını Kurma
Raspberry Pi imager programını bilgisayarınıza kurmak için [buraya tıklayın](https://www.raspberrypi.com/software/).

### 2. Ubuntu Server İmajını İndirme
En güncel Ubuntu 22.04.x Server imaj dosyasını indirmek için [buraya tıklayın](https://cdimage.ubuntu.com/releases/).

### 3. SD Kart Hazırlama
Raspberry Pi'ye Ubuntu 22.04 Server kurulumunu gerçekleştirmek için [bu talimatları](https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#2-prepare-the-sd-card) takip edin.

### 4. Kurulum ve Ayarlar

#### Robot için Kullanılan Tanımlamalar
- Hostname: `ros2robot`
- SSH: `Enable`
- Username: `ros2-robot`
- Password: `robot.81`
- Configure Wireless LAN: Raspberry'nin açılırken bağlanmasını istediğiniz WiFi'nin SSID ve şifresini giriniz. Bu kısımlar için daha sonradan manuel müdahale edilecektir.
- Wireless LAN Country: `TR`

#### Server için Kullanılan Tanımlamalar
- Hostname: `ros2server`
- SSH: `Enable`
- Username: `ros2-server`
- Password: `server.81`
- Configure Wireless LAN: Raspberry'nin açılırken bağlanmasını istediğiniz WiFi'nin SSID ve şifresini giriniz. Bu kısımlar için daha sonradan manuel müdahale edilecektir.
- Wireless LAN Country: `TR`

### 5. WiFi Şifre Kontrolü
WiFi şifre bilgisi düzgün yazılmamış olabilir. Bunu kontrol etmek için yazma işlemi bittikten sonra SD kartı bilgisayarınızdan çıkarıp tekrar takın. SD kartın `system-boot` dizinine gidin ve `network-config` dosyasını açın. Imager programında kaydettiğiniz WiFi şifresini kontrol edin. Gerekli kontrolü veya değişikliği yaptıktan sonra SD kartı bilgisayarınızdan çıkarıp Raspberry'nize takabilirsiniz.

### 6. Raspberry'ye SSH ile Bağlanma
Raspberry'ye SSH ile uzaktan bağlanmak için IP bilgisi gerekecektir. Bu yüzden SD kartı Raspberry'ye takıp, güç vermeden önce ağınıza bağlı cihazların listesini ve IP adreslerini kontrol edin. Raspberry'yi çalıştırın ve ilk kurulumun tamamlanmasını bekleyin (5 ila 10 dakika sürebilir). Ağınıza yeni bir cihaz bağlandıysa, Raspberry'nin kurulumu düzgün bir biçimde tamamlanmış demektir. Ağınıza yeni bağlanan cihazın IP adresini bir yere kaydedin.

### 7. SSH ile Bağlanma
Herhangi bir SSH aracı (Windows: Putty, Ubuntu: Terminal) ile Raspberry'ye bağlanmak için IP adresini ve kullanıcı şifresini kullanın.

### 8. Güncellemeler ve Yeniden Başlatma
Raspberry'nin konsoluna eriştikten sonra, gerekli güncellemelerin yapılması ve Raspberry'nin yeniden başlatılması gerekmektedir. Bunun için aşağıdaki komutu konsolda çalıştırınız:

```sh
sudo apt update -y && sudo apt upgrade -y
sh

Güncelleme bittikten sonra çıkan pencereleri Enter tuşuna basarak geçiniz. Raspberry'yi yeniden başlatmak için aşağıdaki komutu çalıştırınız:

```sh
sudo reboot
sh

Raspberry yeniden başlayıp tekrar ağınıza bağlandıktan sonra SSH ile IP adresini ve şifrenizi kullanarak tekrar Raspberry'nin komut satırına erişin.

9. Proje Dosyalarını İndirme ve Kurulum
Gerekli güncellemeleri yaptıktan sonra, proje ve kurulum dosyalarını indirmek için aşağıdaki komutları çalıştırın:

```sh
sudo apt install git -y 
git clone https://github.com/enverk/ros2robot.git ~/ros2robot/src/ros2robot
sh

Proje dosyalarında gerekli kurulumlar bulunmaktadır. Kurulumları yapabilmek için öncelikle dosyaların yürütülebilir hale getirilmesi gerekmektedir.

Robot İçin
```sh
sudo chmod +x ~/ros2robot/src/ros2robot/installer/robot_installation.sh
~/ros2robot/src/ros2robot/installer/robot_installation.sh
sh
Server İçin
```sh
sudo chmod +x ~/ros2robot/src/ros2robot/installer/server_installation.sh
~/ros2robot/src/ros2robot/installer/server_installation.sh
sh
Yukarıdaki adımları tamamladıktan sonra kurulum gerçekleştirilmiş olacaktır.
