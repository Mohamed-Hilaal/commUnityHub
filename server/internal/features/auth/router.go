package auth

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type router struct {
	handler *Handler
	rg	  *gin.RouterGroup
}


func NewRouter(clientID string, rg *gin.RouterGroup, db *gorm.DB) *router {
	
	authRg := rg.Group("/auth")

	return &router{
		handler: NewHandler(db),
		rg:      authRg,
	}

}
func (r *router) RegisterRoutes() {
	r.rg.POST("/google_oauth2", r.handler.GoogleAuth)
}

