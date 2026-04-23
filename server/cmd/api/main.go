package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/Mohamed-Hilaal/commUnityHub/internal/router"
	"github.com/Mohamed-Hilaal/commUnityHub/internal/db"
	"github.com/Mohamed-Hilaal/commUnityHub/internal/session"
	"github.com/Mohamed-Hilaal/commUnityHub/internal/middleware"

)

func main() {
	err := godotenv.Load("./.env")

	if err != nil {
		log.Println(".env not found")
		return
	}

	db.Connect()

	
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	sessionManager := session.NewSession()
	middleware := middleware.NewMiddleware(sessionManager)

    log.Printf("Google Client ID: %s\n", clientID)
	r := router.SetupRouter(clientID, db.DB, sessionManager, middleware)

	r.Run(":8080")
}