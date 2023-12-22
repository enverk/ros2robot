package handlres

import (
	"encoding/json"
	"fmt"
	"net/http"

	controllers "ros2.com/web_app/server/controllers/mqttclient"
)

type Coordinates struct {
	X int `json:"X"`
	Y int `json:"Y"`
}

func HandleCoordinates(w http.ResponseWriter, r *http.Request) {
	var coords Coordinates
	centerX, centerY := 0, 0
	err := json.NewDecoder(r.Body).Decode(&coords)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	coords.X = coords.X - centerX
	coords.Y = coords.Y - centerY

	coordsJSON, _ := json.Marshal(coords)

	controllers.Publisher("control/movement", string(coordsJSON))

	fmt.Printf("Koordinantlar %+v\n", coords)

	w.WriteHeader(http.StatusOK)
}
