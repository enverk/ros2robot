package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	controllers "ros2.com/web_app/server/controllers/mqttclient"
)

type Coordinates struct {
    X int `json:"X"`
    Y int `json:"Y"`
}

func HandleCoordinates(c echo.Context) error {
    var coords Coordinates

    if err := c.Bind(&coords); err != nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
    }

    // Koordinatları işle...
    coordsJSON, _ := json.Marshal(coords)
    fmt.Printf("Koordinatlar: %+v\n", coords)
    controllers.Publisher("control/movement", string(coordsJSON))

    return c.JSON(http.StatusOK, coords)
}