package main

import (
	"fmt"
	

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	// mqtt broker and port number
	broker := "tcp://192.168.1.110:1883"

	// mqtt client creation
	opts := MQTT.NewClientOptions().AddBroker(broker)
	client := MQTT.NewClient(opts)

	//mqtt client stat
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}
	fmt.Println("Connection with broker is successful!")

	message := "Hi from selcuk's computer."

	topic := "/chatter" 
	token := client.Publish(topic, 1, false, message)
	token.Wait()

	if token.Error() != nil {
		fmt.Println("There is been error while sending the message:", token.Error())
	} else {
		fmt.Println("The message is successfully deliverred.")
	}

	client.Disconnect(250)
	fmt.Println("Mqtt client is closed")
}
