package router

import (
    "github.com/gin-gonic/gin"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/features/auth"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/middleware"
)

func SetupRouter(clientID string) *gin.Engine {

    r := gin.Default()
    r.Use(middleware.CorsMiddleware())

    api := r.Group("/api")
    authRouter := auth.NewRouter(clientID, api)
	authRouter.RegisterRoutes(api)

    return r
}