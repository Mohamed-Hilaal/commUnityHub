package models

import (
    "time"
    "github.com/google/uuid"
)

type Post struct {
    ID         uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    Title      string    `gorm:"not null"`
    Content    string    `gorm:"not null"`
    UnityID    uuid.UUID `gorm:"type:uuid;not null"`
    UserID     uuid.UUID `gorm:"type:uuid;not null"`
    Visibility string    `gorm:"not null;default:internal"`
    CreatedAt  time.Time
    UpdatedAt  time.Time

    Unity Unity `gorm:"foreignKey:UnityID"`
    User  User  `gorm:"foreignKey:UserID"`
}