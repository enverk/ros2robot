package routes

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v4"
	"ros2.com/mobile_app/server/databases"
	"ros2.com/web_app/server/api/domains"
)

type SignupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func SignUp(c echo.Context, client *databases.Mongo) error {
	var signupReqReq SignupRequest

	if err := c.Bind(&signupReqReq); err != nil {
		return err
	}
	email := signupReqReq.Email
	password := signupReqReq.Password

	u := &domains.User{
		Email:    email,
		Password: password,
	}

	collection := client.Client.Database("ros2db").Collection("users")
	_, err := collection.InsertOne(context.Background(), u)

	if err != nil {
		return c.String(http.StatusBadRequest, "We couldn't sign you up.")

	}
	return c.String(http.StatusOK, "User created ")

}
