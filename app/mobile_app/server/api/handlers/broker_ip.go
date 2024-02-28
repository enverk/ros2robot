package handlers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	controllers "ros2.com/web_app/server/controllers/mqttclient"
)
type Broker struct {
	BrokerIp string `json:"brokerip"`
}
func BrokerHandler(c echo.Context) error {
	var brokerReq Broker
	if err := c.Bind(&brokerReq); err != nil {
		fmt.Println(err) 
	}
	broker := "tcp://" + brokerReq.BrokerIp+":1883"
	fmt.Println(broker)
	controllers.Setup(broker)
	return c.String(http.StatusOK, broker)
}
