package post

import (
    "github.com/Mohamed-Hilaal/commUnityHub/internal/models"
	"gorm.io/gorm"
	"github.com/google/uuid"
	"log"
)


type Service struct {
	db *gorm.DB
	post models.Post
}

func NewService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) FetchPublicPosts() ([]models.Post, error) {

	var posts []models.Post

	err := s.db.Where("visibility = ?", "public").Find(&posts).Error
	if err != nil {
		return nil, err
	}

	return posts, nil
}


func (s *Service) CreatePublicPost(title, content string, currentUnityID *uuid.UUID, userID uuid.UUID) error {

	post := models.Post{
		Title:      title,
		Content:    content,
		Visibility: "public",
		UserID: userID,
	}

	if currentUnityID != nil {
		post.UnityID = *currentUnityID
	}

	return s.db.Create(&post).Error
}

func (s *Service) GetCurrentUsersCurrentUnityID(userID uuid.UUID) (*uuid.UUID, error) {
	var user models.User

	result := s.db.Where("id = ?", userID).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	log.Printf("Post::Service::GetCurrentUsersCurrentUnityID - User's current unity ID: %v", user.CurrentUnityID)
	return user.CurrentUnityID, nil
}