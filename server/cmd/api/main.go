package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/Mohamed-Hilaal/commUnityHub/internal/router"
	"github.com/Mohamed-Hilaal/commUnityHub/internal/db"

)

func main() {
	err := godotenv.Load("./.env")

	if err != nil {
		log.Println(".env not found")
		return
	}

	db.Connect()

	
	clientID := os.Getenv("GOOGLE_CLIENT_ID")

    log.Printf("Google Client ID: %s\n", clientID)
	r := router.SetupRouter(clientID, db.DB)

	r.Run(":8080")
}