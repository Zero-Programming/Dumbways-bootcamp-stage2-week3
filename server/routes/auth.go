package routes

import (
	"housy/handlers"
	"housy/pkg/middleware"
	"housy/pkg/mysql"
	"housy/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerAuth(userRepository)

	r.HandleFunc("/sign-up", h.SignUp).Methods("POST")
	r.HandleFunc("/sign-in", h.SignIn).Methods("POST")
	r.HandleFunc("/check-auth", middleware.Auth(h.CheckAuth)).Methods("GET")
}
