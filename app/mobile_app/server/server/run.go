package server

import (

	"fmt"

	"ros2.com/web_app/server/api/routes"

	"ros2.com/web_app/server/databases"
)

func Run() {

	client, err := databases.New()
	if err != nil {
		fmt.Println(err)
	}
	e := routes.New(client)

	e.Logger.Fatal(e.Start(":3001"))

}
