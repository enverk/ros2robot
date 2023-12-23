package routes

import (
	"github.com/labstack/echo/v4"
	"ros2.com/web_app/server/api/templates"
)

func GetGame(c echo.Context) error {

	return templates.Templates.ExecuteTemplate(c.Response(), "simple_game.html", nil)

}
