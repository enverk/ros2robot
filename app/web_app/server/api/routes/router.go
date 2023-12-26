package routes

import (
	"github.com/labstack/echo/v4"
	"ros2.com/web_app/server/api/handlers"
)

func New() *echo.Echo {
	e := echo.New()

	e.GET("/", MainPage)
	e.GET("/game", GetGame)
	e.POST("/game", handlers.HandleCoordinates)
	return e
}
