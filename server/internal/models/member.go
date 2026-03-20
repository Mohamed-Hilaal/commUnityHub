package models

import (
    "time"
    "github.com/google/uuid"
)

type Member struct {
    ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    UserID    uuid.UUID `gorm:"type:uuid;not null"`
    UnityID   uuid.UUID `gorm:"type:uuid;not null"`
    Role      string    `gorm:"not null;default:member"`
    JoinedAt  time.Time `gorm:"not null;default:now()"`
    CreatedAt time.Time
    UpdatedAt time.Time

    User  User  `gorm:"foreignKey:UserID"`
    Unity Unity `gorm:"foreignKey:UnityID"`
}