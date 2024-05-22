package controllers

import (
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var messageHandler MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
	fmt.Printf("MQTT'den Alınan Mesaj: %s\n", msg.Payload())
}

func Listener(broker string) error {

	opts := MQTT.NewClientOptions()
	opts.AddBroker(broker)
	opts.SetDefaultPublishHandler(messageHandler)

	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("Bağlantı hatası:", token.Error())
		return MQTT.ErrNotConnected
	}
	fmt.Println("Broker ile bağlantı kuruldu")

	topic := "mqtt_topic"
	if token := client.Subscribe(topic, 0, nil); token.Wait() && token.Error() != nil {
		fmt.Println("Abonelik hatası:", token.Error())
		return MQTT.ErrNotConnected
	}
	return nil

	
}
