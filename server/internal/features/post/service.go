package post

import (
    "github.com/Mohamed-Hilaal/commUnityHub/internal/models"
	"gorm.io/gorm"
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


func (s *Service) CreatePublicPost(post models.Post) error {
	post.Visibility = "public"

	if err := s.db.Create(&post).Error; err != nil {
		return err
	}

	return nil
}