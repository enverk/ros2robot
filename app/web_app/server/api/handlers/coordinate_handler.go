package handlers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	controllers "ros2.com/web_app/server/controllers/mqttclient"
)

type Coordinates struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

//Handles the coordinates that we clicked on the map in the our apps. Then sends it to the mqtt topic that we want to send.
func CoordinateHandler(c echo.Context) error {

	var jData Coordinates
	
	if err := c.Bind(&jData); err != nil {
		return err
	}
	formattedData := fmt.Sprintf("%.2f,%.2f", jData.X, jData.Y)
	fmt.Println(formattedData)
	controllers.Publisher("controller/coordinates", string(formattedData))

	return c.JSON(http.StatusOK, jData)
}