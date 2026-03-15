package auth

import "github.com/gin-gonic/gin"


type Handler struct {
	googleClientID string
}

func NewHandler(clientID string) *Handler {
	return &Handler{
		googleClientID: clientID,
	}
}

func (h *Handler) clientID(c *gin.Context) {
c.JSON(200, gin.H{
		"clientID": h.googleClientID,
	})
}