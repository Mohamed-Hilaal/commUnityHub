package auth

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/Mohamed-Hilaal/commUnityHub/internal/session"
)

type router struct {
	handler *Handler
	rg	  *gin.RouterGroup
}


func NewRouter(clientID string, rg *gin.RouterGroup, db *gorm.DB, sessionManager session.Manager) *router {
	
	authRg := rg.Group("/auth")

	return &router{
		handler: NewHandler(db, sessionManager),
		rg:      authRg,
	}

}
func (r *router) RegisterRoutes() {
	r.rg.POST("/google_oauth2", r.handler.GoogleAuth)
}

