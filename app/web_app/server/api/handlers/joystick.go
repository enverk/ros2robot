package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
	controllers "ros2.com/web_app/server/controllers/mqttclient"
)

type JoystickData struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

func JoystickHandler(c echo.Context) error {

	var jData JoystickData
	if err := c.Bind(&jData); err != nil {
		return err
	}
	println(jData.X, jData.Y)

	jDataJson, err := json.Marshal(jData)
	if err != nil {
		return err
	}
	controllers.Publisher("control/movement", string(jDataJson))

	return c.JSON(http.StatusOK, jData)
}
