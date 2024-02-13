package middlewares

type User struct{
	ID string `bson:"_id,omitempty"`
	Email string `bson:"email"`
	Username string `bson:"username"`
	Password string `bson:"password"`

	Role string `bson:"role"`
}
var jwtKey=[]byte("ros2-secret-key")

