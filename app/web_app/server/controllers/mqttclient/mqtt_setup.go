package controllers

import (
	"fmt"
	"os"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var Client MQTT.Client

func Setup() {
	broker := "tcp://192.168.1.109:1883"
	opts := MQTT.NewClientOptions()
	opts.AddBroker(broker)

	Client = MQTT.NewClient(opts)

	if token := Client.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("Bağlantı Hatası", token.Error())
		os.Exit(1)
	}
	fmt.Printf("Broker ile bağlantı kuruldu!")
}
