package server

import (
	//"ros2.com/mobile_app/server/controllers"
	"ros2.com/web_app/server/api/routes"
	"ros2.com/web_app/server/api/templates"
	controllers "ros2.com/web_app/server/controllers/mqttclient"
)

func Run() {
	e := routes.New()
	// controllers.Listener()
	// controllers.Publisher()
	controllers.Setup()

	templates.Init()
	
	e.Logger.Fatal(e.Start(":1323"))

}
