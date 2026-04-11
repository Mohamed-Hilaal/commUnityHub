package router

import (
    "github.com/gin-gonic/gin"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/features/auth"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/features/user"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/middleware"
    "gorm.io/gorm"
)

func SetupRouter(clientID string, db *gorm.DB) *gin.Engine {

    r := gin.Default()
    r.Use(middleware.CorsMiddleware())

    api := r.Group("/api")
    authRouter := auth.NewRouter(clientID, api, db)
	authRouter.RegisterRoutes()
    userRouter := user.NewRouter(clientID, api, db)
    userRouter.RegisterRoutes()
    return r
}