package post

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type handler struct {
	service *Service
}

func NewHandler(db *gorm.DB) *handler {
	return &handler{service: NewService(db)}
}


func (h *handler) getPublicPost(c *gin.Context) {

	posts, err := h.service.FetchPublicPosts()

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch posts"})
		return
	}

	c.JSON(200, gin.H{"posts": posts})
}