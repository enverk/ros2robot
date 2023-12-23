package controllers

import (
	"fmt"
	"os"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func Publisher() {
	// MQTT broker ve port numarası
	broker := "tcp://192.168.43.235:1883"

	opts := MQTT.NewClientOptions()
	opts.AddBroker(broker)
	opts.SetDefaultPublishHandler(messageHandler)

	// MQTT istemcisini oluşturma
	client := MQTT.NewClient(opts)

	// MQTT istemcisini bağlama
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		fmt.Println("Bağlantı hatası:", token.Error())
		os.Exit(1)
	}
	fmt.Println("Broker ile bağlantı kuruldu")

	topic := "chatter"
	if token := client.Subscribe(topic, 1, nil); token.Wait() && token.Error() != nil {
		fmt.Println("Abonelik hatası:", token.Error())
		os.Exit(1)
	}

	for {

		message := "Selam! Bu Go dilinden gönderilen bir mesajdır."
		token := client.Publish(topic, 1, false, message)
		token.Wait()

		if token.Error() != nil {
			fmt.Println("Mesaj gönderilirken hata oluştu:", token.Error())
		} else {
			fmt.Println("Mesaj başarıyla gönderildi.")
		}

		time.Sleep(1 * time.Second) // 1 saniye bekleyerek tekrar mesaj gönder
	}
}
