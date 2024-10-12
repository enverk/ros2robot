package databases

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Mongo struct {
	Client *mongo.Client
}

//sets up mongodb connection. 
func New() (*Mongo, error) {
	var err error
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017/"))
	if err != nil {
		fmt.Println("Mongodb connection", err)
		return nil, err
	}

	if err := client.Ping(context.TODO(), nil); err != nil {
		fmt.Println("Mongodb Ping Error", err)
		return nil, err

	}
	fmt.Println("Successfully connected to mongoDB")
	return &Mongo{
		Client: client,
	}, nil

}
