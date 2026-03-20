package auth

import (
    "github.com/Mohamed-Hilaal/commUnityHub/internal/models"
    "log"
    "github.com/google/uuid"
    "gorm.io/gorm"
)

type Service struct {
    db *gorm.DB
}

func NewService(db *gorm.DB) *Service {
    return &Service{db: db}
}

func (s *Service) FindUserByEmail(email string) (*models.User, error) {
    log.Println("Auth::Service::FindUserByEmail - Fidning User by email..")
    
    var user models.User
    result := s.db.
        Preload("CurrentUnity").
        Where("email = ?", email).
        First(&user)

    if result.Error != nil {
        log.Println("Auth::Service::FindUserByEmail - Something went wrong on finding user, Err:", result.Error)
        return nil, result.Error
    }
    return &user, nil
}

func (s *Service) CreateAccountAndUser(email, name, googleID string) (*models.User, error) {
    // create account first

    log.Println("Auth::Service::CreateAccountAndUser - Creating User and Account..")

    account := models.Account{
        ID:          uuid.New(),
        AccountType: "free",
    }
    if err := s.db.Create(&account).Error; err != nil {
        log.Println("Auth::Service::CreateAccountAndUser - Something went wrong on Account creation err: ", err)
        return nil, err
    }


    // create user
    user := models.User{
        ID:       uuid.New(),
        Email:    email,
        Username: name,
        FullName: name,
        GoogleID: googleID,
        AccountID: account.ID,
    }
    if err := s.db.Create(&user).Error; err != nil {
        log.Println("Auth::Service::CreateAccountAndUser - Something went wrong on User creation err: ", err)
        return nil, err
    }

    return &user, nil
}