package models

import (
    "time"
    "github.com/google/uuid"
)

type Account struct {
    ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
    AccountType string    `gorm:"not null;default:free"`
    CreatedAt   time.Time
    UpdatedAt   time.Time
}