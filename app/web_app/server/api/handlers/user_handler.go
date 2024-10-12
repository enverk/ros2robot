package handlers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"ros2.com/web_app/server/databases"
)

//gets user from our db (which is mongodb) and return the user.
func GetUser(c echo.Context, client *databases.Mongo) error {
	userEmail := c.Get("email").(string)

	collection := client.Client.Database("ros2db").Collection("users")
	var result struct {
		Email   string `bson:"email" json:"email"`
		Name    string `bson:"name" json:"name"`
		Surname string `bson:"surname" json:"surname"`
	}
	filter := bson.M{"email": userEmail}
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.JSON(http.StatusNotFound, echo.Map{"error": "User not found"})
		}
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}
	fmt.Println(result)

	return c.JSON(http.StatusOK, result)
}
