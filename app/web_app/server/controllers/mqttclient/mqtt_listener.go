package controllers

import (
	"fmt"
	"os"
	MQTT "github.com/eclipse/paho.mqtt.golang"

)

var messageHandler MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
	fmt.Printf("MQTT'den Alınan Mesaj: %s\n", msg.Payload())
}

func Listener() {
	broker := "tcp://192.168.43.235:1883"  // MQTT broker ve port numarası

	opts := MQTT.NewClientOptions()
	opts.AddBroker(broker)
	opts.SetDefaultPublishHandler(messageHandler)

	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("Bağlantı hatası:", token.Error())
		os.Exit(1)
	}
	fmt.Println("Broker ile bağlantı kuruldu")

	topic := "mqtt_topic"  // MQTT topic adı
	if token := client.Subscribe(topic, 0, nil); token.Wait() && token.Error() != nil {
		fmt.Println("Abonelik hatası:", token.Error())
		os.Exit(1)
	}

	// Sonsuz döngüde mesajları dinle
	select {}
}