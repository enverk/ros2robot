package server

import (
	"fmt"

	"ros2.com/web_app/server/api/routes"

	"ros2.com/web_app/server/databases"
)

// starts the server connection at port 3001
func Run() {

	client, err := databases.New()
	if err != nil {
		fmt.Println(err)
	}
	e := routes.New(client)

	e.Logger.Fatal(e.Start(":3001"))

}
