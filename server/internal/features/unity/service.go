package unity

import (
	"gorm.io/gorm"
    "github.com/Mohamed-Hilaal/commUnityHub/internal/models"
	"github.com/google/uuid"
)

type Service struct {
	db *gorm.DB
	unity models.Unity
}

func NewService(db *gorm.DB) *Service {
	return &Service{db: db}
}




func (s *Service) CreateUnity(communityName, category, audience, description, contactMethod, CommunityVision, Goals, LongTermObjectives, CommitmentLevel string, CreatorID uuid.UUID) (*models.Unity, error) {

	unity := models.Unity{
		CommunityName: communityName,
		Category: category,
		Audience: audience,
		CommunityDescription: description,
		ContactMethod: contactMethod,
		CommunityVision: CommunityVision,
		Goals: Goals,
		LongTermObjectives: LongTermObjectives,
		CommitmentLevel: CommitmentLevel,
		CreatorID: CreatorID,
	}

	if err := s.db.Create(&unity).Error; err != nil {
		return nil, err
	}
	return &unity, nil
}

func (s *Service) GetAllUnities() ([]models.Unity, error) {

	var unities []models.Unity

	err := s.db.Find(&unities).Error
	if err != nil {
		return nil, err
	}

	return unities, nil
}

func (s *Service) GetUnityByID(id uint) (*models.Unity, error) {
	
	var unity models.Unity
	err := s.db.Where("id = ?", id).First(&unity).Error
	if err != nil {
		return nil, err
	}

	return &unity, nil
}


func (s *Service) GetCurrentUsersCurrentUnityID(userID uuid.UUID) (*uuid.UUID, error) {
	var user models.User

	result := s.db.Where("id = ?", userID).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	return user.CurrentUnityID, nil
}

func (s *Service) UpdateCurrentUsersCurrentUnityID(userID uuid.UUID, unityID *uuid.UUID) error {
	var user models.User

	result := s.db.Where("id = ?", userID).First(&user)
	if result.Error != nil {
		return result.Error
	}

	user.CurrentUnityID = unityID

	return s.db.Save(&user).Error
}