package handlers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	controllers "ros2.com/web_app/server/controllers/mqttclient"
)

type Broker struct {
	Brokerip string `json:"brokerip"`
}

func BrokerHandler(c echo.Context) error {
	var brokerReq Broker
	if err := c.Bind(&brokerReq); err != nil {
		fmt.Println(err)
		
	}
	broker := "tcp://" + brokerReq.Brokerip + ":1883"
	fmt.Println(broker)
	err := controllers.Setup(broker)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"message": "Broker'a bağlanırken hata meydana geldi! Lütfen bağlantı ayarlarınızı kontrol edin."})
		}
	return c.JSON(http.StatusOK, map[string]string{"message": "Broker'a başarıyla bağlandı!"})
}
