package user

import (
    "github.com/Mohamed-Hilaal/commUnityHub/internal/models"
    "github.com/google/uuid"
	"gorm.io/gorm"
)


type Service struct {
	db *gorm.DB
	user models.User
	account models.Account
}

func NewService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func FindUserByEmail(db *gorm.DB, email string) (*models.User, error) {
	var user models.User
	result := db.Where("email = ?", email).First(&user)

	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}


func (s *Service) CreateUser(name, email string, account *models.Account) (*models.User, error) {

	user := models.User{
		Username: name,
		Email: email,
		FullName: name,
		Account: *account,
		GoogleID: email,
	}

	if err := s.db.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}



func (s *Service) CreateAccount() (*models.Account, error) {

	account := models.Account{
		ID: uuid.New(),
		AccountType: "Basic",
	}

	err := s.db.Create(&account).Error;
	
	if err != nil {
		return nil, err
	}


	return &account, nil
}