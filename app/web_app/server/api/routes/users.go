package routes

import (
	"github.com/labstack/echo/v4"
	"ros2.com/web_app/server/api/handlers"
	"ros2.com/web_app/server/databases"
)

func UserHandler(client *databases.Mongo) echo.HandlerFunc {
	return func(c echo.Context) error {
		return handlers.GetUser(c, client)

	}
}
