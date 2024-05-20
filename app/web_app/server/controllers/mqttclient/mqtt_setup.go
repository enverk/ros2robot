package controllers

import (
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

var Client MQTT.Client

func Setup(broker string) error{
	
	opts := MQTT.NewClientOptions()
	opts.AddBroker(broker)
	Client = MQTT.NewClient(opts)

	if token := Client.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("Bağlantı Hatası", token.Error())
		return  token.Error()
	}
	fmt.Printf("Broker ile bağlantı kuruldu!")
	return nil
}
