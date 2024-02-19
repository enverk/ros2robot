package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
	controllers "ros2.com/web_app/server/controllers/mqttclient"
)

func MainPage(c echo.Context) error {
	

	controllers.Setup("doldur")
	return c.String(http.StatusOK, "Welcome To Main Page")
}

