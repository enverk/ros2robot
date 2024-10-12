package routes

import (
	"context"

	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"ros2.com/web_app/server/api/domains"
	"ros2.com/web_app/server/databases"
)

type SignupRequest struct {
	Email    string `json:"email"`
	Name string `json:"name"`
	Surname string `json:"surname"`
	Password string `json:"password"`
}

//Handles signup process
func SignUp(c echo.Context, client *databases.Mongo) error {
	var signupReqReq SignupRequest

	if err := c.Bind(&signupReqReq); err != nil {
		return err
	}
	email := signupReqReq.Email
	password := signupReqReq.Password
	name:=signupReqReq.Name
	surname:=signupReqReq.Surname

	u := &domains.User{
		Email:    email,
		Name: name,
		Surname: surname,
		Password: password,
	}
	response := domains.ResponseMessage{
		Message: "User Created",
	}
	badResponse := domains.ResponseMessage{
		Message: "Your request couldn't be done",
	}

	collection := client.Client.Database("ros2db").Collection("users")
	filter := bson.M{"email": u.Email}
	var result domains.User
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			collection.InsertOne(context.Background(), u)
			return c.JSON(http.StatusOK, response)

		}
	} else {
		c.JSON(http.StatusBadRequest, "This email already have been used.")

	}
	return c.JSON(http.StatusBadRequest, badResponse)
}
func SignUpHandler(client *databases.Mongo) echo.HandlerFunc {
	return func(c echo.Context) error {
		return SignUp(c, client)

	}
}
