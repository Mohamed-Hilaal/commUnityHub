package post

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type router struct {
	handler *handler
	rg	  *gin.RouterGroup
}


func NewRouter(clientID string, rg *gin.RouterGroup, db *gorm.DB) *router {
	
	userRg := rg.Group("/post")

	return &router{
		handler: NewHandler(db),
		rg: userRg,
	}

}


func (r *router) RegisterRoutes() {
	r.rg.POST("/get_public_posts", r.handler.getPublicPost)
}

