package controllers

import (
	"fmt"
	"os"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var Client MQTT.Client

func Setup(broker string) {
	//TODO brokerı main pageden iste

	opts := MQTT.NewClientOptions()
	opts.AddBroker(broker)
	Client = MQTT.NewClient(opts)

	//Listener(broker)
	if token := Client.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("Bağlantı Hatası", token.Error())
		os.Exit(1)
	}
	fmt.Printf("Broker ile bağlantı kuruldu!")
}
