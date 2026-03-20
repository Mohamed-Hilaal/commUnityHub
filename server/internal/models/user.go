package models

import (
    "time"
    "github.com/google/uuid"
)

type User struct {
    ID             uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    Email          string     `gorm:"uniqueIndex"`
    Username       string     `gorm:"not null"`
    FullName       string
    ProfilePicture string
    GoogleID       string     `gorm:"not null;uniqueIndex"`
    PasswordHash   string
    AccountID      uuid.UUID  `gorm:"type:uuid;not null"`
    CurrentUnityID *uuid.UUID `gorm:"type:uuid"`
    CreatedAt      time.Time
    UpdatedAt      time.Time

    Account      Account  `gorm:"foreignKey:AccountID"`
    CurrentUnity *Unity   `gorm:"foreignKey:CurrentUnityID"`
}