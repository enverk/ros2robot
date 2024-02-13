package middlewares

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"ros2.com/web_app/server/databases"
)

func Authenticate(client *databases.Mongo,username,password,role string) (*User,error){
	
	collection :=client.Client.Database("ros2db").Collection("users")

	filter :=bson.M{"username":username,"password":password,"role":role}

	
	var user User
	err:=collection.FindOne(context.Background(),filter).Decode(&user)
	if err!=nil{
		if err==mongo.ErrNoDocuments{
			return nil, fmt.Errorf("Username or Password is wrong")

		}
		return nil, fmt.Errorf("Error occured in authenticate")
	}
	return &user,nil

} 	