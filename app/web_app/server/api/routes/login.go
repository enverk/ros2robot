package routes

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"ros2.com/web_app/server/api/middlewares"
	"ros2.com/web_app/server/databases"
)

type AuthRoute struct {
	Client databases.Mongo
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (a *AuthRoute) Login(c echo.Context) error {

	var logReq LoginRequest

	if err := c.Bind(&logReq); err != nil {
		return err
	}
	email := logReq.Email
	password := logReq.Password

	

	user, err := middlewares.Authenticate(&a.Client, email, password)

	if err != nil {
		return echo.ErrInternalServerError
	}

	accessToken, err := middlewares.GenerateToken(user)
	if err != nil {
		return echo.ErrInternalServerError
	}
	refreshToken, err := middlewares.GenerateRefreshToken(user)
	if err != nil {
		return echo.ErrInternalServerError
	}
	c.Response().Header().Set("Authorization", "Bearer "+accessToken)

	middlewares.SetCookie(c, "access_token", accessToken, time.Now().Add(time.Hour*24))
	middlewares.SetCookie(c, "refresh_token", refreshToken, time.Now().Add(time.Hour*24))

	return c.JSON(http.StatusOK, echo.Map{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	})

}
func LoginPage(c echo.Context) error {
	return c.String(http.StatusOK, "Welcome To Login Page")
}

func  (a *AuthRoute) MobileLogin (c echo.Context) error {
	var logReq LoginRequest

	if err := c.Bind(&logReq); err != nil {
		return err
	}
	email := logReq.Email
	password := logReq.Password

	fmt.Println(email)
	fmt.Println(password)

	user, err := middlewares.Authenticate(&a.Client, email, password)
	if err != nil {
		return echo.ErrInternalServerError
	}
	
	mobileAccessToken, err := middlewares.GenerateMobileToken(user)
	if err != nil {
		return echo.ErrInternalServerError
	}
	
	c.Response().Header().Set("Authorization", "Bearer "+mobileAccessToken)

	return c.JSON(http.StatusOK, echo.Map{
		"mobile_token":  mobileAccessToken,
	})
}