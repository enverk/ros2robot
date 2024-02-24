package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func MainPage(c echo.Context) error {

	return c.String(http.StatusOK, "Welcome To Main Page")
}
