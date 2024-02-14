package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"ros2.com/web_app/server/api/handlers"
	"ros2.com/web_app/server/databases"
)

type DBRoute struct {
	Client databases.Mongo
}

func New() *echo.Echo {
	e := echo.New()
	// r:=DBRoute{
	// 	Client:*client,
	// }
	e.GET("/api", MainPage)

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"}, 
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))
	e.POST("/api/joystick", handlers.JoystickHandler)
	return e
}
