package middleware

import (
	"time"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func CorsMiddleware() gin.HandlerFunc {

	return( cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:5000"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
			AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge: 12 * time.Hour,
		}))
	
}