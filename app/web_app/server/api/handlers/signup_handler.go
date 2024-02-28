package handlers

import (
	"github.com/labstack/echo/v4"

	"ros2.com/web_app/server/api/routes"
	"ros2.com/web_app/server/databases"
)

func SignUpHandler(client *databases.Mongo) echo.HandlerFunc {
	return func(c echo.Context) error {
		return routes.SignUp(c, client)

	}
}
