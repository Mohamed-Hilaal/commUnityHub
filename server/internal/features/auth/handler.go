package auth

import (
    "context"
    "net/http"
    "os"
	"log"
    "github.com/gin-gonic/gin"
    "google.golang.org/api/idtoken"
    "gorm.io/gorm"
)

type Handler struct {
    service *Service
}

func NewHandler(db *gorm.DB) *Handler {
    return &Handler{service: NewService(db)}
}

func (h *Handler) GoogleAuth(c *gin.Context) {

    log.Println("Auth::Handler::GoogleAuth - Authentication..")

    var body struct {
        Credential string `json:"credential" binding:"required"`
    }

    if err := c.ShouldBindJSON(&body); err != nil {
        log.Println("Auth::Handler::GoogleAuth - Somethin went wrong while binding json.., Err: ", err)
        c.JSON(http.StatusBadRequest, gin.H{
            "status":  "error",
            "message": "credential is required",
        })
        return
    }

    // verify google token
    payload, err := idtoken.Validate(
        context.Background(),
        body.Credential,
        os.Getenv("GOOGLE_CLIENT_ID"),
    )
    if err != nil {
        log.Println("Auth::Handler::GoogleAuth - Somethin went wrong on validating.., Err: ", err)
        c.JSON(http.StatusUnauthorized, gin.H{
            "status":  "error",
            "message": "invalid credentials",
        })
        return
    }

    // extract from google token
    email, _    := payload.Claims["email"].(string)
    name, _     := payload.Claims["name"].(string)

    // check if user exists
    user, err := h.service.FindUserByEmail(email)
    log.Println("User : ", user)
    log.Println("err : ", err)

    if err != nil {
        
        log.Println("Auth::Handler::GoogleAuth - Requested User doesn't exist, Err: ", err)
        
        if err != gorm.ErrRecordNotFound {
            c.JSON(http.StatusInternalServerError, gin.H{
                "status":  "error",
                "message": "something went wrong",
            })
            return
        }
        

        responsePayload := gin.H{
            "email": email,
            "username": name,
        }

        c.JSON(http.StatusOK, gin.H{
            "status":     "success",
            "payload":    responsePayload,
            "userExists": false,
        })
        return
    }
                
                
    // user exists → return user info
    responsePayload := gin.H{
        "current_user_id":    user.ID,
        "current_user_name":  user.Username,
        "current_unity_id":   user.CurrentUnityID,
        "current_unity_name": nil,
        }
        
        if user.CurrentUnity != nil {
        responsePayload["current_unity_name"] = user.CurrentUnity.CommunityName
    }

    log.Println("Auth::Handler::GoogleAuth - Success")

    c.JSON(http.StatusOK, gin.H{
        "status":     "success",
        "payload":    responsePayload,
        "userExists": true,
    })
}