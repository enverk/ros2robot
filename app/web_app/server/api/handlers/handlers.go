package handlres

import "net/http"

func Handlers() {
	http.HandleFunc("/controllers/mqttclient",HandleCoordinates)
}