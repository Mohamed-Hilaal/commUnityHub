package unity

import (
	"net/http"
	"log"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type handler struct {
	service *Service
}

func NewHandler(db *gorm.DB) *handler {
	return &handler{
		service: NewService(db),
	}
}

    // def get_unities
      
    //   begin 

    //     unities = Unity.all

    //     render json: {status: 'success', unities: unities}, status: :ok

    //   rescue ActiveRecord::RecordInvalid => e
    //     render json: { status: "failure", error: e.message }, status: :unprocessable_entity
    //   rescue StandardError => e
    //     render json: { status: "failure", error: "An unexpected error occurred: #{e.message}" }, status: :internal_server_error
    //   end
    // end

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