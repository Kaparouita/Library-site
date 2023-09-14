package main

import (
	"359/core"
	"359/handlers"
	"359/repositories"
	"359/server"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db := repositories.NewDbRepo()
	srv := core.NewService(db)
	handler := handlers.NewHandler(srv)
	server := server.NewService(handler)

	//initDB with 5 books
	srv.InitFunction()

	server.Initialize()

}
