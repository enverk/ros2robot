package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"ros2.com/web_app/server/databases"
)

func New(client *databases.Mongo) *echo.Echo {
	e := echo.New()
	r := AuthRoute{
		Client: *client,
	}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))
	e.POST("/main", MainPage)
	e.GET("/main", MainPage)
	//TODO Login postunu ayarla
	e.POST("/login", r.Login)

	e.POST("/main", JoystickHandler)

	return e
}
