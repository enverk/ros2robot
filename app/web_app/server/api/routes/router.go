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
	//TODO: Buraya restricted arealar eklenecek.
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

	e.POST("/main/joystick", handlers.JoystickHandler)
	e.POST("/signup", SignUpHandler(client))

	MainGroup(mainGroup)
	
	return e
	
}

func MainGroup(g *echo.Group) {
    
    g.Use(middlewares.Authorize)   
    g.GET("/main", MainPage)
}
