package middleware

import (
	"time"
	"log"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/Mohamed-Hilaal/commUnityHub/internal/session"
)

type Middleware struct {
	sessionManager session.Manager
}

func NewMiddleware(sessionManager session.Manager) *Middleware {
	return &Middleware{
		sessionManager: sessionManager,
	}
}

func (m *Middleware) CorsMiddleware() gin.HandlerFunc {

	return( cors.New(cors.Config{
			AllowOrigins:     []string{"http://localhost:5000"},
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
			AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
			ExposeHeaders:    []string{"Content-Length"},
			AllowCredentials: true,
			MaxAge: 12 * time.Hour,
		}))
	
}

func (m *Middleware) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		sessionID, err := c.Cookie("session_id")
		if err != nil {
			log.Printf("No session cookie: %v", err)
			c.AbortWithStatusJSON(401, gin.H{"error": "Unauthorized"})
			return
		}

		userID, exists := m.sessionManager.GetUserID(sessionID)
		if !exists {
			log.Printf("Invalid session ID: %s", sessionID)
			c.AbortWithStatusJSON(401, gin.H{"error": "Unauthorized"})
			return
		}

		c.Set("userID", userID)
		c.Next()
	}
}