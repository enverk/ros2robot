package controllers

import (
	"fmt"
)

func Publisher(topic string, message string) {
	token := Client.Publish(topic, 1, false, message)
	token.Wait()

	if token.Error() != nil {
		fmt.Println("Mesaj gönderilirken hata oldu", token.Error())
	} else {
		fmt.Println("Mesaj başarıyla gönderildi!!")
	}
}
