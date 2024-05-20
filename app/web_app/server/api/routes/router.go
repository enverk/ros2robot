package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"ros2.com/web_app/server/api/handlers"
	"ros2.com/web_app/server/api/middlewares"
	"ros2.com/web_app/server/databases"
)

func New(client *databases.Mongo) *echo.Echo {
	e := echo.New()

	r := AuthRoute{
		Client: *client,
	}
	mainGroup := e.Group("/main")

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))
	e.POST("/main/broker", handlers.BrokerHandler)
	e.POST("/login", r.Login)
	e.POST("/mobile/login", r.MobileLogin)

	e.POST("/main/joystick", handlers.JoystickHandler)
	e.POST("/signup", SignUpHandler(client))

	e.GET("/userinfo", UserHandler(client), middlewares.Authorize)

	MainGroup(mainGroup)

	return e

}

func MainGroup(g *echo.Group) {

	g.Use(middlewares.Authorize)
	g.GET("/main", MainPage)
}
