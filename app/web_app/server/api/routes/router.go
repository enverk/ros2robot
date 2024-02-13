package routes

import (
	"github.com/labstack/echo/v4"
	"ros2.com/web_app/server/api/handlers"
	"ros2.com/web_app/server/databases"
)

type DBRoute struct{
	Client databases.Mongo
}

func New() *echo.Echo {
	e := echo.New()
	// r:=DBRoute{
	// 	Client:*client,
	// }
	e.GET("/", MainPage)
	e.GET("/game", GetGame)
	e.POST("/game", handlers.HandleCoordinates)
	return e
}
