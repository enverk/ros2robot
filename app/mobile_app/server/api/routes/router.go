package routes

import "github.com/labstack/echo/v4"

func New() *echo.Echo {
	e := echo.New()

	e.GET("/", MainPage)

	return e
}
