package domains

type User struct {
	ID       string `bson:"_id,omitempty"`
	Email    string `bson:"email"`
	Password string `bson:"password"`
	Name string `bson:"name"`
	Surname string `bson:"surname"`
}