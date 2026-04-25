package unity

import (
	"net/http"
	"log"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"github.com/google/uuid"
)

type handler struct {
	service *Service
}

func NewHandler(db *gorm.DB) *handler {
	return &handler{
		service: NewService(db),
	}
}

    // def create
    //   begin
	
func (h *handler) createUnity(c *gin.Context) {
	type requestBody struct {
		CommunityName string `json:"communityName" binding:"required"`
		Category string `json:"category" binding:"required"`
		Audience string `json:"audience" binding:"required"`
		Description string `json:"description" binding:"required"`
		ContactMethod string `json:"contactMethod" binding:"required"`
		CommunityVision string `json:"communityVision" binding:"required"`
		Goals string `json:"goals" binding:"required"`
		LongTermObjectives string `json:"longTermObjectives" binding:"required"`
		CommitmentLevel string `json:"commitmentLevel" binding:"required"`
	}

	var body requestBody

	if err := c.ShouldBindJSON(&body); err != nil {
		log.Println("Unity::Handler::createUnity - Something went wrong while binding json.., Err: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	creatorID, exists := c.Get("userID")
	if !exists {
		log.Println("Unity::Handler::createUnity - User ID not found in context")
		c.JSON(http.StatusUnauthorized, gin.H{
			"status":  "error",
			"message": "Unauthorized",
		})
		return
	}

	unity, err := h.service.CreateUnity(body.CommunityName, body.Category, body.Audience, body.Description, body.ContactMethod, body.CommunityVision, body.Goals, body.LongTermObjectives, body.CommitmentLevel, creatorID.(uuid.UUID))


	if err != nil {
		log.Println("Unity::Handler::createUnity - Something went wrong while creating unity.., Err: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "something went wrong",
		})
		return
	}

	currentUnityID, err := h.service.GetCurrentUsersCurrentUnityID(creatorID.(uuid.UUID))
	if err != nil {
		log.Println("Unity::Handler::createUnity - Something went wrong while fetching user's current unity ID.., Err: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Failed to fetch user's current unity ID",
		})
		return
	}

	if currentUnityID == nil {
		log.Println("Unity::Handler::createUnity - User does not have a current unity ID")
		err = h.service.UpdateCurrentUsersCurrentUnityID(creatorID.(uuid.UUID), &unity.ID)

		if err != nil {
			log.Println("Unity::Handler::createUnity - Something went wrong while updating user's current unity ID.., Err: ", err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"status":  "error",
				"message": "Failed to update user's current unity ID",
			})
			return
		}
	}



	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"unity": unity,
	})
}


func (h *handler) getAllUnities(c *gin.Context) {
	unities, err := h.service.GetAllUnities()
	
	if err != nil {
		log.Println("Unity::Handler::getAllUnities - Something went wrong on fetching unities, Err: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"unities": unities,
	})
}