package server

import (
	//"ros2.com/mobile_app/server/controllers"

	"fmt"

	"ros2.com/web_app/server/api/routes"

	//controllers "ros2.com/web_app/server/controllers/mqttclient"
	"ros2.com/web_app/server/databases"
)

func Run() {

	client, err := databases.New()
	if err != nil {
		fmt.Println(err)
	}
	e := routes.New(client)
	// controllers.Listener()

	e.Logger.Fatal(e.Start(":5172"))

}
