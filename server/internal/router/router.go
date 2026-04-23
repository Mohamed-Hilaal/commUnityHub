package router

import (
    "github.com/gin-gonic/gin"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/features/auth"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/features/user"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/features/post"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/features/unity"

    "github.com/Mohamed-Hilaal/commUnityHub/internal/middleware"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/session"
    "gorm.io/gorm"
)

func SetupRouter(clientID string, db *gorm.DB, sessionManager session.Manager, middleware *middleware.Middleware) *gin.Engine {


    r := gin.Default()
    r.Use(middleware.CorsMiddleware())
    api := r.Group("/api")
    authRouter := auth.NewRouter(clientID, api, db, sessionManager)
    authRouter.RegisterRoutes()

    // Protected routes
    protected := api.Group("/")
    protected.Use(middleware.AuthMiddleware())

    userRouter := user.NewRouter(clientID, protected, db)
    userRouter.RegisterRoutes()

    postRouter := post.NewRouter(clientID, protected, db)
    postRouter.RegisterRoutes()

    unityRouter := unity.NewRouter(clientID, protected, db)
    unityRouter.RegisterRoutes()

    return r
}