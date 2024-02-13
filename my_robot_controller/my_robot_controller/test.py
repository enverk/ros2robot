import paho.mqtt.client as mqtt

# MQTT broker adresi ve bağlantı parametreleri
broker_address = "localhost"  # Broker adresini buraya girin
port = 1883  # Broker port numarası
topic = "/chatter"  # Dinlenecek topic

# Bağlantı başarılı olduğunda tetiklenecek olay
def on_connect(client, userdata, flags, rc):
    print("Bağlandı! Result Code: " + str(rc))
    client.subscribe(topic)

# Yeni bir mesaj geldiğinde tetiklenecek olay
def on_message(client, userdata, msg):
    print("Yeni mesaj alındı! Topic: " + msg.topic + " Payload: " + str(msg.payload.decode("utf-8")))

# MQTT istemci oluşturulması ve olayların tanımlanması
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Broker'a bağlanma
client.connect(broker_address, port)

# Sürekli olarak mesajları dinleme
client.loop_forever()
