package routes

import (
	"github.com/labstack/echo/v4"
	"ros2.com/web_app/server/databases"
)
type AuthRoute struct {
	Client databases.Mongo
}

func (a *AuthRoute) Login(c echo.Context) error {
	email := c.FormValue("email")
	password := c.FormValue("password")
	user,err:=
	
}
