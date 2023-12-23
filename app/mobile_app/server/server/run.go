package server

import (
	"ros2.com/mobile_app/server/controllers"
	"ros2.com/web_app/server/api/routes"
)

func Run() {
	e := routes.New()
	controllers.Listener()
	controllers.Publisher()

	e.Logger.Fatal(e.Start(":1323"))

}
