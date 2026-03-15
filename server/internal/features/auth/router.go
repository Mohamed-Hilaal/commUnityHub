package auth

import "github.com/gin-gonic/gin"

type router struct {
	handler *Handler
	rg	  *gin.RouterGroup
}


func NewRouter(clientID string, rg *gin.RouterGroup) *router {
	
	authRg := rg.Group("/auth")

	return &router{
		handler: NewHandler(clientID),
		rg:      authRg,
	}

}
func (r *router) RegisterRoutes(rg *gin.RouterGroup) {
	r.rg.GET("/client_id", r.handler.clientID)
}

