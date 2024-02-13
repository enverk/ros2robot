package server

import (
	//"ros2.com/mobile_app/server/controllers"

	"ros2.com/web_app/server/api/routes"
	"ros2.com/web_app/server/api/templates"
	//controllers "ros2.com/web_app/server/controllers/mqttclient"
	"ros2.com/web_app/server/databases"
)

func Run() {
	e := routes.New()
	databases.New()
	
	// controllers.Listener()
	
	// controllers.Setup()
	// controllers.Publisher("controller/movement","ILERI")
	
	templates.Init()

	e.Logger.Fatal(e.Start(":1323"))

}
