package controllers

import (
	"fmt"
	"os"
	"time"
)

func Publisher(topic string, message string) {

	if token := Client.Subscribe(topic, 1, nil); token.Wait() && token.Error() != nil {
		fmt.Println("Abonelik hatası:", token.Error())
		os.Exit(1)
	}
	message = "ileri"

	for {
		token := Client.Publish(topic, 1, false, message)
		token.Wait()

		if token.Error() != nil {
			fmt.Println("Mesaj gönderilirken hata oluştu:", token.Error())
		} else {
			fmt.Println("Mesaj başarıyla gönderildi.")
		}

		time.Sleep(2 * time.Second)
	}
}
