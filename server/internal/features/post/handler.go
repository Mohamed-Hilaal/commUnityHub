package post

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/google/uuid"
	"log"
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

func (h *handler) create(c *gin.Context) {

	type requestBody struct {
		Title string `json:"title" binding:"required"`
		Content string `json:"content" binding:"required"`
	}

	var body requestBody

	if err := c.ShouldBindJSON(&body); err != nil {
		log.Println("Post::Handler::create - Something went wrong while binding json.., Err: ", err)
		c.JSON(400, gin.H{"error": err.Error(), "status": "failure"})
		return
	}

	userId, exists := c.Get("userID")
	
	if !exists {
		log.Println("Post::Handler::create - User ID not found in context")
		c.JSON(401, gin.H{"error": "Unauthorized", "status": "failure"})
		return
	}

	log.Printf("Post::Handler::create - User ID from context: %v", userId)

	currentUnityID, err := h.service.GetCurrentUsersCurrentUnityID(userId.(uuid.UUID))
	
	if err != nil {
		log.Println("Post::Handler::create - Something went wrong while fetching user's current unity ID.., Err: ", err)
		c.JSON(500, gin.H{"error": "Failed to fetch user's current unity ID", "status": "failure"})
		return
	}

	if currentUnityID == nil {
		log.Println("Post::Handler::create - User does not have a current unity ID")
		c.JSON(400, gin.H{"error": "User does not have a current unity ID", "status": "failure"})
		return
	}

	err = h.service.CreatePublicPost(body.Title, body.Content, currentUnityID, userId.(uuid.UUID))
	
 	if err != nil {
		log.Println("Post::Handler::create - Something went wrong while creating post.., Err: ", err)
		c.JSON(500, gin.H{"error": "Failed to create post", "status": "failure"})
		return
	}

	c.JSON(200, gin.H{"message": "Post is successfully created", "status": "success"})
			
}