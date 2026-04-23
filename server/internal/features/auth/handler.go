package auth

import (
    "context"
    "net/http"
    "os"
	"log"
    "github.com/gin-gonic/gin"
    "github.com/google/uuid"
    "google.golang.org/api/idtoken"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/session"
    "gorm.io/gorm"
)

type Handler struct {
    service *Service
    sessionManager session.Manager
}

func NewHandler(db *gorm.DB, sessionManager session.Manager) *Handler {
    return &Handler{service: NewService(db), sessionManager: sessionManager}
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

        c.SetCookie("session_id", "", -1, "/", "localhost", false, true)

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

    sessionID := uuid.New().String()

    // store session
    h.sessionManager.CreateSession(sessionID, user.ID)

    // set cookie
    c.SetCookie("session_id", sessionID, 3600, "/", "localhost", false, true)


    c.JSON(http.StatusOK, gin.H{
        "status":     "success",
        "payload":    responsePayload,
        "userExists": true,
    })
}