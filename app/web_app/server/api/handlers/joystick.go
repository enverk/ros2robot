package handlers

import (
	"fmt"
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
	formattedData := fmt.Sprintf("%.2f,%.2f", jData.X, jData.Y)
	fmt.Println(formattedData)
	controllers.Publisher("controller/movement", string(formattedData))

	return c.JSON(http.StatusOK, jData)
}
