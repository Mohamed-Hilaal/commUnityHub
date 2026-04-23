package user

import (
    "net/http"
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


func (h *handler) Register(c *gin.Context) {

// "username":"Hilaal Mohamed","email":"hilaalmohamed2@gmail.com","contactNumber":"9092563985","accountType":"Basic","terms":true}
	type body struct {
		Name string `json:"username" binding:"required"`
		Email string `json:"email" binding:"required"`
		ContactNumber string `json:"contactNumber" binding:"required"`
		AccountType string `json:"accountType" binding:"required"`
		Terms bool `json:"terms" binding:"required"`
	}

	var b body
	err := c.ShouldBindJSON(&b); 
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	user, err := FindUserByEmail(h.service.db, b.Email)

	if err != nil && err != gorm.ErrRecordNotFound {
		log.Println("User::Handler::Register - Something went wrong on finding user, Err: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "something went wrong",
		})
		return
	}

	if user != nil {
		c.JSON(http.StatusConflict, gin.H{
			"status":  "error",
			"message": "user already exists",
		})
		return
	}

	account, err := h.service.CreateAccount()

	if err != nil {
		log.Println("User::Handler::Register - Something went wrong on creating account, Err: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "something went wrong",
		})
		return
	}

	createdUser, err := h.service.CreateUser(b.Name, b.Email, account)

	if err != nil {
		log.Println("User::Handler::Register - Something went wrong on creating user, Err: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "something went wrong",
		})
		return
	}


	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"user": createdUser,
			"account": account,
		},
	})

	return
}

func (h *handler) GetCurrentUserInfo(c *gin.Context) {
	
	userID, exists := c.Get("userID")
	if !exists {
		log.Println("User::Handler::GetCurrentUserDetails - No user ID found in context")
		c.JSON(http.StatusUnauthorized, gin.H{
			"status":  "error",
			"message": "Unauthorized",
		})
		return
	}

	log.Printf("User::Handler::GetCurrentUserDetails - Fetching details for user ID: %d", userID)
	user, err := FindUserByID(h.service.db, userID.(uuid.UUID))

	if err != nil {
		log.Println("User::Handler::GetCurrentUserDetails - Something went wrong on finding user, Err: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "something went wrong",
		})
		return
	}

	if user == nil {
		log.Println("User::Handler::GetCurrentUserDetails - User not found")
		c.JSON(http.StatusUnauthorized, gin.H{
			"status":  "error",
			"message": "Current user not found",
		})
		return
	}

	payload := gin.H{
		"current_user_email": user.Email,
		"current_user_id": user.ID,
		"current_user_name": user.Username,
		"current_unity_id": user.CurrentUnityID,
		"current_unity_name": nil,
	}

	if user.CurrentUnity != nil {
		payload["current_unity_name"] = user.CurrentUnity.CommunityName
	}

	log.Printf("User::Handler::GetCurrentUserDetails - Successfully fetched user details for user ID: %d", user.ID)
	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"payload": payload,
	})

	return
}